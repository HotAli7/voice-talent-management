<?php
/*
    Plugin Name: Voice Talent Management
    Description: To Manage Voice Talents in the websites of LFM Company
    Author: hotali7
    Version: 2.0
    Text Domain: vtm
*/

if (!defined('ABSPATH')) {
    exit;
}

// Voice Talent Management Version for Welcome Page (leave atop as to not forget to change)
if (! defined('VTM_VERSION')) {
    define('VTM_VERSION', '2.0');
}
class LFMAudioVTM {

    public function __construct()
    {
        $this->define_constants();
        /**
         * Create tables and Seed Datas for this plugins
         */
        register_activation_hook( __FILE__, array($this, 'create_voice_talent_database') );
        register_activation_hook( __FILE__, array($this,'seed_voice_talent_database') );

        add_action( 'admin_menu', array($this, 'voice_talent_management_menu') );

        $this->vtm_init();
        $this->vtm_enqueue_assets();
    }

    protected function define_constants()
    {
        if (! defined('VTM_BASE_FILE')) {
            define('VTM_BASE_FILE', __FILE__);
        }
        if (! defined('VTM_BASE_DIR')) {
            define('VTM_BASE_DIR', dirname(VTM_BASE_FILE));
        }
        if (! defined('VTM_PLUGIN_URL')) {
            define('VTM_PLUGIN_URL', plugin_dir_url(__FILE__));
        }
        if (! defined('VTM_PLUGIN_DIR')) {
            define('VTM_PLUGIN_DIR', plugin_dir_path(__FILE__));
        }
        if (! defined('VTM_DIR_NAME')) { //Plugin Folder Name.
            define('VTM_DIR_NAME', trim(dirname(plugin_basename(__FILE__)), '/'));
        }
    }

    // 	Create database tables if it doesnt exist
    protected function create_voice_talent_database() {

        if (!current_user_can('manage_options')) {
            return;
        }

        include(plugin_dir_path(__FILE__) . 'migration/db_create.php');
    }

    // 	Install default data
    protected function seed_voice_talent_database()
    {
        if (!current_user_can('manage_options')) {
            return;
        }

        include(plugin_dir_path(__FILE__) . 'migration/db_populate.php');
    }

    // 	Creates voice talent management menu
    public function voice_talent_management_menu()
    {
        if (!current_user_can('manage_options')) {
            return;
        }

        require_once('class/class_vtm_admin_menu.php');

        $menu = new Class_VTM_Admin_Menu();

        $menu->create_vtm_admin_menu();
    }

    protected function vtm_enqueue_assets()
    {
        $page_slug = isset($_REQUEST['page'])?$_REQUEST['page']:'';

        if ($page_slug == 'vtm-voice_talents')
        {
            wp_deregister_style('wp-admin');
            wp_enqueue_script('vtm_script', VTM_PLUGIN_URL . 'assets/dist/main.min.js', ['jquery'], "", true);
//            wp_enqueue_style('vtm_style', VTM_PLUGIN_URL . 'assets/dist/main.css', []);
        }
    }

    /**
     *  Show Status of Voice Talents on Dashboard.
     */

    // 	Loads admin dashboard
    protected function vtm_init ()
    {
        require_once('class/vtm_templates.php');
        require_once('class/class_vtm_rest_api.php');

        new VTM_Templates();
        new ClassVTMRestAPI();
    }
}

new LFMAudioVTM();
