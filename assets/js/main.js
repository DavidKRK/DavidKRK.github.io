document.addEventListener('DOMContentLoaded', () => {
    // --- Animation & Interaction Setup ---
    
    // Fade in main title
    setTimeout(() => {
        const mainTitle = document.querySelector('.main-title');
        if (mainTitle) mainTitle.style.opacity = '1';
    }, 100);
    
    // Pulse animation for social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => icon.classList.add('pulse'));
        icon.addEventListener('mouseleave', () => icon.classList.remove('pulse'));
    });
    
    // Parallax effect for welcome text (non-touch devices only)
    const welcomeText = document.querySelector('.welcome-text');
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    
    if (welcomeText && !isTouchDevice) {
        window.addEventListener('mousemove', (e) => {
            const { innerWidth, innerHeight } = window;
            const xAxis = (innerWidth / 2 - e.pageX) / 25;
            const yAxis = (innerHeight / 2 - e.pageY) / 25;
            welcomeText.style.transform = `perspective(500px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }

    // --- Language Selector ---
    const languageBtns = document.querySelectorAll('.language-btn');
    const welcomeMessages = document.querySelectorAll('.welcome-message');
    const languages = ['fr', 'es', 'en', 'eu'];
    let currentIndex = 0;
    let rotationInterval;

    function switchLanguage(lang) {
        languageBtns.forEach(b => b.classList.remove('active'));
        welcomeMessages.forEach(msg => msg.classList.remove('active'));

        const activeBtn = document.querySelector(`.language-btn[data-lang="${lang}"]`);
        const activeMsg = document.querySelector(`.welcome-message[data-lang="${lang}"]`);

        if (activeBtn) activeBtn.classList.add('active');
        if (activeMsg) activeMsg.classList.add('active');
        
        currentIndex = languages.indexOf(lang);
    }

    function rotateLanguage() {
        currentIndex = (currentIndex + 1) % languages.length;
        switchLanguage(languages[currentIndex]);
    }

    function resetAutoRotation() {
        clearInterval(rotationInterval);
        rotationInterval = setInterval(rotateLanguage, 5000);
    }

    languageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
            resetAutoRotation();
        });
    });
    
    if (welcomeText) {
        welcomeText.addEventListener('mouseenter', () => clearInterval(rotationInterval));
        welcomeText.addEventListener('mouseleave', resetAutoRotation);
    }

    // Initial setup
    resetAutoRotation();

    // Copyright Year
    const copyright = document.getElementById('copyright');
    if(copyright) {
        copyright.innerHTML = `© ${new Date().getFullYear()} David KRK. Tous droits réservés.`;
    }
});