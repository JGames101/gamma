caches.delete('jm0201').then(function(boolean) {
  // your cache is now deleted
  console.log("cache jm02 deleted");
});
caches.delete('jm02').then(function(boolean) {
  // your cache is now deleted
  console.log("cache jm02 deleted");
});
caches.delete('jm01441').then(function(boolean) {
  // your cache is now deleted
  console.log("cache jm01441 deleted");
});
caches.delete('jm0144').then(function(boolean) {
  // your cache is now deleted
  console.log("cache jm02 deleted");
});
var CACHE_NAME = 'jm02011';
var urlsToCache = [
  '/index.html',
  '/page/offline.html',
  '/menus/desktop.html',
  '/menus/desktop.css',
  '/menus/mobile.html',
  '/menus/mobile.css',
  '/jquery-3.2.1.min.js',
  '/manifest.json',
  'https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css',
  '/styles.css',
  '/global.js',
  '/updates/',
  '/updates/index.html',
  '/javascript/',
  '/javascript/index.html',
  '/options/',
  '/options/index.html',
  '/html5/',
  '/html5/index.html',
  '/videos/',
  '/videos/index.html',
  '/jquery/',
  '/jquery/index.html',
  '/404.html',
  '/page/404.html',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
