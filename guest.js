/* ===== GUEST CHECKOUT · sin pared de login para compradores ===== */
function addCart(id){var p=PRODS.find(function(x){return x.id===id});if(!p)return;
 if(p.demo){toast('DEMO item — cannot add to cart','info');return}
 var c=cart(),f=c.find(function(x){return x.i===id});
 if(f)f.q++;else c.push({i:id,q:1,name:p.name,price:p.price,img:p.img,wa:p.wa,shopName:p.shopName});
 saveCart(c);toast('✓ '+t('add'),'ok');render();}
function go(v){VIEW=v;CUR=null;render();window.scrollTo(0,0);
 document.querySelectorAll('#nav button').forEach(function(b){b.classList.toggle('on',b.dataset.v===v)});}
function addCur(){var p=PRODS.find(function(x){return x.id===CUR});if(!p)return;
 var c=cart(),f=c.find(function(x){return x.i===CUR});
 if(f)f.q+=QTY;else c.push({i:CUR,q:QTY,name:p.name,price:p.price,img:p.img,wa:p.wa,shopName:p.shopName});
 saveCart(c);toast('✓ '+t('add'),'ok');go('cart');}
function guest(){return LS.get('nx_guest',null)}
function saveGuest(g){LS.set('nx_guest',g)}
window.nxGuestForm=function(after){var g=guest();var o=document.getElementById('nxGroup');o.hidden=false;
 o.innerHTML='<div class="card"><button class="btn ghost" style="width:auto;padding:9px 14px;margin:0 0 10px" onclick="nxClose()">← Back</button>'+
 '<h2 class="t">📬 Delivery details</h2><p style="font-size:12px;color:var(--muted);margin-bottom:10px">No account needed. The seller uses this to deliver your COD order.</p>'+
 '<div class="lbl">Full name</div><input class="f" id="gN" value="'+(g&&g.name?esc(g.name):'')+'" placeholder="Ali Raza">'+
 '<div class="lbl">WhatsApp</div><input class="f" id="gP" type="tel" value="'+(g&&g.phone?esc(g.phone):'')+'" placeholder="+92 3XX XXXXXXX">'+
 '<div class="lbl">City</div><input class="f" id="gC" value="'+(g&&g.city?esc(g.city):'')+'" placeholder="Lahore">'+
 '<button class="btn" onclick="nxGuestSave()">Continue →</button></div>';
 window._gAfter=after;};
window.nxGuestSave=function(){var n=document.getElementById('gN').value.trim(),p=document.getElementById('gP').value.trim(),c=document.getElementById('gC').value.trim();
 if(!n||p.replace(/\D/g,'').length<10){toast('Name + valid WhatsApp required','err');return}
 saveGuest({name:n,phone:p,city:c});document.getElementById('nxGroup').hidden=true;
 if(window._gAfter)window._gAfter();};
function whoLine(){var g=guest();return (BUYER&&BUYER.email?BUYER.email+' / ':'')+(g?g.name+' · '+g.phone:'guest')}
window.waOne=function(p){function send(){var g=guest();
  var wa=String((p.wa)||WA_DEFAULT).replace(/\D/g,'');var shopName=p.shopName||'Seller';
  var msg=(LAN==='ur'?'السلام علیکم ':'Assalam o Alaikum ')+shopName+'! I want to order from NexusShop:\n• '+p.name+' x'+QTY+' — '+money(p.price*QTY)+
   '\n👤 '+whoLine()+(g&&g.city?' · '+g.city:'')+'\n💵 Cash on Delivery'+
   (window.NXCOURIER&&window.NXCOURIER!=='Seller arranges'?'\n🚚 Courier: '+window.NXCOURIER:'');
  window.open('https://wa.me/'+wa+'?text='+encodeURIComponent(msg),'_blank');
  markOrdered([p.id]);toast('✓ Order sent','ok');}
 if(!guest())nxGuestForm(send);else send();};
