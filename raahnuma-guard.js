window.NX_AI_ENDPOINT = (typeof NX_AI_ENDPOINT!=='undefined' && NX_AI_ENDPOINT) ? NX_AI_ENDPOINT : 'https://nexusshoop.vercel.app/api/raahnuma';
function nxLocal2(text){
  var q=String(text).toLowerCase().trim();
  if(/who are you|quien eres|quién eres|qué eres|que eres|quien te cre|quién te cre|who made you|who created you|tu nombre/.test(q)){
    return {reply:'I am Raahnuma ✨ — the Urdu-first shopping guide of NexusShop, built by Lucas (Argentina) together with Talal (Lahore). I help you find products, explain Committee Buy groups, and guide your COD order to the seller\'s WhatsApp.',picks:[]};
  }
  if(/^(hola|hello|hi |hi$|salam|assalam|aoa|salaam)/.test(q)){
    return {reply:'Assalam-o-Alaikum! 👋 Tell me what you need — a budget, an occasion, a product — and I\'ll find it in our catalog.',picks:[]};
  }
  if(/gracias|thank you|shukriya/.test(q)){
    return {reply:'You\'re welcome! 🌟 Anything else I can help you find today?',picks:[]};
  }
  var budget=(q.match(/(\d[\d,]{2,})/)||[])[1]; budget=budget?parseInt(budget.replace(/,/g,'')):null;
  var tokens=q.split(/[^a-z0-9\u0600-\u06FF]+/).filter(function(w){return w.length>1});
  var scored=PRODS.filter(function(p){return !p.demo}).map(function(p){
    var hay=(p.name+' '+(p.desc||'')).toLowerCase(); var s=0;
    tokens.forEach(function(w){ if(hay.indexOf(w)>-1) s++; });
    if(budget&&p.price<=budget)s+=1; return {p:p,s:s};
  }).sort(function(a,b){return b.s-a.s});
  var picks=scored.filter(function(x){return x.s>0}).slice(0,4).map(function(x){return x.p.id});
  if(picks.length) return {reply:'Here\'s what I found for you:',picks:picks};
  return {reply:'I didn\'t find that yet — our sellers are onboarding this week. Try: "bluetooth speaker", "gift under 2000", "sasta TV", or ask me about Committee Buy 👥.',picks:[]};
}
window.nxAiSend=function(text){
  text=(text||'').trim(); if(!text)return;
  var inp=document.getElementById('nxAiQ'); if(inp)inp.value='';
  nxAiAdd('me',text);
  var ty=nxAiAdd('ai','…');
  var settled=false;
  function finish(reply,ids){ if(settled)return; settled=true; try{ty.remove()}catch(e){} nxAiAdd('ai',reply,ids); }
  setTimeout(function(){ if(!settled){ var r=nxLocal2(text); finish(r.reply,r.picks); } },12000);
  var snap=nxSnap();
  var SYS='You are Raahnuma, the friendly shopping guide of NexusShop (Pakistan marketplace, COD cash-on-delivery, WhatsApp checkout, Committee Buy group discounts). Answer in the user\'s language (Urdu if Urdu, English otherwise; understand Roman Urdu and Spanish too). Recommend ONLY product ids present in CATALOG. Reply with ONLY valid JSON: {"reply":string,"products":[id strings, max 4]}. If nothing matches, say so kindly and suggest closest alternatives. Be warm, brief, useful.';
  try{
    fetch(NX_AI_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({systemInstruction:{parts:[{text:SYS}]},contents:[{role:'user',parts:[{text:text+'\nCATALOG: '+JSON.stringify(snap)}]}],generationConfig:{temperature:0.4}})})
    .then(function(r){ if(!r.ok) throw new Error('http '+r.status); return r.json(); })
    .then(function(j){ var t=((j.candidates&&j.candidates[0]&&j.candidates[0].content&&j.candidates[0].content.parts&&j.candidates[0].content.parts[0]&&j.candidates[0].content.parts[0].text)||'');
      var clean=String(t).replace(/```json|```/g,'').trim(); var o=null;
      try{o=JSON.parse(clean)}catch(e){ var m2=clean.match(/\{[\s\S]*\}/); if(m2){try{o=JSON.parse(m2[0])}catch(e2){}} }
      if(o&&o.reply){ finish(o.reply, o.products||[]); } else if(t){ finish(t, []); } else { var r2=nxLocal2(text); finish(r2.reply,r2.picks); } })
    .catch(function(){ var r2=nxLocal2(text); finish(r2.reply,r2.picks); });
  }catch(e){ var r3=nxLocal2(text); finish(r3.reply,r3.picks); }
};
