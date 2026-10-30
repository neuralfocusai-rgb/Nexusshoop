export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='POST') return res.status(405).json({error:'method not allowed'});
  const key = process.env.GEMINI_KEY;
  if(!key) return res.status(500).json({error:'GEMINI_KEY not configured'});
  try{
    const up = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key='+key, {
      method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(req.body)
    });
    res.status(up.status).json(await up.json());
  }catch(e){ res.status(502).json({error:'upstream failed'}); }
}
