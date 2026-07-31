const CACHE_NAME = 'davidkrk-v1.0.0';
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
  '/logo-30-01-25.png',
  '/manifest.json'
  // Note: Removed cross-origin URLs (fonts.googleapis, cdnjs) - they will be cached at runtime
  // This avoids install failures and prevents caching opaque responses
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Cache ouvert');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Suppression ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Validate response before caching
        if (!response || response.status !== 200 || response.type === 'opaque') {
          // Don't cache non-200 responses or opaque cross-origin responses
          return response;
        }

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone).catch((err) => {
            console.warn('⚠️ Cache put failed:', err);
          });
        });
        return response;
      })
      .catch(() => {
        // Offline fallback: try to serve from cache
        return caches.match(event.request)
          .then((cached) => cached || caches.match('/index.html'));
      })
  );
});
