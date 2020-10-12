<?php

if (!defined('ABSPATH')) {
    exit;
}

class VTM_Templates
{
    public function __construct()
    {

    }

    /**
     *  Show Status of Voice Talents on Dashboard.
     */

    function voice_talent_dashboard_template()
    {
        // check user capabilities
        if (!current_user_can('manage_options')) {
            return;
        }

        include(VTM_BASE_DIR . '/templates/dashboard.php');
    }

    /**
     *  Show List of Voice Talents on Voice Talent Page.
     */

    function voice_talent_template()
    {
        // check user capabilities
        if (!current_user_can('manage_options')) {
            return;
        }

        include(VTM_BASE_DIR . '/templates/voice_talent.php');
    }
}