var C='nxv2';
self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C;}).map(function(k){return caches.delete(k);}));}).then(function(){return clients.claim();}));});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET'||e.request.url.indexOf(self.location.origin)!==0)return;
if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(function(n){var c=n.clone();caches.open(C).then(function(cc){cc.put(e.request,c);});return n;}).catch(function(){return caches.match(e.request);}));return;}
e.respondWith(caches.open(C).then(function(c){return c.match(e.request).then(function(r){return r||fetch(e.request).then(function(n){c.put(e.request,n.clone());return n;});});}));});
