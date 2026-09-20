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

let deferredPrompt;
const installPrompt = document.getElementById('install-prompt');
const installBtn = document.getElementById('install-btn');
const dismissBtn = document.getElementById('dismiss-install');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installPrompt) {
    installPrompt.style.display = 'flex';
  }
});

if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`Installation PWA: ${outcome}`);
    deferredPrompt = null;
    if (installPrompt) {
      installPrompt.style.display = 'none';
    }
  });
}

if (dismissBtn) {
  dismissBtn.addEventListener('click', () => {
    if (installPrompt) {
      installPrompt.style.display = 'none';
    }
  });
}

window.addEventListener('appinstalled', () => {
  console.log('✅ PWA installée avec succès!');
  deferredPrompt = null;
});
