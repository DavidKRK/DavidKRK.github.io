<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
    <div class="container">
        <nav class="main-navigation">
            <div class="site-branding">
                <h1 class="site-title">
                    <a href="<?php echo esc_url(home_url('/')); ?>">
                        David KRK
                    </a>
                </h1>
            </div>
            <ul class="nav-menu">
                <li><a href="<?php echo esc_url(home_url('/bio')); ?>">BIO</a></li>
                <li><a href="<?php echo esc_url(home_url('/a-propos')); ?>">À PROPOS</a></li>
                <li><a href="<?php echo esc_url(home_url('/contact')); ?>">CONTACT</a></li>
                <li><a href="<?php echo esc_url(home_url('/evenements')); ?>">ÉVÈNEMENTS</a></li>
                <li><a href="<?php echo esc_url(home_url('/musique')); ?>">MUSIQUE</a></li>
                <li><a href="<?php echo esc_url(home_url('/page-dexemple')); ?>">PAGE D'EXEMPLE</a></li>
            </ul>
        </nav>
    </div>
</header>

    <main id="main" class="site-main">
