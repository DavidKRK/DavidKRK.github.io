<?php

// Register Navigation Menus
function davidkrk_register_menus() {
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'davidkrk'),
        'footer' => __('Footer Menu', 'davidkrk')
    ));
}
add_action('init', 'davidkrk_register_menus');

// Add Theme Support
function davidkrk_theme_support() {
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
}
add_action('after_setup_theme', 'davidkrk_theme_support');

// Custom Menu Walker for Tailwind CSS classes
class DavidKRK_Menu_Walker extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
        $output .= "<li class='mr-6'>";
        $output .= sprintf(
            '<a href="%s" class="text-lg text-gray-400 hover:text-orange-500 transition-colors duration-300">%s</a>',
            esc_url($item->url),
            esc_html($item->title)
        );
    }
}

// Custom Menu Walker for Mobile Menu
class DavidKRK_Mobile_Menu_Walker extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
        $output .= "<li>";
        $output .= sprintf(
            '<a href="%s" class="block px-3 py-2 text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 rounded-md">%s</a>',
            esc_url($item->url),
            esc_html($item->title)
        );
    }
}

// Enqueue Scripts and Styles
function davidkrk_enqueue_scripts() {
    wp_enqueue_style('davidkrk-style', get_stylesheet_uri());
}
add_action('wp_enqueue_scripts', 'davidkrk_enqueue_scripts');

// Include the customizer settings
require get_template_directory() . '/customizer.php';
