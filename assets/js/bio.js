document.addEventListener('DOMContentLoaded', () => {
    const languageBtns = document.querySelectorAll('.language-btn');
    const bioMessages = document.querySelectorAll('.bio-message');

    function switchLanguage(lang) {
        const clickedBtn = document.querySelector(`.language-btn[data-lang="${lang}"]`);
        const activeMsg = document.querySelector(`.bio-message[data-lang="${lang}"]`);

        // Check if the clicked button is already active
        if (clickedBtn && clickedBtn.classList.contains('active')) {
            // If active, deactivate all and hide all messages
            languageBtns.forEach(b => b.classList.remove('active'));
            bioMessages.forEach(msg => msg.classList.remove('active'));
        } else {
            // If not active, deactivate all and hide all messages first
            languageBtns.forEach(b => b.classList.remove('active'));
            bioMessages.forEach(msg => msg.classList.remove('active'));

            // Then activate the clicked button and show its message
            if (clickedBtn) clickedBtn.classList.add('active');
            if (activeMsg) activeMsg.classList.add('active');
        }
    }

    languageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });
});