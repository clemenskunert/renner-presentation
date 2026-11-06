// Service Worker for Louis Renner Masterclass Presentation (Offline PWA)
const CACHE_NAME = 'renner-presentation-v8-offline';

const STATIC_ASSETS = [
  './',
  './index.html',
  './css/fonts.css',
  './css/presentation.css',
  './js/translations.js',
  './js/translations-data.js',
  './js/audio-synth.js',
  './js/timelapse.js',
  './js/history-journey.js',
  './js/transformation-journey.js',
  './js/ffw-history.js',
  './js/felt-anatomy.js',
  './js/weickert-rem-zoom.js',
  './js/hammer-weight-balance.js',
  './js/yamaha-kit.js',
  './js/yamaha-kit-acoustic.js',
  './js/piano-tone-a1.js',
  './js/hammer-spring.js',
  './js/crown-string-alignment.js',
  './js/voicing-zones.js',
  './js/felt-lacquer-hardening.js',
  './js/presentation.js',
  './manifest.json',
  './Visuell/web_assets/renner_logo_weiss_schatten.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => (key !== CACHE_NAME ? caches.delete(key) : null)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // Never intercept HTTP 206 Range / video stream requests so Safari/Chrome MP4 seeking stays native
  if (event.request.headers.has('range') || /\.(mp4|webm|mov)(\?|$)/i.test(event.request.url)) {
    return;
  }

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
      .catch(() =>
        caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') return caches.match('./index.html');
        })
      )
  );
});
