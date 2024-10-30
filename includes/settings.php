<?php
/**
 * The settings.
 *
 * @package   BlockEnhancements
 * @author    Phi Phan <mrphipv@gmail.com>
 * @copyright Copyright (c) 2022, Phi Phan
 */

namespace BlockEnhancements;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( Settings::class ) ) :
	/**
	 * The controller class for the settings.
	 */
	class Settings extends CoreComponent {
		/**
		 * Setting page's hook suffix.
		 *
		 * @var string
		 */
		protected $hook_suffix;

		/**
		 * Run main hooks
		 *
		 * @return void
		 */
		public function run() {
			// Create the settings page.
			add_action( 'admin_menu', [ $this, 'add_admin_page' ] );

			// Enqueue settings script.
			add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_settings_scripts' ] );

			// Register settings.
			add_action( 'init', [ $this, 'register_settings' ] );

			// Do setting up stuff when the plugin is activated.
			add_action( 'block_enhancements_activate', [ $this, 'run_the_plugin_setup' ] );

			// Redirect to the getting started page.
			add_action( 'admin_init', [ $this, 'block_enhancements_activation_redirect' ] );

			// Add the settings page link to plugin list screen.
			add_action( 'plugin_action_links_' . plugin_basename( BLOCK_ENHANCEMANCES_ROOT_FILE ), [ $this, 'plugin_settings_links' ] );

			// Add rest api endpoint to query docs.
			add_action( 'rest_api_init', [ $this, 'register_docs_endpoint' ] );

			// Add admin toolbar.
			add_action( 'in_admin_header', [ $this, 'in_admin_header' ] );

			// Change the footer text for the settings pages.
			add_action( 'admin_footer_text', [ $this, 'admin_footer_text' ] );
		}

		/**
		 * Print the admin toolbar.
		 *
		 * @return void
		 */
		public function in_admin_header() {
			$screen = get_current_screen();
			if ( 'settings_page_be-settings' === $screen->id ) {
				?>
				<div class="bb-settings-header be-settings-header">
					<h1><strong><?php printf( __( 'Block Enhancements' ) ); ?></strong> <code><?php echo esc_html( $this->the_plugin_instance->get_plugin_version() ); ?></code></h1>
					<ul>
						<li><a href="https://wordpress.org/support/plugin/block-enhancements/" target="_blank"><span class="dashicons dashicons-editor-help"></span> <?php printf( __( 'Help & Support', 'block-enhancements' ) ); ?></a></li>
						<li><a href="https://wordpress.org/support/plugin/block-enhancements/reviews/#new-post" target="_blank"><span class="dashicons dashicons-star-filled"></span> <?php printf( __( 'Review', 'block-enhancements' ) ); ?></a></li>
					</ul>
				</div>
				<?php
			}
		}

		/**
		 * Create the admin page
		 *
		 * @return void
		 */
		public function add_admin_page() {
			$this->hook_suffix = add_options_page(
				__( 'Block Enhancements' ),
				__( 'Block Enhancements' ),
				'manage_options',
				'be-settings',
				function () {
					?>
					<div class="wrap">
						<h2 class="screen-reader-text">Block Enhancements</h2>
						<div class="bb-settings be-settings js-be-settings-root"></div>
					</div>
					<?php
				}
			);
		}

		/**
		 * Enqueue scripts for the settings page.
		 *
		 * @param string $hook_suffix
		 * @return void
		 */
		public function enqueue_settings_scripts( $hook_suffix ) {
			// Only load scripts for the settings page.
			if ( 'settings_page_be-settings' === $hook_suffix ) {
				// Load all registered blocks and categories.
				$block_categories = array();
				if ( function_exists( 'gutenberg_get_block_categories' ) ) {
					$block_categories = gutenberg_get_block_categories( get_post() );
				} elseif ( function_exists( 'get_block_categories' ) ) {
					$block_categories = get_block_categories( get_post() );
				}

				wp_add_inline_script(
					'wp-blocks',
					sprintf( 'wp.blocks.setCategories( %s );', wp_json_encode( $block_categories ) ),
					'after'
				);

				$block_registry = \WP_Block_Type_Registry::get_instance();
				foreach ( $block_registry->get_all_registered() as $block_name => $block_type ) {
					// Front-end script.
					if ( ! empty( $block_type->editor_script ) ) {
						wp_enqueue_script( $block_type->editor_script );
					}
				}

				// Settings asset file.
				$settings_asset = $this->the_plugin_instance->include_file( 'build/settings.asset.php' );

				// Enqueue scripts.
				wp_enqueue_script(
					'be-settings',
					$this->the_plugin_instance->get_file_uri( 'build/settings.js' ),
					$settings_asset['dependencies'] ?? [],
					$this->the_plugin_instance->get_script_version( $settings_asset ),
					true
				);

				wp_set_script_translations( 'be-settings', 'block-enhancements' );

				// Block features.
				wp_localize_script(
					'be-settings',
					'BlockEnhancementsFeatures',
					$this->the_plugin_instance->get_features()
				);

				// Enqueue style.
				wp_enqueue_style(
					'be-settings',
					$this->the_plugin_instance->get_file_uri( 'build/settings.css' ),
					[],
					$this->the_plugin_instance->get_script_version( $settings_asset )
				);

				// Load components style.
				wp_enqueue_style( 'wp-components' );
			}
		}

		/**
		 * Register settings.
		 */
		public function register_settings() {
			// Get default allowed blocks.
			$default_allowed_blocks = $this->the_plugin_instance->default_allowed_blocks();

			// Setting fields.
			register_setting(
				'be',
				'be_allowed_blocks',
				[
					'type'         => 'array',
					'show_in_rest' => array(
						'schema' => array(
							'items' => array(
								'type'       => 'object',
								'properties' => array(
									'featureName'   => array(
										'type' => 'string',
									),
									'allowedBlocks' => array(
										'type'  => 'array',
										'items' => array(
											'type'       => 'object',
											'properties' => array(
												'name' => array(
													'type' => 'string',
												),
											),
										),
									),
								),
							),
						),
					),
					'default'      => [
						[
							'featureName'   => 'withIcon',
							'allowedBlocks' => $default_allowed_blocks['withIcon'],
						],
						[
							'featureName'   => 'withTextAlignment',
							'allowedBlocks' => $default_allowed_blocks['withTextAlignment'],
						],
						[
							'featureName'   => 'withColor',
							'allowedBlocks' => $default_allowed_blocks['withColor'],
						],
						[
							'featureName'   => 'withShadow',
							'allowedBlocks' => $default_allowed_blocks['withShadow'],
						],
						[
							'featureName'   => 'withTextShadow',
							'allowedBlocks' => $default_allowed_blocks['withTextShadow'],
						],
						[
							'featureName'   => 'withTransform',
							'allowedBlocks' => $default_allowed_blocks['withTransform'],
						],
						[
							'featureName'   => 'withTransition',
							'allowedBlocks' => $default_allowed_blocks['withTransition'],
						],
						[
							'featureName'   => 'withTypography',
							'allowedBlocks' => $default_allowed_blocks['withTypography'],
						],
					],
				]
			);

			// Responsive settings.
			register_setting(
				'be',
				'be_breakpoints',
				[
					'type'         => 'object',
					'show_in_rest' => array(
						'schema' => array(
							'properties' => array(
								'sm' => array(
									'type'       => 'object',
									'properties' => array(
										'breakpoint' => array(
											'type' => 'string',
										),
										'mediaQuery' => array(
											'type' => 'string',
										),
									),
								),
								'md' => array(
									'type'       => 'object',
									'properties' => array(
										'breakpoint' => array(
											'type' => 'string',
										),
										'mediaQuery' => array(
											'type' => 'string',
										),
									),
								),
								'lg' => array(
									'type'       => 'object',
									'properties' => array(
										'breakpoint' => array(
											'type' => 'string',
										),
										'mediaQuery' => array(
											'type' => 'string',
										),
									),
								),
							),
						),
					),
					'default'      => [
						'sm' => [
							'breakpoint' => '576px',
							'mediaQuery' => '',
						],
						'md' => [
							'breakpoint' => '768px',
							'mediaQuery' => '@media (min-width: 768px){##CONTENT##}',
						],
						'lg' => [
							'breakpoint' => '1024px',
							'mediaQuery' => '@media (min-width: 1024px){##CONTENT##}',
						],
					],
				]
			);
		}

		/**
		 * Run activated stuff
		 * https://wearnhardt.com/2020/03/redirecting-after-plugin-activation/
		 *
		 * @return void
		 */
		public function run_the_plugin_setup() {
			if ( ! function_exists( 'get_current_screen' ) ) {
				return;
			}

			$screen = get_current_screen();
			if ( ! $screen || 'plugins' !== $screen->id ) {
				return;
			}

			// Redirect to the getting started page, ignore bulk activation.
			if (
			! ( ( isset( $_REQUEST['action'] ) && 'activate-selected' === $_REQUEST['action'] ) &&
			( isset( $_POST['checked'] ) && count( $_POST['checked'] ) > 1 ) ) ) {
				add_option( 'block_enhancements_activation_redirect', wp_get_current_user()->ID );
			}
		}

		/**
		 * Redirect to the getting started page.
		 *
		 * @return void
		 */
		public function block_enhancements_activation_redirect() {
			// Make sure it's the correct user.
			if ( ! wp_doing_ajax() && wp_get_current_user()->ID > 0 && intval( get_option( 'block_enhancements_activation_redirect', false ) ) === wp_get_current_user()->ID ) {
				// Make sure we don't redirect again after this one.
				delete_option( 'block_enhancements_activation_redirect' );
				if ( ! is_network_admin() ) {
					wp_safe_redirect( admin_url( '/options-general.php?page=be-settings&tab=getting-started' ) );
					exit;
				}
			}
		}

		/**
		 * Add the settings page link to the plugin admin screen.
		 *
		 * @param array $links
		 * @return array
		 */
		public function plugin_settings_links( $links ) : array {
			$label = esc_html__( 'Settings', 'block-enhancements' );
			$slug  = 'be-settings';

			array_unshift( $links, "<a href='options-general.php?page=$slug'>$label</a>" );
			return $links;
		}

		/**
		 * Build a custom endpoint to query docs.
		 *
		 * @return void
		 */
		public function register_docs_endpoint() {
			register_rest_route(
				'blockenhancements/v1',
				'/getDocs/',
				array(
					'methods'             => 'GET',
					'callback'            => [ $this, 'get_docs' ],
					'permission_callback' => function () {
						return current_user_can( 'publish_posts' );
					},
				)
			);
		}

		/**
		 * Get docs.
		 *
		 * @param WP_REST_Request $request The request object.
		 * @return void
		 */
		public function get_docs( $request ) {
			$cache_key   = 'be_docs';
			$data        = get_transient( $cache_key );
			$library_url = 'https://boldpatterns.net';

			if ( false === $data ) {
				$response = wp_remote_get(
					$library_url . '/wp-json/api.boldblocks/v1/getBlockEnhancementsDocs',
					[
						'timeout'   => 120,
						'sslverify' => false,
					]
				);

				if ( ! is_wp_error( $response ) ) {
					$data = json_decode( wp_remote_retrieve_body( $response ), true );

					if ( $data && ! ( $data['code'] ?? false ) ) {
						set_transient( $cache_key, $data, DAY_IN_SECONDS );
					} else {
						$data = false;
					}
				}
			}

			if ( ! $data ) {
				$data = [
					'videoTutorials' => [
						[
							'id'    => 'uW3xEH6U-C0',
							'title' =>
								'How to customize a core button in Gutenberg using Block Enhancements plugin',
						],
						[
							'id'    => 'NJkJipoDT4g',
							'title' =>
								'How to create icon buttons in Gutenberg using SVG Block and Block Enhancements plugin',
						],
					],
				];

				set_transient( $cache_key, $data, DAY_IN_SECONDS );
			}

			if ( ! ( $data['guides'] ?? '' ) ) {
				$data['guides'] = [
					[
						'title' => 'Add an icon to a heading',
						'src'   =>
							'https://ps.w.org/block-enhancements/assets/screenshot-1.gif?rev=2952561',
					],
					[
						'title' => 'Add an icon to a list',
						'src'   =>
							'https://ps.w.org/block-enhancements/assets/screenshot-2.gif?rev=2952561',
					],
					[
						'title' => 'Add an icon to a button',
						'src'   =>
							'https://ps.w.org/block-enhancements/assets/screenshot-3.gif?rev=2952561',
					],
					[
						'title' => 'Add responsive font size, line height, font weight, and letter spacing',
						'src'   =>
							'https://ps.w.org/block-enhancements/assets/screenshot-4.gif?rev=3021313',
					],
					[
						'title' => 'Add responsive text alignment to a group',
						'src'   =>
							'https://ps.w.org/block-enhancements/assets/screenshot-5.gif?rev=3021313',
					],
					[
						'title' => 'Add text shadow to a group',
						'src'   =>
							'https://ps.w.org/block-enhancements/assets/screenshot-6.gif?rev=3021313',
					],
					[
						'title' => 'Add box shadow with hover style to a group',
						'src'   =>
							'https://ps.w.org/block-enhancements/assets/screenshot-7.gif?rev=3021313',
					],
					[
						'title' => 'Add color with hover style to a group',
						'src'   =>
							'https://ps.w.org/block-enhancements/assets/screenshot-8.gif?rev=3021313',
					],
					[
						'title' => 'Add transform with hover style to a group',
						'src'   =>
							'https://ps.w.org/block-enhancements/assets/screenshot-9.gif?rev=3021313',
					],
					[
						'title' => 'Add a feature to blocks',
						'src'   =>
							'https://ps.w.org/block-enhancements/assets/screenshot-10.gif?rev=3021313',
					],
					[
						'title' => 'Add an icon to categories',
						'src'   =>
							'https://ps.w.org/block-enhancements/assets/screenshot-11.gif?rev=3021313',
					],
				];
			}

			wp_send_json(
				[
					'data'    => $data,
					'success' => true,
				]
			);
		}

		/**
		 * Clear transient cache
		 *
		 * @return void
		 */
		public function clear_transient_cache() {
			delete_transient( 'be_docs' );
		}

		/**
		 * Change the footer text for the settings pages
		 *
		 * @param string $footer_text
		 * @return string
		 */
		public function admin_footer_text( $footer_text ) {
			// Get current screen.
			$current_screen = get_current_screen();
			if ( 'settings_page_be-settings' === $current_screen->id ) {
				$footer_text = '<i><strong>Block Enhancements</strong> <code>' . esc_html__( $this->the_plugin_instance->get_plugin_version() ) . '</code>. Please <a target="_blank" href="https://wordpress.org/support/plugin/block-enhancements/reviews/#new-post" title="Rate the plugin" style="text-decoration:none">rate the plugin <span style="color:#ffb900">★★★★★</span></a> to help us spread the word. Thank you from the <a href="https://boldblocks.net/?utm_source=Block+Enhancements&utm_campaign=Block+Enhancements+visit+site&utm_medium=link&utm_content=footer-text" target="_blank" title="' . __( 'Visit the Plugin website', 'block-enhancements' ) . '" style="text-decoration:none"><strong>BoldBlocks</strong></a> team!</i>';
			}

			return $footer_text;
		}
	}
endif;
