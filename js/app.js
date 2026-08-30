const $ = id => document.getElementById(id);
const stage=$('stage'), wrap=$('wrap'), hint=$('hint'), fileIn=$('file');
const out=$('out'), orig=$('orig'), hist=$('hist');
const ids=['red','wb','dehaze','bright','sat','sharp'];
const PRESETS={
  // --- Tauchplätze (Quelle: mero-diving.com/tauchen) ---
  // Hausriff in der Bucht: klar, flach, mäßiger Rotverlust
  lliteras:   {red:55, wb:65, dehaze:35, bright:0,  sat:20, sharp:25},
  // Kleine lichtdurchflutete Grotte neben der Bucht, Felsdurchbrüche, Oktopus & Drachenkopf
  maria:      {red:50, wb:60, dehaze:45, bright:8,  sat:20, sharp:30},
  // Naturschutzgebiet: Durchbrüche, Sandflächen, dichte Seegraswiesen (grün streut)
  kkaese:     {red:60, wb:80, dehaze:40, bright:3,  sat:15, sharp:25},
  // Mächtige Felslandschaft, hervorragende Sicht, Barrakuda-Schwärme im Blau
  capfreu:    {red:70, wb:60, dehaze:50, bright:0,  sat:30, sharp:40},
  // Fels vor dem Hafen, weite Durchbrüche & Hohlräume, tief → kräftig Rot zurück
  gkaese:     {red:85, wb:80, dehaze:55, bright:12, sat:25, sharp:30},
  // Bootsplatz, tiefes Blauwasser
  leuchtturm: {red:80, wb:75, dehaze:55, bright:8,  sat:30, sharp:30},
  // Grotte in der Höhlenbucht: Lampenlicht, dunkel & flau
  loewenkopf: {red:25, wb:35, dehaze:50, bright:22, sat:12, sharp:30},
  // Große Höhle mit Lichtstrahlen: Kontraste erhalten, nicht überziehen
  kathedrale: {red:30, wb:40, dehaze:35, bright:15, sat:15, sharp:30},
  // --- Situation ---
  schnorchel: {red:20, wb:40, dehaze:15, bright:-5, sat:15, sharp:20},
  blitz:      {red:10, wb:35, dehaze:30, bright:5,  sat:25, sharp:55},
  truebe:     {red:45, wb:70, dehaze:80, bright:5,  sat:10, sharp:10},
  sw:         {red:0,  wb:50, dehaze:60, bright:0,  sat:-100, sharp:45},
};
let fullImg=null, preview=null, previewData=null, stats=null, raf=null;
const MAXP=1100;

// ---------- Laden ----------
window.addEventListener('error',e=>{const b=$('err');b.style.display='block';b.textContent='Fehler: '+e.message;});
stage.addEventListener('click',e=>{ if(stage.classList.contains('empty')&&!e.target.closest('label')) fileIn.click(); });
fileIn.addEventListener('change',e=>{ if(e.target.files&&e.target.files[0]) load(e.target.files[0]); e.target.value=''; });
['dragenter','dragover'].forEach(ev=>stage.addEventListener(ev,e=>{e.preventDefault();stage.classList.add('drag')}));
['dragleave','drop'].forEach(ev=>stage.addEventListener(ev,e=>{e.preventDefault();stage.classList.remove('drag')}));
stage.addEventListener('drop',e=>{ const f=e.dataTransfer.files[0]; if(f&&f.type.startsWith('image/')) load(f); });

