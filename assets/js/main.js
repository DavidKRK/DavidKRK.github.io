var sound = new Howl({
  src: ['assets/music/New Order Blue Monday.ogg', 'assets/music/New Order Blue Monday.mp3'], // Assurez-vous d'inclure différents formats pour la compatibilité
  preload: true,
  volume: 0.5, // Ajustez le volume ici (0.0 à 1.0)
  onload: function() {
    console.log('Son chargé avec succès !');
  },
  onloaderror: function() {
    console.log('Erreur lors du chargement du son.');
  }
});

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
