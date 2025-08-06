const img = document.getElementById('hero-img');
const hero = document.getElementById('hero');

window.addEventListener('scroll', () => {
  if (window.innerWidth < 768) {
    return;
  }

  const scrollTop = window.scrollY;
  const heroHeight = hero.offsetHeight;

  if (scrollTop < heroHeight) {
    const scrollRatio = scrollTop / heroHeight;
    let scale = 1 + scrollRatio * 0.15;
    scale = Math.min(scale, 1.5);
    const translateY = scrollRatio * 30;

    img.style.transform = `translate(-50%, calc(-50% + ${translateY}px)) scale(${scale})`;
  }
});