function load(file){
  // Kein blob:-URL (wird in Sandboxes oft blockiert): erst createImageBitmap, sonst FileReader → data-URL
  const show=err=>{const b=$('err');b.style.display='block';b.textContent=err;};
  const done=img=>{
    if(!img||!img.width){show('Bild konnte nicht dekodiert werden ('+(file.type||'unbekanntes Format')+').');return;}
    fullImg=img;
    const s=Math.min(1,MAXP/Math.max(img.width,img.height));
    const w=Math.round(img.width*s), h=Math.round(img.height*s);
    preview=document.createElement('canvas'); preview.width=w; preview.height=h;
    preview.getContext('2d').drawImage(img,0,0,w,h);
    previewData=preview.getContext('2d').getImageData(0,0,w,h);
    stats=channelStats(previewData.data);
    out.width=orig.width=w; out.height=orig.height=h;
    orig.getContext('2d').drawImage(preview,0,0);
    stage.classList.remove('empty'); hint.hidden=true; wrap.hidden=false;
    $('save').disabled=$('reset').disabled=false;
    $('meta').textContent=`${file.name} · ${img.width}×${img.height} px · Mero Diving`;
    $('err').style.display='none';
    schedule();
  };
  const viaReader=()=>{
    const r=new FileReader();
    r.onload=()=>{const img=new Image(); img.onload=()=>done(img); img.onerror=()=>show('Bild konnte nicht gelesen werden ('+(file.type||'unbekanntes Format')+'). HEIC bitte vorher als JPG exportieren.'); img.src=r.result;};
    r.onerror=()=>show('Datei konnte nicht gelesen werden.');
    r.readAsDataURL(file);
  };
  if(window.createImageBitmap){
    createImageBitmap(file,{imageOrientation:'from-image'}).then(done).catch(()=>createImageBitmap(file).then(done).catch(viaReader));
  } else viaReader();
}

function channelStats(d){
  let r=0,g=0,b=0,n=d.length/4;
  for(let i=0;i<d.length;i+=4){r+=d[i];g+=d[i+1];b+=d[i+2];}
  return {r:r/n,g:g/n,b:b/n};
}

// ---------- Verarbeitung ----------
function params(){ const p={}; ids.forEach(k=>p[k]=+$(k).value); return p; }

function process(src,st,p,dst){
  const s=src.data, d=dst.data, n=s.length;
  const red=p.red/100, wb=p.wb/100, dh=p.dehaze/100, br=p.bright/100, sat=1+p.sat/100;
  // Gray-World-Weißabgleich, mit wb-Stärke gemischt
  const mean=(st.r+st.g+st.b)/3;
  const gR=1+wb*(mean/st.r-1), gG=1+wb*(mean/st.g-1), gB=1+wb*(mean/st.b-1);
  // Rotkompensation (nach Ancuti): Rot bekommt Anteil des Grünkanals, wo Rot schwach ist
  const redGap=Math.max(0,(st.g-st.r)/255);
  const contrast=1+dh*1.1, lift=dh*0.10;
  const gamma=1-br*0.6;
  const lut=new Uint8ClampedArray(256);
  for(let i=0;i<256;i++){
    let v=i/255;
    v=(v-lift)/(1-lift);                 // Schleier abziehen
    v=(v-0.5)*contrast+0.5;              // Kontrast
    v=Math.pow(Math.max(0,v),gamma);     // Helligkeit
    lut[i]=Math.round(Math.min(1,Math.max(0,v))*255);
  }
  for(let i=0;i<n;i+=4){
    let r=s[i],g=s[i+1],b=s[i+2];
    // Rot zurückholen
    r=r+red*redGap*(1-r/255)*g*1.6;
    // Weißabgleich
    r*=gR; g*=gG; b*=gB;
    // Tonwerte
    r=lut[Math.min(255,Math.max(0,r|0))]; g=lut[Math.min(255,Math.max(0,g|0))]; b=lut[Math.min(255,Math.max(0,b|0))];
    // Sättigung
    const l=0.299*r+0.587*g+0.114*b;
    r=l+(r-l)*sat; g=l+(g-l)*sat; b=l+(b-l)*sat;
    d[i]=r<0?0:r>255?255:r; d[i+1]=g<0?0:g>255?255:g; d[i+2]=b<0?0:b>255?255:b; d[i+3]=s[i+3];
  }
  if(p.sharp>0) sharpen(dst,p.sharp/100*0.9);
  return dst;
}

function sharpen(img,amt){
  const w=img.width,h=img.height,d=img.data,c=new Uint8ClampedArray(d);
  for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){
    const i=(y*w+x)*4;
    for(let k=0;k<3;k++){
      const j=i+k;
      const blur=(c[j-4]+c[j+4]+c[j-w*4]+c[j+w*4]+c[j]*4)/8;
      d[j]=Math.min(255,Math.max(0,c[j]+(c[j]-blur)*amt*2.5));
    }
  }
}

function schedule(){ if(raf) cancelAnimationFrame(raf); raf=requestAnimationFrame(render); }
function render(){
  raf=null; if(!previewData) return;
  const p=params();
  const dst=out.getContext('2d').createImageData(previewData.width,previewData.height);
  process(previewData,stats,p,dst);
  out.getContext('2d').putImageData(dst,0,0);
  drawHist(dst.data);
}

