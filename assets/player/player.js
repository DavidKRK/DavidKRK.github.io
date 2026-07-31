/* ====================================================================
 *  HOWLER.JS AUDIO PLAYER –  (modifie‑et‑corrige‑tout le script d’origine)
 * ==================================================================== */

/* --------------------------------------------------------------------
 *  1.  Récupération des éléments DOM  (les IDs existent dans styles.css)
 * -------------------------------------------------------------------- */
const ids = [
  'track', 'timer', 'duration', 'playBtn', 'pauseBtn',
  'prevBtn', 'nextBtn', 'playlistBtn', 'volumeBtn',
  'progress', 'bar',      // (bar = zone de progression hors el.wave)
  'wave', 'loading',
  'playlist', 'list',
  'volume', 'barEmpty', 'barFull', 'sliderBtn'
];
// Create a local object to avoid polluting global scope
const el = {};
ids.forEach(id => {
  // Special case: 'wave' in ids array maps to 'el.wave' element ID
  const elementId = (id === 'wave') ? 'el.wave' : id;
  el[id] = document.getElementById(elementId);
});

/* --------------------------------------------------------------------
 *  2.  PLAYLIST  (les fichiers pointent vers les URLs raw GitHub)
 * -------------------------------------------------------------------- */
const playlist = [
  {
    title: "Winx – Don't Laugh",
    file: [
      "https://raw.githubusercontent.com/DavidKRK/DavidKRK.github.io/gh-pages/assets/player/audio/Winx_%20Don%27t_Laugh%20_Original_%20Live_%20Raw_%20_Mix.ogg",
      "https://raw.githubusercontent.com/DavidKRK/DavidKRK.github.io/gh-pages/assets/player/audio/Winx_%20Don%27t_Laugh%20_Original_%20Live_%20Raw_%20_Mix.webm"
    ],
    howl: null
  },
  {
    title: "Patrice Baumel – Glutes",
    file: [
      "https://raw.githubusercontent.com/DavidKRK/DavidKRK.github.io/gh-pages/assets/player/audio/Patrice_Baumel_Glutes_%20(Original_Mix).mp3",
      "https://raw.githubusercontent.com/DavidKRK/DavidKRK.github.io/gh-pages/assets/player/audio/Patrice_Baumel_Glutes_%20(Original_Mix).webm"
    ],
    howl: null
  },
  {
    title: "New Order – Blue Monday",
    file: [
      "https://raw.githubusercontent.com/DavidKRK/DavidKRK.github.io/gh-pages/assets/player/audio/New_Order_%20Blue_%20Monday.ogg",
      "https://raw.githubusercontent.com/DavidKRK/DavidKRK.github.io/gh-pages/assets/player/audio/New_Order_%20Blue_%20Monday.webm",
      "https://raw.githubusercontent.com/DavidKRK/DavidKRK.github.io/gh-pages/assets/player/audio/New_Order_%20Blue_%20Monday.mp3"
    ],
    howl: null
  }
];

/* --------------------------------------------------------------------
 *  3.  CLASS Player –  gestion de la lecture, pause, skip, volume, …
 * -------------------------------------------------------------------- */
class Player {
  constructor(playlist) {
    this.playlist = playlist;          // tableau de pistes
    this.index = 0;                    // index de la piste courante
    this.isPlaying = false;            // état de lecture
    this.currentHowl = null;           // Howl actif

    /*--- Interface / UI init ---*/
    el.track.textContent = `${this.index + 1}. ${this.playlist[0].title}`;
    this.renderPlaylist();

    /*--- Waveform (SiriWave) ---*/
    this.wave = new SiriWave({
      container: el.wave,
      width: window.innerWidth,
      height: window.innerHeight * 0.3,
      cover: true,
      speed: 0.03,
      amplitude: 0.7,
      frequency: 2
    });

    /*--- Resize support ---*/
    window.addEventListener('resize', this.resizeWave.bind(this));
    this.resizeWave();  // initial call
  }

  /*==================================================================*
   *   Utility : affichage de la playlist dans la div #list          *
   *==================================================================*/
  renderPlaylist() {
    // Clear playlist safely without using innerHTML
    while (el.list.firstChild) {
      el.list.removeChild(el.list.firstChild);
    }
    this.playlist.forEach((song, i) => {
      const div = document.createElement('div');
      div.className = 'list-song';
      div.textContent = song.title;
      div.onclick = () => this.skipTo(i);
      el.list.appendChild(div);
    });
  }

  /*==================================================================*
   *   PLAYBACK : play / pause / skip / seek                         *
   *==================================================================*/
  play(idx = null) {
    if (idx !== null) this.index = idx;

    const data = this.playlist[this.index];

    // Si la piste est déjà chargée, on la réutilise
    let howl = data.howl;
    if (!howl) {
      howl = data.howl = new Howl({
        src: data.file,
        html5: true,                    // force le streaming en HTML5
        onplay: () => {
          el.duration.textContent = this.formatTime(Math.round(howl.duration()));
          this.wave.start();
          this.isPlaying = true;
          requestAnimationFrame(this.step.bind(this));
          el.bar.style.display = 'none';
          el.pauseBtn.style.display = 'block';
        },
        onload: () => {
          this.el.loading.style.display = 'none';
        },
        onend: () => {
          this.wave.stop();
          this.skip('next');
        },
        onpause: () => {
          this.wave.stop();
          this.isPlaying = false;
        },
        onseek: () => requestAnimationFrame(this.step.bind(this))
      });
    }

    howl.play();
    el.track.textContent = `${this.index + 1}. ${data.title}`;
    this.currentHowl = howl;
    this.isPlaying = true;
  }

