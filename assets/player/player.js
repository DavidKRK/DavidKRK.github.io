/*!
 * Howler.js Audio Player Demo
 * howlerjs.com
 *
 * (c) 2013-2020, James Simpson of GoldFire Studios
 * goldfirestudios.com
 *
 * MIT License
 */

// Cache references to DOM elements.
var elms = ['track', 'timer', 'duration', 'playBtn', 'pauseBtn', 'prevBtn', 'nextBtn', 'playlistBtn', 'volumeBtn', 'progress', 'bar', 'wave', 'loading', 'playlist', 'list', 'volume', 'barEmpty', 'barFull', 'sliderBtn'];
elms.forEach(function(elm) {
  window[elm] = document.getElementById(elm);
});

/**
 * Player class containing the state of our playlist and where we are in it.
 * Includes all methods for playing, skipping, updating the display, etc.
 * @param {Array} playlist Array of objects with playlist song details ({title, file, howl}).
 */
var Player = function(playlist) {
  this.playlist = playlist;
  this.index = 0;

  // Display the title of the first track.
  track.innerHTML = '1. ' + playlist[0].title;

  // Setup the playlist display.
  playlist.forEach(function(song) {
    var div = document.createElement('div');
    div.className = 'list-song';
    div.innerHTML = song.title;
    div.onclick = function() {
      player.skipTo(playlist.indexOf(song));
    };
    list.appendChild(div);
  });
};
Player.prototype.play = function(index) {
  var self = this;
  var sound;

    index = typeof index === 'number' ? index : self.playlist.indexOf(self.currentSound);
    var data = self.playlist[index];

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = self.playlist[index].howl = new Howl({
    src: self.playlist[index].file,
    html5: true, // Force to HTML5 so that the audio can stream in iOS.
    onplay: function() {
      // Démarrer l'animation ici
      wave.start(); // <-- AJOUTEZ CETTE LIGNE
      self.isPlaying = true;

          // Start updating the progress of the track.
          requestAnimationFrame(self.step.bind(self));

          // Start the wave animation if we have already loaded
          wave.container.style.display = 'block';
          bar.style.display = 'none';
          pauseBtn.style.display = 'block';
        },
        onload: function() {
          // Start the wave animation.
          wave.container.style.display = 'block';
          bar.style.display = 'none';
          loading.style.display = 'none';
        },
        onend: function() {
          // Stop the wave animation.
          wave.container.style.display = 'none';
          bar.style.display = 'block';
          self.skip('next');
        },
        onpause: function() {
          // Stop the wave animation.
          wave.container.style.display = 'none';
          bar.style.display = 'block';
        },
        onstop: function() {
          // Stop the wave animation.
          wave.container.style.display = 'none';
          bar.style.display = 'block';
        },
        onseek: function() {
          // Start updating the progress of the track.
          requestAnimationFrame(self.step.bind(self));
        }
      });
    }

    // Begin playing the sound.
    sound.play();

    // Update the track display.
    track.innerHTML = (index + 1) + '. ' + data.title;

    // Show the pause button.
    if (sound.state() === 'loaded') {
      playBtn.style.display = 'none';
      pauseBtn.style.display = 'block';
    } else {
      loading.style.display = 'block';
      playBtn.style.display = 'none';
      pauseBtn.style.display = 'none';
    }

    // Keep track of the index we are currently playing.
    self.index = index;
  },

  /**
   * Pause the currently playing track.
   */
  pause: function() {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // Puase the sound.
    sound.pause();

    // Show the play button.
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
  },

  /**
   * Skip to the next or previous track.
   * @param  {String} direction 'next' or 'prev'.
   */
  skip: function(direction) {
    var self = this;

    // Get the next track based on the direction of the track.
    var index = 0;
    if (direction === 'prev') {
      index = self.index - 1;
      if (index < 0) {
        index = self.playlist.length - 1;
      }
    } else {
      index = self.index + 1;
      if (index >= self.playlist.length) {
        index = 0;
      }
    }

    self.skipTo(index);
  },

  /**
   * Skip to a specific track based on its playlist index.
   * @param  {Number} index Index in the playlist.
   */
  skipTo: function(index) {
    var self = this;

    // Stop the current track.
    if (self.playlist[self.index].howl) {
      self.playlist[self.index].howl.stop();
    }

    // Reset progress.
    progress.style.width = '0%';

    // Play the new track.
    self.play(index);
  },

  /**
   * Set the volume and update the volume slider display.
   * @param  {Number} val Volume between 0 and 1.
   */
  volume: function(val) {
    var self = this;

    // Update the global volume (affecting all Howls).
    Howler.volume(val);

    // Update the display on the slider.
    var barWidth = (val * 90) / 100;
    barFull.style.width = (barWidth * 100) + '%';
    sliderBtn.style.left = (window.innerWidth * barWidth + window.innerWidth * 0.05 - 25) + 'px';
  },

  /**
   * Seek to a new position in the currently playing track.
   * @param  {Number} per Percentage through the song to skip.
   */
  seek: function(per) {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // Convert the percent into a seek position.
    if (sound.playing()) {
      sound.seek(sound.duration() * per);
    }
  },

  /**
   * The step called within requestAnimationFrame to update the playback position.
   */
  step: function() {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // Determine our current seek position.
    var seek = sound.seek() || 0;
    timer.innerHTML = self.formatTime(Math.round(seek));
    progress.style.width = (((seek / sound.duration()) * 100) || 0) + '%';

    // If the sound is still playing, continue stepping.
    if (sound.playing()) {
      requestAnimationFrame(self.step.bind(self));
    }
  },

  /**
   * Toggle the playlist display on/off.
   */
  togglePlaylist: function() {
    var self = this;
    var display = (playlist.style.display === 'block') ? 'none' : 'block';

    setTimeout(function() {
      playlist.style.display = display;
    }, (display === 'block') ? 0 : 500);
    playlist.className = (display === 'block') ? 'fadein' : 'fadeout';
  },

  /**
   * Toggle the volume display on/off.
   */
  toggleVolume: function() {
    var self = this;
    var display = (volume.style.display === 'block') ? 'none' : 'block';

    setTimeout(function() {
      volume.style.display = display;
    }, (display === 'block') ? 0 : 500);
    volume.className = (display === 'block') ? 'fadein' : 'fadeout';
  },

  /**
   * Format the time from seconds to M:SS.
   * @param  {Number} secs Seconds to format.
   * @return {String}      Formatted time.
   */
  formatTime: function(secs) {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;

    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
};

