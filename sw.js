// Daemon Manual service worker. Lets the site install as an app and open offline.
// Bump V when you want every device to drop its old cache.
const V = 'daemon-v2';
const CORE = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  // Never cache live data or sign-in
  if (/firestore\.googleapis\.com|identitytoolkit|securetoken|firebaseinstallations|googleapis\.com\/identitytoolkit|accounts\.google\.com|apis\.google\.com/.test(u.href)) return;
  // Pages, network first so a new push shows up right away, cache if offline
  if (r.mode === 'navigate'){
    e.respondWith(fetch(r).then(res => { const copy = res.clone(); caches.open(V).then(c => c.put('./index.html', copy)); return res; }).catch(() => caches.match('./index.html')));
    return;
  }
  // Site files, fonts and the Firebase SDK, serve from cache and refresh in the background
  if (u.origin === self.location.origin || /fonts\.googleapis\.com|fonts\.gstatic\.com|www\.gstatic\.com\/firebasejs|esm\.sh/.test(u.href)){
    e.respondWith(caches.open(V).then(async c => {
      const hit = await c.match(r);
      const net = fetch(r).then(res => { if (res && (res.ok || res.type === 'opaque')) c.put(r, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
  }
});
