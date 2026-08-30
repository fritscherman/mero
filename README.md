# Mero Diving App

Die App der Tauchbasis Mero Diving (Cala Ratjada). Startseite mit vier Bereichen:

- **MeroColor – Bildoptimierer**: Tauchfotos direkt im Browser aufbereiten – Rotkanal zurückholen, Weißabgleich, Trübung entfernen, Schärfen, Mero-Branding. Die Verarbeitung läuft komplett lokal, es werden keine Fotos hochgeladen.
- **Tauchplätze**: die Spots rund um Cala Ratjada, mit Absprung in den Bildoptimierer (Preset wird passend gesetzt).
- **Kontakt**: Adresse, Google-Maps- und Website-Link.
- **mero-diving.com**: externer Link zur Website (Kurse, Preise, Buchung).

Die Navigation läuft über URL-Hashes (`#home`, `#editor`, `#spots`, `#contact`), damit die Zurück-Taste im Browser und in der installierten App funktioniert.

## Struktur

```
index.html            Markup der App (alle Views)
css/styles.css        Alle Styles (Desktop + Mobil)
js/app.js             Bildverarbeitung, Presets, Navigation, UI-Logik
js/i18n.js            Übersetzungen (DE/EN/ES) und Sprachumschalter
assets/logo.png       Mero-Diving-Logo (Favicon, Wasserzeichen, kompakter Header)
assets/header.jpg     Hero-Headerbild mit eingebautem Logo
assets/icon-*.png     App-Icons für PWA-Installation (Manifest + iOS)
assets/tiles/*.jpg    Banner-Fotos der Startseiten-Kacheln
assets/spots/*.jpg    Fotos der Tauchplatz-Karten
```

## PWA

Die App ist als Progressive Web App installierbar und funktioniert danach auch offline – z. B. auf dem Boot ohne Empfang. Auf Android erscheint dafür ein „Installieren“-Button, auf dem iPhone gibt es keinen automatischen Dialog (Apple erlaubt das nicht) – dort zeigt die App eine Anleitung: Teilen-Symbol → „Zum Home-Bildschirm“. `manifest.webmanifest` beschreibt die App (Name, Icons, Farben), `sw.js` lädt online immer den neuesten Stand und cached ihn für den Offline-Betrieb.

Nach Änderungen an den App-Dateien zwei Versionsnummern hochzählen: `APP_VERSION` in `js/app.js` (sichtbar in Kopfzeile und Footer) und `VERSION` in `sw.js` (löst auf installierten Geräten den „Aktualisieren“-Hinweis aus).

## Lokal starten

Einfach `index.html` im Browser öffnen – es wird kein Build-Schritt und kein Server benötigt.

## Hosting (GitHub Pages)

Der Workflow `.github/workflows/pages.yml` deployt bei jedem Push auf `main` (und manuell über *Actions → Deploy to GitHub Pages → Run workflow*) auf GitHub Pages; die Seite ist unter <https://fritscherman.github.io/mero/> erreichbar. Voraussetzung: Unter **Settings → Pages** muss als Source **„GitHub Actions“** gewählt sein.
