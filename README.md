# 🎵 David KRK - Official Website

[![Deploy Status](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/deploy.yml)
[![Lighthouse Audit](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/lighthouse-audit.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/lighthouse-audit.yml)
[![Automation Suite](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/automation-suite.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/automation-suite.yml)
[![Weekly Backup](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/backup.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/backup.yml)
[![Social Media](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/social-media-post.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/social-media-post.yml)
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
| **lighthouse-audit.yml** | Performance testing | Daily 3 AM | [![Lighthouse](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/lighthouse-audit.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/lighthouse-audit.yml) |
| **automation-suite.yml** | Maintenance & updates | Monday 10 AM | [![Automation](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/automation-suite.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/automation-suite.yml) |
| **backup.yml** | Weekly backups | Sunday 1 AM | [![Backup](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/backup.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/backup.yml) |
| **social-media-post.yml** | New music detection | On music.html change | [![Social](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/social-media-post.yml/badge.svg)](https://github.com/DavidKRK/DavidKRK.github.io/actions/workflows/social-media-post.yml) |

### 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/DavidKRK/DavidKRK.github.io.git
cd DavidKRK.github.io

# Install dependencies
npm install

# Build optimized assets
npm run build

# Deploy (automatic on push to gh-pages)
git push origin gh-pages
```

### 📝 License

All rights reserved © 2026 David KRK

---

**© 2026 David KRK** | Spinning since September 1999 🎧