window.waCart=function(){function send(){var c=cart().filter(function(x){return !x.demo});if(!c.length)return;
  var g=guest();var first=c[0];var wa=(first&&first.wa)||WA_DEFAULT;var shopName=(first&&first.shopName)||'Seller';
  var msg='Assalam o Alaikum '+shopName+'! I want to order from NexusShop:\n'+
   c.map(function(x){return '• '+x.name+' x'+x.q+' — '+money(x.price*x.q)}).join('\n')+
   '\nTotal: '+money(c.reduce(function(s,x){return s+x.price*x.q},0))+' (COD)'+
   '\n👤 '+whoLine()+(g&&g.city?' · '+g.city:'')+
   (window.NXCOURIER&&window.NXCOURIER!=='Seller arranges'?'\n🚚 Courier: '+window.NXCOURIER:'');
  window.open('https://wa.me/'+wa+'?text='+encodeURIComponent(msg),'_blank');
  markOrdered(c.map(function(x){return x.i}));saveCart([]);toast('✓ Order sent — saved for reorder','ok');render();}
 if(!guest())nxGuestForm(send);else send();};
function vCart(){var c=cart().filter(function(x){return !x.demo});
 if(!c.length)return '<div class="card"><h2 class="t">🛒 '+t('cart')+'</h2><div class="empty">'+t('emptyCart')+'</div></div>';
 var tot=c.reduce(function(s,x){return s+x.price*x.q},0);
 var first=c[0];var shopLine=first&&first.shopName?'<div class="shopline">🏪 Ordering from <b>'+esc(first.shopName)+'</b></div>':'';
 return '<div class="card"><h2 class="t">🛒 '+t('cart')+'</h2>'+shopLine+
 c.map(function(x){return '<div class="row">'+(x.img?'<img src="'+esc(x.img)+'" onerror="this.outerHTML=\'<div style=&quot;font-size:30px&quot;>🛍️</div>\'">':'<div style="font-size:30px">🛍️</div>')+
 '<div class="inf"><div class="nm">'+esc(x.name)+'</div><div class="pr">'+money(x.price*x.q)+'</div></div>'+
 '<div class="q"><button onclick="setQ(\''+x.i+'\',-1)">−</button><span>'+x.q+'</span><button onclick="setQ(\''+x.i+'\',1)">+</button></div></div>'}).join('')+
 '<div class="tot"><span>'+t('total')+'</span><b>'+money(tot)+'</b></div>'+
 (typeof nxCourierBox==='function'?nxCourierBox():'')+
 '<button class="btn wa" style="margin-top:12px" onclick="waCart()">💬 '+t('orderWA')+'</button></div>';}
function userTap(){var g=guest();var o=document.getElementById('nxGroup');o.hidden=false;
 o.innerHTML='<div class="card"><button class="btn ghost" style="width:auto;padding:9px 14px;margin:0 0 10px" onclick="nxClose()">← Back</button>'+
 '<h2 class="t">👤 Profile</h2>'+
 (g?'<div class="shopline">📬 <b>'+esc(g.name)+'</b> · '+esc(g.phone)+(g.city?' · '+esc(g.city):'')+'</div><button class="btn" onclick="nxGuestEdit()">✏️ Edit delivery details</button>'
   :'<p style="color:var(--muted);font-size:13px;line-height:1.6">You are shopping as a guest — no account needed. Add your delivery details so sellers can reach you for COD orders.</p><button class="btn" onclick="nxGuestEdit()">📬 Add delivery details</button>')+
 (BUYER?'<div class="shopline" style="margin-top:10px">✅ '+esc(BUYER.email)+'</div><button class="btn ghost" onclick="nxLogout()">Log out</button>'
   :'<button class="btn ghost" style="margin-top:10px" onclick="nxEmailLogin()">Optional: sign in with email</button>')+
 '</div>';}
window.nxGuestEdit=function(){nxGuestForm(function(){userTap()})};
window.nxLogout=function(){BUYER=null;LS.set('nx_buyer',null);document.getElementById('userB').textContent='👤';nxClose();toast('Logged out','info');render()};
window.nxEmailLogin=function(){nxClose();go('login')};
