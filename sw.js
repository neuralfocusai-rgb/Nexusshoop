const VER = 'nx-v4-20261027';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => !k.startsWith(VER)).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith((async () => {
    const c = await caches.open(VER);
    try {
      const net = await fetch(e.request, { cache: 'no-store' });
      c.put(e.request, net.clone());
      return net;
    } catch (err) {
      return (await c.match(e.request)) || new Response('Offline', { status: 503 });
    }
  })());
});
