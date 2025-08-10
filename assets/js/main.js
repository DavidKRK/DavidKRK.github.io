var patriceSound = new Howl({
  src: ['/workspaces/DavidKRK.github.io/assets/music/Patrice Bäumel–Glutes (Original Mix).mp3']
});

var newOrderSound = new Howl({
  src: ['/workspaces/DavidKRK.github.io/assets/music/New Order Blue Monday.ogg']
});

var winxSound = new Howl({
  src: ['/workspaces/DavidKRK.github.io/assets/music/Winx - Don\'t Laugh - Original Live Raw Mix.ogg']
});

document.getElementById('play-btn-patrice').addEventListener('click', () => patriceSound.play());
document.getElementById('pause-btn-patrice').addEventListener('click', () => patriceSound.pause());

document.getElementById('play-btn-blue-monday').addEventListener('click', () => newOrderSound.play());
document.getElementById('pause-btn-blue-monday').addEventListener('click', () => newOrderSound.pause());

document.getElementById('play-btn-winx').addEventListener('click', () => winxSound.play());
document.getElementById('pause-btn-winx').addEventListener('click', () => winxSound.pause());

// Pour démarrer les sons
function playPatriceSound() {
  patriceSound.play();
}

function playNewOrderSound() {
  newOrderSound.play();
}

function playWinxSound() {
  winxSound.play();
}

// Pour mettre en pause les sons
function pausePatriceSound() {
  patriceSound.pause();
}

function pauseNewOrderSound() {
  newOrderSound.pause();
}

function pauseWinxSound() {
  winxSound.pause();
}

window.addEventListener('scroll', () => {
  if (window.innerWidth < 768) {
    // ...
  }
});
