document.addEventListener('DOMContentLoaded', () => {
    const languageButtons = document.querySelectorAll('.language-btn');
    const languageContents = document.querySelectorAll('.lang-content');

    function switchLanguage(lang) {
        const clickedBtn = document.querySelector(`.language-btn[data-lang="${lang}"]`);
        
        // Hide all content and deactivate all buttons
        langContents.forEach(content => content.classList.remove('active'));
        langBtns.forEach(b => b.classList.remove('active'));

        // Show the selected content and activate the button
        const contentsToShow = document.querySelectorAll(`.lang-content[data-lang="${lang}"]`);
        contentsToShow.forEach(content => content.classList.add('active'));
        if (clickedBtn) {
            clickedBtn.classList.add('active');
        }
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle functionality
            if (btn.classList.contains('active')) {
                // If already active, hide everything
                langContents.forEach(content => content.classList.remove('active'));
                langBtns.forEach(b => b.classList.remove('active'));
            } else {
                // Otherwise, switch to the new language
                switchLanguage(btn.dataset.lang);
            }
        });
    });

    // NO default language on page load
});