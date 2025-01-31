<?php

function davidkrk_customize_register($wp_customize) {
    // Social Media Section
    $wp_customize->add_section('davidkrk_social_media', array(
        'title' => __('Social Media Links', 'davidkrk'),
        'priority' => 30,
    ));

    // Facebook URL
    $wp_customize->add_setting('facebook_url', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw'
    ));

    $wp_customize->add_control('facebook_url', array(
        'label' => __('Facebook URL', 'davidkrk'),
        'section' => 'davidkrk_social_media',
        'type' => 'url'
    ));

    // YouTube URL
    $wp_customize->add_setting('youtube_url', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw'
    ));

    $wp_customize->add_control('youtube_url', array(
        'label' => __('YouTube URL', 'davidkrk'),
        'section' => 'davidkrk_social_media',
        'type' => 'url'
    ));

    // Instagram URL
    $wp_customize->add_setting('instagram_url', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw'
    ));

    $wp_customize->add_control('instagram_url', array(
        'label' => __('Instagram URL', 'davidkrk'),
        'section' => 'davidkrk_social_media',
        'type' => 'url'
    ));

    // SoundCloud URL
    $wp_customize->add_setting('soundcloud_url', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw'
    ));

    $wp_customize->add_control('soundcloud_url', array(
        'label' => __('SoundCloud URL', 'davidkrk'),
        'section' => 'davidkrk_social_media',
        'type' => 'url'
    ));

    // Mixcloud URL
    $wp_customize->add_setting('mixcloud_url', array(
        'default' => '',
        'sanitize_callback' => 'esc_url_raw'
    ));

    $wp_customize->add_control('mixcloud_url', array(
        'label' => __('Mixcloud URL', 'davidkrk'),
        'section' => 'davidkrk_social_media',
        'type' => 'url'
    ));
}
add_action('customize_register', 'davidkrk_customize_register');
