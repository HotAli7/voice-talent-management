<?php

if (!defined('ABSPATH')) {
    exit;
}

class ClassVTMRestAPI
{
    public function __construct()
    {
        add_action( 'rest_api_init', array( $this, 'register_vtm_rest_api_route' ) );

        require_once(ABSPATH . "wp-admin" . '/includes/image.php');
        require_once(ABSPATH . "wp-admin" . '/includes/file.php');
        require_once(ABSPATH . "wp-admin" . '/includes/media.php');
    }

    public function register_vtm_rest_api_route() {
        register_rest_route( 'vtm/v1', 'voice-talents',array(
            'methods'  => 'GET',
            'callback' => array( $this, 'get_voice_talent_list' )
        ));
        register_rest_route( 'vtm/v1', 'insert-talent',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'insert_voice_talent' )
        ));
        register_rest_route( 'vtm/v1', 'update-talent',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'update_voice_talent' )
        ));
        register_rest_route( 'vtm/v1', 'delete-talent',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'delete_voice_talent' )
        ));
        register_rest_route( 'vtm/v1', 'voice-talent-media(?:/(?P<id>\d+))?',array(
            'methods'  => 'GET',
            'callback' => array( $this, 'get_voice_talent_media' ),
            'args' => [
                'id'
            ],
        ));
        register_rest_route( 'vtm/v1', 'talent-age-group',array(
            'methods'  => 'GET',
            'callback' => array( $this, 'get_age_group_data' )
        ));
        register_rest_route( 'vtm/v1', 'insert-age',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'insert_age' )
        ));
        register_rest_route( 'vtm/v1', 'update-age',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'update_age' )
        ));
        register_rest_route( 'vtm/v1', 'delete-age',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'delete_age' )
        ));
        register_rest_route( 'vtm/v1', 'talent-languages',array(
            'methods'  => 'GET',
            'callback' => array( $this, 'get_language_data' )
        ));
        register_rest_route( 'vtm/v1', 'insert-language',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'insert_language' )
        ));
        register_rest_route( 'vtm/v1', 'update-language',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'update_language' )
        ));
        register_rest_route( 'vtm/v1', 'delete-language',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'delete_language' )
        ));
        register_rest_route( 'vtm/v1', 'talent-medias',array(
            'methods'  => 'GET',
            'callback' => array( $this, 'get_media_data' )
        ));
        register_rest_route( 'vtm/v1', 'insert-media',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'insert_media' )
        ));
        register_rest_route( 'vtm/v1', 'update-media',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'update_media' )
        ));
        register_rest_route( 'vtm/v1', 'delete-media',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'delete_media' )
        ));
        register_rest_route( 'vtm/v1', 'talent-platforms',array(
            'methods'  => 'GET',
            'callback' => array( $this, 'get_platform_data' )
        ));
        register_rest_route( 'vtm/v1', 'insert-platform',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'insert_platform' )
        ));
        register_rest_route( 'vtm/v1', 'update-platform',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'update_platform' )
        ));
        register_rest_route( 'vtm/v1', 'delete-platform',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'delete_platform' )
        ));
        register_rest_route( 'vtm/v1', 'talent-styles',array(
            'methods'  => 'GET',
            'callback' => array( $this, 'get_style_data' )
        ));
        register_rest_route( 'vtm/v1', 'insert-style',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'insert_style' )
        ));
        register_rest_route( 'vtm/v1', 'update-style',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'update_style' )
        ));
        register_rest_route( 'vtm/v1', 'delete-style',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'delete_style' )
        ));
        register_rest_route( 'vtm/v1', 'talent-tones',array(
            'methods'  => 'GET',
            'callback' => array( $this, 'get_tone_data' )
        ));
        register_rest_route( 'vtm/v1', 'insert-tone',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'insert_tone' )
        ));
        register_rest_route( 'vtm/v1', 'update-tone',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'update_tone' )
        ));
        register_rest_route( 'vtm/v1', 'delete-tone',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'delete_tone' )
        ));
        register_rest_route( 'vtm/v1', 'talent-accents',array(
            'methods'  => 'GET',
            'callback' => array( $this, 'get_accent_data' )
        ));
        register_rest_route( 'vtm/v1', 'insert-accent',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'insert_accent' )
        ));
        register_rest_route( 'vtm/v1', 'update-accent',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'update_accent' )
        ));
        register_rest_route( 'vtm/v1', 'delete-accent',array(
            'methods'  => 'POST',
            'callback' => array( $this, 'delete_accent' )
        ));
    }

    public function find_a_voice_media_dir( $param ){
        $mydir = '/fav';

        $param['path'] = $param['path'] . $mydir;
        $param['url'] = $param['url'] . $mydir;

        return $param;
    }

    public function get_voice_talent_list($request) {
        global $wpdb;

        $db_prefix = $wpdb->prefix;

        // if no sort, default to accent
        $orderby = (!empty($_GET['orderby'])) ? $_GET['orderby'] : 'talent_name';

        // if no order, default to asc
        $order = (!empty($_GET['order'])) ? $_GET['order'] : 'asc';

        $sql = "select a.id_voice_talent, a.talent_name, a.status, a.talent_gender, a.talent_age, b.gender, c.age, j.guid 
					from {$db_prefix}lfm_voice_talents a
					left join {$db_prefix}lfm_genders b on a.talent_gender = b.id_gender
					left join {$db_prefix}lfm_ages c on a.talent_age = c.id_age
					left join {$db_prefix}posts j on a.image_location = j.ID
					order by $orderby $order";

        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        $result = array('error'=>false);

        $result['talents'] = $db_data;
        $response = new WP_REST_Response($result);
        $response->set_status(200);

        return $response;
    }

    public function insert_voice_talent($request) {

        global $wpdb;
        $db_prefix = $wpdb->prefix;

        $tbl = $db_prefix . "lfm_voice_talents";

        $result = array('error'=>false);

        $talent_name = ucwords(strtolower($request['name']));
        // check if already exists
        $sql = "select talent_name from $tbl where talent_name = '$talent_name'";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        if (count($db_data) == 0) {
            $uploaded = 0;
            if(isset($_FILES['avatar'])){
                $avatar = $_FILES['avatar'];
                add_filter('upload_dir', array($this, 'find_a_voice_media_dir'));
                $uploaded=media_handle_upload('avatar', 0);
                remove_filter('upload_dir', array($this, 'find_a_voice_media_dir'));
            }
            $wpdb->insert(
                $tbl, //table
                array('talent_name' => $talent_name,
                    'talent_gender' => $request['gender'],
                    'talent_age' => $request['age'],
                    'image_location' => $uploaded,
                    'status' => $request['status']),
                array('%s') //data format
            );
            $result['message'] = "Voice talent added";
        } else {
            $result['error'] = true;
            $result['message'] = "Voice talent already exists";
        }
        return $result;
    }

    public function update_voice_talent($request) {

        global $wpdb;
        $db_prefix = $wpdb->prefix;

        $tbl = $db_prefix . "lfm_voice_talents";

        $result = array('error'=>false);
        if (isset($request['id']) && ($request['id'] != '')) {

            $uploaded = 0;
            if(isset($_FILES['avatar'])){
                $avatar = $_FILES['avatar'];
                add_filter('upload_dir', array($this, 'find_a_voice_media_dir'));
                $uploaded=media_handle_upload('avatar', 0);
                remove_filter('upload_dir', array($this, 'find_a_voice_media_dir'));
            }

            $talent_id = $request['id'];
            if ($uploaded == 0)
                $wpdb->update(
                    $tbl,
                    array('talent_name'         => $request['name'],
                        'talent_gender'         => $request['gender'],
                        'talent_age'            => $request['age'],
                        'status'                => $request['status']), // data
                    array('id_voice_talent' => $talent_id) // where
                );
            else
                $wpdb->update(
                    $tbl,
                    array('talent_name'         => $request['name'],
                        'talent_gender'         => $request['gender'],
                        'talent_age'            => $request['age'],
                        'image_location'        => $uploaded,
                        'status'                => $request['status']), // data
                    array('id_voice_talent' => $talent_id) // where
                );
            $result['message'] = "Voice talent updated";
        } else {
            $result['error'] = true;
            $result['message'] = "Can't find Voice talent";
        }
        return $result;
    }

    public function delete_voice_talent($request) {

        global $wpdb;
        $db_prefix = $wpdb->prefix;

        $tbl = $db_prefix . "lfm_voice_talents";
        $tbl_media = $db_prefix . "lfm_media_files";

        $result = array('error'=>false);
        if (isset($request['id']) && ($request['id'] != '')) {
            $talent_id = $request["id"];
            // check if any media is associated with this talentid
            $sql = "select id_media from $tbl_media where id_voice_talent = $talent_id";
            $db_data = $wpdb->get_results($sql, 'ARRAY_A');
            $wpdb->delete(
                $tbl_media,
                array("id_voice_talent" => $talent_id)
            );
            foreach ($db_data as $media)
                wp_delete_attachment($media['media_id'], true);
            $wpdb->delete(
                $tbl,
                array("id_voice_talent" => $talent_id)
            );
            $result['message'] = "Voice talent and related media files are deleted";
        }
        return $result;
    }

    public function get_voice_talent_media($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;

        // if no sort, default to talent name
        $orderby = (!empty($_GET['orderby'])) ? $_GET['orderby'] : 'talent_name';

        // if no order, default to asc
        $order = (!empty($_GET['order'])) ? $_GET['order'] : 'asc';

        // voice talent id
        $id_voice_talent = (!empty($request['id'])) ? $request['id'] : 0;
        $sql = "SELECT a.id_media, a.id_voice_talent, a.description, b.*, c.*, d.*, e.*, f.*, g.talent_name, h.gender, i.age, j.guid, k.guid as avatar
					FROM {$db_prefix}lfm_media_files a 
					left join {$db_prefix}lfm_accents b on a.accent = b.id_accent
					left join {$db_prefix}lfm_languages c on a.language = c.id_language 
					left join {$db_prefix}lfm_platforms d on a.platform = d.id_platform
					left join {$db_prefix}lfm_tones e on a.tone = e.id_tone
					left join {$db_prefix}lfm_styles f on a.style = f.id_style
					left join {$db_prefix}lfm_voice_talents g on a.id_voice_talent = g.id_voice_talent
					left join {$db_prefix}lfm_genders h on g.talent_gender = h.id_gender
					left join {$db_prefix}lfm_ages i on g.talent_age = i.id_age
					left join {$db_prefix}posts j on a.id_media = j.ID
					left join {$db_prefix}posts k on g.image_location = k.ID
					where a.id_voice_talent = $id_voice_talent
					order by $orderby $order";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        $result = array('error'=>false);

        $result['talent_medias'] = $db_data;
        $response = new WP_REST_Response($result);
        $response->set_status(200);

        return $response;
    }

    public function get_media_data($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;

        // if no sort, default to talent name
        $orderby = (!empty($_GET['orderby'])) ? $_GET['orderby'] : 'talent_name';

        // if no order, default to asc
        $order = (!empty($_GET['order'])) ? $_GET['order'] : 'asc';

        $sql = "SELECT a.id_media, a.id_voice_talent, a.description, b.*, c.*, d.*, e.*, f.*, g.talent_name, h.gender, i.age, j.guid, k.guid as avatar
					FROM {$db_prefix}lfm_media_files a 
					left join {$db_prefix}lfm_accents b on a.accent = b.id_accent
					left join {$db_prefix}lfm_languages c on a.language = c.id_language 
					left join {$db_prefix}lfm_platforms d on a.platform = d.id_platform
					left join {$db_prefix}lfm_tones e on a.tone = e.id_tone
					left join {$db_prefix}lfm_styles f on a.style = f.id_style
					left join {$db_prefix}lfm_voice_talents g on a.id_voice_talent = g.id_voice_talent
					left join {$db_prefix}lfm_genders h on g.talent_gender = h.id_gender
					left join {$db_prefix}lfm_ages i on g.talent_age = i.id_age
					left join {$db_prefix}posts j on a.id_media = j.ID
					left join {$db_prefix}posts k on g.image_location = k.ID
					order by $orderby $order";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        $result = array('error'=>false);

        $result['medias'] = $db_data;
        $response = new WP_REST_Response($result);
        $response->set_status(200);

        return $response;
    }

    public function insert_media($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_media = $db_prefix . "lfm_media_files";
        $result = array('error'=>false);

        if(isset($_FILES['media_file'])) {
            $media_file = $_FILES['media_file'];
            add_filter('upload_dir', array($this, 'find_a_voice_media_dir'));
            $uploaded = media_handle_upload('media_file', 0);
            remove_filter('upload_dir', array($this, 'find_a_voice_media_dir'));
            // Error checking using WP functions
            if (is_wp_error($uploaded)) {
                $result['error'] = true;
                $result['message'] = "Error uploading file: " . $uploaded->get_error_message();
            } else {
                $talent_id = ucwords(strtolower($request['id_voice_talent']));
                $wpdb->insert(
                    $tbl_media, //table
                    array(
                        'id_voice_talent'   => $talent_id,
                        'id_media'          => $uploaded,
                        'accent'            => $request['id_accent'],
                        'language'          => $request['id_language'],
                        'platform'          => $request['id_platform'],
                        'style'             => $request['id_style'],
                        'tone'              => $request['id_tone'],
                        'description'       => $request['description']),
                    array('%s') //data format
                );
                $result['message'] = "Voice talent media file added";
            }
        } else {
            $result['message'] = "Can't find Media file";
            $result['error'] = true;
        }
        $response = new WP_REST_Response($result);
        $response->set_status(200);

        return $response;
    }

    public function update_media($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_media = $db_prefix . "lfm_media_files";
        $result = array('error'=>false);

        if(isset($_FILES['media_file'])) {
            $media_file = $_FILES['media_file'];
            add_filter('upload_dir', array($this, 'find_a_voice_media_dir'));
            $uploaded = media_handle_upload('media_file', 0);
            remove_filter('upload_dir', array($this, 'find_a_voice_media_dir'));
            // Error checking using WP functions
            if (is_wp_error($uploaded)) {
                $result['error'] = true;
                $result['message'] = "Error uploading file: " . $uploaded->get_error_message();
            } else {
                $media_id = $request['id_media'];
                $talent_id = ucwords(strtolower($request['id_voice_talent']));
                $wpdb->update(
                    $tbl_media, //table
                    array(
                        'id_voice_talent'   => $talent_id,
                        'id_media'          => $uploaded,
                        'accent'            => $request['id_accent'],
                        'language'          => $request['id_language'],
                        'platform'          => $request['id_platform'],
                        'style'             => $request['id_style'],
                        'tone'              => $request['id_tone'],
                        'description'       => $request['description']),
                    array('id_media' => $media_id)
                );

            }
        } else {
            $media_id = $request['id_media'];
            $talent_id = ucwords(strtolower($request['id_voice_talent']));
            $wpdb->update(
                $tbl_media, //table
                array(
                    'id_voice_talent'   => $talent_id,
                    'accent'            => $request['id_accent'],
                    'language'          => $request['id_language'],
                    'platform'          => $request['id_platform'],
                    'style'             => $request['id_style'],
                    'tone'              => $request['id_tone'],
                    'description'       => $request['description']),
                array('id_media' => $media_id)
            );
        }
        $result['message'] = "Voice talent media file edited";
        $response = new WP_REST_Response($result);
        $response->set_status(200);

        return $response;
    }

    public function delete_media($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_media = $db_prefix . "lfm_media_files";
        $result = array('error'=>false);

        $media_id = $request["id_media"];
        $wpdb->delete(
            $tbl_media,
            array("id_media" => $media_id)
        );
        wp_delete_attachment($media_id, true);
        $result['message'] = "Voice talent media file deleted";
        return $result;
    }

    public function get_accent_data($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;

        // if no sort, default to accent
        $orderby = (!empty($_GET['orderby'])) ? $_GET['orderby'] : 'accent';

        // if no order, default to asc
        $order = (!empty($_GET['order'])) ? $_GET['order'] : 'asc';

        $sql = "select * from {$db_prefix}lfm_accents order by $orderby $order";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        $result = array('error'=>false);

        $result['accents'] = $db_data;
        $response = new WP_REST_Response($result);
        $response->set_status(200);

        return $response;
    }

    public function insert_accent($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_accent = $db_prefix . "lfm_accents";
        $result = array('error'=>false);

        $accent = ucwords(strtolower($request['accent']));
        // check if already exists
        $sql = "select accent from $tbl_accent where accent = '$accent'";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        if (count($db_data) == 0) {
            $wpdb->insert(
                $tbl_accent, //table
                array('accent' => $accent), //data
                array('%s') //data format
            );
            $result['message'] = "Accent added";
        } else {
            $result['error'] = true;
            $result['message'] = "Accent already exists";
        }
        return $result;
    }

    public function update_accent($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_accent = $db_prefix . "lfm_accents";
        $result = array('error'=>false);

        $accent_id = $request["id_accent"];

        $accent = ucwords(strtolower($request['accent']));
        // check if already exists
        $sql = "select accent from $tbl_accent where accent = '$accent'";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        if (count($db_data) == 0) {
            $wpdb->update(
                $tbl_accent, //table
                array('accent' => $accent), //data
                array('id_accent' => $accent_id)
            );
            $result['message'] = "Accent updated";
        } else {
            $result['error'] = true;
            $result['message'] = "Accent already exists";
        }
        return $result;
    }

    public function delete_accent($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_accent = $db_prefix . "lfm_accents";
        $tbl_media = $db_prefix . "lfm_media_files";
        $result = array('error'=>false);

        $accent_id = $request["id_accent"];
        // check if any media is associated with this accent_id
        $sql = "select count(id_media) as total from $tbl_media where accent = $accent_id";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');
        if ($db_data[0]['total'] == 0) {
            $wpdb->delete(
                $tbl_accent,
                array("id_accent" => $accent_id)
            );
            $result['message'] = "Accent deleted";
        } else {
            $result['message'] = "Not possible to delete as there are media files associated with this accent";
            $result['error'] = true;
        }
        return $result;
    }

    public function get_age_group_data($request) {
        global $wpdb;

        $db_prefix = $wpdb->prefix;

        // if no sort, default to id
        $orderby = (!empty($_GET['orderby'])) ? $_GET['orderby'] : 'id_age';

        // if no order, default to asc
        $order = (!empty($_GET['order'])) ? $_GET['order'] : 'asc';

        $sql = "select * from {$db_prefix}lfm_ages order by $orderby $order";

        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        $result = array('error'=>false);

        $result['age_group'] = $db_data;
        $response = new WP_REST_Response($result);
        $response->set_status(200);

        return $response;
    }

    public function insert_age($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_age = $db_prefix . "lfm_ages";
        $result = array('error'=>false);

        $age = ucwords(strtolower($request['age']));
        // check if already exists
        $sql = "select ages from $tbl_age where age = '$age'";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        if (count($db_data) == 0) {
            $wpdb->insert(
                $tbl_age, //table
                array('age' => $age), //data
                array('%s') //data format
            );
            $result['message'] = "Age group added";
        } else {
            $result['error'] = true;
            $result['message'] = "Age group already exists";
        }
        return $result;
    }

    public function update_age($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_age = $db_prefix . "lfm_ages";
        $result = array('error'=>false);

        $age = ucwords(strtolower($request['age']));
        $id_age = $request["id_age"];

        if (isset($request['id_age']) && ($request['id_age'] != '')) {
            $wpdb->update(
                $tbl_age, //table
                array('age' => $age), //data
                array("id_age" => $id_age)
            );
            $result['message'] = "Age group updated";
        } else {
            $result['error'] = true;
            $result['message'] = "Can't find Age group";
        }
        return $result;
    }

    public function delete_age($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_age = $db_prefix . "lfm_ages";
        $tbl_media = $db_prefix . "lfm_media_files";
        $result = array('error'=>false);

        $id_age = $request["id_age"];
        // check if any media is associated with this ageid
        $sql = "select count(id_media) as total from $tbl_media where age = $id_age";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');
        if ($db_data[0]['total'] == 0) {
            $wpdb->delete(
                $tbl_age,
                array("id_age" => $id_age)
            );
            $result['message'] = "Age group deleted";
        } else {
            $result['message'] = "Not possible to delete as there are media files associated with this age group";
            $result['error'] = true;
        }
        return $result;
    }

    public function get_language_data($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;

        // if no sort, default to language
        $orderby = (!empty($_GET['orderby'])) ? $_GET['orderby'] : 'language';

        // if no order, default to asc
        $order = (!empty($_GET['order'])) ? $_GET['order'] : 'asc';

        $sql = "select * from {$db_prefix}lfm_languages order by $orderby $order";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        $result = array('error'=>false);

        $result['languages'] = $db_data;
        $response = new WP_REST_Response($result);
        $response->set_status(200);

        return $response;
    }

    public function insert_language($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_language = $db_prefix . "lfm_languages";
        $result = array('error'=>false);

        $language = ucwords(strtolower($request['language']));
        // check if already exists
        $sql = "select language from $tbl_language where language = '$language'";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        if (count($db_data) == 0) {
            $wpdb->insert(
                $tbl_language, //table
                array('language' => $language), //data
                array('%s') //data format
            );
            $result['message'] = "Language added";
        } else {
            $result['error'] = true;
            $result['message'] = "Language already exists";
        }
        return $result;
    }

    public function update_language($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_language = $db_prefix . "lfm_languages";
        $result = array('error'=>false);

        $language = ucwords(strtolower($request['language']));
        $id_language = $request["id_language"];

        if (isset($request['id_language']) && ($request['id_language'] != '')) {
            $wpdb->update(
                $tbl_language, //table
                array('language' => $language), //data
                array("id_language" => $id_language)
            );
            $result['message'] = "Language updated";
        } else {
            $result['error'] = true;
            $result['message'] = "Can't find Language";
        }
        return $result;
    }

    public function delete_language($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_language = $db_prefix . "lfm_languages";
        $tbl_media = $db_prefix . "lfm_media_files";
        $result = array('error'=>false);

        $id_language = $request["id_language"];
        // check if any media is associated with this id_language
        $sql = "select count(id_media) as total from $tbl_media where language = $id_language";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');
        if ($db_data[0]['total'] == 0) {
            $wpdb->delete(
                $tbl_language,
                array("id_language" => $id_language)
            );
            $result['message'] = "Language deleted";
        } else {
            $result['message'] = "Not possible to delete as there are media files associated with this language";
            $result['error'] = true;
        }
        return $result;
    }

    public function get_platform_data($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;

        // if no sort, default to platform
        $orderby = (!empty($_GET['orderby'])) ? $_GET['orderby'] : 'platform';

        // if no order, default to asc
        $order = (!empty($_GET['order'])) ? $_GET['order'] : 'asc';

        $sql = "select * from {$db_prefix}lfm_platforms order by $orderby $order";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        $result = array('error'=>false);

        $result['platforms'] = $db_data;
        $response = new WP_REST_Response($result);
        $response->set_status(200);

        return $response;
    }

    public function insert_platform($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_platform = $db_prefix . "lfm_platforms";
        $result = array('error'=>false);

        $platform = ucwords(strtolower($request['platform']));

        $sql = "select platform from $tbl_platform where platform = '$platform'";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        if (count($db_data) == 0) {
            $wpdb->insert(
                $tbl_platform, //table
                array('platform' => $platform), //data
                array('%s') //data format
            );
            $result['message'] = "Platform added";
        } else {
            $result['error'] = true;
            $result['message'] = "Platform already exists";
        }
        return $result;
    }

    public function update_platform($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_platform = $db_prefix . "lfm_platforms";
        $result = array('error'=>false);

        $platform = ucwords(strtolower($request['platform']));
        $id_platform = $request["id_platform"];

        $sql = "select platform from $tbl_platform where platform = '$platform'";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        if (count($db_data) == 0) {
            $wpdb->update(
                $tbl_platform, //table
                array('platform' => $platform), //data
                array("id_platform" => $id_platform)
            );
            $result['message'] = "Platform updated";
        } else {
            $result['error'] = true;
            $result['message'] = "Platform already exists";
        }
        return $result;
    }

    public function delete_platform($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_platform = $db_prefix . "lfm_platforms";
        $tbl_media = $db_prefix . "lfm_media_files";
        $result = array('error'=>false);

        $id_platform = $request["id_platform"];
        // check if any media is associated with this id_platform
        $sql = "select count(id_media) as total from $tbl_media where platform=$id_platform";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');
        if ($db_data[0]['total'] == 0) {
            $wpdb->delete(
                $tbl_platform,
                array("id_platform" => $id_platform)
            );
            $result['message'] = "Platform deleted";
        } else {
            $result['message'] = "Not possible to delete as there are media files associated with this platform";
            $result['error'] = true;
        }
        return $result;
    }

    public function get_style_data($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;

        // if no sort, default to style
        $orderby = (!empty($_GET['orderby'])) ? $_GET['orderby'] : 'style';

        // if no order, default to asc
        $order = (!empty($_GET['order'])) ? $_GET['order'] : 'asc';

        $sql = "select * from {$db_prefix}lfm_styles order by $orderby $order";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        $result = array('error'=>false);

        $result['styles'] = $db_data;
        $response = new WP_REST_Response($result);
        $response->set_status(200);

        return $response;
    }

    public function insert_style($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_style = $db_prefix . "lfm_styles";
        $result = array('error'=>false);

        $style = ucwords(strtolower($request['style']));
        // check if already exists
        $sql = "select style from $tbl_style where style = '$style'";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        if (count($db_data) == 0) {
            $wpdb->insert(
                $tbl_style, //table
                array('style' => $style), //data
                array('%s') //data format
            );
            $result['message'] = "Style added";
        } else {
            $result['error'] = true;
            $result['message'] = "Style already exists";
        }
        return $result;
    }

    public function update_style($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_style = $db_prefix . "lfm_styles";
        $result = array('error'=>false);

        $id_style = $request["id_style"];

        $style = ucwords(strtolower($request['style']));
        // check if already exists
        $sql = "select style from $tbl_style where style = '$style'";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        if (count($db_data) == 0) {
            $wpdb->update(
                $tbl_style, //table
                array('style' => $style), //data
                array('id_style' => $id_style)
            );
            $result['message'] = "Style updated";
        } else {
            $result['error'] = true;
            $result['message'] = "Style already exists";
        }
        return $result;
    }

    public function delete_style($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_style = $db_prefix . "lfm_styles";
        $tbl_media = $db_prefix . "lfm_media_files";
        $result = array('error'=>false);

        $id_style = $request["id_style"];
        // check if any media is associated with this id_style
        $sql = "select count(id_media) as total from $tbl_media where style = $id_style";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');
        if ($db_data[0]['total'] == 0) {
            $wpdb->delete(
                $tbl_style,
                array("id_style" => $id_style)
            );
            $result['message'] = "Style deleted";
        } else {
            $result['message'] = "Not possible to delete as there are media files associated with this style";
            $result['error'] = true;
        }
        return $result;
    }

    public function get_tone_data($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;

        // if no sort, default to accent
        $orderby = (!empty($_GET['orderby'])) ? $_GET['orderby'] : 'tone';

        // if no order, default to asc
        $order = (!empty($_GET['order'])) ? $_GET['order'] : 'asc';

        $sql = "select * from {$db_prefix}lfm_tones order by $orderby $order";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        $result = array('error'=>false);

        $result['tones'] = $db_data;
        $response = new WP_REST_Response($result);
        $response->set_status(200);

        return $response;
    }

    public function insert_tone($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_tone = $db_prefix . "lfm_tones";
        $result = array('error'=>false);

        $tone = ucwords(strtolower($request['tone']));
        // check if already exists
        $sql = "select tone from $tbl_tone where tone = '$tone'";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        if (count($db_data) == 0) {
            $wpdb->insert(
                $tbl_tone, //table
                array('tone' => $tone), //data
                array('%s') //data format
            );
            $result['message'] = "Tone added";
        } else {
            $result['error'] = true;
            $result['message'] = "Tone already exists";
        }
        return $result;
    }

    public function update_tone($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_tone = $db_prefix . "lfm_tones";
        $result = array('error'=>false);

        $id_tone = $request["id_tone"];

        $tone = ucwords(strtolower($request['tone']));
        // check if already exists
        $sql = "select tone from $tbl_tone where tone = '$tone'";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');

        if (count($db_data) == 0) {
            $wpdb->update(
                $tbl_tone, //table
                array('tone' => $tone), //data
                array('id_tone' => $id_tone)
            );
            $result['message'] = "Tone updated";
        } else {
            $result['error'] = true;
            $result['message'] = "Tone already exists";
        }
        return $result;
    }

    public function delete_tone($request) {
        global $wpdb;
        $db_prefix = $wpdb->prefix;
        $tbl_tone = $db_prefix . "lfm_tones";
        $tbl_media = $db_prefix . "lfm_media_files";
        $result = array('error'=>false);

        $id_tone = $request["id_tone"];
        // check if any media is associated with this id_tone
        $sql = "select count(id_media) as total from $tbl_media where tone = $id_tone";
        $db_data = $wpdb->get_results($sql, 'ARRAY_A');
        if ($db_data[0]['total'] == 0) {
            $wpdb->delete(
                $tbl_tone,
                array("id_tone" => $id_tone)
            );
            $result['message'] = "Tone deleted";
        } else {
            $result['message'] = "Not possible to delete as there are media files associated with this tone";
            $result['error'] = true;
        }
        return $result;
    }
}
