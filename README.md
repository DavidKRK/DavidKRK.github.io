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
