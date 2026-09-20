const CACHE_NAME = 'davidkrk-v1.0.1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/bio.html',
  '/music.html',
  '/event.html',
  '/contact.html',
  '/shop.html',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/assets/js/audio-player.js',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png',
  '/assets/icons/icon-512-maskable.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((cacheName) => cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request).then((response) => {
      if (!response || response.status !== 200 || response.type === 'opaque') return response;
      const responseClone = response.clone();
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, responseClone).catch((error) => {
          console.warn('Cache put failed:', error);
        });
      });
      return response;
    }).catch(() => caches.match(event.request).then((cached) => cached || caches.match('/index.html')))
  );
});
