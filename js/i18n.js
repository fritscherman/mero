// Mehrsprachigkeit: Deutsch (Standard), Englisch, Spanisch.
// Sprache: gespeicherte Wahl > Browsersprache > Englisch.
// app.js nutzt t() für dynamische Texte und hört auf das 'langchange'-Event.
const I18N = {
de: {
  'hint.title':'Tauchfoto auswählen',
  'hint.body':'Aus Fotos oder Dateien. JPG, PNG, HEIC, WebP. Das Original wird nie verändert – du speicherst eine neue Datei.',
  'hint.pick':'Foto auswählen',
  'hint.drag':'Am Computer: Foto einfach hierher ziehen.',
  'newpic':'＋ Neues Foto',
  'hold.idle':'Gedrückt halten: Original','hold.active':'Original',
  'tag.l':'ORIGINAL','tag.r':'BEARBEITET',
  'sec.spots':'Tauchplätze Mero Diving','sec.situation':'Situation','sec.filter':'Filter','sec.wm':'Mero-Branding','sec.check':'Farbcheck',
  'pn.lliteras':'Cala Lliteras','p.lliteras':'Bucht · Hausriff · 5–12 m',
  'pn.maria':"Maria's Grotte",'p.maria':'Bucht · lichtdurchflutet · 8–14 m',
  'pn.kkaese':'Kleiner Käse','p.kkaese':'Bucht · Seegras &amp; Sand · 10–18 m',
  'pn.capfreu':'Cap Freu','p.capfreu':'Boot · Fels &amp; Barrakudas · 15–25 m',
  'pn.gkaese':'Großer Käse','p.gkaese':'Boot · Durchbrüche · bis 30 m',
  'pn.leuchtturm':'Leuchtturm','p.leuchtturm':'Boot · Blauwasser · 20–30 m',
  'pn.loewenkopf':'Löwenkopfgrotte','p.loewenkopf':'Grotte · Lampenlicht',
  'pn.kathedrale':'Kathedrale','p.kathedrale':'Höhle · Lichtstrahlen',
  'pn.schnorchel':'Schnorcheln','p.schnorchel':'0–4 m · Sonnenflecken',
  'pn.blitz':'Mit Blitz / Makro','p.blitz':'Mero-Porträt · Nahaufnahme',
  'pn.truebe':'Trübung &amp; Plankton','p.truebe':'Schwebstoff · Nebel',
  'pn.sw':'Schwarzweiß','p.sw':'Fine-Art · Struktur',
  'f.red':'Rot zurückholen','f.wb':'Weißabgleich','f.dehaze':'Trübung entfernen','f.bright':'Helligkeit','f.sat':'Sättigung','f.sharp':'Schärfe',
  'wm.label':'Logo &amp; „Cala Ratjada“ ins Foto einprägen',
  'check.initial':'Lade ein Foto, um die Farbbalance zu prüfen.',
  'bar.r':'Rot','bar.g':'Grün','bar.b':'Blau',
  'legend':'<span class="lg-fill"></span> bearbeitet &nbsp; <span class="lg-ghost"></span> Original',
  'act.new':'Neues Foto','act.reset':'Zurücksetzen','act.save':'Foto speichern','act.save2':'Speichern','act.render':'Rendere …',
  'v.bad':'Starker Blaustich – Rot fehlt noch fast komplett.',
  'tip.bad':'Schiebe <b>Rot zurückholen</b> deutlich nach rechts, dann den Weißabgleich nachziehen.',
  'v.cool':'Noch etwas kühl – die Farben wirken flach.',
  'tip.cool':'Ein Stück mehr <b>Rot zurückholen</b> oder mehr <b>Weißabgleich</b> bringt Wärme in Haut, Sand und Fische.',
  'v.warm':'Zu warm – Rot dominiert, Hauttöne werden orange.',
  'tip.warm':'<b>Rot zurückholen</b> etwas zurücknehmen, bis das Wasser wieder klar blau wirkt.',
  'v.ok':'Farben ausgewogen – so sieht es unter Wasser wirklich aus.',
  'tip.ok':'Jetzt nur noch Feinschliff: <b>Schärfe</b> für Details, <b>Sättigung</b> für Leuchtkraft. Dann speichern.',
  'meta.empty':'Kein Bild geladen · Verarbeitung bleibt lokal im Browser',
  'err.decode':'Bild konnte nicht dekodiert werden','err.read':'Bild konnte nicht gelesen werden',
  'err.heic':'HEIC bitte vorher als JPG exportieren.','err.file':'Datei konnte nicht gelesen werden.','err.format':'unbekanntes Format',
  'ov.text':'<b>Bild gedrückt halten</b> → „Bild sichern“ bzw. „Zu Fotos hinzufügen“.<br>Am Computer: Rechtsklick → „Bild speichern unter“.',
  'ov.dl':'Herunterladen','ov.close':'Schließen',
  'upd.text':'Neue Version verfügbar.','upd.btn':'Aktualisieren',
  'inst.default':'Als App nutzen – mit eigenem Icon und offline.',
  'inst.android':'Als App installieren – mit eigenem Icon und offline nutzbar.',
  'inst.ios':'Als App aufs iPhone: <b>Teilen-Symbol</b> (Quadrat mit Pfeil) antippen → <b>„Zum Home-Bildschirm“</b>. Läuft dann auch offline.',
  'inst.btn':'Installieren',
  'h1.small':'Dive with friends · Cala Ratjada · seit 1969',
  'footer.base':'Tauchbasis in der Cala Lliteras seit 1969',
},
en: {
  'hint.title':'Choose a dive photo',
  'hint.body':'From Photos or Files. JPG, PNG, HEIC, WebP. Your original is never changed – you save a new file.',
  'hint.pick':'Choose photo',
  'hint.drag':'On a computer: simply drag a photo here.',
  'newpic':'＋ New photo',
  'hold.idle':'Press and hold: original','hold.active':'Original',
  'tag.l':'ORIGINAL','tag.r':'EDITED',
  'sec.spots':'Mero Diving dive sites','sec.situation':'Situation','sec.filter':'Filters','sec.wm':'Mero branding','sec.check':'Color check',
  'pn.lliteras':'Cala Lliteras','p.lliteras':'Bay · house reef · 5–12 m',
  'pn.maria':"Maria's Grotto",'p.maria':'Bay · light-flooded · 8–14 m',
  'pn.kkaese':'Little Cheese','p.kkaese':'Bay · seagrass &amp; sand · 10–18 m',
  'pn.capfreu':'Cap Freu','p.capfreu':'Boat · rock &amp; barracudas · 15–25 m',
  'pn.gkaese':'Big Cheese','p.gkaese':'Boat · swim-throughs · to 30 m',
  'pn.leuchtturm':'Lighthouse','p.leuchtturm':'Boat · blue water · 20–30 m',
  'pn.loewenkopf':"Lion's Head Grotto",'p.loewenkopf':'Grotto · torch light',
  'pn.kathedrale':'Cathedral','p.kathedrale':'Cave · light beams',
  'pn.schnorchel':'Snorkeling','p.schnorchel':'0–4 m · sun flecks',
  'pn.blitz':'With strobe / macro','p.blitz':'Grouper portrait · close-up',
  'pn.truebe':'Turbidity &amp; plankton','p.truebe':'Particles · haze',
  'pn.sw':'Black &amp; white','p.sw':'Fine art · texture',
  'f.red':'Restore red','f.wb':'White balance','f.dehaze':'Remove haze','f.bright':'Brightness','f.sat':'Saturation','f.sharp':'Sharpness',
  'wm.label':'Stamp logo &amp; “Cala Ratjada” into the photo',
  'check.initial':'Load a photo to check the color balance.',
  'bar.r':'Red','bar.g':'Green','bar.b':'Blue',
  'legend':'<span class="lg-fill"></span> edited &nbsp; <span class="lg-ghost"></span> original',
  'act.new':'New photo','act.reset':'Reset','act.save':'Save photo','act.save2':'Save','act.render':'Rendering …',
  'v.bad':'Strong blue cast – red is still almost completely missing.',
  'tip.bad':'Push <b>Restore red</b> well to the right, then adjust the white balance.',
  'v.cool':'Still a bit cool – the colors look flat.',
  'tip.cool':'A bit more <b>Restore red</b> or <b>White balance</b> brings warmth to skin, sand and fish.',
  'v.warm':'Too warm – red dominates, skin tones turn orange.',
  'tip.warm':'Ease off <b>Restore red</b> until the water looks clear blue again.',
  'v.ok':'Colors balanced – this is what it really looks like underwater.',
  'tip.ok':'Just fine-tuning now: <b>Sharpness</b> for detail, <b>Saturation</b> for punch. Then save.',
  'meta.empty':'No photo loaded · processing stays local in your browser',
  'err.decode':'The image could not be decoded','err.read':'The image could not be read',
  'err.heic':'Please export HEIC as JPG first.','err.file':'The file could not be read.','err.format':'unknown format',
  'ov.text':'<b>Press and hold the image</b> → “Save image” or “Add to Photos”.<br>On a computer: right-click → “Save image as”.',
  'ov.dl':'Download','ov.close':'Close',
  'upd.text':'New version available.','upd.btn':'Update',
  'inst.default':'Use as an app – with its own icon, works offline.',
  'inst.android':'Install as an app – with its own icon, works offline.',
  'inst.ios':'Get the app on your iPhone: tap the <b>Share icon</b> (square with arrow) → <b>“Add to Home Screen”</b>. Works offline, too.',
  'inst.btn':'Install',
  'h1.small':'Dive with friends · Cala Ratjada · since 1969',
  'footer.base':'Dive center at Cala Lliteras since 1969',
},
es: {
  'hint.title':'Elige una foto de buceo',
  'hint.body':'Desde Fotos o Archivos. JPG, PNG, HEIC, WebP. El original nunca se modifica: guardas un archivo nuevo.',
  'hint.pick':'Elegir foto',
  'hint.drag':'En el ordenador: simplemente arrastra la foto aquí.',
  'newpic':'＋ Nueva foto',
  'hold.idle':'Mantén pulsado: original','hold.active':'Original',
  'tag.l':'ORIGINAL','tag.r':'EDITADA',
  'sec.spots':'Puntos de buceo Mero Diving','sec.situation':'Situación','sec.filter':'Filtros','sec.wm':'Marca Mero','sec.check':'Control de color',
  'pn.lliteras':'Cala Lliteras','p.lliteras':'Bahía · arrecife local · 5–12 m',
  'pn.maria':'Gruta de María','p.maria':'Bahía · llena de luz · 8–14 m',
  'pn.kkaese':'Queso Pequeño','p.kkaese':'Bahía · posidonia y arena · 10–18 m',
  'pn.capfreu':'Cap Freu','p.capfreu':'Barco · roca y barracudas · 15–25 m',
  'pn.gkaese':'Queso Grande','p.gkaese':'Barco · pasadizos · hasta 30 m',
  'pn.leuchtturm':'Faro','p.leuchtturm':'Barco · aguas azules · 20–30 m',
  'pn.loewenkopf':'Gruta Cabeza de León','p.loewenkopf':'Gruta · luz de foco',
  'pn.kathedrale':'Catedral','p.kathedrale':'Cueva · rayos de luz',
  'pn.schnorchel':'Esnórquel','p.schnorchel':'0–4 m · reflejos de sol',
  'pn.blitz':'Con flash / macro','p.blitz':'Retrato de mero · primer plano',
  'pn.truebe':'Turbidez y plancton','p.truebe':'Partículas · bruma',
  'pn.sw':'Blanco y negro','p.sw':'Fine art · textura',
  'f.red':'Recuperar rojo','f.wb':'Balance de blancos','f.dehaze':'Quitar bruma','f.bright':'Brillo','f.sat':'Saturación','f.sharp':'Nitidez',
  'wm.label':'Grabar el logo y «Cala Ratjada» en la foto',
  'check.initial':'Carga una foto para comprobar el balance de color.',
  'bar.r':'Rojo','bar.g':'Verde','bar.b':'Azul',
  'legend':'<span class="lg-fill"></span> editada &nbsp; <span class="lg-ghost"></span> original',
  'act.new':'Nueva foto','act.reset':'Restablecer','act.save':'Guardar foto','act.save2':'Guardar','act.render':'Procesando …',
  'v.bad':'Fuerte dominante azul: aún falta casi todo el rojo.',
  'tip.bad':'Sube bastante <b>Recuperar rojo</b> y ajusta después el balance de blancos.',
  'v.cool':'Aún algo fría: los colores se ven planos.',
  'tip.cool':'Un poco más de <b>Recuperar rojo</b> o de <b>Balance de blancos</b> da calidez a piel, arena y peces.',
  'v.warm':'Demasiado cálida: domina el rojo y la piel se ve naranja.',
  'tip.warm':'Baja un poco <b>Recuperar rojo</b> hasta que el agua vuelva a verse azul limpio.',
  'v.ok':'Colores equilibrados: así se ve realmente bajo el agua.',
  'tip.ok':'Solo quedan retoques: <b>Nitidez</b> para el detalle, <b>Saturación</b> para el brillo. Y a guardar.',
  'meta.empty':'Sin foto cargada · el procesado se queda en tu navegador',
  'err.decode':'No se pudo decodificar la imagen','err.read':'No se pudo leer la imagen',
  'err.heic':'Exporta antes el HEIC como JPG.','err.file':'No se pudo leer el archivo.','err.format':'formato desconocido',
  'ov.text':'<b>Mantén pulsada la imagen</b> → «Guardar imagen» o «Añadir a Fotos».<br>En el ordenador: clic derecho → «Guardar imagen como».',
  'ov.dl':'Descargar','ov.close':'Cerrar',
  'upd.text':'Nueva versión disponible.','upd.btn':'Actualizar',
  'inst.default':'Úsala como app: con su propio icono y sin conexión.',
  'inst.android':'Instálala como app: con su propio icono y sin conexión.',
  'inst.ios':'La app en tu iPhone: toca el <b>icono de compartir</b> (cuadrado con flecha) → <b>«Añadir a pantalla de inicio»</b>. Funciona también sin conexión.',
  'inst.btn':'Instalar',
  'h1.small':'Dive with friends · Cala Ratjada · desde 1969',
  'footer.base':'Centro de buceo en Cala Lliteras desde 1969',
},
};

