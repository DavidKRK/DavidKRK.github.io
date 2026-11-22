# 🎵 David KRK - Official Website

[![Deploy Status](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/deploy.yml)
[![Security](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/security.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/security.yml)
[![Lighthouse CI](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/lighthouse.yml)
[![Uptime Monitor](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/uptime.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/uptime.yml)
[![Images](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/images.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/images.yml)
[![Music Social](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/music-social.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/music-social.yml)
[![YouTube Sync](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/youtube-sync.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/youtube-sync.yml)
[![Maintenance](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/maintenance.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/maintenance.yml)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fwww.davidkrk.com&label=davidkrk.com)
![GitHub last commit](https://img.shields.io/github/last-commit/DavidKRK/DavidKRK.github.io)

## 🔥 DJ & Producer since 1999

Official website of **David KRK**, DJ and music producer based in Saint-Jean-de-Luz, France.

🎧 **Visit** : [www.davidkrk.com](https://www.davidkrk.com)

### ✨ Features

- 🎵 Custom audio player with waveform visualization
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Performance optimized (Lighthouse tested daily)
- 🔄 Continuous deployment
- 🛡️ Automated testing & security audits
- 💾 Weekly automated backups
- 📱 Social media auto-detection for new tracks

### 🤖 Active Automations

#### Daily (3 AM)
- **Performance Audits** : Lighthouse tests for speed, accessibility, SEO
- **Automated Reports** : Performance badges and issue creation if scores drop

#### Daily (10 AM)
- **YouTube Video Sync** : Fetches latest videos from YouTube API and updates music.html automatically

#### Weekly (Monday 10 AM)
- **Dependency Updates** : Automatic npm package updates via Pull Request
- **Link Checking** : Broken link detection and automated issue creation
- **Security Patches** : Automatic vulnerability fixes

#### Weekly (Sunday 1 AM)
- **Full Site Backup** : Complete archive stored in GitHub Releases
- **Version History** : Last 8 weeks kept for easy recovery

#### On Every Commit
- **Instant Deployment** : Automatic site deployment to GitHub Pages
- **Image Optimization** : Automatic compression of new images (85% quality)
- **New Music Detection** : Auto-generates social media posts when music.html is updated

### 🛠️ Tech Stack

- HTML5 / CSS3 / JavaScript
- GitHub Pages (Hosting)
- GitHub Actions (CI/CD Automation)
- NPM Build Tools (csso, terser)
- Lighthouse CI (Performance Testing)
- Service Worker (PWA ready)
- Rsync (Backup System)

### 📊 Performance

This website is continuously monitored for:
- ⚡ Page Speed
- ♿ Accessibility
- 🎯 SEO Optimization
- 💡 Best Practices

### 📦 Workflows Overview

| Workflow | Purpose | Schedule | Status |
|----------|---------|----------|--------|
| **deploy.yml** | Main site deployment | On push | [![Deploy](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/deploy.yml) |
| **security.yml** | CodeQL + Gitleaks security scan | On PR / push / Monday | [![Security](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/security.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/security.yml) |
| **lighthouse.yml** | Performance & SEO audit (fail < 60/85) | On PR / Daily 2 AM | [![Lighthouse CI](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/lighthouse.yml) |
| **uptime.yml** | HTTP uptime monitoring + issue alerts | Every 30 min | [![Uptime](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/uptime.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/uptime.yml) |
| **images.yml** | Auto image compression (JPEG/PNG/WebP) | On image push | [![Images](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/images.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/images.yml) |
| **music-social.yml** | New music detection + social post template | On music.html change | [![Music Social](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/music-social.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/music-social.yml) |
| **youtube-sync.yml** | YouTube video sync + music.html update | Daily 10 AM / On demand | [![YouTube Sync](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/youtube-sync.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/youtube-sync.yml) |
| **maintenance.yml** | Lychee link check + backup + stale issues | Mon 8 AM / Sun 1 AM | [![Maintenance](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/maintenance.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/maintenance.yml) |

### Contrôle des liens et retrait de Checklinks

Chaque PR exécute Lychee 0.24.2 **hors réseau**, sur tous les fichiers HTML et CSS suivis par Git, avec `.lychee-local.toml`. Le binaire Linux est téléchargé depuis la release officielle et vérifié par SHA-256 ; le contrôle échoue si un lien local vérifié est invalide. Pour le reproduire depuis la racine avec cette version de Lychee déjà installée :

```bash
mapfile -d '' -t files < <(git ls-files -z -- '*.html' '*.css')
lychee --config .lychee-local.toml --root-dir "$PWD" --no-progress -- "${files[@]}"
```

Les chemins relatifs et racine sont résolus sur le dépôt ; les liens sans extension essaient `.html` et les répertoires `index.html`. Les fragments d'ancre des fichiers locaux sont vérifiés. Les références que Lychee extrait des HTML et CSS, notamment les images, sont contrôlées, mais ce n'est pas une exploration complète du graphe d'assets de Checklinks : les références produites par JavaScript, les ressources non extraites et les pages générées au déploiement ne sont pas garanties.

Contrairement à Checklinks sur Netlify, ce contrôle PR ne vérifie ni les liens externes, ni leurs redirections ou chaînes de redirections, ni les avertissements de contenu mixte HTTP/HTTPS. Il ne vérifie pas non plus les redirections ou règles propres à Netlify. Les liens externes restent surveillés séparément par la maintenance hebdomadaire existante, avec ses exclusions et ses limites réseau (blocages anti-robots, 403, 429, délais) ; un échec réseau ne prouve pas nécessairement qu'un lien est cassé. La configuration hebdomadaire `.lychee.toml` exclut `file://` et ne doit pas servir au contrôle local.

Checklinks a été retiré du manifeste npm et de `netlify.toml`. **Si le plugin est installé dans l'interface Netlify, un administrateur doit aussi le désinstaller manuellement dans cette interface** ; le dépôt ne peut pas le désactiver à distance. Une réinstallation dans l'interface peut le réactiver et réintroduire le risque côté build Netlify.

Le 22 novembre 2026, le registre npm indiquait `netlify-plugin-checklinks` 4.1.1 comme dernière version publiée (publication le 21 mai 2020). Sa dépendance `hyperlink` 4.7.0 utilise notamment `request` 2.88.2, abandonné et sans correctif indiqué pour [CVE-2023-28155](https://github.com/advisories/GHSA-p8p7-x288-28g6). Dans le lockfile initial, `request` entraînait `form-data` 2.3.3, `qs` 6.5.5, `tough-cookie` 2.5.0 et `uuid` 3.4.0 ; `assetgraph` 7.13.0 → `teepee` 2.31.2 entraînait aussi `form-data` 2.1.4, et `jsdom` 16.7.0 → `http-proxy-agent` 4.0.1 entraînait `@tootallnate/once` 1.1.2. Les correctifs publiés pour les avis transmis commencent à :

- `form-data` 2.5.4 pour [CVE-2025-7783](https://github.com/advisories/GHSA-fjxv-7rqg-78g4), puis 2.5.6 pour [CVE-2026-12143](https://github.com/advisories/GHSA-hmw2-7cc7-3qxx).
- `uuid` 11.1.1 pour [CVE-2026-41907](https://github.com/advisories/GHSA-w5hq-g745-h8pq), `@tootallnate/once` 2.0.1 pour [CVE-2026-3449](https://github.com/advisories/GHSA-vpq2-c234-7xj6), `qs` 6.14.1 pour [CVE-2025-15284](https://github.com/advisories/GHSA-6rw7-vpxm-498p) et `tough-cookie` 4.1.3 pour [CVE-2023-26136](https://github.com/advisories/GHSA-72xf-g2v4-qvf3).

Ces correctifs ne rendent pas automatiquement compatibles les contraintes de `request` ou de `teepee` ; aucune nouvelle version du plugin ne supprime cet arbre. Le remplacement supprime ces dépendances du lockfile du site, mais ne garantit pas la fermeture des alertes Dependabot avant fusion et nouvelle analyse GitHub.

### 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/DavidKRK/DavidKRK.github.io
cd DavidKRK.github.io

# Install dependencies
npm ci

# Build optimized assets
npm run build

# Deploy (automatic on push to gh-pages)
git push origin gh-pages
```

### 📝 License

All rights reserved © 2026 David KRK

" MAY THE TECHNO BE WITH YOU "
David KRK 

---

**© 2026 David KRK** | Spinning since September 1999 🎧
