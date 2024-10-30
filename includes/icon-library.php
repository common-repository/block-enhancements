<?php
/**
 * The icon library
 *
 * @package   BlockEnhancements
 * @author    Phi Phan <mrphipv@gmail.com>
 * @copyright Copyright (c) 2022, Phi Phan
 */

namespace BlockEnhancements;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( IconLibrary::class ) ) :
	/**
	 * The controller class for icon library.
	 */
	class IconLibrary extends CoreComponent {
		/**
		 * Run main hooks
		 *
		 * @return void
		 */
		public function run() {
			// Add rest api endpoint to query icon library.
			add_action( 'rest_api_init', [ $this, 'register_icon_library_endpoint' ] );

			// Load data for js.
			add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ] );
		}

		/**
		 * Enqueue data for js
		 *
		 * @return void
		 */
		public function enqueue_block_editor_assets() {
			$this->enqueue_localize_scripts( [ BLOCK_ENHANCEMANCES_EDITOR_SCRIPTS_HANDLE ] );
		}

		/**
		 * Enqueue localize scripts
		 *
		 * @return void
		 */
		public function enqueue_localize_scripts( $handles ) {
			// icons_version file path.
			$icons_version_file = $this->the_plugin_instance->get_file_path( 'data/icon-library/icons-version.json' );

			// Bail if ther is no icons-version.json.
			if ( \file_exists( $icons_version_file ) ) {
				$icons_version = \file_get_contents( $icons_version_file );
				$icons_version = \json_decode( $icons_version, true );

				// Define localize sripts.
				$localization_scripts = [
					'iconsVersion' => $icons_version['version'] ?? '1.0.0',
				];

				// Register localize scripts.
				foreach ( $handles as $handle ) {
					wp_localize_script(
						$handle,
						'BlockEnhancementsIconLibrary',
						$localization_scripts
					);
				}
			}
		}

		/**
		 * Build a custom endpoint to query icon library.
		 *
		 * @return void
		 */
		public function register_icon_library_endpoint() {
			register_rest_route(
				'block-enhancements/v1',
				'/getIconLibrary/',
				array(
					'methods'             => 'GET',
					'callback'            => [ $this, 'get_icon_library' ],
					'permission_callback' => function () {
						return current_user_can( 'publish_posts' );
					},
				)
			);
		}

			/**
			 * Get icon library.
			 *
			 * @param WP_REST_Request $request The request object.
			 * @return void
			 */
		public function get_icon_library( $request ) {
			// icons file path.
			$icons_file = $this->the_plugin_instance->get_file_path( 'data/icon-library/icons.json' );

			// Send the error if the icons file is not exists.
			if ( ! \file_exists( $icons_file ) ) {
				wp_send_json_error( __( 'The icons.json file is not exists.', 'block-enhancements' ), 500 );
			}

			// Parse json.
			$icons = wp_json_file_decode( $icons_file, [ 'associative' => true ] );

			// Query svg images from the media library.
			$media_svg_images = $this->query_svg_images();

			if ( $media_svg_images ) {
				$icons = $media_svg_images + $icons;
			}

			wp_send_json(
				[
					'data'    => $icons,
					'success' => true,
				]
			);
		}

		/**
		 * Query SVG images from the library
		 *
		 * @return array
		 */
		private function query_svg_images() {
			$media_svgs = [];
			$images     = get_posts(
				[
					'post_type'      => 'attachment',
					'post_mime_type' => [ 'image/svg+xml' ],
					'post_status'    => 'any',
					'posts_per_page' => 100,
				]
			);

			if ( $images ) {
				foreach ( $images as $image ) {
					$icon = file_get_contents( get_attached_file( $image->ID ) );
					if ( $icon ) {
						$media_svgs[] = [
							'name'       => $image->post_name,
							'title'      => $image->post_title,
							'icon'       => $icon,
							'categories' => [ 'Media Library' ],
							'provider'   => 'Media Library',
						];
					}
				}
			}

			return $media_svgs;
		}
	}
endif;
