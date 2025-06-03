'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [status, setStatus] = useState('unknown');
  const [message, setMessage] = useState('Connecting...');
  const [ws, setWs] = useState(null);

  const connect = () => {
    const socket = new WebSocket('ws://localhost:8080');
    setWs(socket);

    socket.onopen = () => {
      setMessage('Connected to WebSocket');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Message from server:', data);
    };

    socket.onclose = () => {
      setMessage('Disconnected.');
      setTimeout(connect, 3000);
    };

    socket.onerror = (e) => {
      console.error('WebSocket error', e);
    };
  };

  useEffect(() => {
    setIsClient(true);

    const updateStatus = () => {
      const online = navigator.onLine;
      setStatus(online ? 'online' : 'offline');
    };

    updateStatus();
    if (navigator.onLine) connect();

    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  if (!isClient) return null;
  if (status === 'offline') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-red-600 text-2xl">
        <h1>Failed to connect to the server.</h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md text-center">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Realtime Connectivity</h1>
        </div>

        <div className="mb-4">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              status === 'online'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {status === 'online' ? 'Online' : ' Offline'}
          </span>
        </div>

        <div className="text-gray-700 text-sm">
          {message}
        </div>
      </div>
    </div>
  );
}
