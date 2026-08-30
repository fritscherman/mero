# Mero Diving · Tauchfoto Enhancer

Web-App zum Aufbereiten von Tauchfotos direkt im Browser – Rotkanal zurückholen, Weißabgleich, Trübung entfernen, Schärfen und Mero-Diving-Wasserzeichen. Die Verarbeitung läuft komplett lokal im Browser, es werden keine Fotos hochgeladen.

## Struktur

```
index.html            Markup der App
css/styles.css        Alle Styles (Desktop + Mobil)
js/app.js             Bildverarbeitung, Presets, UI-Logik
assets/logo.png       Mero-Diving-Logo (Header, Favicon, Wasserzeichen)
.github/workflows/    GitHub-Pages-Deployment
```

## Lokal starten

Einfach `index.html` im Browser öffnen – es wird kein Build-Schritt und kein Server benötigt.

## Hosting (GitHub Pages)

Der Workflow `.github/workflows/pages.yml` veröffentlicht das Repository bei jedem Push auf `main` automatisch über GitHub Actions auf GitHub Pages. Die Seite ist danach unter `https://<benutzername>.github.io/mero/` erreichbar.

Falls das Deployment beim allerersten Lauf fehlschlägt: unter **Settings → Pages** als Source „GitHub Actions“ auswählen und den Workflow erneut starten.
