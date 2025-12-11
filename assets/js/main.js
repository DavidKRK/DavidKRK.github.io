const hero = document.getElementById('hero');

if (hero) {
  window.addEventListener('scroll', () => {
    if (window.innerWidth < 768) {
      return;
    }

    const scrollTop = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scrollTop < heroHeight) {
      // const img = document.getElementById('hero-img');
      // if (img) {
      //   const scrollRatio = scrollTop / heroHeight;
      //   let scale = 1 + scrollRatio * 0.15;
      //   scale = Math.min(scale, 1.5);
      //   const translateY = scrollRatio * 30;
      //   img.style.transform = `translate(-50%, calc(-50% + ${translateY}px)) scale(${scale})`;
      // }
    }
  });
}

/* =============================
 *   Howler.js – Audio controls
 * ============================== */

/* -----------------------------
   1️⃣  Paths –  relative à la racine
   ----------------------------- */
const getAsset = p => `assets/music/${p}`;

/* -----------------------------
   2️⃣  Player objects
   ----------------------------- */
const patriceSound = new Howl({
  src: [ getAsset('Patrice Bäumel–Glutes (Original Mix).mp3') ],
  html5: true,            // streamable on all devices (large files)
  preload: false
});

const newOrderSound = new Howl({
  src: [ getAsset('New Order Blue Monday.ogg') ],
  html5: true,
  preload: false
});

const winxSound = new Howl({
  src: [ getAsset("Winx - Don't Laugh - Original Live Raw Mix.ogg") ],
  html5: true,
  preload: false
});

/* -----------------------------
   3️⃣  Event listeners (buttons)
   ----------------------------- */
document.querySelector('#play-btn-patrice')?.addEventListener('click', () => patriceSound.play());
document.querySelector('#pause-btn-patrice')?.addEventListener('click', () => patriceSound.pause());

document.querySelector('#play-btn-blue-monday')?.addEventListener('click', () => newOrderSound.play());
document.querySelector('#pause-btn-blue-monday')?.addEventListener('click', () => newOrderSound.pause());

document.querySelector('#play-btn-winx')?.addEventListener('click', () => winxSound.play());
document.querySelector('#pause-btn-winx')?.addEventListener('click', () => winxSound.pause());

/* -----------------------------
   4️⃣  Helpers UI (facultatif)
   ----------------------------- */
function setStatus(id, playing) {
  const el = document.getElementById(id);
  if (!el) return;
  if (playing) {
    el.style.display = 'none';
  } else {
    el.style.display = 'block';
  }
}

/* E.g. if you want a visual indicator that a track is playing: */
patriceSound.on('play', () => setStatus('play-btn-patrice', true));
patriceSound.on('pause', () => setStatus('play-btn-patrice', false));
patriceSound.on('stop',  () => setStatus('play-btn-patrice', false));

newOrderSound.on('play', () => setStatus('play-btn-blue-monday', true));
newOrderSound.on('pause', () => setStatus('play-btn-blue-monday', false));
newOrderSound.on('stop',  () => setStatus('play-btn-blue-monday', false));

winxSound.on('play', () => setStatus('play-btn-winx', true));
winxSound.on('pause', () => setStatus('play-btn-winx', false));
winxSound.on('stop',  () => setStatus('play-btn-winx', false));

document.addEventListener('DOMContentLoaded', () => {
  const btns = document.querySelectorAll('.language-btn');
  const contents = document.querySelectorAll('.lang-content');
  
  // Par défaut, cache tout sauf Français
  contents.forEach((c, i) => {
    if (i === 0) c.classList.add('active');
    else c.style.display = 'none';
  });
  btns[0].classList.add('active');
  
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      
      // Toggle active
      btn.classList.toggle('active');
      
      // Montre/cacher contenu
      contents.forEach(c => {
        if (c.dataset.lang === lang) {
          c.style.display = c.style.display === 'none' ? 'block' : 'none';
        } else {
          c.style.display = 'none';
        }
      });
    });
  });
});