// ---------- Farbcheck ----------
function drawHist(d){
  const a=channelStats(d), o=stats;   // a = bearbeitet, o = Original
  const pct=v=>Math.round(v/255*100);
  [['r',a.r,o.r],['g',a.g,o.g],['b',a.b,o.b]].forEach(([k,v,ov])=>{
    $('b-'+k).style.width=pct(v)+'%'; $('g-'+k).style.left=pct(ov)+'%'; $('v-'+k).textContent=pct(v)+' %';
  });
  const ratio=a.r/((a.g+a.b)/2), blue=a.b/Math.max(1,a.r);
  const vd=$('verdict'), vt=$('verdict-text'), tip=$('tip');
  vd.className='verdict';
  if(ratio<0.6){ vd.classList.add('bad'); vt.textContent='Starker Blaustich – Rot fehlt noch fast komplett.';
    tip.innerHTML='Schiebe <b>Rot zurückholen</b> deutlich nach rechts, dann den Weißabgleich nachziehen.'; }
  else if(ratio<0.8){ vd.classList.add('warn'); vt.textContent='Noch etwas kühl – die Farben wirken flach.';
    tip.innerHTML='Ein Stück mehr <b>Rot zurückholen</b> oder mehr <b>Weißabgleich</b> bringt Wärme in Haut, Sand und Fische.'; }
  else if(ratio>1.2){ vd.classList.add('warn'); vt.textContent='Zu warm – Rot dominiert, Hauttöne werden orange.';
    tip.innerHTML='<b>Rot zurückholen</b> etwas zurücknehmen, bis das Wasser wieder klar blau wirkt.'; }
  else { vd.classList.add('ok'); vt.textContent='Farben ausgewogen – so sieht es unter Wasser wirklich aus.';
    tip.innerHTML='Jetzt nur noch Feinschliff: <b>Schärfe</b> für Details, <b>Sättigung</b> für Leuchtkraft. Dann speichern.'; }
}

// ---------- UI ----------
ids.forEach(k=>{
  $(k).addEventListener('input',()=>{ $('v-'+k).value=$(k).value; clearPreset(); schedule(); });
});
function clearPreset(){ document.querySelectorAll('#presets button,#presets2 button').forEach(b=>b.classList.remove('on')); }
function applyPreset(name){
  const p=PRESETS[name]; ids.forEach(k=>{$(k).value=p[k];$('v-'+k).value=p[k];});
  clearPreset(); document.querySelector(`[data-p="${name}"]`).classList.add('on'); schedule();
}
[$('presets'),$('presets2')].forEach(el=>el.addEventListener('click',e=>{ const b=e.target.closest('button'); if(b) applyPreset(b.dataset.p); }));
$('reset').addEventListener('click',()=>applyPreset('lliteras'));

// Vergleichsschieber
const wrapEl=$('wrap');
let dragging=false;
function setSplit(clientX){
  const r=wrapEl.getBoundingClientRect();
  const x=Math.min(100,Math.max(0,(clientX-r.left)/r.width*100));
  wrapEl.style.setProperty('--split',x+'%');
}
wrapEl.addEventListener('pointerdown',e=>{if(e.target.closest('.hold'))return;if(window.matchMedia('(max-width:860px)').matches)return;dragging=true;setSplit(e.clientX);wrapEl.setPointerCapture(e.pointerId)});
wrapEl.addEventListener('pointermove',e=>{if(dragging)setSplit(e.clientX)});
wrapEl.addEventListener('pointerup',()=>dragging=false);
wrapEl.addEventListener('pointercancel',()=>dragging=false);