// Setup our new audio player class and pass it the playlist.
var player = new Player([
  {
    title: 'Winx - Don\'t Laugh',
    file: 'Winx_ Dont_Laugh _Original_ Live_ Raw _Mix',
    howl: null
  },
  {
    title: 'Patrice Baumel - Glutes',
    file: 'Patrice_Baumel_Glutes_ (Original_Mix)',
    howl: null
  },
  {
    title: 'New Order - Blue Monday',
    file: 'New_Order_ Blue_ Monday',
    howl: null
  }
]);

// Bind our player controls.
playBtn.addEventListener('click', function() {
  player.play();
});
pauseBtn.addEventListener('click', function() {
  player.pause();
});
prevBtn.addEventListener('click', function() {
  player.skip('prev');
});
nextBtn.addEventListener('click', function() {
  player.skip('next');
});
waveform.addEventListener('click', function(event) {
  player.seek(event.clientX / window.innerWidth);
});
playlistBtn.addEventListener('click', function() {
  player.togglePlaylist();
});
playlist.addEventListener('click', function() {
  player.togglePlaylist();
});
volumeBtn.addEventListener('click', function() {
  player.toggleVolume();
});
volume.addEventListener('click', function() {
  player.toggleVolume();
});

// Setup the event listeners to enable dragging of volume slider.
barEmpty.addEventListener('click', function(event) {
  var per = event.layerX / parseFloat(barEmpty.scrollWidth);
  player.volume(per);
});
sliderBtn.addEventListener('mousedown', function() {
  window.sliderDown = true;
});
sliderBtn.addEventListener('touchstart', function() {
  window.sliderDown = true;
});
volume.addEventListener('mouseup', function() {
  window.sliderDown = false;
});
volume.addEventListener('touchend', function() {
  window.sliderDown = false;
});

var move = function(event) {
  if (window.sliderDown) {
    var x = event.clientX || event.touches[0].clientX;
    var startX = window.innerWidth * 0.05;
    var layerX = x - startX;
    var per = Math.min(1, Math.max(0, layerX / parseFloat(barEmpty.scrollWidth)));
    player.volume(per);
  }
};

volume.addEventListener('mousemove', move);
volume.addEventListener('touchmove', move);

// Setup the "waveform" animation.
var wave = new SiriWave({
  container: waveform,
  width: window.innerWidth,
  height: window.innerHeight * 0.3,
  cover: true,
  speed: 0.03,
  amplitude: 0.7,
  frequency: 2
});
wave.start();

// Update the height of the wave animation.
// These are basically some hacks to get SiriWave.js to do what we want.
var resize = function() {
  var height = window.innerHeight * 0.3;
  var width = window.innerWidth;
  wave.height = height;
  wave.height_2 = height / 2;
  wave.MAX = wave.height_2 - 4;
  wave.width = width;
  wave.width_2 = width / 2;
  wave.width_4 = width / 4;
  wave.canvas.height = height;
  wave.canvas.width = width;
  wave.container.style.margin = -(height / 2) + 'px auto';

  // Update the position of the slider.
  var sound = player.playlist[player.index].howl;
  if (sound) {
    var vol = sound.volume();
    var barWidth = (vol * 0.9);
    sliderBtn.style.left = (window.innerWidth * barWidth + window.innerWidth * 0.05 - 25) + 'px';
  }
};
window.addEventListener('resize', resize);
resize();

