// Service Worker for Louis Renner Masterclass Presentation (Offline PWA)
const CACHE_NAME = 'renner-presentation-v3';

const STATIC_ASSETS = [
  './',
  './index.html',
  './css/presentation.css',
  './js/translations.js',
  './js/translations-data.js',
  './js/audio-synth.js',
  './js/timelapse.js',
  './js/history-journey.js',
  './js/transformation-journey.js',
  './js/ffw-history.js',
  './js/presentation.js',
  './manifest.json',
  './Visuell/web_assets/renner_logo_weiss_schatten.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  // Network-First strategy: always fetch fresh from server, fallback to cache if offline
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
