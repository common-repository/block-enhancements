<?php
/**
 * Plugin Name:       Block Enhancements
 * Description:       Enhance Gutenberg blocks with practical features such as icons, shadow, transform, transition, responsive typography, text alignment, hover style, etc.
 * Requires at least: 6.5
 * Requires PHP:      7.0
 * Version:           1.2.6
 * Author:            Phi Phan
 * Author URI:        https://boldblocks.net
 * Plugin URI:        https://boldblocks.net?utm_source=BE&utm_campaign=visit+site&utm_medium=link&utm_content=Plugin+URI
 *
 * @package   BlockEnhancements
 * @copyright Copyright(c) 2022, Phi Phan
 */

namespace BlockEnhancements;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( BlockEnhancements::class ) ) :
	/**
	 * The main class
	 */
	final class BlockEnhancements {

		/**
		 * Plugin version
		 *
		 * @var String
		 */
		protected $version = '1.2.6';

		/**
		 * Components
		 *
		 * @var Array
		 */
		protected $components = [];

		/**
		 * Store the main asset file.
		 *
		 * @var array
		 */
		protected $index_asset = [];

		/**
		 * Plugin instance
		 *
		 * @var BlockEnhancements
		 */
		private static $instance;

		/**
		 * A dummy constructor
		 */
		private function __construct() {}

		/**
		 * Initialize the instance.
		 *
		 * @return BlockEnhancements
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new BlockEnhancements();
				self::$instance->initialize();
			}

			return self::$instance;
		}

		/**
		 * Kick start function.
		 * Define constants, load dependencies
		 *
		 * @return void
		 */
		public function initialize() {
			// Setup constants.
			$this->setup_constants();

			// Load dependencies.
			$this->load_dependencies();

			// Register core components.
			$this->register_core_components();

			// Run hooks.
			$this->run();
		}

		/**
		 * Setup constants
		 *
		 * @return void
		 */
		public function setup_constants() {
			$this->define_constant( 'BLOCK_ENHANCEMANCES', true );
			$this->define_constant( 'BLOCK_ENHANCEMANCES_ROOT_FILE', __FILE__ );
			$this->define_constant( 'BLOCK_ENHANCEMANCES_VERSION', $this->version );
			$this->define_constant( 'BLOCK_ENHANCEMANCES_PATH', trailingslashit( plugin_dir_path( BLOCK_ENHANCEMANCES_ROOT_FILE ) ) );
			$this->define_constant( 'BLOCK_ENHANCEMANCES_URL', trailingslashit( plugin_dir_url( BLOCK_ENHANCEMANCES_ROOT_FILE ) ) );
			$this->define_constant( 'BLOCK_ENHANCEMANCES_EDITOR_SCRIPTS_HANDLE', 'block-enhancements-editor-scripts' );
			$this->define_constant( 'BLOCK_ENHANCEMANCES_EDITOR_STYLE_HANDLE', 'block-enhancements-editor-style' );
			$this->define_constant( 'BLOCK_ENHANCEMANCES_FRONTEND_SCRIPTS_HANDLE', 'block-enhancements-frontend-scripts' );
			$this->define_constant( 'BLOCK_ENHANCEMANCES_FRONTEND_STYLE_HANDLE', 'block-enhancements-frontend-style' );
		}

		/**
		 * Load core components
		 *
		 * @return void
		 */
		public function register_core_components() {
			// Load & register core components.
			$this->include_file( 'includes/style.php' );
			$this->include_file( 'includes/settings.php' );
			$this->include_file( 'includes/icon-library.php' );

			$core_components = [ Style::class, Settings::class, IconLibrary::class ];
			foreach ( $core_components as $component ) {
				$this->register_component( $component );
			}
		}

		/**
		 * Load dependencies
		 *
		 * @return void
		 */
		public function load_dependencies() {
			// Load core component.
			$this->include_file( 'includes/core-component.php' );
		}

		/**
		 * Run main hooks
		 *
		 * @return void
		 */
		public function run() {
			// Load translations.
			add_action( 'plugins_loaded', [ $this, 'load_textdomain' ] );

			// Main hooks.
			add_action( 'init', [ $this, 'init' ], 5 );

			// Enqueue scripts for editor.
			add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ] );

			// Run all components.
			foreach ( $this->components as $component ) {
				$component->run();
			}
		}

		/**
		 * Process on init hook
		 *
		 * @return void
		 */
		public function init() {
			// Load the index asset file.
			if ( ! $this->index_asset ) {
				$this->index_asset = $this->include_file( 'build/index.asset.php' );
			}

			// Run a hook when the plugin initialized.
			do_action( 'block-enhancements/init' );
		}

		/**
		 * Enqueue editor assets
		 *
		 * @return void
		 */
		public function enqueue_block_editor_assets() {
			// $index_asset = $this->include_file( 'build/index.asset.php' );

			// Scripts.
			wp_enqueue_script(
				BLOCK_ENHANCEMANCES_EDITOR_SCRIPTS_HANDLE,
				$this->get_file_uri( 'build/index.js' ),
				$this->index_asset['dependencies'] ?? [],
				$this->get_script_version( $this->index_asset ),
				true
			);

			wp_set_script_translations( BLOCK_ENHANCEMANCES_EDITOR_SCRIPTS_HANDLE, 'block-enhancements' );

			// For REST API requests.
			wp_localize_script(
				BLOCK_ENHANCEMANCES_EDITOR_SCRIPTS_HANDLE,
				'BlockEnhancements',
				[
					'restRoot'  => esc_url_raw( rest_url() ),
					'restNonce' => wp_create_nonce( 'wp_rest' ),
				]
			);

			// Block features.
			wp_localize_script(
				BLOCK_ENHANCEMANCES_EDITOR_SCRIPTS_HANDLE,
				'BlockEnhancementsFeatures',
				$this->get_features()
			);
		}

		/**
		 * The default value for allowed blocks
		 *
		 * @return array
		 */
		public function default_allowed_blocks() {
			return [
				'withIcon'          => [
					[ 'name' => 'core/button' ],
					[ 'name' => 'core/read-more' ],
					[ 'name' => 'core/list' ],
					[ 'name' => 'core/heading' ],
				],
				'withTextAlignment' => [
					[ 'name' => 'core/group' ],
					[ 'name' => 'core/columns' ],
					[ 'name' => 'core/column' ],
					[ 'name' => 'core/media-text' ],
					[ 'name' => 'core/cover' ],
				],
				'withColor'         => [
					[ 'name' => 'core/button' ],
					[ 'name' => 'core/read-more' ],
					[ 'name' => 'boldblocks/svg-block' ],
				],
				'withShadow'        => [
					[ 'name' => 'core/button' ],
					[ 'name' => 'core/read-more' ],
					[ 'name' => 'core/image' ],
					[ 'name' => 'core/group' ],
					[ 'name' => 'core/columns' ],
					[ 'name' => 'core/column' ],
					[ 'name' => 'core/media-text' ],
					[ 'name' => 'core/cover' ],
					[ 'name' => 'boldblocks/svg-block' ],
				],
				'withTextShadow'    => [
					[ 'name' => 'core/heading' ],
					[ 'name' => 'core/paragraph' ],
					[ 'name' => 'core/group' ],
					[ 'name' => 'core/columns' ],
					[ 'name' => 'core/column' ],
					[ 'name' => 'core/media-text' ],
					[ 'name' => 'core/cover' ],
				],
				'withTransform'     => [
					[ 'name' => 'core/group' ],
					[ 'name' => 'core/columns' ],
					[ 'name' => 'core/column' ],
					[ 'name' => 'core/media-text' ],
					[ 'name' => 'core/cover' ],
					[ 'name' => 'core/button' ],
					[ 'name' => 'core/read-more' ],
					[ 'name' => 'core/image' ],
					[ 'name' => 'core/heading' ],
					[ 'name' => 'core/paragraph' ],
					[ 'name' => 'boldblocks/svg-block' ],
				],
				'withTransition'    => [
					[ 'name' => 'core/group' ],
					[ 'name' => 'core/columns' ],
					[ 'name' => 'core/column' ],
					[ 'name' => 'core/media-text' ],
					[ 'name' => 'core/cover' ],
					[ 'name' => 'core/button' ],
					[ 'name' => 'core/read-more' ],
					[ 'name' => 'core/image' ],
					[ 'name' => 'core/heading' ],
					[ 'name' => 'core/paragraph' ],
					[ 'name' => 'boldblocks/svg-block' ],
				],
				'withTypography'    => [
					[ 'name' => 'core/heading' ],
					[ 'name' => 'core/paragraph' ],
					[ 'name' => 'core/button' ],
					[ 'name' => 'core/post-title' ],
					[ 'name' => 'core/site-title' ],
				],
			];
		}

		/**
		 * Get a list of features
		 *
		 * @return array
		 */
		public function define_features() {
			// Get default allowed blocks.
			$default_allowed_blocks = $this->default_allowed_blocks();

			return [
				'withIcon'          => [
					'availableBlocks' => apply_filters(
						'block_enhancements_get_available_blocks_by_feature',
						[
							[ 'name' => 'core/button' ],
							[ 'name' => 'core/read-more' ],
							[ 'name' => 'core/heading' ],
							[ 'name' => 'core/post-title' ],
							[ 'name' => 'core/query-title' ],
							[ 'name' => 'core/comments-title' ],
							[ 'name' => 'core/list-item' ],
							[ 'name' => 'core/list' ],
							[ 'name' => 'core/categories' ],
							[ 'name' => 'core/latest-posts' ],
							[ 'name' => 'core/navigation-link' ],
							[ 'name' => 'core/navigation-submenu' ],
							[ 'name' => 'core/navigation' ],
						],
						'withIcon'
					),
					'allowedDefault'  => $default_allowed_blocks['withIcon'],
				],
				'withTextAlignment' => [
					'availableBlocks' => apply_filters(
						'block_enhancements_get_available_blocks_by_feature',
						[
							[ 'name' => '^(?!(core\/embed))' ],
						],
						'withTextAlignment'
					),
					'allowedDefault'  => $default_allowed_blocks['withTextAlignment'],
				],
				'withColor'         => [
					'availableBlocks' => apply_filters(
						'block_enhancements_get_available_blocks_by_feature',
						[
							[ 'name' => '.*' ],
						],
						'withColor'
					),
					'allowedDefault'  => $default_allowed_blocks['withColor'],
				],
				'withShadow'        => [
					'availableBlocks' => apply_filters(
						'block_enhancements_get_available_blocks_by_feature',
						[
							[ 'name' => '.*' ],
						],
						'withShadow'
					),
					'allowedDefault'  => $default_allowed_blocks['withShadow'],
				],
				'withTextShadow'    => [
					'availableBlocks' => apply_filters(
						'block_enhancements_get_available_blocks_by_feature',
						[
							[ 'name' => '.*' ],
						],
						'withTextShadow'
					),
					'allowedDefault'  => $default_allowed_blocks['withTextShadow'],
				],
				'withTransform'     => [
					'availableBlocks' => apply_filters(
						'block_enhancements_get_available_blocks_by_feature',
						[
							[ 'name' => '.*' ],
						],
						'withTransform'
					),
					'allowedDefault'  => $default_allowed_blocks['withTransform'],
				],
				'withTransition'    => [
					'availableBlocks' => apply_filters(
						'block_enhancements_get_available_blocks_by_feature',
						[
							[ 'name' => '.*' ],
						],
						'withTransition'
					),
					'allowedDefault'  => $default_allowed_blocks['withTransition'],
				],
				'withTypography'    => [
					'availableBlocks' => apply_filters(
						'block_enhancements_get_available_blocks_by_feature',
						[
							[ 'name' => '.*' ],
						],
						'withTypography'
					),
					'allowedDefault'  => $default_allowed_blocks['withTypography'],
				],
			];
		}

		/**
		 * Build JS params for front-end
		 *
		 * @return array
		 */
		public function get_features() {
			$support_features = [];

			// All features.
			$features = $this->define_features();

			// Allowed blocks.
			$allowed_blocks = get_option( 'be_allowed_blocks' );

			// Add allowed blocks to $features.
			foreach ( $features as $feature_name => $feature ) {
				$support_features[ $feature_name ] = [ 'availableBlocks' => $feature['availableBlocks'] ];

				$allowed_blocks_by_feature = false;
				if ( is_array( $allowed_blocks ) && count( $allowed_blocks ) > 0 ) {
					foreach ( $allowed_blocks as  $allowed_block ) {
						// @codingStandardsIgnoreLine WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
						if ( isset( $allowed_block['featureName'] ) && $allowed_block['featureName'] === $feature_name ) {
							// @codingStandardsIgnoreLine WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
							$allowed_blocks_by_feature = $allowed_block['allowedBlocks'];
							break;
						}
					}
				}

				if ( empty( $allowed_blocks_by_feature ) ) {
					$allowed_blocks_by_feature = $feature['allowedDefault'];
				}

				$support_features[ $feature_name ]['allowedBlocks'] = $allowed_blocks_by_feature;
			}

			return $support_features;
		}

		/**
		 * Load text domain
		 *
		 * @return void
		 */
		public function load_textdomain() {
			load_plugin_textdomain(
				'block-enhancements',
				false,
				plugin_basename( realpath( __DIR__ . '/languages' ) )
			);
		}

		/**
		 * Register component
		 *
		 * @param  string $classname The class name of the component.
		 * @return void
		 */
		public function register_component( $classname ) {
			$this->components[ $classname ] = new $classname( $this );
		}

		/**
		 * Get a component by class name
		 *
		 * @param  string $classname The class name of the component.
		 * @return mixed
		 */
		public function get_component( $classname ) {
			return $this->components[ $classname ] ?? false;
		}

		/**
		 * Define constant
		 *
		 * @param  string $name  The name of the constant.
		 * @param  mixed  $value The value of the constant.
		 * @return void
		 */
		public function define_constant( $name, $value ) {
			if ( ! defined( $name ) ) {
				define( $name, $value );
			}
		}

		/**
		 * Retrn file path for file or folder.
		 *
		 * @param  string $path file path.
		 * @return string
		 */
		public function get_file_path( $path ) {
			return BLOCK_ENHANCEMANCES_PATH . $path;
		}

		/**
		 * Include file path.
		 *
		 * @param  string $path file path.
		 * @return string
		 */
		public function include_file( $path ) {
			return include_once $this->get_file_path( $path );
		}

		/**
		 * Get file uri by file path.
		 *
		 * @param  string $path file path.
		 * @return string
		 */
		public function get_file_uri( $path ) {
			return BLOCK_ENHANCEMANCES_URL . $path;
		}

		/**
		 * Create version for scripts/styles
		 *
		 * @param  array $asset_file
		 * @return string
		 */
		public function get_script_version( $asset_file = [] ) {
			if ( empty( $asset_file ) ) {
				$asset_file = $this->index_asset;
			}
			return wp_get_environment_type() !== 'production' ? $asset_file['version'] : BLOCK_ENHANCEMANCES_VERSION;
		}

		/**
		 * Get the plugin version
		 *
		 * @return string
		 */
		public function get_plugin_version() {
			return $this->version;
		}
	}

	/**
	 * Kick start
	 *
	 * @return BlockEnhancements instance
	 */
	function block_enhancements_get_instance() {
		return BlockEnhancements::get_instance();
	}

	// Instantiate.
	block_enhancements_get_instance();
endif;

if ( ! function_exists( __NAMESPACE__ . '\\block_enhancements_activate' ) ) {
	/**
	 * Trigger an action when the plugin is activated.
	 *
	 * @return void
	 */
	function block_enhancements_activate() {
		do_action( 'block_enhancements_activate' );
	}
	register_activation_hook( __FILE__, __NAMESPACE__ . '\\block_enhancements_activate' );
}
