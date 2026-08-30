# Mero Diving · Tauchfoto Enhancer

Web-App zum Aufbereiten von Tauchfotos direkt im Browser – Rotkanal zurückholen, Weißabgleich, Trübung entfernen, Schärfen und Mero-Diving-Wasserzeichen. Die Verarbeitung läuft komplett lokal im Browser, es werden keine Fotos hochgeladen.

## Struktur

```
index.html            Markup der App
css/styles.css        Alle Styles (Desktop + Mobil)
js/app.js             Bildverarbeitung, Presets, UI-Logik
assets/logo.png       Mero-Diving-Logo (Header, Favicon, Wasserzeichen)
```

## PWA

Die App ist als Progressive Web App installierbar („Zum Home-Bildschirm hinzufügen“ bzw. Installieren-Symbol im Browser) und funktioniert danach auch offline – z. B. auf dem Boot ohne Empfang. `manifest.webmanifest` beschreibt die App (Name, Icons, Farben), `sw.js` cached die App-Dateien und aktualisiert sie im Hintergrund, sobald wieder Netz da ist. Nach Änderungen an den App-Dateien die `VERSION`-Konstante in `sw.js` hochzählen, damit installierte Geräte den neuen Stand laden.

## Lokal starten

Einfach `index.html` im Browser öffnen – es wird kein Build-Schritt und kein Server benötigt.

## Hosting (GitHub Pages)

GitHub Pages ist unter **Settings → Pages** mit Source „Deploy from a branch“ (`main`, Root) konfiguriert. Jeder Push auf `main` wird von GitHub automatisch deployt; die Seite ist unter <https://fritscherman.github.io/mero/> erreichbar. Die Datei `.nojekyll` verhindert dabei eine unnötige Jekyll-Verarbeitung.
