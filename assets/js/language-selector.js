document.addEventListener('DOMContentLoaded', () => {
    const langBtns = document.querySelectorAll('.language-btn');
    const langContents = document.querySelectorAll('.lang-content');

    function switchLanguage(lang) {
        langContents.forEach(content => content.classList.remove('active'));
        langBtns.forEach(b => b.classList.remove('active'));

        const contentsToShow = document.querySelectorAll(`.lang-content[data-lang="${lang}"]`);
        contentsToShow.forEach(content => content.classList.add('active'));

        const activeBtn = document.querySelector(`.language-btn[data-lang="${lang}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });

    // Set default language to French
    switchLanguage('fr');
});
