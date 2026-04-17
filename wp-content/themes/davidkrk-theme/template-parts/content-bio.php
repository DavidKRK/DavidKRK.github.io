<?php
/**
 * Template part for displaying the Bio page content
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class('bio-page'); ?>>
    <div class="container">
        <header class="page-header">
            <h1 class="page-title">Biographie</h1>
        </header>

        <div class="bio-content">
            <?php the_content(); ?>
        </div>
    </div>
</article>
