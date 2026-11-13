const CACHE_NAME = "sdet-kannada-v12";
const APP_SHELL = [
  "./", "./index.html", "./manifest.webmanifest", "./icon.svg",
  "./assets/course-logos/tf.svg", "./assets/course-logos/ag.svg", "./assets/course-logos/jv.svg",
  "./assets/course-logos/py.svg", "./assets/course-logos/js.svg", "./assets/course-logos/sq.svg",
  "./assets/course-logos/ds.svg", "./assets/course-logos/lx.svg", "./assets/course-logos/se.svg",
  "./assets/course-logos/pw.svg", "./assets/course-logos/cy.svg", "./assets/course-logos/cb.svg",
  "./assets/course-logos/ap.svg", "./assets/course-logos/ra.svg", "./assets/course-logos/tn.svg",
  "./assets/course-logos/ju.svg", "./assets/course-logos/cu.svg", "./assets/course-logos/mv.svg",
  "./assets/course-logos/je.svg", "./assets/course-logos/gt.svg", "./assets/course-logos/dk.svg",
  "./assets/course-logos/am.svg", "./assets/course-logos/jm.svg", "./assets/course-logos/fw.svg",
  "./assets/course-logos/ip.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((key) => key.startsWith("sdet-kannada-") && key !== CACHE_NAME)
        .map((key) => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
      }
      return response;
    }).catch(() => caches.match(request).then((cached) => cached || caches.match("./index.html")))
  );
});
