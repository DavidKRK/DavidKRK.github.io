// Mesure d'audience anonyme (sans cookie) - envoie une page vue vers l'API de tracking
(function () {
  if (navigator.doNotTrack === '1' || location.protocol === 'file:') return;
  if (/^(localhost|127\.)/.test(location.hostname)) return;
  var endpoint = window.DAVIDKRK_TRACK_ENDPOINT || 'https://whimsical-kitsune-85066d.netlify.app/api/track';

  var payload = JSON.stringify({
    path: location.pathname,
    referrer: document.referrer,
    language: navigator.language
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([payload], { type: 'text/plain' }));
  } else {
    fetch(endpoint, { method: 'POST', body: payload, keepalive: true, headers: { 'content-type': 'text/plain' } }).catch(function () {});
  }
})();
