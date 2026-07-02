const CACHE_NAME = 'chore-rpg-v2'; // 버전을 v2로 올려 캐시 갱신 유도
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

// 활성화 이벤트 - 구버전 v1 캐시 강제 삭제
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

// 페치 이벤트 - Network First (네트워크 우선) 전략으로 수정 (캐시 고착화 해결)
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // 네트워크 응답이 정상이면 캐시를 최신으로 갱신하고 반환
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // 네트워크 연결 실패 시(오프라인)에만 저장된 캐시 데이터 반환
        return caches.match(event.request);
      })
  );
});
