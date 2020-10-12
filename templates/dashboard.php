<div id="app" class="wrap">
    <h1 class="text-info"><?= esc_html(get_admin_page_title()); ?></h1>
    <form action="options.php" method="post">
        <p>
            <?php
            // output security fields for the registered setting "wporg_options"
            settings_fields('wporg_options');
            // output setting sections and their fields
            // (sections are registered for "wporg", each field is registered to a specific section)
            do_settings_sections('wporg');
            ?>
        </p>
        <?php
            // output save settings button
            submit_button('Save Settings');
        ?>
    </form>
</div>
