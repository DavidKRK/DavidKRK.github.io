<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress_local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'RoU6^GY!D$qslk{?ob .LZViK|!KW*Y,(6-,Q?&Oe[KqdX|##=m0x=x4U:d)kNTW' );
define( 'SECURE_AUTH_KEY',  '5pPjP,jrw081+tQ&{H#?(tlJ(@hf8}Pyj`:w.^)]Q>RD#vkEfp{V!wYR!LtPp2Sg' );
define( 'LOGGED_IN_KEY',    'v>pcUF)t(Q??4FQ)4,l)ae6n]>VAv/pC&}7}52lzO,Gl=4_)vdQt>F~X#6f+dyU^' );
define( 'NONCE_KEY',        'O(v<R?pM={Khao0$W%>~*JQ5^uFwtu7$;H-.qy$ xSc^6 ){Mr5G5KD1w`:$3Q>y' );
define( 'AUTH_SALT',        ';5XLBj#Icr&Wl8>eW8ON<)hF:_)&1z3{f=raC18B0uf{+7|18^o-xP;emz%Em3jq' );
define( 'SECURE_AUTH_SALT', '9F [zTrNnYm4jy/DG-I4:_]074rHq+%I/_Q?H3vBXU1Tj+%S$dMF1K?wVI<r^~kJ' );
define( 'LOGGED_IN_SALT',   'va// &!w POGb/9?pfy]L%*/4~{Bv,f|7/y?ygSLFy5p9T8rZ+eyf5C@EF(.RP>N' );
define( 'NONCE_SALT',       'nNx|GK%q.8rVS?ZJ8v:]H4,>+NfV#>xDb@E^PL3qw d*/Zd&%6Z5metOjkILqa0U' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */




define('WP_HOME', 'https://davidkrk.live/');
define('WP_SITEURL', 'https://davidkrk.live/');
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
