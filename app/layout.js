'use client';

import { useEffect } from 'react';

export default function RootLayout({ children }) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker registered'));
    }
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
