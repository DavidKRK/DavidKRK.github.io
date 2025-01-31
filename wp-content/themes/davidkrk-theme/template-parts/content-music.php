<?php
/**
 * Template part for displaying the Music page content
 */
?>

<div class="music-section">
    <div class="container">
        <h1 class="page-title">Musique</h1>
        
        <div class="music-content">
            <div class="latest-releases">
                <h2>Dernières sorties</h2>
                <div class="releases-grid">
                    <div class="release-card">
                        <div class="release-cover">
                            <img src="<?php echo get_theme_file_uri('assets/images/release-cover.jpg'); ?>" alt="Cover art">
                            <div class="play-overlay">
                                <i class="fas fa-play"></i>
                            </div>
                        </div>
                        <div class="release-info">
                            <h3>Titre du morceau</h3>
                            <p>Album / EP</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="music-platforms">
                <h2>Écoutez ma musique</h2>
                <div class="platform-links">
                    <a href="#" class="platform-button soundcloud">
                        <i class="fab fa-soundcloud"></i>
                        SoundCloud
                    </a>
                    <a href="#" class="platform-button mixcloud">
                        <i class="fab fa-mixcloud"></i>
                        Mixcloud
                    </a>
                    <a href="#" class="platform-button spotify">
                        <i class="fab fa-spotify"></i>
                        Spotify
                    </a>
                </div>
            </div>

            <div class="mixes-section">
                <h2>Derniers mix</h2>
                <div class="mixes-grid">
                    <!-- Intégration SoundCloud ou Mixcloud -->
                </div>
            </div>
        </div>
    </div>
</div>
