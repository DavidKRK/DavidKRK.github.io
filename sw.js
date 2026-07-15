const CACHE_NAME = 'davidkrk-v1.1.0';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/bio.html',
  '/music.html',
  '/event.html',
  '/contact.html',
  '/shop.html',
  '/assets/css/style.css',
  '/assets/js/main.js',
  '/logo-30-01-25.png',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Same-origin resources: cache-first
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((response) => {
          const clone = response.clone();
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
            return response;
          });
        });
      })
    );
    return;
  }

  // Third-party resources (fonts, CDN): network-only, no caching
  event.respondWith(fetch(event.request));
});
