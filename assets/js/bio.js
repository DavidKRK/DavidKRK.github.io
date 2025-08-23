document.addEventListener('DOMContentLoaded', () => {
    const languageBtns = document.querySelectorAll('.language-btn');
    const bioMessages = document.querySelectorAll('.bio-message');

    function switchLanguage(lang) {
        const clickedBtn = document.querySelector(`.language-btn[data-lang="${lang}"]`);
        const activeMsg = document.querySelector(`.bio-message[data-lang="${lang}"]`);

        const wasActive = clickedBtn && clickedBtn.classList.contains('active');

        languageBtns.forEach(b => b.classList.remove('active'));
        bioMessages.forEach(msg => msg.classList.remove('active'));

        if (!wasActive) {
            if (clickedBtn) clickedBtn.classList.add('active');
            if (activeMsg) activeMsg.classList.add('active');
        }
    }

    languageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });

    // Initial setup: no language active by default
    // No call to switchLanguage here
});
