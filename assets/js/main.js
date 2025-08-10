var sound = new Howl({
  src: ['assets/music/New Order Blue Monday.ogg']
});

document.getElementById('play-btn-blue-monday').addEventListener('click', () => sound.play());
document.getElementById('pause-btn-blue-monday').addEventListener('click', () => sound.pause());

// Pour démarrer le son
function playSound() {
  sound.play();
}

//Pour mettre en pause le son
function pauseSound() {
  sound.pause();
}

window.addEventListener('scroll', () => {
  if (window.innerWidth < 768) {
@@ -17,4 +36,4 @@ window.addEventListener('scroll', () => {

    img.style.transform = `translate(-50%, calc(-50% + ${translateY}px)) scale(${scale})`;
  }
});
