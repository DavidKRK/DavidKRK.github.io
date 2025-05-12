// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run start', // Commande pour démarrer le serveur
    port: 3000,               // Port sur lequel le serveur écoute
    timeout: 120 * 1000,      // Timeout pour le démarrage
    reuseExistingServer: !process.env.CI, // Réutiliser le serveur si déjà démarré
  },
});
