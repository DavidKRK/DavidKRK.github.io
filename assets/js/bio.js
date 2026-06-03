document.addEventListener('DOMContentLoaded', () => {
    const langBtns = document.querySelectorAll('.language-btn');
    const langContents = document.querySelectorAll('.lang-content');

    const mixcloudPlayerTrigger = document.getElementById('mixcloud-player-trigger');
    const mixcloudPlayerNote = document.getElementById('mixcloud-player-note');
    const mixcloudPlayerStatus = document.getElementById('mixcloud-player-status');
    const mixcloudPlayerContainer = document.getElementById('mixcloud-player-container');
    let mixcloudPlayerLoaded = false;

    const langContent = {
        fr: {
            player_button: 'Charger le lecteur Mixcloud',
            player_loaded: 'Lecteur Mixcloud chargé',
            player_note: 'Le lecteur externe se charge à la demande pour accélérer l’affichage de la page.',
            player_status: 'Le lecteur Mixcloud est maintenant chargé.'
        },
        en: {
            player_button: 'Load Mixcloud player',
            player_loaded: 'Mixcloud player loaded',
            player_note: 'The external player loads on demand to speed up page rendering.',
            player_status: 'The Mixcloud player is now loaded.'
        },
        es: {
            player_button: 'Cargar el reproductor de Mixcloud',
            player_loaded: 'Reproductor de Mixcloud cargado',
            player_note: 'El reproductor externo se carga bajo demanda para acelerar la visualización de la página.',
            player_status: 'El reproductor de Mixcloud ya está cargado.'
        },
        eu: {
            player_button: 'Kargatu Mixcloud erreproduzitzailea',
            player_loaded: 'Mixcloud erreproduzitzailea kargatuta',
            player_note: 'Kanpoko erreproduzitzailea eskatu ahala kargatzen da orria azkarrago erakusteko.',
            player_status: 'Mixcloud erreproduzitzailea kargatuta dago orain.'
        },
        ar: {
            player_button: 'تحميل مشغل Mixcloud',
            player_loaded: 'تم تحميل مشغل Mixcloud',
            player_note: 'يتم تحميل المشغل الخارجي عند الطلب لتسريع عرض الصفحة.',
            player_status: 'تم الآن تحميل مشغل Mixcloud.'
        },
        uk: {
            player_button: 'Завантажити плеєр Mixcloud',
            player_loaded: 'Плеєр Mixcloud завантажено',
            player_note: 'Зовнішній плеєр завантажується на вимогу, щоб пришвидшити показ сторінки.',
            player_status: 'Плеєр Mixcloud тепер завантажено.'
        }
    };

    function loadMixcloudPlayer() {
        if (mixcloudPlayerLoaded || !mixcloudPlayerTrigger || !mixcloudPlayerContainer) {
            return;
        }

        const t = langContent[document.documentElement.lang] || langContent.fr;

        mixcloudPlayerLoaded = true;
        mixcloudPlayerContainer.hidden = false;

        const iframe = document.createElement('iframe');
        iframe.title = 'Mixcloud player';
        iframe.width = '100%';
        iframe.height = '120';
        iframe.style.border = '0';
        iframe.src = 'https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FDavidKRK%2F';
        iframe.allow = 'autoplay; encrypted-media; fullscreen; idle-detection; speaker-selection; web-share';

        mixcloudPlayerContainer.appendChild(iframe);

        mixcloudPlayerTrigger.disabled = true;
        mixcloudPlayerTrigger.textContent = t.player_loaded;
        mixcloudPlayerTrigger.setAttribute('aria-label', t.player_loaded);

        if (mixcloudPlayerStatus) {
            mixcloudPlayerStatus.textContent = t.player_status;
        }
    }

    if (mixcloudPlayerTrigger) {
        mixcloudPlayerTrigger.addEventListener('click', loadMixcloudPlayer);
    }

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

        // Update document language and text direction for accessibility and RTL support
        document.documentElement.lang = lang;
        document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

        const t = langContent[lang] || langContent.fr;
        if (mixcloudPlayerTrigger) {
            const playerLabel = mixcloudPlayerLoaded ? t.player_loaded : t.player_button;
            mixcloudPlayerTrigger.textContent = playerLabel;
            mixcloudPlayerTrigger.setAttribute('aria-label', playerLabel);
        }
        if (mixcloudPlayerNote) mixcloudPlayerNote.textContent = t.player_note;
        if (mixcloudPlayerStatus) mixcloudPlayerStatus.textContent = mixcloudPlayerLoaded ? t.player_status : '';
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

    // Default language is set in the HTML to avoid layout shifts on load.
});
