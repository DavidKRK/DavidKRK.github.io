<?php get_header(); ?>

<div class="hero-section">
    <div class="container">
        <div class="hero-content">
            <div class="profile-section">
                <img src="<?php echo get_theme_file_uri('assets/images/profile.jpg'); ?>" alt="Photo de profil" class="hero-image">
                <h1><?php bloginfo('name'); ?></h1>
                <p class="tagline">"May The Techno Be With You"</p>
            </div>

            <div class="action-section">
                <div class="social-links">
                    <?php if (get_theme_mod('facebook_url')) : ?>
                        <a href="<?php echo esc_url(get_theme_mod('facebook_url')); ?>" 
                           target="_blank" 
                           rel="noopener noreferrer">
                            <i class="fab fa-facebook"></i>
                        </a>
                    <?php endif; ?>

                    <?php if (get_theme_mod('youtube_url')) : ?>
                        <a href="<?php echo esc_url(get_theme_mod('youtube_url')); ?>" 
                           target="_blank" 
                           rel="noopener noreferrer">
                            <i class="fab fa-youtube"></i>
                        </a>
                    <?php endif; ?>

                    <?php if (get_theme_mod('instagram_url')) : ?>
                        <a href="<?php echo esc_url(get_theme_mod('instagram_url')); ?>" 
                           target="_blank" 
                           rel="noopener noreferrer">
                            <i class="fab fa-instagram"></i>
                        </a>
                    <?php endif; ?>
                </div>

                <div class="cta-buttons">
                    <div class="dropdown">
                        <a href="#" class="button primary-button">
                            <span>Écouter ma musique</span>
                            <i class="fas fa-chevron-down"></i>
                        </a>
                        <div class="dropdown-menu">
                            <a href="https://soundcloud.com/davidkrk" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               class="dropdown-item">
                                <svg class="platform-icon soundcloud" viewBox="0 0 24 24">
                                    <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.052-.1-.102-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.172 1.234c.013.057.045.093.104.093.057 0 .091-.039.104-.093l.193-1.234-.193-1.332c-.013-.057-.047-.094-.104-.094M2.361 11.583c-.067 0-.12.053-.128.12L2 14.479l.233 2.159c.008.066.061.114.128.114.065 0 .118-.048.126-.114l.255-2.159-.255-2.777c-.008-.066-.061-.119-.126-.119"/>
                                </svg>
                                Listen on SoundCloud
                            </a>
                            <a href="https://www.mixcloud.com/DavidKRK/" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               class="dropdown-item">
                                <svg class="platform-icon mixcloud" viewBox="0 0 24 24">
                                    <path d="M21.95 19.062c-.154 0-.31-.045-.445-.135-.369-.25-.465-.75-.225-1.11.51-.775.775-1.665.775-2.615 0-.95-.266-1.841-.776-2.6-.24-.36-.146-.86.224-1.11.371-.25.871-.15 1.121.22.725 1.025 1.1 2.215 1.1 3.49 0 1.275-.375 2.465-1.1 3.49-.156.225-.406.37-.674.37z"/>
                                </svg>
                                Listen on Mixcloud
                            </a>
                        </div>
                    </div>
                    <a href="#contact" class="button secondary-button">
                        Me suivre
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
if (have_posts()) :
    while (have_posts()) : the_post();
        get_template_part('template-parts/content', get_post_type());
    endwhile;
    
    the_posts_navigation();
else :
    get_template_part('template-parts/content', 'none');
endif;
?>

<?php get_footer(); ?>
