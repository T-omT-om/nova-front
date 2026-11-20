# Nova Front – Mehrspieler-Server

Kleiner Raum-Server auf **Cloudflare Workers + Durable Objects** (kostenloser Tarif).
Jeder Spielraum verbindet zwei Geräte und reicht die Nachrichten weiter. Die Partie selbst wird auf dem Gerät des Gastgebers berechnet.

## Einmalige Einrichtung (ca. 10 Minuten)

1. Konto anlegen: <https://dash.cloudflare.com/sign-up>
2. Im Dashboard links **Workers & Pages** (bzw. **Compute → Workers & Pages**) öffnen.
3. **Create application** (Anwendung erstellen) → bei **Import a repository** auf **Get started**.
4. GitHub verbinden und das Repository **T-omT-om/nova-front** auswählen.
5. Im Einrichtungsformular:
   - **Project name / Worker name:** `nova-front-server` (muss genau so heißen, sonst schlägt der Build fehl)
   - **Build command:** leer lassen
   - **Deploy command:** `npx wrangler deploy` (Standard)
   - unter **Advanced settings → Root directory / Path:** `server`
6. **Save and Deploy** (bzw. **Deploy**). Nach etwa einer Minute ist der Server online.
7. Die Adresse steht oben in der Übersicht des Workers, z. B.
   `https://nova-front-server.DEIN-NAME.workers.dev`
   Wenn du sie im Browser öffnest, sollte „Nova Front Server läuft.“ erscheinen.
8. Diese Adresse ins Spiel eintragen (Konstante `MP_SERVER_DEFAULT` in `index.html`) – oder Claude schicken.

Danach wird der Server bei jeder Änderung im Ordner `server/` automatisch neu veröffentlicht.

## Kosten

Der Gratis-Tarif enthält 100.000 Anfragen und 13.000 GB-s Laufzeit pro Tag. Eingehende WebSocket-Nachrichten
zählen im Verhältnis 20:1. Eine 15-minütige Partie braucht grob 500 Anfragen – also Platz für rund 150–200 Partien pro Tag.
Wird ein Limit überschritten, schlagen weitere Anfragen bis zum nächsten Tag fehl; es entstehen keine Kosten.

## Testen ohne Einrichtung

Im Spiel lässt sich ein anderer Server über die Adresse setzen, z. B. `…/nova-front/?server=wss://mein-server.example`.
