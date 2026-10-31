/* ===== SELLER PROFILE EDITOR (public like MercadoLibre) ===== */
(function(){
document.head.insertAdjacentHTML('beforeend','<style>'+
'.nxpf-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:16px;margin:12px 0}'+
'.nxpf-inp{width:100%;padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:inherit;font-size:14px;margin-bottom:10px;font-family:inherit;box-sizing:border-box}'+
'.nxpf-lbl{font-size:12px;font-weight:700;opacity:.75;margin:8px 0 4px}'+
'.nxpf-btn{width:100%;padding:14px;border:0;border-radius:14px;background:linear-gradient(135deg,#f472b6,#a78bfa,#22d3ee);color:#0b1030;font-weight:800;font-size:15px;cursor:pointer}'+
'</style>');
function boot(){if(!window.SB){setTimeout(boot,700);return}
 SB.auth.getUser().then(function(u){if(!u.user)return;
  SB.from('stores').select('*').eq('owner_id',u.user.id).limit(1).then(function(r){var s=r.data&&r.data[0];if(s)renderEditor(s)})})}
function renderEditor(s){
 if(document.getElementById('nxProfile'))return;
 var div=document.createElement('div');div.className='nxpf-card';div.id='nxProfile';
 div.innerHTML='<h2 style="font-size:16px;font-weight:800;margin-bottom:10px">👤 Seller profile (public)</h2>'+
 '<div class="nxpf-lbl">Your name</div><input class="nxpf-inp" id="pfName" value="'+(s.owner_name||'')+'" placeholder="e.g. Ali Raza">'+
 '<div class="nxpf-lbl">Photo</div>'+(s.owner_photo_url?'<img src="'+s.owner_photo_url+'" style="width:64px;height:64px;border-radius:50%;object-fit:cover;margin-bottom:8px">':'')+'<input type="file" id="pfPhoto" accept="image/*" class="nxpf-inp">'+
 '<div class="nxpf-lbl">Selling since (year)</div><input class="nxpf-inp" id="pfSince" type="number" value="'+(s.since_year||'')+'" placeholder="2021">'+
 '<div class="nxpf-lbl">Your story (why buyers trust you)</div><textarea class="nxpf-inp" id="pfStory" rows="3" placeholder="Family electronics shop in Hall Bazaar since 2015…">'+(s.story||'')+'</textarea>'+
 '<button class="nxpf-btn" onclick="pfSave(\''+s.id+'\')">Save profile →</button>';
 (document.querySelector('main')||document.body).appendChild(div)}
function val(i){var e=document.getElementById(i);return e?e.value.trim():''}
window.pfSave=function(id){
 function fin(url){var up={owner_name:val('pfName'),story:val('pfStory'),since_year:parseInt(val('pfSince'),10)||null};if(url)up.owner_photo_url=url;
  SB.from('stores').update(up).eq('id',id).then(function(r){if(r.error)toast(r.error.message,'err');else toast('✓ Profile saved — buyers will see it','ok')})}
 var f=document.getElementById('pfPhoto').files[0];
 if(f){var path='pf-'+id+'-'+Date.now();
  SB.storage.from('seller-media').upload(path,f,{upsert:true}).then(function(u){if(u.error){toast(u.error.message,'err');fin(null)}else fin(SB.storage.from('seller-media').getPublicUrl(path).data.publicUrl)})}
 else fin(null)};
boot();
})();
/* banner explicativo en el login de vendedores */
(function(){function note(){var pw=document.querySelector('input[type="password"]');
 if(pw&&!document.getElementById('nxSellNote')){(document.querySelector('main')||document.body).insertAdjacentHTML('afterbegin',
 '<div id="nxSellNote" style="padding:12px 14px;border-radius:14px;border:1px solid rgba(34,211,238,.4);background:rgba(34,211,238,.08);color:#a5f3fc;font-size:12.5px;margin:12px 0">🔐 <b>Seller area</b> — the key to your shop. Buyers never see this screen: they shop as guests and order by WhatsApp.</div>');}}
 setTimeout(note,800);setTimeout(note,2500);})();
