document.addEventListener('DOMContentLoaded', () => {
    const languageBtns = document.querySelectorAll('.language-btn');
    const bioMessages = document.querySelectorAll('.bio-message');

    function switchLanguage(lang) {
        const clickedBtn = document.querySelector(`.language-btn[data-lang="${lang}"]`);
        const activeMsg = document.querySelector(`.bio-message[data-lang="${lang}"]`);

        // Check if the clicked button is already active
        const wasActive = clickedBtn.classList.contains('active');

        // Always deactivate all buttons and hide all messages first.
        languageBtns.forEach(b => b.classList.remove('active'));
        bioMessages.forEach(msg => msg.classList.remove('active'));

        // If the clicked button wasn't already active, activate it and its corresponding message.
        if (!wasActive) {
            if (clickedBtn) clickedBtn.classList.add('active');
            if (activeMsg) activeMsg.classList.add('active');
        }

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

    // Initial setup: no language active by default
    // No call to switchLanguage here
});