/* Modified from https://github.com/CaffeinaLab/SiriWaveJS */

(function() {

function SiriWave(opt) {
  opt = opt || {};

  this.phase = 0;
  this.run = false;

  // UI vars

  this.ratio = opt.ratio || window.devicePixelRatio || 1;

  this.width = this.ratio * (opt.width || 320);
  this.width_2 = this.width / 2;
  this.width_4 = this.width / 4;

  this.height = this.ratio * (opt.height || 100);
  this.height_2 = this.height / 2;

  this.MAX = (this.height_2) - 4;

  // Constructor opt

  this.amplitude = opt.amplitude || 1;
  this.speed = opt.speed || 0.2;
  this.frequency = opt.frequency || 6;
  this.color = (function hex2rgb(hex){
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m,r,g,b) { return r + r + g + g + b + b; });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
    parseInt(result[1],16).toString()+','+parseInt(result[2], 16).toString()+','+parseInt(result[3], 16).toString()
    : null;
  })(opt.color || '#fff') || '255,255,255';

  // Canvas

  this.canvas = document.createElement('canvas');
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  if (opt.cover) {
    this.canvas.style.width = this.canvas.style.height = '100%';
  } else {
    this.canvas.style.width = (this.width / this.ratio) + 'px';
    this.canvas.style.height = (this.height / this.ratio) + 'px';
  };

  this.container = opt.container || document.body;
  this.container.appendChild(this.canvas);

  this.ctx = this.canvas.getContext('2d');

  // Start

  if (opt.autostart) {
    this.start();
  }
}

SiriWave.prototype._GATF_cache = {};
SiriWave.prototype._globAttFunc = function(x) {
  if (SiriWave.prototype._GATF_cache[x] == null) {
    SiriWave.prototype._GATF_cache[x] = Math.pow(4/(4+Math.pow(x,4)), 4);
  }
  return SiriWave.prototype._GATF_cache[x];
};

SiriWave.prototype._xpos = function(i) {
  return this.width_2 + i * this.width_4;
};

SiriWave.prototype._ypos = function(i, attenuation) {
  var att = (this.MAX * this.amplitude) / attenuation;
  return this.height_2 + this._globAttFunc(i) * att * Math.sin(this.frequency * i - this.phase);
};

SiriWave.prototype._drawLine = function(attenuation, color, width){
  this.ctx.moveTo(0,0);
  this.ctx.beginPath();
  this.ctx.strokeStyle = color;
  this.ctx.lineWidth = width || 1;

  var i = -2;
  while ((i += 0.01) <= 2) {
    var y = this._ypos(i, attenuation);
    if (Math.abs(i) >= 1.90) y = this.height_2;
    this.ctx.lineTo(this._xpos(i), y);
  }

  this.ctx.stroke();
};

SiriWave.prototype._clear = function() {
  this.ctx.globalCompositeOperation = 'destination-out';
  this.ctx.fillRect(0, 0, this.width, this.height);
  this.ctx.globalCompositeOperation = 'source-over';
};

SiriWave.prototype._draw = function() {
  if (this.run === false) return;

  this.phase = (this.phase + Math.PI*this.speed) % (2*Math.PI);

  this._clear();
  this._drawLine(-2, 'rgba(' + this.color + ',0.1)');
  this._drawLine(-6, 'rgba(' + this.color + ',0.2)');
  this._drawLine(4, 'rgba(' + this.color + ',0.4)');
  this._drawLine(2, 'rgba(' + this.color + ',0.6)');
  this._drawLine(1, 'rgba(' + this.color + ',1)', 1.5);

  if (window.requestAnimationFrame) {
    requestAnimationFrame(this._draw.bind(this));
    return;
  };
  setTimeout(this._draw.bind(this), 20);
};

/* API */

SiriWave.prototype.start = function() {
  this.phase = 0;
  this.run = true;
  this._draw();
};

SiriWave.prototype.stop = function() {
  this.phase = 0;
  this.run = false;
};

SiriWave.prototype.setSpeed = function(v) {
  this.speed = v;
};

SiriWave.prototype.setNoise = SiriWave.prototype.setAmplitude = function(v) {
  this.amplitude = Math.max(Math.min(v, 1), 0);
};


if (typeof define === 'function' && define.amd) {
  define(function(){ return SiriWave; });
  return;
};
window.SiriWave = SiriWave;

})();
