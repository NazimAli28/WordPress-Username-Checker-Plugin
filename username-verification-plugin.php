<?php
/*
Plugin Name: WordPress Username Checker Plugin
Description: WordPress plugin that checks usernames against a Google Sheets document using the Google Sheets API.
Version: 1.0
Author: Nazim Ali
*/

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Enqueue frontend JavaScript and CSS
function enqueue_username_verification_assets() {
    // Get the path to the CSS file
    $css_file = plugin_dir_path(__FILE__) . 'username-verification.css';
    $js_file = plugin_dir_path(__FILE__) . 'username-verification.js';

    // Enqueue the custom CSS with the file modification time as the version number
    wp_enqueue_style(
        'username-verification-style', 
        plugin_dir_url(__FILE__) . 'username-verification.css', 
        array(), 
        filemtime($css_file) // Use file modification time as version number
    );

    // Enqueue the Google API script
    wp_enqueue_script('google-api', 'https://apis.google.com/js/api.js', array(), null, true);

    // Enqueue your custom JS with the file modification time as the version number
    wp_enqueue_script(
        'username-verification-script', 
        plugin_dir_url(__FILE__) . 'username-verification.js', 
        array('google-api', 'jquery'), 
        filemtime($js_file), // Use file modification time as version number
        true // Load in footer
    );

    // Pass sensitive data securely from PHP to JavaScript
    wp_localize_script('username-verification-script', 'usernameData', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'api_key'  => GOOGLE_API_KEY,
        'sheet_id' => GOOGLE_SHEET_ID,
        'ranges'   => GOOGLE_SHEET_RANGES
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_username_verification_assets', 20);

// Create a shortcode to display the search box
function display_username_search_box() {
    ob_start();
    ?>
    <div class="search-container">
        <input type="text" id="searchInput" placeholder="Enter Username" />
        <button id="searchButton" disabled>Search</button>
    </div>

    <!-- The Modal -->
    <div id="myModal" class="modal" style="display: none">
        <div class="modal-content">
            <span class="close">&times;</span>
			<p id="modalMessage"></p>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('username_search', 'display_username_search_box');

// AJAX handler (if server-side search is implemented)
add_action('wp_ajax_nopriv_verify_username', 'verify_username_callback');
add_action('wp_ajax_verify_username', 'verify_username_callback');

function verify_username_callback() {
    // Server-side code for username verification (if needed)
}