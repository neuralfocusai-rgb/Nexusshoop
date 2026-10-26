const VER = 'nx-v5-20261027';
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
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith((async () => {
    try {
      const net = await fetch(e.request, { cache: 'no-store' });
      try { const c = await caches.open(VER); c.put(e.request, net.clone()); } catch (e2) {}
      return net;
    } catch (err) {
      const c = await caches.open(VER);
      return (await c.match(e.request)) || new Response('Offline', { status: 503 });
    }
  })());
});
