# Nova Front

Ein Echtzeit-Strategiespiel für Handy und Browser – eine einzige HTML-Datei, keine Installation.

**Jetzt spielen:** https://t-omt-om.github.io/nova-front/

Aktuelle Version: **1.3.0**

## Features
- Drei Fraktionen: **Allianz** (menschliche Kolonisten), **Kollektiv** (Maschinenintelligenz) und **Myzel** (pilzartiger Schwarm mit Selbstheilung)
- Boden- und Lufteinheiten, Bunker, Verteidigungstürme
- Basisbau, Kristall- und Plasma-Abbau, Versorgung, Forschung, Expansionen
- KI-Gegner in drei Schwierigkeitsstufen
- Nebel des Krieges, Minimap, Touch-Steuerung (Tippen, Wischen, Pinch-Zoom, Zoom-Knöpfe, Auswahlrahmen)
- Funktioniert auch mit Maus und Tastatur

## Steuerung (Touch)
- Tippen: auswählen / Befehl geben · Doppeltippen: alle Einheiten dieses Typs
- Wischen: Karte verschieben · Zwei Finger: Zoom
- Auswahlrahmen: Rahmen-Knopf links antippen, dann ziehen
- Zoom: zwei Finger oder + / − unter der Minimap
- Gruppen 1–3 (rechts unten): gedrückt halten speichert die Auswahl, tippen ruft sie ab, zweimal tippen springt hin

## Steuerung (Maus & Tastatur)
- Linksklick: auswählen · Linksziehen: Auswahlrahmen · Rechtsklick: Befehl
- Rechtsziehen, Mausrad gedrückt, Bildschirmrand oder WASD/Pfeiltasten: Karte verschieben · Mausrad: Zoom
- Strg+1–9: Steuergruppe speichern · 1–9: abrufen (zweimal: hinspringen) · Shift+Zahl: ergänzen
- Q: ganze Armee · E: untätige Arbeiter · F: Basis · Leertaste: Pause

## Mehrspieler
- Hauptmenü → **Mehrspieler** → Spiel erstellen (Duell 1 gegen 1 oder zu zweit gegen die KI)
- Einladungslink oder Raumcode an den Mitspieler schicken, er tritt mit einem Tipp bei
- Die Partie wird auf dem Gerät des Gastgebers berechnet. Bricht die Verbindung des Mitspielers ab, übernimmt die KI, bis er wieder da ist
- Der Server liegt im Ordner `server/` (Cloudflare Workers, kostenlos). Einrichtung: siehe `server/README.md`

## Spielstände
- **Spiel speichern** im Pausenmenü (☰) legt einen manuellen Spielstand an.
- Zusätzlich wird jede Minute sowie beim Verlassen der Seite oder App automatisch gespeichert.
- Im Hauptmenü setzt **Weiterspielen** den neuesten Spielstand fort.
- Spielstände liegen im Browser-Speicher des jeweiligen Geräts.

## Versionen & Updates
Die Datei `version.json` enthält die aktuelle Versionsnummer und die Neuerungen. Im Hauptmenü und im Pausenmenü prüft **Nach Updates suchen** auf eine neue Version, zeigt die Neuerungen und installiert sie per Knopfdruck. Zusätzlich erscheint automatisch ein Hinweis, sobald eine neue Version online ist. Der laufende Spielstand wird vor dem Update gesichert.

## Änderungen
- **1.3.0** – Live-Mehrspieler (Duell und Koop gegen KI) über einen Cloudflare-Raumserver, Einladungslinks, KI-Übernahme bei Verbindungsabbruch
- **1.2.1** – Auswahlrahmen mit der Maus wieder per Linksziehen, Kartenverschieben per Rechtsziehen/Bildschirmrand, Steuergruppen (Tastatur + Handy-Knöpfe)
- **1.2.0** – Dritte Fraktion Myzel, Lufteinheiten, Bunker, neue Einheiten-Grafik, Balancing aller Fraktionen, zuverlässiges Wischen + Zoom-Knöpfe, Update-Prüfung im Spiel
- **1.1.0** – Speichersystem (manuell + automatisch), Weiterspielen im Hauptmenü, Versionsanzeige, Update-Hinweis
- **1.0.0** – Erste Version
