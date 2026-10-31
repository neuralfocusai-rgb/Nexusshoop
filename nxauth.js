/* ===== CUENTA REAL DE COMPRADOR (email) + sesión persistente ===== */
(function(){
 function restore(){ensureSB().then(function(s){if(!s)return;s.auth.getUser().then(function(u){if(u.user){BUYER={email:u.user.email};LS.set('nx_buyer',BUYER);var b=document.getElementById('userB');if(b)b.textContent='✅';}});});}
 restore();
 window.doBuyerLogin=function(){var e=(document.getElementById('le').value||'').trim(),p=document.getElementById('lp').value||'';
  if(!e||!p){toast('Email and password required','err');return}
  ensureSB().then(function(s){if(!s){toast('Offline','err');return}
   s.auth.signInWithPassword({email:e,password:p}).then(function(r){
    if(r.error){toast(r.error.message,'err');return}
    BUYER={email:r.data.user.email};LS.set('nx_buyer',BUYER);document.getElementById('userB').textContent='✅';toast('✓ Welcome back','ok');go('home');});});};
 window.doBuyerSignup=function(){var e=(document.getElementById('le').value||'').trim(),p=document.getElementById('lp').value||'';
  if(!e||p.length<6){toast('Email + password (min 6 chars)','err');return}
  ensureSB().then(function(s){if(!s){toast('Offline','err');return}
   s.auth.signUp({email:e,password:p}).then(function(r){
    if(r.error){toast(r.error.message,'err');return}
    if(r.data.session){BUYER={email:r.data.user.email};LS.set('nx_buyer',BUYER);document.getElementById('userB').textContent='✅';toast('✓ Account created — welcome!','ok');go('home');}
    else{toast('Check your email to confirm','info');}});});};
 window.nxLogout=function(){ensureSB().then(function(s){if(s)s.auth.signOut();BUYER=null;LS.set('nx_buyer',null);var b=document.getElementById('userB');if(b)b.textContent='👤';nxClose();toast('Logged out','info');render();});};
 var _lcN=loadCatalog;loadCatalog=async function(){await _lcN();
  try{PRODS.sort(function(a,b){return ((b.shopPlan&&b.shopPlan!=='free')?1:0)-((a.shopPlan&&a.shopPlan!=='free')?1:0);});}catch(e){}
  if(typeof VIEW!=='undefined'&&VIEW==='home')render();};
})();
