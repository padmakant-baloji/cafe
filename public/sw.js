// Service Worker for Baloji's Cafe PWA
const CACHE_NAME = 'balojis-cafe-v1'
const urlsToCache = [
  '/',
  '/manifest.json',
  '/logo.png',
  '/browserconfig.xml',
]

// Network-first strategy for API calls, cache-first for static assets
const networkFirst = ['/api/', '/_next/']
const cacheFirst = ['/logo.png', '/manifest.json']

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache)
    })
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  return self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return

  const url = new URL(event.request.url)

  // Network-first strategy for dynamic content
  if (networkFirst.some(path => url.pathname.startsWith(path))) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache)
            })
          }
          return response
        })
        .catch(() => {
          return caches.match(event.request)
        })
    )
    return
  }

  // Cache-first strategy for static assets
  if (cacheFirst.some(path => url.pathname.includes(path))) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache)
            })
          }
          return response
        })
      })
    )
    return
  }

  // Default: network only for external resources (images, etc.)
  // Don't cache external images to prevent memory issues
  if (url.hostname !== self.location.hostname) {
    event.respondWith(fetch(event.request))
    return
  }

  // Default: cache with network fallback (only for same-origin)
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((response) => {
        // Only cache small responses to prevent memory issues
        const contentLength = response.headers.get('content-length')
        if (response && response.status === 200 && response.type === 'basic') {
          // Don't cache if content is too large (> 5MB)
          if (!contentLength || parseInt(contentLength, 10) < 5 * 1024 * 1024) {
            const responseToCache = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache).catch(() => {
                // Silently fail if cache is full
              })
            })
          }
        }
        return response
      })
    })
  )
})
