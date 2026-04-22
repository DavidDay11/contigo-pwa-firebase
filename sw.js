// ─── Contigo PWA — Service Worker ─────────────────────────────────
const CACHE_NAME = 'contigo-v2';
const FONTS_CACHE = 'contigo-fonts-v1';

const PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable.png',
];

const FONT_ORIGINS = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
];

// ── Install ──────────────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

// ── Activate ─────────────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== FONTS_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch ────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Fonts → Cache first (long-lived)
  if (FONT_ORIGINS.some(o => request.url.startsWith(o))) {
    event.respondWith(cacheFirst(request, FONTS_CACHE));
    return;
  }

  // App shell → Network first, fallback to cache
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(request));
    return;
  }

  // External → Stale while revalidate
  event.respondWith(staleWhileRevalidate(request));
});

// ── Push Notifications ────────────────────────────────────────────
self.addEventListener('push', event => {
  let data = { title: '💕 Contigo', body: 'Tenés un nuevo mensaje de amor' };
  try { data = event.data.json(); } catch(e) {}

  event.waitUntil(
    self.registration.showNotification(data.title || '💕 Contigo', {
      body: data.body || '',
      icon: './icons/icon-192.png',
      badge: './icons/icon-192.png',
      vibrate: [200, 100, 200, 100, 200],
      tag: data.tag || 'contigo-msg',
      renotify: true,
      data: data.url || './',
      actions: [
        { action: 'open', title: 'Ver mensaje 💕' },
        { action: 'close', title: 'Cerrar' },
      ],
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'close') return;
  const url = event.notification.data || './';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cls => {
      const focused = cls.find(c => c.url === url && 'focus' in c);
      return focused ? focused.focus() : clients.openWindow(url);
    })
  );
});

// ── Helpers ───────────────────────────────────────────────────────
async function cacheFirst(request, cacheName = CACHE_NAME) {
  const cached = await caches.match(request, { cacheName });
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (e) {
    const cached = await caches.match(request);
    return cached || caches.match('./');
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => cached);
  return cached || fetchPromise;
}
