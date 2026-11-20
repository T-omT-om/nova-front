/*
 * Nova Front – Mehrspieler-Server
 * Jeder Spielraum ist ein eigenes Durable Object. Es verbindet genau zwei Geräte
 * (Platz 0 = Gastgeber, Platz 1 = Mitspieler) und reicht Nachrichten zwischen ihnen weiter.
 * Das eigentliche Spiel wird auf dem Gerät des Gastgebers berechnet.
 */
import { DurableObject } from 'cloudflare:workers';

const CORS = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/plain; charset=utf-8' };
const ROOM_RE = /^[A-Z0-9]{4,8}$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/' || url.pathname === '/health') {
      return new Response('Nova Front Server läuft.', { headers: CORS });
    }
    if (url.pathname === '/ws') {
      const room = (url.searchParams.get('room') || '').toUpperCase();
      if (!ROOM_RE.test(room)) return new Response('Ungültiger Raumcode', { status: 400, headers: CORS });
      if (request.headers.get('Upgrade') !== 'websocket') return new Response('WebSocket erwartet', { status: 426, headers: CORS });
      const stub = env.ROOMS.get(env.ROOMS.idFromName(room));
      return stub.fetch(request);
    }
    return new Response('Nicht gefunden', { status: 404, headers: CORS });
  }
};

export class Room extends DurableObject {
  constructor(ctx, env) { super(ctx, env); }

  slotOf(ws) { try { return (ws.deserializeAttachment() || {}).slot; } catch (e) { return undefined; } }
  sockets() { return this.ctx.getWebSockets(); }
  sendTo(ws, obj) { try { ws.send(typeof obj === 'string' ? obj : JSON.stringify(obj)); } catch (e) { } }

  async fetch(request) {
    const url = new URL(request.url);
    const slot = url.searchParams.get('role') === 'host' ? 0 : 1;
    // Ein alter (abgerissener) Anschluss auf demselben Platz wird ersetzt
    for (const ws of this.sockets()) {
      if (this.slotOf(ws) === slot) { try { ws.close(4000, 'ersetzt'); } catch (e) { } }
    }
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);
    this.ctx.acceptWebSocket(server);
    server.serializeAttachment({ slot });
    const others = this.sockets().filter(ws => ws !== server && this.slotOf(ws) !== slot);
    this.sendTo(server, { t: 'welcome', slot, peer: others.length > 0 });
    for (const o of others) this.sendTo(o, { t: 'peer_join', slot });
    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws, msg) {
    if (typeof msg === 'string' && msg.length < 120 && msg.startsWith('{"t":"ping"')) {
      this.sendTo(ws, msg.replace('"ping"', '"pong"'));
      return;
    }
    const me = this.slotOf(ws);
    for (const o of this.sockets()) {
      if (o !== ws && this.slotOf(o) !== me) this.sendTo(o, msg);
    }
  }

  async webSocketClose(ws, code) { this.left(ws); try { ws.close(1000, 'tschüss'); } catch (e) { } }
  async webSocketError(ws) { this.left(ws); }

  left(ws) {
    const me = this.slotOf(ws);
    for (const o of this.sockets()) {
      if (o !== ws && this.slotOf(o) !== me) this.sendTo(o, { t: 'peer_left', slot: me });
    }
  }
}
