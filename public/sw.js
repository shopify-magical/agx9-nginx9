// Progressive Web App Service Worker with Demo Backend Integration
const CACHE_NAME = 'architect-mobile-v1';
const STATIC_CACHE = 'architect-static-v1';

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/demo-backend.js',
  '/src/main.ts',
  '/src/App.vue',
  '/src/components/MobileArchitectChat.vue',
  '/src/styles/mobile.css',
  '/src/styles/chat.css'
];

// Install event - cache static files and register demo backend
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installing...');

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('✅ Service Worker: Static files cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Failed to cache static files', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activating...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== CACHE_NAME) {
              console.log('🗑️ Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline and handle demo backend
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests for demo backend
  if (request.method !== 'GET') {
    // Handle demo backend API calls
    if (url.pathname.startsWith('/api/')) {
      event.respondWith(handleDemoBackend(request));
      return;
    }
    return;
  }

  // Skip external requests (API calls, CDN, etc.)
  if (url.origin !== self.location.origin) {
    // For API calls, try network first, then return offline message
    if (url.pathname.includes('/api/') || url.hostname.includes('workers.dev')) {
      event.respondWith(
        fetch(request)
          .catch(() => {
            return new Response(
              JSON.stringify({
                error: 'Offline - Please check your internet connection',
                offline: true,
                timestamp: new Date().toISOString()
              }),
              {
                status: 503,
                statusText: 'Service Unavailable',
                headers: {
                  'Content-Type': 'application/json',
                  'Cache-Control': 'no-cache'
                }
              }
            );
          })
      );
      return;
    }

    // For other external requests, try network only
    return;
  }

  // For static files, use cache-first strategy
  event.respondWith(
    caches.match(request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          console.log('📋 Service Worker: Serving from cache', request.url);
          return response;
        }

        // Otherwise, fetch from network
        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200) {
              return response;
            }

            // Clone response since it can only be used once
            const responseClone = response.clone();

            // Cache the response for future use
            caches.open(STATIC_CACHE)
              .then((cache) => {
                console.log('💾 Service Worker: Caching new resource', request.url);
                cache.put(request, responseClone);
              })
              .catch((error) => {
                console.error('❌ Service Worker: Failed to cache resource', error);
              });

            return response;
          })
          .catch(() => {
            // If network fails and no cache, return offline page
            console.log('📵 Service Worker: Network failed, serving offline page');

            // Return a basic offline page for HTML requests
            if (request.headers.get('accept')?.includes('text/html')) {
              return new Response(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Offline - @Architect</title>
                  <style>
                    body {
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                      margin: 0;
                      padding: 20px;
                      background: #f8fafc;
                      color: #1e293b;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      min-height: 100vh;
                      text-align: center;
                    }
                    .offline-container {
                      max-width: 400px;
                    }
                    .offline-icon {
                      font-size: 4rem;
                      margin-bottom: 1rem;
                    }
                    h1 {
                      font-size: 1.5rem;
                      margin-bottom: 1rem;
                    }
                    p {
                      color: #64748b;
                      line-height: 1.6;
                      margin-bottom: 2rem;
                    }
                    .retry-btn {
                      background: #3b82f6;
                      color: white;
                      border: none;
                      padding: 12px 24px;
                      border-radius: 8px;
                      font-size: 16px;
                      cursor: pointer;
                      min-height: 44px;
                    }
                    .retry-btn:hover {
                      background: #2563eb;
                    }
                  </style>
                </head>
                <body>
                  <div class="offline-container">
                    <div class="offline-icon">📵</div>
                    <h1>You're Offline</h1>
                    <p>@Architect is currently offline. Please check your internet connection and try again.</p>
                    <button class="retry-btn" onclick="window.location.reload()">
                      Retry Connection
                    </button>
                  </div>
                </body>
                </html>
              `, {
                status: 200,
                statusText: 'OK',
                headers: {
                  'Content-Type': 'text/html',
                  'Cache-Control': 'no-cache'
                }
              });
            }

            // For other requests, return a basic error
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Handle demo backend API calls
async function handleDemoBackend(request) {
  try {
    // Import and use the demo backend logic
    const demoBackendCode = await fetch('/demo-backend.js').then(r => r.text());

    // Create a simple demo response
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === '/api/tts' && request.method === 'POST') {
      // Simulate TTS
      await new Promise(resolve => setTimeout(resolve, 500));
      return new Response(new Uint8Array([0xFF, 0xFB, 0x90, 0x00]), {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=3600',
          ...corsHeaders
        }
      });
    }

    if (url.pathname === '/api/chat' && request.method === 'POST') {
      // Simulate AI chat
      const body = await request.json();
      const userMessage = body.messages[body.messages.length - 1]?.content || '';

      await new Promise(resolve => setTimeout(resolve, 800));

      const response = `# @Architect Response

I understand you're asking about: "${userMessage.substring(0, 100)}${userMessage.length > 100 ? '...' : ''}"

## 🏗️ Architectural Guidance

Since this is a demo backend, I'll provide some general architectural advice:

### Key Considerations
- **Site Analysis**: Always start with understanding your location, climate, and zoning
- **Functionality**: Design spaces that work for how you'll actually use them
- **Sustainability**: Consider energy efficiency and environmental impact
- **Budget**: Balance your vision with practical financial constraints

### Next Steps
1. **Define Requirements**: What do you actually need in the space?
2. **Research Local Codes**: Check building requirements for your area
3. **Create Preliminary Plans**: Sketch layouts and flow
4. **Consult Professionals**: Architect, engineer, contractor as needed

### Common Questions I Can Help With
- Building materials and construction methods
- Space planning and room layouts
- Building codes and permitting
- Energy efficiency and sustainability
- Cost estimation and budgeting
- Project timelines and phases

## 📞 Note

This is a demo backend running in your service worker. For full AI capabilities, deploy the Cloudflare Workers following the setup instructions.

Would you like me to elaborate on any specific aspect of your architectural project?`;

      return new Response(JSON.stringify({
        response: response,
        model: 'demo-model',
        timestamp: new Date().toISOString(),
        usage: { prompt_tokens: 100, completion_tokens: 200, total_tokens: 300 },
        metadata: { service: 'demo-backend', version: '1.0.0', context: 'architectural-assistant' },
        demo: true
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          ...corsHeaders
        }
      });
    }

    return new Response('Not Found', { status: 404 });
  } catch (error) {
    console.error('Demo backend error:', error);
    return new Response(JSON.stringify({ error: 'Demo backend failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('🔄 Service Worker: Background sync triggered', event.tag);

  if (event.tag === 'background-sync-messages') {
    event.waitUntil(syncOfflineMessages());
  }
});

// Sync offline messages when connection is restored
async function syncOfflineMessages() {
  try {
    // Get offline messages from IndexedDB
    const offlineMessages = await getOfflineMessages();

    // Send each message to the server
    for (const message of offlineMessages) {
      try {
        await fetch('/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(message)
        });

        // Remove from offline storage after successful sync
        await removeOfflineMessage(message.id);
        console.log('✅ Service Worker: Synced message', message.id);
      } catch (error) {
        console.error('❌ Service Worker: Failed to sync message', error);
      }
    }
  } catch (error) {
    console.error('❌ Service Worker: Background sync failed', error);
  }
}

// IndexedDB helpers for offline storage
async function getOfflineMessages() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ArchitectOfflineDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['messages'], 'readonly');
      const store = transaction.objectStore('messages');
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => resolve(getAllRequest.result);
      getAllRequest.onerror = () => reject(getAllRequest.error);
    };

    request.onupgradeneeded = () => {
      const db = request.result;
      db.createObjectStore('messages', { keyPath: 'id' });
    };
  });
}

async function removeOfflineMessage(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ArchitectOfflineDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['messages'], 'readwrite');
      const store = transaction.objectStore('messages');
      const deleteRequest = store.delete(id);

      deleteRequest.onsuccess = () => resolve(deleteRequest.result);
      deleteRequest.onerror = () => reject(deleteRequest.error);
    };
  });
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('📢 Service Worker: Push notification received');

  const options = {
    body: 'You have a new message from @Architect',
    icon: '/architect-icon.png',
    badge: '/architect-badge.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open Chat',
        icon: '/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('@Architect', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('👆 Service Worker: Notification click received');

  event.notification.close();

  if (event.action === 'explore') {
    // Open the app to the chat screen
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Just close the notification
    event.notification.close();
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Performance monitoring
self.addEventListener('fetch', (event) => {
  const start = performance.now();

  event.respondWith(
    (async () => {
      try {
        const response = await fetch(event.request);
        const end = performance.now();
        const duration = end - start;

        // Log slow requests
        if (duration > 3000) {
          console.warn('⚠️ Service Worker: Slow request detected', {
            url: event.request.url,
            duration: `${duration.toFixed(2)}ms`
          });
        }

        return response;
      } catch (error) {
        const end = performance.now();
        const duration = end - start;

        console.error('❌ Service Worker: Request failed', {
          url: event.request.url,
          duration: `${duration.toFixed(2)}ms`,
          error: error.message
        });

        throw error;
      }
    })()
  );
});

// Cache cleanup on storage pressure
self.addEventListener('quotaexceeded', (event) => {
  console.log('💾 Service Worker: Storage quota exceeded, cleaning up cache');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE) {
              console.log('🗑️ Service Worker: Deleting cache to free space', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});
