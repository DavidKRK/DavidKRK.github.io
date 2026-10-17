// Mesure d'audience anonyme (sans cookie) - envoie une page vue à /api/track
(function () {
  if (navigator.doNotTrack === '1' || location.protocol === 'file:') return;
  if (/^(localhost|127\.)/.test(location.hostname)) return;

  var payload = JSON.stringify({
    path: location.pathname,
    referrer: document.referrer,
    language: navigator.language
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/track', new Blob([payload], { type: 'text/plain' }));
  } else {
    fetch('/api/track', { method: 'POST', body: payload, keepalive: true }).catch(function () {});
  }
})();
