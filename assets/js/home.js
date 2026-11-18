document.addEventListener('DOMContentLoaded', () => {
    const mixcloudPlayerTrigger = document.getElementById('mixcloud-player-trigger');
    const mixcloudPlayerNote = document.getElementById('mixcloud-player-note');
    const mixcloudPlayerStatus = document.getElementById('mixcloud-player-status');
    const mixcloudPlayerContainer = document.getElementById('mixcloud-player-container');
    const langBtns = document.querySelectorAll('.language-btn');
    const langContents = document.querySelectorAll('.lang-content');
    const newsLink = document.getElementById('news-link');
    const beautifulCover = document.querySelector('.beautiful-release-cover');
    const beautifulEyebrow = document.querySelector('.beautiful-release-eyebrow');
    const beautifulDescription = document.querySelector('.beautiful-release-description');
    const beautifulAudioFallback = document.getElementById('beautiful-audio-fallback');
    let mixcloudPlayerLoaded = false;

    const langContent = {
        fr: {
            news: 'Actualités',
            beautiful_eyebrow: 'EDIT BOOTLEG EXCLUSIF',
            beautiful_description: 'Écoutez un extrait de mon edit, conçu pour le dancefloor et le mix DJ.',
            beautiful_cover: 'Pochette de Matt Darey feat. Marcella Woods — Beautiful, Rue Jay Switch It Bootleg, David KRK Edit',
            audio_fallback: 'Votre navigateur ne prend pas en charge le lecteur audio HTML5.',
            player_button: 'Charger le lecteur Mixcloud',
            player_loaded: 'Lecteur Mixcloud chargé',
            player_note: 'Le lecteur externe se charge à la demande pour accélérer l’affichage de la page.',
            player_status: 'Le lecteur Mixcloud est maintenant chargé.'
        },
        en: {
            news: 'News',
            beautiful_eyebrow: 'EXCLUSIVE BOOTLEG EDIT',
            beautiful_description: 'Listen to a preview of my edit, crafted for the dancefloor and DJ mixing.',
            beautiful_cover: 'Cover of Matt Darey feat. Marcella Woods — Beautiful, Rue Jay Switch It Bootleg, David KRK Edit',
            audio_fallback: 'Your browser does not support the HTML5 audio player.',
            player_button: 'Load Mixcloud player',
            player_loaded: 'Mixcloud player loaded',
            player_note: 'The external player loads on demand to speed up page rendering.',
            player_status: 'The Mixcloud player is now loaded.'
        },
        es: {
            news: 'Noticias',
            beautiful_eyebrow: 'EDIT BOOTLEG EXCLUSIVO',
            beautiful_description: 'Escucha un adelanto de mi edit, creado para la pista de baile y las mezclas de DJ.',
            beautiful_cover: 'Portada de Matt Darey feat. Marcella Woods — Beautiful, Rue Jay Switch It Bootleg, David KRK Edit',
            audio_fallback: 'Tu navegador no admite el reproductor de audio HTML5.',
            player_button: 'Cargar el reproductor de Mixcloud',
            player_loaded: 'Reproductor de Mixcloud cargado',
            player_note: 'El reproductor externo se carga bajo demanda para acelerar la visualización de la página.',
            player_status: 'El reproductor de Mixcloud ya está cargado.'
        },
        eu: {
            news: 'Albisteak',
            beautiful_eyebrow: 'BOOTLEG EDIT ESKLUSIBOA',
            beautiful_description: 'Entzun nire edit-aren aurrerapen bat, dantzalekurako eta DJ nahasketetarako sortua.',
            beautiful_cover: 'Matt Darey feat. Marcella Woods — Beautiful, Rue Jay Switch It Bootleg, David KRK Edit lanaren azala',
            audio_fallback: 'Zure nabigatzaileak ez du HTML5 audio erreproduzitzailea onartzen.',
            player_button: 'Kargatu Mixcloud erreproduzitzailea',
            player_loaded: 'Mixcloud erreproduzitzailea kargatuta',
            player_note: 'Kanpoko erreproduzitzailea eskatu ahala kargatzen da orria azkarrago erakusteko.',
            player_status: 'Mixcloud erreproduzitzailea kargatuta dago orain.'
        },
        ar: {
            news: 'الأخبار',
            beautiful_eyebrow: 'نسخة بوتليغ حصرية',
            beautiful_description: 'استمع إلى مقتطف من نسختي المصممة لحلبة الرقص ومزج الدي جي.',
            beautiful_cover: 'غلاف Matt Darey feat. Marcella Woods — Beautiful, Rue Jay Switch It Bootleg, David KRK Edit',
            audio_fallback: 'متصفحك لا يدعم مشغل الصوت HTML5.',
            player_button: 'تحميل مشغل Mixcloud',
            player_loaded: 'تم تحميل مشغل Mixcloud',
            player_note: 'يتم تحميل المشغل الخارجي عند الطلب لتسريع عرض الصفحة.',
            player_status: 'تم الآن تحميل مشغل Mixcloud.'
        },
        uk: {
            news: 'Новини',
            beautiful_eyebrow: 'ЕКСКЛЮЗИВНИЙ БУТЛЕГ-ЕДИТ',
            beautiful_description: 'Послухайте уривок мого едиту, створеного для танцполу та діджейських міксів.',
            beautiful_cover: 'Обкладинка Matt Darey feat. Marcella Woods — Beautiful, Rue Jay Switch It Bootleg, David KRK Edit',
            audio_fallback: 'Ваш браузер не підтримує аудіоплеєр HTML5.',
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
        iframe.src = 'https://player-widget.mixcloud.com/widget/iframe/?hide_cover=1&hide_artwork=1&feed=%2FDavidKRK%2Fdavid-krk-life-good-techno-ep3%2F';
        iframe.allow = 'autoplay; encrypted-media; fullscreen; idle-detection; speaker-selection; web-share';

        mixcloudPlayerContainer.appendChild(iframe);

        mixcloudPlayerTrigger.setAttribute('aria-expanded', 'true');
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
        if (!Object.prototype.hasOwnProperty.call(langContent, lang)) lang = 'en';
        langContents.forEach(content => {
            content.classList.remove('active');
            content.hidden = true;
        });
        langBtns.forEach(b => b.classList.remove('active'));

        const contentsToShow = document.querySelectorAll(`.lang-content[data-lang="${lang}"]`);
        contentsToShow.forEach(content => {
            content.classList.add('active');
            content.hidden = false;
        });

        const activeBtn = document.querySelector(`.language-btn[data-lang="${lang}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }

        document.documentElement.lang = lang;
        document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

        localStorage.setItem('davidkrk_lang', lang);

        const t = langContent[lang];
        newsLink.textContent = t.news;
        beautifulCover.alt = t.beautiful_cover;
        beautifulEyebrow.textContent = t.beautiful_eyebrow;
        beautifulDescription.textContent = t.beautiful_description;
        beautifulAudioFallback.textContent = t.audio_fallback;
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
            switchLanguage(btn.dataset.lang);
        });
    });

    switchLanguage(localStorage.getItem('davidkrk_lang') || 'en');
});