let LANG = (() => {
  try { const s = localStorage.getItem('mero-lang'); if (I18N[s]) return s; } catch(e) {}
  const nav = (navigator.language || 'en').slice(0,2).toLowerCase();
  return I18N[nav] ? nav : 'en';
})();

function t(k){ return (I18N[LANG] && I18N[LANG][k]) || I18N.de[k] || k; }

// Statische Elemente: Selektor → Schlüssel (innerHTML, da einige Texte Markup enthalten)
const I18N_MAP = {
  '#hint strong':'hint.title',
  '#hint > p:first-of-type':'hint.body',
  '#hint .pick':'hint.pick',
  '#hint .tiny':'hint.drag',
  '.newpic':'newpic',
  '#hold':'hold.idle',
  '.tag.l':'tag.l','.tag.r':'tag.r',
  '#presets-h':'sec.spots','#situation-h':'sec.situation','#filter-h':'sec.filter','#wm-h':'sec.wm','#check-h':'sec.check',
  'label[for=red]>span':'f.red','label[for=wb]>span':'f.wb','label[for=dehaze]>span':'f.dehaze',
  'label[for=bright]>span':'f.bright','label[for=sat]>span':'f.sat','label[for=sharp]>span':'f.sharp',
  '.wm-row>span':'wm.label',
  '.bar-row:nth-of-type(1) .bar-name':'bar.r','.bar-row:nth-of-type(2) .bar-name':'bar.g','.bar-row:nth-of-type(3) .bar-name':'bar.b',
  '.legend':'legend',
  '.actions label[for=file]':'act.new','#reset':'act.reset','#reset2':'act.reset',
  '#ov p':'ov.text','#ovdl':'ov.dl','#ovclose':'ov.close',
  '.update-toast>span':'upd.text','#update-btn':'upd.btn',
  '#install-btn':'inst.btn',
  'h1 small':'h1.small',
  '#footer-base':'footer.base',
};

function applyI18n(){
  document.documentElement.lang = LANG;
  for (const [sel, key] of Object.entries(I18N_MAP)) {
    document.querySelectorAll(sel).forEach(el => { el.innerHTML = t(key); });
  }
  // Preset-Buttons: Name (Textknoten) + Beschreibung (<small>)
  document.querySelectorAll('#presets button, #presets2 button').forEach(btn => {
    const key = btn.dataset.p, small = btn.querySelector('small');
    if (!key || !small) return;
    btn.childNodes[0].nodeValue = t('pn.' + key).replace(/&amp;/g, '&') + ' ';
    small.innerHTML = t('p.' + key);
  });
  document.querySelectorAll('.lang button').forEach(b => b.classList.toggle('on', b.dataset.lang === LANG));
}

function setLang(l){
  if (!I18N[l] || l === LANG) return;
  LANG = l;
  try { localStorage.setItem('mero-lang', l); } catch(e) {}
  applyI18n();
  document.dispatchEvent(new CustomEvent('langchange'));
}

document.addEventListener('DOMContentLoaded', () => {
  applyI18n();
  const sw = document.querySelector('.lang');
  if (sw) sw.addEventListener('click', e => { const b = e.target.closest('button'); if (b) setLang(b.dataset.lang); });
});
