// Mesure d'audience anonyme (sans cookie) - envoie une page vue à /api/track
(function () {
  if (navigator.doNotTrack === '1' || location.protocol === 'file:') return;
  if (/^(localhost|127\.)/.test(location.hostname)) return;

  var host = location.hostname;
  var endpoint = /(^|\.)netlify\.app$/.test(host) ? '/api/track' : 'https://whimsical-kitsune-85066d.netlify.app/api/track';

  var payload = JSON.stringify({
    path: location.pathname,
    referrer: document.referrer,
    language: navigator.language
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(endpoint, new Blob([payload], { type: 'text/plain' }));
  } else {
    fetch(endpoint, { method: 'POST', body: payload, keepalive: true }).catch(function () {});
  }
})();
