class ModernAudioPlayer {
  constructor() {
    this.audio = null;
    this.audioContext = null;
    this.analyser = null;
    this.dataArray = null;
    this.canvas = document.getElementById('waveform-canvas');
    this.canvasCtx = this.canvas ? this.canvas.getContext('2d') : null;
    this.isPlaying = false;
    this.animationId = null;

    this.initElements();
    if (!this.playPauseBtn) return;
    this.initAudio();
    this.setupEventListeners();
    this.resizeCanvas();
  }

  initElements() {
    this.playPauseBtn = document.getElementById('play-pause-btn');
    this.muteBtn = document.getElementById('mute-btn');
    this.progressBar = document.getElementById('progress-bar');
    this.volumeSlider = document.getElementById('volume-slider');
    this.currentTimeEl = document.getElementById('current-time');
    this.durationEl = document.getElementById('duration');
  }

  initAudio() {
    const audioSrc = 'https://stream.mixcloud.com/secure/c/m4a/64/c/d/5/9/e5f0-fb5b-47d5-a5a8-38e8b29e4a4a.m4a';
    this.audio = new Audio(audioSrc);
    this.audio.crossOrigin = 'anonymous';
    this.audio.preload = 'metadata';

    this.audio.addEventListener('error', () => {
      console.warn('Audio direct non disponible, utilisation du widget Mixcloud');
      const customPlayer = document.querySelector('.custom-player');
      if (customPlayer) customPlayer.style.display = 'none';
    });

    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const source = this.audioContext.createMediaElementSource(this.audio);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
    } catch (error) {
      console.warn('Web Audio API non supportée:', error);
    }

    this.audio.addEventListener('loadedmetadata', () => {
      if (this.durationEl && this.progressBar) {
        this.durationEl.textContent = this.formatTime(this.audio.duration);
        this.progressBar.max = Math.floor(this.audio.duration);
      }
    });

    this.audio.addEventListener('timeupdate', () => {
      if (this.currentTimeEl && this.progressBar) {
        this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
        this.progressBar.value = this.audio.currentTime;
      }
    });

    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      cancelAnimationFrame(this.animationId);
    });

    this.audio.volume = 0.7;
  }

  setupEventListeners() {
    this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
    this.progressBar?.addEventListener('input', (event) => {
      this.audio.currentTime = Number(event.target.value);
    });
    this.volumeSlider?.addEventListener('input', (event) => {
      const volume = Number(event.target.value) / 100;
      this.audio.volume = volume;
      this.updateVolumeIcon(volume);
    });
    this.muteBtn?.addEventListener('click', () => {
      this.audio.muted = !this.audio.muted;
      this.updateVolumeIcon(this.audio.muted ? 0 : this.audio.volume);
    });
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  async togglePlayPause() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
      this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      cancelAnimationFrame(this.animationId);
      return;
    }

    try {
      if (this.audioContext?.state === 'suspended') await this.audioContext.resume();
      await this.audio.play();
      this.isPlaying = true;
      this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      this.visualize();
    } catch (error) {
      this.isPlaying = false;
      console.error('Erreur lecture audio:', error);
    }
  }

  visualize() {
    if (!this.canvasCtx || !this.analyser) return;
    const draw = () => {
      if (!this.isPlaying) return;
      this.animationId = requestAnimationFrame(draw);
      this.analyser.getByteFrequencyData(this.dataArray);
      this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      const barWidth = (this.canvas.width / this.dataArray.length) * 2.5;
      let x = 0;
      for (let i = 0; i < this.dataArray.length; i += 1) {
        const barHeight = (this.dataArray[i] / 255) * this.canvas.height * 0.8;
        const gradient = this.canvasCtx.createLinearGradient(0, this.canvas.height, 0, this.canvas.height - barHeight);
        gradient.addColorStop(0, '#00ff00');
        gradient.addColorStop(0.5, '#00cc00');
        gradient.addColorStop(1, '#009900');
        this.canvasCtx.fillStyle = gradient;
        this.canvasCtx.fillRect(x, this.canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };
    draw();
  }

  resizeCanvas() {
    if (!this.canvas || !this.canvas.parentElement) return;
    this.canvas.width = this.canvas.parentElement.offsetWidth;
    this.canvas.height = 150;
  }

  updateVolumeIcon(volume) {
    const icon = this.muteBtn?.querySelector('i');
    if (!icon) return;
    icon.className = volume === 0 ? 'fas fa-volume-mute' : volume < 0.5 ? 'fas fa-volume-down' : 'fas fa-volume-up';
  }

  formatTime(seconds) {
    if (!Number.isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}

document.addEventListener('DOMContentLoaded', () => new ModernAudioPlayer());
