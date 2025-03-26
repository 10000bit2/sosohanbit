const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/icon-192.png",
    "/icon-512.png"
];

// 캐시 저장
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

// 캐시에서 파일 불러오기
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// 오래된 캐시 삭제
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => 
            Promise.all(
                cacheNames.filter(name => name !== CACHE_NAME)
                .map(name => caches.delete(name))
            )
        )
    );
});
