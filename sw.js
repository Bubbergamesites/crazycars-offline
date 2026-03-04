const CACHE_NAME = 'crazy-cars-v1';

// These are the core files identified in your HTML
const ASSETS_TO_CACHE = [
  './',
  './index.html',               // Rename your crazycars (1).html to index.html
  './playcanvas-stable.min.js', // PlayCanvas engine
  './settings__.js',            // Game settings
  './modules__.js',             // Game modules
  './start__.js',               // Game entry point
  './patch/poki-sdk.js',// SDK patch
  './manifest.json',             // Web manifest (optional but recommended)
  './loading__.js',
  './styles.css'
];

// Install Event: Cache all the files needed to run the game
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching game assets for offline use');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch Event: Try to serve files from cache first, then the network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});

// Activate Event: Delete old caches if you update the version
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
