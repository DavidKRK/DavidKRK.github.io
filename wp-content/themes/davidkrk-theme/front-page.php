<?php get_header(); ?>

<div class="hero-section">
    <div class="container">
        <div class="profile-section">
            <div class="profile-circle">
                <?php 
                $profile_image = get_theme_file_uri('images/david-krk-profile.jpg');
                if ($profile_image) : ?>
                    <img src="<?php echo esc_url($profile_image); ?>" alt="David KRK" class="profile-image">
                <?php else : ?>
                    <span class="profile-placeholder">Photo de pro</span>
                <?php endif; ?>
            </div>
            
            <h1 class="hero-title">David KRK</h1>
            <p class="hero-tagline">"May The Techno Be With You"</p>
            
            <div class="social-links">
                <a href="#" class="social-link">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a href="#" class="social-link">
                    <i class="fab fa-youtube"></i>
                </a>
                <a href="#" class="social-link">
                    <i class="fab fa-instagram"></i>
                </a>
            </div>
            
            <div class="cta-buttons">
                <a href="#" class="cta-button primary">
                    Écouter ma musique <i class="fas fa-chevron-down"></i>
                </a>
                <a href="#" class="cta-button secondary">Me suivre</a>
            </div>
        </div>
    </div>
</div>

<footer class="site-footer">
    <p class="copyright">&copy; <?php echo date('Y'); ?> David KRK - All rights reserved</p>
    <p class="tagline">"May The Techno Be With You"</p>
</footer>

<?php get_footer(); ?>