// Wasserzeichen: Logo + Schriftzug unten rechts
const logoImg=document.querySelector('.brand img');
function watermark(ctx,w,h){
  const size=Math.max(56,Math.round(Math.min(w,h)*0.11)), pad=Math.round(size*0.35);
  const fs=Math.round(size*0.30), fs2=Math.round(size*0.20);
  ctx.save();
  ctx.font=`700 ${fs}px "Roboto Slab",Georgia,serif`;
  const t1='MERO DIVING', t2='Cala Ratjada · Mallorca';
  const tw=Math.max(ctx.measureText(t1).width, (ctx.font=`500 ${fs2}px Roboto,sans-serif`,ctx.measureText(t2).width));
  const bw=size+pad*0.6+tw+pad*2, bh=size+pad;
  const x=w-bw-pad, y=h-bh-pad;
  ctx.fillStyle='rgba(25,7,88,.55)'; roundRect(ctx,x,y,bw,bh,Math.round(size*0.18)); ctx.fill();
  if(logoImg.complete&&logoImg.naturalWidth) ctx.drawImage(logoImg,x+pad*0.5,y+pad*0.5,size,size*logoImg.naturalHeight/logoImg.naturalWidth);
  const tx=x+pad*0.5+size+pad*0.6;
  ctx.fillStyle='#FFFFFF'; ctx.font=`700 ${fs}px "Roboto Slab",Georgia,serif`; ctx.textBaseline='alphabetic';
  ctx.fillText(t1,tx,y+bh/2-fs*0.1);
  ctx.fillStyle='#FFD166'; ctx.font=`500 ${fs2}px Roboto,sans-serif`;
  ctx.fillText(t2,tx,y+bh/2+fs2*0.95);
  ctx.restore();
}
function roundRect(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}

// Speichern: 1) Teilen-Menü (Fotos sichern), 2) Download, 3) Vorschau-Overlay zum Gedrückthalten
$('save').addEventListener('click',async()=>{
  if(!fullImg) return;
  const btn=$('save'); btn.disabled=true; btn.textContent='Rendere …';
  await new Promise(r=>setTimeout(r,30));
  const MAXE=/iPhone|iPad|Android/i.test(navigator.userAgent)?3000:6000;
  const es=Math.min(1,MAXE/Math.max(fullImg.width,fullImg.height));
  const c=document.createElement('canvas'); c.width=Math.round(fullImg.width*es); c.height=Math.round(fullImg.height*es);
  const ctx=c.getContext('2d'); ctx.drawImage(fullImg,0,0,c.width,c.height);
  const src=ctx.getImageData(0,0,c.width,c.height);
  const dst=ctx.createImageData(c.width,c.height);
  process(src,stats,params(),dst);
  ctx.putImageData(dst,0,0);
  if($('wm').checked) watermark(ctx,c.width,c.height);
  const dataUrl=c.toDataURL('image/jpeg',0.94);
  btn.disabled=false; btn.textContent='Foto speichern';
  // 1) Share-Sheet
  try{
    const blob=await (await fetch(dataUrl)).blob();
    const f=new File([blob],'mero-diving-tauchfoto.jpg',{type:'image/jpeg'});
    if(navigator.canShare&&navigator.canShare({files:[f]})){ await navigator.share({files:[f],title:'Mero Diving Tauchfoto'}); return; }
  }catch(e){ if(e&&e.name==='AbortError') return; }
  // 2)+3) Overlay mit Bild (Gedrückthalten) und Download-Link
  $('ovimg').src=dataUrl; $('ovdl').href=dataUrl; $('ov').classList.add('on');
});
$('ovclose').addEventListener('click',()=>$('ov').classList.remove('on'));

// Mobil: Original per Gedrückthalten zeigen
const holdBtn=$('hold');
const showOrig=on=>{ wrapEl.style.setProperty('--split',on?'100%':'0%'); holdBtn.textContent=on?'Original':'Gedrückt halten: Original'; };
['pointerdown','touchstart'].forEach(ev=>holdBtn.addEventListener(ev,e=>{e.preventDefault();e.stopPropagation();showOrig(true);},{passive:false}));
['pointerup','pointercancel','pointerleave','touchend','touchcancel'].forEach(ev=>holdBtn.addEventListener(ev,e=>{e.stopPropagation();showOrig(false);}));
holdBtn.addEventListener('contextmenu',e=>e.preventDefault());
if(window.matchMedia('(max-width:860px)').matches) wrapEl.style.setProperty('--split','0%');

// Bottom-Bar spiegelt die Desktop-Buttons
$('save2').addEventListener('click',()=>$('save').click());
$('reset2').addEventListener('click',()=>$('reset').click());
new MutationObserver(()=>{$('save2').disabled=$('save').disabled;$('reset2').disabled=$('reset').disabled;$('save2').textContent=$('save').textContent.replace('Foto speichern','Speichern');})
  .observe($('save'),{attributes:true,childList:true,characterData:true,subtree:true});
new MutationObserver(()=>{$('reset2').disabled=$('reset').disabled;}).observe($('reset'),{attributes:true});

// PWA: Service Worker registrieren (relativ, damit es unter /mero/ funktioniert)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
