// 🧹 [캐시 청소 및 무력화 버전] Service Worker Purger
// 브라우저의 강력한 PWA 고착 캐시를 완전히 청소하고 최신 원본 서버 파일을 강제 로드하기 위한 퍼지 SW입니다.

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          console.log('🧹 Purging PWA Cache Key:', key);
          return caches.delete(key);
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// 캐시를 절대 사용하지 않고 100% 원격 서버에서 다이렉트로 fetch하여 리턴
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
