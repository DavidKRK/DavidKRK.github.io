// DJ App V1 (2 decks + crossfader + EQ 3 bandes + pitch)
// IMPORTANT : le son ne sortira que si tu charges de vrais fichiers audio (mp3/ogg/wav) dans assets/music/

const playlist = [
  { name: 'Track 1 (test)', src: 'assets/music/track1.mp3' },
  { name: 'Track 2 (test)', src: 'assets/music/track2.mp3' },
  { name: 'Track 3 (test)', src: 'assets/music/track3.mp3' }
];

const els = {
  audioA: document.getElementById('audio-a'),
  audioB: document.getElementById('audio-b'),

  trackA: document.getElementById('track-a'),
  trackB: document.getElementById('track-b'),

  playA: document.getElementById('play-a'),
  pauseA: document.getElementById('pause-a'),
  pitchA: document.getElementById('pitch-a'),
  eqLowA: document.getElementById('eq-low-a'),
  eqMidA: document.getElementById('eq-mid-a'),
  eqHighA: document.getElementById('eq-high-a'),

  playB: document.getElementById('play-b'),
  pauseB: document.getElementById('pause-b'),
  pitchB: document.getElementById('pitch-b'),
  eqLowB: document.getElementById('eq-low-b'),
  eqMidB: document.getElementById('eq-mid-b'),
  eqHighB: document.getElementById('eq-high-b'),

  crossfader: document.getElementById('crossfader'),
  playlist: document.getElementById('playlist')
};

let audioCtx = null;
let deckA = null;
let deckB = null;

function ensureAudioContext() {
  if (audioCtx) return;

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  deckA = createDeck(els.audioA);
  deckB = createDeck(els.audioB);

  // Crossfader au centre au départ
  applyCrossfader(parseFloat(els.crossfader.value));
}

function createDeck(audioEl) {
  const source = audioCtx.createMediaElementSource(audioEl);

  const low = audioCtx.createBiquadFilter();
  low.type = 'lowshelf';
  low.frequency.value = 200;

  const mid = audioCtx.createBiquadFilter();
  mid.type = 'peaking';
  mid.frequency.value = 1000;
  mid.Q.value = 1;

  const high = audioCtx.createBiquadFilter();
  high.type = 'highshelf';
  high.frequency.value = 3000;

  const gain = audioCtx.createGain();
  gain.gain.value = 0.5;

  source.connect(low);
  low.connect(mid);
  mid.connect(high);
  high.connect(gain);
  gain.connect(audioCtx.destination);

  return { audioEl, source, low, mid, high, gain };
}

function setEQ(deck, lowVal, midVal, highVal) {
  // sliders 0..2 (1 = neutre)
  // on mappe sur un gain dB raisonnable (-12dB .. +12dB)
  const toDb = (v) => (v - 1) * 12;

  deck.low.gain.value = toDb(lowVal);
  deck.mid.gain.value = toDb(midVal);
  deck.high.gain.value = toDb(highVal);
}

function applyCrossfader(x) {
  // x: 0 => deckA full, deckB 0 ; 1 => deckB full, deckA 0
  // courbe simple (linéaire) pour V1
  if (!deckA || !deckB) return;

  deckA.gain.gain.value = 1 - x;
  deckB.gain.gain.value = x;
}

function loadTrack(deck, track) {
  deck.audioEl.src = track.src;
  deck.audioEl.load();
}

function renderPlaylist() {
  els.playlist.innerHTML = '';

  playlist.forEach((t) => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex; gap:8px; align-items:center; background:#1b1b1b; padding:8px 10px; border-radius:8px;';

    const title = document.createElement('div');
    title.textContent = t.name;
    title.style.cssText = 'min-width:180px;';

    const btnA = document.createElement('button');
    btnA.textContent = 'Charger A';
    btnA.style.cssText = 'background:#4CAF50;color:#fff;border:none;padding:8px 10px;border-radius:6px;cursor:pointer;';
    btnA.onclick = () => {
      ensureAudioContext();
      loadTrack(deckA, t);
      els.trackA.textContent = t.name;
    };

    const btnB = document.createElement('button');
    btnB.textContent = 'Charger B';
    btnB.style.cssText = 'background:#4CAF50;color:#fff;border:none;padding:8px 10px;border-radius:6px;cursor:pointer;';
    btnB.onclick = () => {
      ensureAudioContext();
      loadTrack(deckB, t);
      els.trackB.textContent = t.name;
    };

    wrap.appendChild(title);
    wrap.appendChild(btnA);
    wrap.appendChild(btnB);
    els.playlist.appendChild(wrap);
  });
}

function wireUI() {
  els.playA.onclick = async () => {
    ensureAudioContext();
    await audioCtx.resume();
    els.audioA.play();
  };
  els.pauseA.onclick = () => els.audioA.pause();
  els.pitchA.oninput = (e) => (els.audioA.playbackRate = parseFloat(e.target.value));

  els.playB.onclick = async () => {
    ensureAudioContext();
    await audioCtx.resume();
    els.audioB.play();
  };
  els.pauseB.onclick = () => els.audioB.pause();
  els.pitchB.oninput = (e) => (els.audioB.playbackRate = parseFloat(e.target.value));

  const updateEQA = () => {
    if (!deckA) return;
    setEQ(deckA,
      parseFloat(els.eqLowA.value),
      parseFloat(els.eqMidA.value),
      parseFloat(els.eqHighA.value)
    );
  };
  const updateEQB = () => {
    if (!deckB) return;
    setEQ(deckB,
      parseFloat(els.eqLowB.value),
      parseFloat(els.eqMidB.value),
      parseFloat(els.eqHighB.value)
    );
  };

  els.eqLowA.oninput = updateEQA;
  els.eqMidA.oninput = updateEQA;
  els.eqHighA.oninput = updateEQA;

  els.eqLowB.oninput = updateEQB;
  els.eqMidB.oninput = updateEQB;
  els.eqHighB.oninput = updateEQB;

  els.crossfader.oninput = (e) => applyCrossfader(parseFloat(e.target.value));
}

window.addEventListener('DOMContentLoaded', () => {
  // Si la section DJ n'est pas présente sur la page, on ne fait rien.
  if (!els.audioA || !els.audioB || !els.playlist) return;

  renderPlaylist();
  wireUI();
});
