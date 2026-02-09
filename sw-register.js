if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('✅ Service Worker enregistré:', registration.scope);
      })
      .catch(error => {
        console.log('❌ Erreur Service Worker:', error);
      });
  });
}

// Gestion installation PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Tu peux ajouter un banner d'install ici si tu veux
});

window.addEventListener('appinstalled', () => {
  console.log('✅ PWA installée!');
  deferredPrompt = null;
});
