const hero = document.getElementById('hero');

if (hero) {
  window.addEventListener('scroll', () => {
    if (window.innerWidth < 768) return;

    const scrollTop = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scrollTop < heroHeight) {
      // Reserved for optional hero parallax effects.
    }
  }, { passive: true });
}
