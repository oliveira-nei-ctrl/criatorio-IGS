const VER = 6;
const CACHE = 'criadouro-v'+VER;
const URLS = ['ovinos.html', 'manifest.json', 'css/style.css', 'js/data.js', 'js/app.js', 'js/dashboard.js', 'js/animais.js', 'js/reproducao.js', 'js/saude.js', 'js/financeiro.js', 'js/lotes.js', 'js/export.js'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(URLS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('message', e => {
  if(e.data&&e.data.action==='skipWaiting') self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => new Response('Offline', { status: 503 })))
  );
});
