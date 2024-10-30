<?php
/**
 * Core component
 *
 * @package    BlockEnhancements
 * @author     Phi Phan <mrphipv@gmail.com>
 * @copyright  Copyright (c) 2022, Phi Phan
 */

namespace BlockEnhancements;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( CoreComponent::class ) ) :
	/**
	 * Create/edit custom content blocks.
	 */
	abstract class CoreComponent {
		/**
		 * The plugin instance
		 *
		 * @var BlockEnhancements
		 */
		protected $the_plugin_instance;

		/**
		 * A constructor
		 */
		public function __construct( $the_plugin_instance ) {
			$this->the_plugin_instance = $the_plugin_instance;
		}

		/**
		 * Run main hooks
		 *
		 * @return void
		 */
		abstract public function run();
	}
endif;
