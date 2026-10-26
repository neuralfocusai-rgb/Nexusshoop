const VER = 'nx-v3-20261026';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => !k.startsWith(VER)).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const net = await fetch(e.request, { cache: 'no-store' });
        const c = await caches.open(VER + '-pages'); c.put(e.request, net.clone());
        return net;
      } catch (err) {
        return (await caches.match(e.request)) || new Response('Offline', { status: 503 });
      }
    })());
    return;
  }
  if (url.origin === location.origin) {
    e.respondWith((async () => {
      const hit = await caches.match(e.request);
      if (hit) return hit;
      try {
        const net = await fetch(e.request);
        const c = await caches.open(VER + '-assets'); c.put(e.request, net.clone());
        return net;
      } catch (err) { return hit; }
    })());
  }
});
