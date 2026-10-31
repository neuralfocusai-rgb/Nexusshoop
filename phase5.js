/* ===== NEXUS PHASE 5 · SETTINGS + STORE PROFILE + VOICE BAZAAR ===== */
(function(){
document.head.insertAdjacentHTML('beforeend','<style>'+
'body.light{--bg:#eef1fa;--glass:rgba(255,255,255,.8);--border:rgba(20,24,60,.15);--text:#141a3a;--muted:#5c6690}'+
'body.light header,body.light nav{background:rgba(255,255,255,.88)}'+
'body.light .pcard,body.light .card{background:#fff}'+
'body.light input.f,body.light .search,body.light select.f{background:#fff;color:#141a3a}'+
'body.light .nxm.ai{background:#fff}'+
'body.light #nxAi,body.light #nxGroup{background:var(--bg)}'+
'.nxleg{border:1px solid var(--border);border-radius:12px;padding:10px 12px;margin-top:8px;font-size:12.5px;color:var(--muted)}'+
'.nxleg summary{cursor:pointer;font-weight:700;color:var(--text)}'+
'.nxleg p{margin-top:8px;line-height:1.65}'+
'</style>');
var TH=LS.get('nx_theme','dark');
function applyTheme(){document.body.classList.toggle('light',TH==='light')}
window.nxSetTheme=function(m){TH=m;LS.set('nx_theme',m);applyTheme();toast(m==='light'?'☀️ Light mode':'🌙 Dark mode','info')};
applyTheme();
function addGear(){var sp=document.querySelector('header .sp');if(sp&&!document.getElementById('nxGear'))sp.insertAdjacentHTML('afterend','<button class="icb" id="nxGear" onclick="go(\'settings\')">⚙️</button>')}
addGear();setTimeout(addGear,1500);
var ABOUT='NexusShop was born in 2026 between two cities: Lahore and Argentina. We build the storefront Pakistani sellers deserve: zero commission, cash on delivery, WhatsApp checkout, Urdu first. Every shop keeps its own customers, its own reputation, its own income. Founded by Lucas (product & code, Argentina) and Talal (operations & growth, Lahore). Built in public — every commit, every mistake, every win.';
var PRIV='On your device: cart, recently viewed, reorder list, language and theme (localStorage). In our database (Supabase): your shop data if you sell, orders and Committee groups you create, and your email if you sign up. Outside NexusShop: when you tap "Order on WhatsApp", your order text travels through WhatsApp to the seller number, including your login email. Raahnuma chats are processed by Google Gemini to answer you; we do not store chat content. We never collect payment data (everything is cash on delivery) and we never sell personal data. Questions? Chat with any seller or the Seller Center WhatsApp.';
var TERMS='NexusShop connects buyers and independent sellers. Sellers own their products, prices and delivery promises. Orders are cash-on-delivery arrangements between buyer, seller and (optionally) an independent courier; NexusShop never handles money. Committee Buy groups become binding orders only when the group completes; nobody pays anything before delivery. Courier names are shown for information — we are not affiliated with them yet. Demo items are examples, not real offers. By using NexusShop you agree to trade in good faith.';
function vSettings(){
 var voice=LS.get('nx_voice',true);
 var cours=['Seller arranges'];for(var i=0;i<NXCOURIERS.length;i++)cours.push(NXCOURIERS[i].n);
 return '<div class="card"><h2 class="t">⚙️ Settings</h2>'+
 '<div class="lbl">Appearance</div><div style="display:flex;gap:8px"><button class="btn '+(TH==='dark'?'':'ghost')+'" onclick="nxSetTheme(\'dark\')">🌙 Dark</button><button class="btn '+(TH==='light'?'':'ghost')+'" onclick="nxSetTheme(\'light\')">☀️ Light</button></div>'+
 '<div class="lbl">Language</div><div style="display:flex;gap:8px"><button class="btn '+(LAN==='en'?'':'ghost')+'" onclick="pickLang(\'en\')">English</button><button class="btn '+(LAN==='ur'?'':'ghost')+'" onclick="pickLang(\'ur\')">اردو</button></div>'+
 '<div class="lbl">🎙 Bazaar Bolta Hai · voice replies</div><div style="display:flex;gap:8px"><button class="btn '+(voice?'':'ghost')+'" onclick="nxVoiceSet(true)">🔊 On</button><button class="btn '+(voice?'ghost':'')+'" onclick="nxVoiceSet(false)">🔇 Off</button></div>'+
 '<div class="lbl">Default courier</div><select class="f" onchange="nxSetCourier(this.value,null)">'+cours.map(function(n){return '<option'+(window.NXCOURIER===n?' selected':'')+'>'+n+'</option>'}).join('')+'</select>'+
 '<div class="lbl">About & legal</div>'+
 '<details class="nxleg"><summary>🏛 About NexusShop</summary><p>'+ABOUT+'</p></details>'+
 '<details class="nxleg"><summary>🔒 Privacy policy</summary><p>'+PRIV+'</p></details>'+
 '<details class="nxleg"><summary>📜 Terms of service</summary><p>'+TERMS+'</p></details>'+
 '<button class="btn ghost" style="margin-top:12px" onclick="nxClearData()">🧹 Clear my local data</button>'+
 '<p style="font-size:11px;color:var(--muted);margin-top:12px">NexusShop v1.7™ · The E-Commerce of Pakistan · پاکستان کا ای کامرس 🇵🇦</p></div>';}
window.nxVoiceSet=function(v){LS.set('nx_voice',v);render()};
window.nxClearData=function(){['nx_cart','nx_wish','nx_viewed','nx_ordered','nx_buyer','nx_courier'].forEach(function(k){localStorage.removeItem(k)});location.reload()};
var _r5=render;
render=function(){if(VIEW==='settings'){if(!sessionStorage.getItem('nx_in'))return;applyLanguage();document.getElementById('view').innerHTML=vSettings();badge();return}_r5()};
window.nxStore=function(shopName){var ps=PRODS.filter(function(p){return p.shopName===shopName});if(!ps.length)return;
 function show(s){var o=document.getElementById('nxGroup');o.hidden=false;
  o.innerHTML='<div class="card"><button class="btn ghost" style="width:auto;padding:9px 14px;margin:0 0 10px" onclick="nxClose()">← Back</button>'+
  '<div style="display:flex;gap:12px;align-items:center">'+(s.owner_photo_url?'<img src="'+esc(s.owner_photo_url)+'" style="width:64px;height:64px;border-radius:50%;object-fit:cover">':'<div style="width:64px;height:64px;border-radius:50%;background:var(--glass);display:flex;align-items:center;justify-content:center;font-size:30px">🏪</div>')+
  '<div><b style="font-size:16px">'+esc(s.owner_name||shopName)+'</b><div style="font-size:12px;color:var(--muted)">'+esc(shopName)+' · 📍 '+esc(s.city||'Pakistan')+(s.since_year?' · since '+s.since_year:'')+'</div></div></div>'+
  (s.story?'<p style="font-size:13px;color:var(--muted);line-height:1.6;margin-top:10px">'+esc(s.story)+'</p>':'')+
  '<div class="tags"><span class="tag">✅ Approved seller</span><span class="tag">💵 COD</span><span class="tag">📦 '+ps.length+' products</span></div>'+
  '<button class="btn wa" onclick="waOne(PRODS.find(function(p){return p.shopName===\''+shopName.replace(/'/g,"\\'")+'\'}))">💬 WhatsApp store</button>'+
  '<div class="lbl" style="margin-top:12px">Products from this store</div><div class="grid" style="margin:0">'+ps.map(card).join('')+'</div></div>';}
  if(SB)SB.from('stores').select('*').eq('name',shopName).limit(1).then(function(r){show((r.data&&r.data[0])||{})}).catch(function(){show({})});
  else show({});};
document.addEventListener('click',function(e){var sl=e.target.closest?e.target.closest('.shopline'):null;if(sl){var b=sl.querySelector('b');if(b)nxStore(b.textContent.trim())}});
var SR=window.SpeechRecognition||window.webkitSpeechRecognition;
var recog=null,listening=false;
function voiceLang(){return LAN==='ur'?'ur-PK':'en-US'}
window.nxTalk=function(){if(!SR){toast('Voice not supported in this browser','err');return}
 if(listening){recog.stop();return}
 recog=new SR();recog.lang=voiceLang();recog.interimResults=false;
 listening=true;var m=document.getElementById('nxMic');if(m)m.textContent='🔴';
 toast(LAN==='ur'?'🎙 سن رہا ہوں…':'🎙 Sun raha hoon… listening','info');
 recog.onresult=function(ev){listening=false;if(m)m.textContent='🎙';nxAiSend(ev.results[0][0].transcript)};
 recog.onerror=function(){listening=false;if(m)m.textContent='🎙';toast('Voice error — type instead','err')};
 recog.onend=function(){listening=false;if(m)m.textContent='🎙'};
 recog.start()};
window.nxSpeak=function(text){if(!LS.get('nx_voice',true)||!window.speechSynthesis)return;try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(text);u.lang=voiceLang();u.rate=1.02;speechSynthesis.speak(u)}catch(e){}};
var _ao5=window.nxAiOpen;
window.nxAiOpen=function(){_ao5();var row=document.getElementById('nxAiIn');if(row&&!document.getElementById('nxMic'))row.insertAdjacentHTML('afterbegin','<button id="nxMic" style="width:52px;border-radius:14px;background:var(--glass);border:1px solid var(--border);font-size:20px;cursor:pointer" onclick="nxTalk()">🎙</button>')};
var _ad5=nxAiAdd;
nxAiAdd=function(who,text,ids){var d=_ad5(who,text,ids);if(who==='ai'&&text&&text!=='…')nxSpeak(text);return d};
})();