  pause() {
    if (!this.currentHowl) return;
    this.currentHowl.pause();
    this.isPlaying = false;
    el.playBtn.style.display = 'block';
    el.pauseBtn.style.display = 'none';
  }

  skip(direction) {
    if (direction === 'prev') {
      this.index = (this.index - 1 + this.playlist.length) % this.playlist.length;
    } else {
      this.index = (this.index + 1) % this.playlist.length;
    }
    this.skipTo(this.index);
  }

  skipTo(idx) {
    // Stop current track
    if (this.currentHowl) this.currentHowl.stop();
    // Reset progress bar
    el.progress.style.width = '0%';
    // Play the selected track
    this.play(idx);
  }

  /*==================================================================*
   *   VOLUME : ajustement du volume global + position du slider      *
   *==================================================================*/
  volume(v) {
    Howler.volume(v);
    const barWidth = (v * 90) / 100;             // 90 % du slider
    el.barFull.style.width = `${barWidth * 100}%`;
    el.sliderBtn.style.left = `${window.innerWidth * barWidth + window.innerWidth * 0.05 - 25}px`;
  }

  /*==================================================================*
   *   SEEK : position par rapport au pourcentage de la durée        *
   *==================================================================*/
  seek(percent) {
    if (!this.currentHowl || !this.currentHowl.playing()) return;
    this.currentHowl.seek(this.currentHowl.duration() * percent);
  }

  /*==================================================================*
   *   STEP : animation de la barre de progression                   *
   *==================================================================*/
  step() {
    if (!this.currentHowl) return;
    const currentSeek = this.currentHowl.seek() || 0;
    el.timer.textContent = this.formatTime(Math.round(currentSeek));
    el.progress.style.width = `${(currentSeek / this.currentHowl.duration()) * 100}%`;

    if (this.currentHowl.playing()) {
      requestAnimationFrame(this.step.bind(this));
    }
  }

  /*==================================================================*
   *   TOGGLE : affichage des panneaux playlist / volume              *
   *==================================================================*/
  togglePlaylist() {
    const target = el.playlist.style.display === 'block' ? 'none' : 'block';
    el.playlist.style.display = target;
    el.playlist.className = target === 'block' ? 'fadein' : 'fadeout';
  }

  toggleVolume() {
    const target = el.volume.style.display === 'block' ? 'none' : 'block';
    el.volume.style.display = target;
    volume.className = target === 'block' ? 'fadein' : 'fadeout';
  }

  /*==================================================================*
   *   UTIL  : formatage M:SS                                         *
   *==================================================================*/
  formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  }

  /*==================================================================*
   *   RESIZE : adaptation du el.wave et du slider volume           *
   *==================================================================*/
  resizeWave() {
    const h = window.innerHeight * 0.3;
    const w = window.innerWidth;

    // wave
    this.wave.height = h;
    this.wave.height_2 = h / 2;
    this.wave.MAX = this.wave.height_2 - 4;
    this.wave.width = w;
    this.wave.width_2 = w / 2;
    this.wave.width_4 = w / 4;
    this.wave.canvas.height = h;
    this.wave.canvas.width = w;
    this.wave.container.style.margin = `-${h / 2}px auto`;

    // slider (si une piste est déjà chargée)
    if (this.currentHowl) {
      const vol = this.currentHowl.volume();
      const barWidth = vol * 0.9;  // 90% de la largeur
      el.sliderBtn.style.left = `${w * barWidth + w * 0.05 - 25}px`;
    }
  }
}

/* ====================================================================
 *  4.  Instanciation du Player & binding des contrôles
 * ==================================================================== */
const player = new Player(playlist);

/* -- Bind Basic Controls -------------------------------------------*/
playBtn.addEventListener('click', () => player.play());
pauseBtn.addEventListener('click', () => player.pause());
prevBtn.addEventListener('click', () => player.skip('prev'));
nextBtn.addEventListener('click', () => player.skip('next'));

el.wave.addEventListener('click', e => {
  const percent = e.clientX / window.innerWidth;
  player.seek(percent);
});

playlistBtn.addEventListener('click', () => player.togglePlaylist());
volumeBtn.addEventListener('click', () => player.toggleVolume());

/* -- Sliding Volume --------------------------------------------------*/
barEmpty.addEventListener('click', e => {
  const per = e.layerX / barEmpty.scrollWidth;
  player.volume(per);
});
sliderBtn.addEventListener('mousedown', () => window.sliderDown = true);
sliderBtn.addEventListener('touchstart', () => window.sliderDown = true);
volume.addEventListener('mouseup', () => window.sliderDown = false);
volume.addEventListener('touchend', () => window.sliderDown = false);

const move = e => {
  if (!window.sliderDown) return;
  const x = e.clientX || (e.touches && e.touches[0].clientX);
  const per = Math.min(1, Math.max(0, (x - window.innerWidth * 0.05) / barEmpty.scrollWidth));
  player.volume(per);
};
volume.addEventListener('mousemove', move);
volume.addEventListener('touchmove', move);


