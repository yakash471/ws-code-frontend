self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  if (!navigator.onLine) {
    event.respondWith(
      fetch(event.request).catch(() =>
        new Response(`
          <html>
            <body><h1>Failed to connect to the server.</h1></body>
          </html>
        `, {
          headers: { 'Content-Type': 'text/html' }
        })
      )
    );
  }
});
