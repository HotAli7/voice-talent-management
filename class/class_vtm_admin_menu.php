<?php

if (!defined('ABSPATH')) {
    exit;
}

class Class_VTM_Admin_Menu
{
    private $vtm_template_data;

    public function __construct()
    {
        require_once ('vtm_templates.php');

        $this->vtm_template_data = new VTM_Templates();
    }

    public function create_vtm_admin_menu() {

        $page_title = 'Dashboard'; //page title
        $menu_title = 'Voice Talent Management'; //menu title
        $capability = 'manage_options';
        $menu_slug = 'lfmaudio-vtm'; //menu slug
        $function = array($this->vtm_template_data, 'voice_talent_dashboard_template'); //function
        $menu_icon_name = 'dashicons-microphone';
        $menu_position = 10;
        add_menu_page($page_title, $menu_title, $capability, $menu_slug, $function, $menu_icon_name, $menu_position);

        $parent_slug = $menu_slug;
        $sub_page_title = 'Dashboard'; //page title
        $sub_menu_title = 'Dashboard'; //menu title
        $sub_capability = 'manage_options';
        $sub_menu_slug = 'lfmaudio-vtm'; //menu slug
        $sub_function = array($this->vtm_template_data, 'voice_talent_dashboard_template'); //function
        $sub_menu_icon_name = plugin_dir_url(__FILE__) . 'images/icon_wporg.png';
        $sub_menu_position = 1;
        add_submenu_page($parent_slug, $sub_page_title, $sub_menu_title, $sub_capability, $sub_menu_slug, $sub_function, $sub_menu_icon_name, $sub_menu_position);

        $parent_slug = $menu_slug;
        $sub_page_title = 'Voice Talents';
        $sub_menu_title = 'Voice Talents';
        $sub_capability = 'manage_options';
        $sub_menu_slug = 'vtm-voice_talents';
        $sub_function = array($this->vtm_template_data, 'voice_talent_template');;
        $sub_menu_icon_name = plugin_dir_url(__FILE__) . 'images/icon_wporg.png';
        $sub_menu_position = 2;
        add_submenu_page($parent_slug, $sub_page_title, $sub_menu_title, $sub_capability, $sub_menu_slug, $sub_function, $sub_menu_icon_name, $sub_menu_position);
    }

}