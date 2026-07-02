const CACHE_NAME = 'chore-rpg-v11'; // 캐시 버전을 v11로 상향하여 리셋 버튼 개행 및 q3 핀 left:60% 버전 배포
const ASSETS = [
  './',
  './index.html',
  './house_map.jpg',
  './character_avatar.jpg',
  './manifest.json'
];

// 설치 이벤트 - 리소스 캐싱
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Service Worker: Caching files');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// 활성화 이벤트 - 구버전 캐시 정리
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 페치 이벤트 - 네트워크 우선 (Network First) 전략
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
