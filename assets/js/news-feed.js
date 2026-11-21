(() => {
  const labels = {
    fr: { home: 'Accueil', heading: 'Dernières vidéos', loading: 'Chargement des vidéos…', empty: 'Aucune vidéo disponible.', error: 'Impossible de charger les vidéos.' },
    en: { home: 'Home', heading: 'Latest videos', loading: 'Loading videos…', empty: 'No videos available.', error: 'Unable to load videos.' },
    es: { home: 'Inicio', heading: 'Últimos vídeos', loading: 'Cargando vídeos…', empty: 'No hay vídeos disponibles.', error: 'No se pueden cargar los vídeos.' },
    eu: { home: 'Hasiera', heading: 'Azken bideoak', loading: 'Bideoak kargatzen…', empty: 'Ez dago bideorik eskuragarri.', error: 'Ezin izan dira bideoak kargatu.' },
    ar: { home: 'الرئيسية', heading: 'أحدث الفيديوهات', loading: 'جارٍ تحميل الفيديوهات…', empty: 'لا توجد فيديوهات متاحة.', error: 'تعذر تحميل الفيديوهات.' },
    uk: { home: 'Головна', heading: 'Останні відео', loading: 'Завантаження відео…', empty: 'Немає доступних відео.', error: 'Не вдалося завантажити відео.' }
  };
  const buttons = document.querySelectorAll('.language-btn');
  const contents = document.querySelectorAll('.lang-content');
  const heading = document.getElementById('news-feed-heading');
  const status = document.getElementById('news-feed-status');
  const list = document.getElementById('news-feed-list');
  let language = 'en';
  let state = 'loading';
  let videos = [];

  function safeUrl(value) {
    if (typeof value !== 'string') return null;
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && !url.username && !url.password && !url.port ? url : null;
    } catch {
      return null;
    }
  }

  function validVideo(video) {
    if (!video || typeof video !== 'object' ||
        typeof video.id !== 'string' || !/^[\w-]{11}$/.test(video.id) ||
        typeof video.title !== 'string' || !video.title.trim() ||
        typeof video.published !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(video.published)) return false;
    const date = new Date(`${video.published}T00:00:00Z`);
    if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== video.published) return false;
    const link = safeUrl(video.url);
    const image = safeUrl(video.thumbnail);
    if (!link || !image) return false;
    const youtube = (['youtube.com', 'www.youtube.com'].includes(link.hostname) &&
      link.pathname === '/watch' && link.searchParams.getAll('v').length === 1 && link.searchParams.get('v') === video.id) ||
      (link.hostname === 'youtu.be' && link.pathname === `/${video.id}`);
    const thumbnail = ['i.ytimg.com', 'img.youtube.com'].includes(image.hostname) &&
      new RegExp(`^/vi/${video.id}/(?:default|mqdefault|hqdefault|sddefault|maxresdefault)\\.jpg$`).test(image.pathname);
    return youtube && thumbnail;
  }

  function render() {
    heading.textContent = labels[language].heading;
    status.hidden = state === 'ready';
    status.textContent = state === 'ready' ? '' : labels[language][state];
    list.replaceChildren();
    const formatter = new Intl.DateTimeFormat(language, { dateStyle: 'long', timeZone: 'UTC' });
    videos.forEach(video => {
      const card = document.createElement('article');
      card.className = 'news-feed-card';
      const link = document.createElement('a');
      link.href = video.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      const image = document.createElement('img');
      image.src = video.thumbnail;
      image.alt = '';
      image.loading = 'lazy';
      image.width = 320;
      image.height = 180;
      const title = document.createElement('h3');
      title.textContent = video.title;
      const date = document.createElement('time');
      date.dateTime = video.published;
      date.textContent = formatter.format(new Date(`${video.published}T00:00:00Z`));
      link.append(image, title);
      card.append(link, date);
      list.append(card);
    });
  }

  function switchLanguage(lang) {
    language = Object.prototype.hasOwnProperty.call(labels, lang) ? lang : 'en';
    contents.forEach(content => {
      const active = content.dataset.lang === language;
      content.classList.toggle('active', active);
      content.hidden = !active;
    });
    buttons.forEach(button => button.classList.toggle('active', button.dataset.lang === language));
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.getElementById('home-link').textContent = labels[language].home;
    try {
      localStorage.setItem('davidkrk_lang', language);
    } catch {
      // The page remains usable when storage is unavailable.
    }
    render();
  }

  buttons.forEach(button => button.addEventListener('click', () => switchLanguage(button.dataset.lang)));
  let savedLanguage;
  try {
    savedLanguage = localStorage.getItem('davidkrk_lang');
  } catch {
    savedLanguage = null;
  }
  switchLanguage(savedLanguage || 'en');

  fetch('assets/data/youtube-videos.json')
    .then(response => {
      if (!response.ok) throw new Error('Unable to fetch videos');
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data)) throw new Error('Invalid video data');
      const seen = new Set();
      videos = data.filter(validVideo).sort((a, b) => b.published.localeCompare(a.published)).filter(video => {
        if (seen.has(video.id)) return false;
        seen.add(video.id);
        return true;
      });
      state = videos.length ? 'ready' : 'empty';
      render();
    })
    .catch(() => {
      state = 'error';
      render();
    });
})();
