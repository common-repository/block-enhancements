<?php
/**
 * The style component
 *
 * @package   BlockEnhancements
 * @author    Phi Phan <mrphipv@gmail.com>
 * @copyright Copyright (c) 2022, Phi Phan
 */

namespace BlockEnhancements;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( Style::class ) ) :
	/**
	 * The controller class for style.
	 */
	class Style extends CoreComponent {
		/**
		 * An array of features
		 *
		 * @var array
		 */
		private $features = [];

		/**
		 * An array of block name
		 *
		 * @var array
		 */
		private $block_names = [];

		/**
		 * An array of block names by feature
		 *
		 * @var array
		 */
		private $block_name_by_features = [];

		/**
		 * List of style for blocks
		 *
		 * @var array
		 */
		private $style_array = [];

		/**
		 * List of responsive style for blocks
		 *
		 * @var array
		 */
		private $responsive_style_array = [];

		/**
		 * List of feature style for blocks
		 *
		 * @var array
		 */
		private $feature_style_array = [];

		/**
		 * Cache the list of feature styles
		 *
		 * @var array
		 */
		private $loaded_feature_styles = [];

		/**
		 * Cache the breakpoints
		 *
		 * @var array
		 */
		private $breakpoints = [];

		/**
		 * Style handle
		 *
		 * @var string
		 */
		private $style_handle = 'block-enhancements-inline-styles';

		/**
		 * The constructor
		 */
		public function __construct( $the_plugin_instance ) {
			parent::__construct( $the_plugin_instance );

			// Build features and block names.
			$this->build_features_block_names( $this->the_plugin_instance->get_features() );
		}

		/**
		 * Build list of features, blockNames
		 *
		 * @param array $features
		 * @return void
		 */
		private function build_features_block_names( $features ) {
			// Get an array of supported features.
			$this->features = array_keys( $features );

			// Get an array of supported block names.
			foreach ( $features as $feature_name => $value_by_feature ) {
				if ( $value_by_feature['allowedBlocks'] ?? false ) {
					$this->block_name_by_features[ $feature_name ] = [];
					foreach ( $value_by_feature['allowedBlocks'] as $item ) {
						$this->block_name_by_features[ $feature_name ][] = $item['name'];
						$this->block_names[]                             = $item['name'];
					}
				}
			}

			// Remove duplicated values.
			$this->block_names = array_unique( $this->block_names );
		}

		/**
		 * Run main hooks
		 *
		 * @return void
		 */
		public function run() {
			// Register style handle.
			add_action( 'init', [ $this, 'register_block_enhancements_style' ] );

			// Get block style.
			add_filter( 'render_block', [ $this, 'render_block_style' ], 10, 2 );

			// Enqueue styles for the iframe editor.
			add_filter( 'block_editor_settings_all', [ $this, 'enqueue_style_for_the_editor' ] );

			// Add feature class to blocks.
			add_filter( 'block_enhancements_block_class', [ $this, 'get_block_class' ], 10, 4 );

			// Enqueue block styles.
			add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_all_block_styles' ] );

			// Get block style.
			add_filter( 'render_block', [ $this, 'render_list_item_block' ], 10, 2 );
		}

		/**
		 * Register a handle for enqueue block styles.
		 *
		 * @return void
		 */
		public function register_block_enhancements_style() {
			wp_register_style( $this->style_handle, '' );
		}

		/**
		 * Enqueue scripts/styles for the editor
		 *
		 * @param array $editor_settings
		 * @return void
		 */
		public function enqueue_style_for_the_editor( $editor_settings ) {
			$feature_names = [ 'with-icon', 'with-color', 'with-shadow', 'with-text-shadow', 'with-transform', 'with-transition', 'with-text-alignment', 'with-typography' ];
			foreach ( $feature_names as $feature_name ) {
				$this->get_feature_style( $feature_name );
			}

			$style = '';
			if ( $this->feature_style_array ) {
				foreach ( $this->feature_style_array as $feature_style ) {
					if ( $feature_style ) {
						$style .= $feature_style;
					}
				}
			}

			if ( $style ) {
				$editor_settings['styles'][] = [ 'css' => $style ];
			}

			return $editor_settings;
		}

		/**
		 * Render style for all supported blocks
		 *
		 * @param string $block_content
		 * @param array  $block
		 * @return string
		 */
		public function render_block_style( $block_content, $block ) {
			// Bail if the block has no style.
			if ( ! $this->has_style( $block ) ) {
				return $block_content;
			}

			// Buil selector.
			$selector = $this->generate_selector( $block['blockName'], '' );

			// Get custom style.
			$block_styles = $this->get_block_style( $block, '.' . $selector );
			if ( empty( $block_styles['style'] ?? '' ) ) {
				return $block_content;
			}

			$features = $block_styles['features'] ?? [];

			// Enqueue style for classic themes.
			if ( ! wp_is_block_theme() ) {
				$style = '';
				foreach ( array_keys( $features ) as $feature_name ) {
					if ( ! in_array( $feature_name, $this->loaded_feature_styles, true ) ) {
						$style                        .= $this->feature_style_array[ $feature_name ] ?? '';
						$this->loaded_feature_styles[] = $feature_name;
					}
				}

				$style .= $block_styles['style'] ?? '';

				$this->enqueue_block_style( $style );
			}

			// Add block class.
			$block_class = apply_filters( 'block_enhancements_block_class', str_replace( '/', '-', $block['blockName'] ), $block['blockName'], $block, $features );

			// Add selector to block wrapper element.
			$content = $this->add_class_to_block( $block_content, "{$block_class} {$selector}" );

			return $content;
		}

		/**
		 * Check whether current block has custom style or not.
		 *
		 * @param [type] $block
		 * @return boolean
		 */
		private function has_style( $block ) {
			// There is no boldblocks value.
			if ( ! isset( $block['attrs']['boldblocks'] ) ) {
				return false;
			}

			// There is no feature in supported features.
			if ( ! array_intersect( $this->features, array_keys( $block['attrs']['boldblocks'] ) ) ) {
				return false;
			}

			return true;
		}

		/**
		 * Check whether current block supports feature
		 *
		 * @param string $feature_name
		 * @param string $block_name
		 * @return boolean
		 */
		private function has_feature( $feature_name, $block_name ) {
			return in_array( $block_name, $this->block_name_by_features[ $feature_name ], true );
		}

		/**
		 * Get block custom style
		 *
		 * @param array  $block
		 * @param string $selector
		 * @return string
		 */
		private function get_block_style( $block, $selector ) {
			$style    = '';
			$features = [];

			$style_array            = [];
			$responsive_style_array = [];

			// Get responsive settings.
			$breakpoints = $this->get_breakpoints();

			// With icon.
			$has_with_icon = $this->get_with_icon_style(
				[
					'data'     => $block['attrs']['boldblocks'],
					'selector' => $selector,
					'block'    => $block,
				],
				$style_array
			);

			if ( $has_with_icon ) {
				$this->get_feature_style( 'with-icon' );
				$features['with-icon'] = $has_with_icon;
			}

			// With color.
			$has_color = $this->get_with_color_style(
				[
					'data'     => $block['attrs']['boldblocks'],
					'selector' => $selector,
					'block'    => $block,
				],
				$style_array
			);

			if ( $has_color ) {
				$this->get_feature_style( 'with-color' );
				$features['with-color'] = $has_color;
			}

			// With shadow.
			$has_shadow = $this->get_with_shadow_style(
				[
					'data'     => $block['attrs']['boldblocks'],
					'selector' => $selector,
					'block'    => $block,
				],
				$style_array
			);

			if ( $has_shadow ) {
				$this->get_feature_style( 'with-shadow' );
				$features['with-shadow'] = $has_shadow;
			}

			// With text shadow.
			$has_text_shadow = $this->get_with_text_shadow_style(
				[
					'data'     => $block['attrs']['boldblocks'],
					'selector' => $selector,
					'block'    => $block,
				],
				$style_array
			);

			if ( $has_text_shadow ) {
				$this->get_feature_style( 'with-text-shadow' );
				$features['with-text-shadow'] = $has_text_shadow;
			}

			// With transform.
			$has_transform = $this->get_with_transform_style(
				[
					'data'        => $block['attrs']['boldblocks'],
					'selector'    => $selector,
					'block'       => $block,
					'breakpoints' => $breakpoints,
				],
				$style_array,
				$responsive_style_array
			);

			if ( $has_transform ) {
				$this->get_feature_style( 'with-transform' );
				$features['with-transform'] = $has_transform;
			}

			// With transition.
			$has_transition = $this->get_with_transition_style(
				[
					'data'     => $block['attrs']['boldblocks'],
					'selector' => $selector,
					'block'    => $block,
				],
				$style_array
			);

			if ( $has_transition ) {
				$this->get_feature_style( 'with-transition' );
				$features['with-transition'] = $has_transition;
			}

			// With text alignment.
			$has_text_alignment = $this->get_with_text_alignment_style(
				[
					'data'        => $block['attrs']['boldblocks'],
					'selector'    => $selector,
					'block'       => $block,
					'breakpoints' => $breakpoints,
				],
				$style_array,
				$responsive_style_array
			);

			if ( $has_text_alignment ) {
				$this->get_feature_style( 'with-text-alignment' );
				$features['with-text-alignment'] = [ 'with-text-alignment' ];
			}

			// With typography.
			$has_font_size = $this->get_with_typography_style(
				[
					'data'        => $block['attrs']['boldblocks'],
					'selector'    => $selector,
					'block'       => $block,
					'breakpoints' => $breakpoints,
					'attribute'   => 'fontSize',
					'variable'    => '--be--font-size',
				],
				$style_array,
				$responsive_style_array
			);

			$has_line_height = $this->get_with_typography_style(
				[
					'data'        => $block['attrs']['boldblocks'],
					'selector'    => $selector,
					'block'       => $block,
					'breakpoints' => $breakpoints,
					'attribute'   => 'lineHeight',
					'variable'    => '--be--line-height',
				],
				$style_array,
				$responsive_style_array
			);

			$has_font_weight = $this->get_with_typography_style(
				[
					'data'        => $block['attrs']['boldblocks'],
					'selector'    => $selector,
					'block'       => $block,
					'breakpoints' => $breakpoints,
					'attribute'   => 'fontWeight',
					'variable'    => '--be--font-weight',
				],
				$style_array,
				$responsive_style_array
			);

			$has_letter_spacing = $this->get_with_typography_style(
				[
					'data'        => $block['attrs']['boldblocks'],
					'selector'    => $selector,
					'block'       => $block,
					'breakpoints' => $breakpoints,
					'attribute'   => 'letterSpacing',
					'variable'    => '--be--letter-spacing',
				],
				$style_array,
				$responsive_style_array
			);

			if ( $has_font_size || $has_line_height || $has_font_weight || $has_letter_spacing ) {
				$this->get_feature_style( 'with-typography' );
				$features['with-typography'] = [];

				if ( $has_font_size ) {
					$features['with-typography'][] = 'with-font-size';
				}

				if ( $has_line_height ) {
					$features['with-typography'][] = 'with-line-height';
				}

				if ( $has_font_weight ) {
					$features['with-typography'][] = 'with-font-weight';
				}

				if ( $has_letter_spacing ) {
					$features['with-typography'][] = 'with-letter-spacing';
				}
			}

			if ( $style_array ) {
				foreach ( $style_array as $selector_type => $value ) {
					if ( count( $value ) > 0 ) {
						$style .= $selector_type . '{' . implode( '', $value ) . '}';
					}
				}

				$this->style_array = array_merge( $this->style_array, $style_array );
			}

			if ( $responsive_style_array ) {
				foreach ( $responsive_style_array as $responsive_style ) {
					$style .= $responsive_style;
				}

				$this->responsive_style_array = array_merge( $this->responsive_style_array, $responsive_style_array );
			}

			return [
				'style'    => $style,
				'features' => $features,
			];
		}

		/**
		 * Build icon style
		 *
		 * @param array  $args {
		 *   @param array  $data
		 *   @param string $sesector
		 *   @param array  $block
		 *   @param array  $devices
		 * }
		 * @param array  &$style_array
		 * @return void
		 */
		private function get_with_icon_style( $args, &$style_array ) {
			$data = $args['data'] ?? [];

			// Block name.
			$block_name = $args['block']['blockName'] ?? '';

			// Has no feature.
			if ( ! $this->has_feature( 'withIcon', $block_name ) ) {
				return '';
			}

			// No value.
			if ( ! isset( $data['withIcon'] ) || ! isset( $data['withIcon']['iconURI'] ) ) {
				return '';
			}

			// Get selector.
			$selector = $args['selector'] ?? '';

			if ( 'core/button' === $block_name ) {
				$selector = $selector . ' .wp-block-button__link';
			} elseif ( 'core/list-item' === $block_name ) {
				$selector = $selector . '.core-list-item';
			} elseif ( in_array( $block_name, [ 'core/list', 'core/categories', 'core/latest-posts', 'core/archives' ], true ) ) {
				$selector = $selector . ' > li';
			} elseif ( 'core/navigation-link' === $block_name ) {
				$selector = $selector . '.core-navigation-link.with-icon > .wp-block-navigation-item__content';
			} elseif ( 'core/navigation' === $block_name ) {
				$selector = $selector . ' .wp-block-navigation-item__content';
			} elseif ( 'core/navigation-submenu' === $block_name ) {
				$selector = $selector . ' [class*="wp-block-navigation"] .wp-block-navigation-item__content';
			}

			// Custom style.
			return $this->build_custom_style(
				array_merge(
					$args,
					[
						'selector'         => $selector,
						'setting_value'    => $data['withIcon'],
						'func_build_style' => [ $this, 'build_with_icon_style' ],
					]
				),
				$style_array
			);
		}

		/**
		 * Build icon style
		 *
		 * @param array $args
		 * @param array &$style_array
		 * @return void
		 */
		private function build_with_icon_style( $args, &$style_array ) {
			$selector      = $args['selector'];
			$setting_value = $args['setting_value'];

			$icon_style   = [];
			$nested_style = [];
			$item_style   = [];

			$icon_uri          = $setting_value['iconURI'] ?? false;
			$icon_width        = $setting_value['iconWidth']['value'] ?? '1em';
			$icon_text_spacing = $setting_value['iconTextSpacing']['value'] ?? '.5em';
			$icon_position     = $setting_value['iconPosition'] ?? 'left';
			$text_alignment    = $setting_value['textAlignment'] ?? false;
			$icon_margin_top   = $setting_value['iconMarginTop'] ?? false;
			$icon_color        = $setting_value['iconColor'] ?? false;
			$wrap_text         = $setting_value['wrapText'] ?? false;

			// Block name.
			$block_name = $args['block']['blockName'] ?? '';

			$is_grid_layout        = 'core/button' === $block_name;
			$is_supported_position = in_array( $block_name, [ 'core/button', 'core/read-more' ], true );

			$has_features = [];

			if ( $icon_uri ) {
				$has_features[] = 'with-icon';

				// IconURI.
				$icon_style[] = "--be--with-icon--uri:url(\"{$icon_uri}\");";

				// Margin top.
				if ( $icon_margin_top && isset( $icon_margin_top['value'] ) ) {
					$icon_style[] = "--be--with-icon--mt:{$icon_margin_top['value']};";

					$has_features[] = 'has-margin-top';
				}

				// Icon color.
				if ( $icon_color ) {
					$icon_css_color = $this->get_css_color_value( $icon_color );
					$icon_style[]   = "--be--with-icon--color:{$icon_css_color};";
				}

				// Text alignment.
				if ( $text_alignment ) {
					$item_style[] = "--be--with-icon--text-align:{$text_alignment};";
				}

				// Spacing.
				$item_style[] = "--be--with-icon--spacing:{$icon_text_spacing};";

				// Icon width.
				$item_style[] = "--be--with-icon--width:{$icon_width};";

				if ( $is_grid_layout ) {
					// Grid template columns.
					$grid_template_columns = 'left' === $icon_position ? $icon_width . ' 1fr' : '1fr ' . $icon_width;
					$item_style[]          = "--be--with-icon--gtc:{$grid_template_columns};";
				}

				if ( $is_supported_position ) {
					// Grid column.
					$icon_grid_column = 'left' === $icon_position ? 1 : 2;
					$icon_style[]     = "--be--with-icon--icon-column:{$icon_grid_column};";

					// Nested variables.
					$text_grid_column = 'left' === $icon_position ? 2 : 1;
					$nested_style[]   = "--be--with-icon--text-column:{$text_grid_column};";

					if ( 'right' === $icon_position ) {
						$has_features[] = 'has-icon-right';
					}
				}

				if ( $wrap_text ) {
					$has_features[] = 'has-text-nowrap';
				}

				// Add style to the style_array.
				$this->add_to_style_array( implode( '', $item_style ), $style_array, $args );
				$this->add_to_style_array( implode( '', $nested_style ), $style_array, array_merge( $args, [ 'selector' => "{$selector} > * " ] ) );
				$this->add_to_style_array( implode( '', $icon_style ), $style_array, array_merge( $args, [ 'selector' => "{$selector}::before" ] ) );
			}

			return $has_features;
		}

		/**
		 * Add class to dynamic blocks
		 *
		 * @param string       $block_class
		 * @param string       $block_name
		 * @param array        $block
		 * @param array|string $has_features
		 * @return string
		 */
		public function get_block_class( $block_class, $block_name, $block, $has_features ) {
			// Don't have any styles.
			if ( ! $has_features ) {
				return $block_class;
			}

			$feature_classes = array_reduce(
				array_values( $has_features ),
				function ( $prev, $item ) {
					return array_merge( $prev, $item );
				},
				[]
			);

			$feature_class = '';

			// Probably a dynamic blocks.
			if ( ! ( $block['innerHTML'] ?? '' ) ) {
				$feature_class = implode( ' ', $feature_classes );
			} else {
				preg_match( '/class=(["\'])(.*?)\1/', $block['innerHTML'], $matches );
				$saved_class = $matches[2] ?? '';
				if ( ! $saved_class ) {
					$feature_class = implode( ' ', $feature_classes );
				} else {
					$classes = [];
					foreach ( $feature_classes as $class ) {
						if ( strpos( $saved_class, $class ) === false ) {
							$classes[] = $class;
						}
					}

					if ( $classes ) {
						$feature_class = implode( ' ', $classes );
					}
				}
			}

			if ( $feature_class ) {
				$block_class = $block_class . ' ' . $feature_class;
			}

			return $block_class;
		}

		/**
		 * Build color style
		 *
		 * @param array  $args {
		 *   @param array  $data
		 *   @param string $sesector
		 *   @param array  $block
		 *   @param array  $devices
		 * }
		 * @param array  &$style_array
		 * @return void
		 */
		private function get_with_color_style( $args, &$style_array ) {
			$data = $args['data'] ?? [];

			// Block name.
			$block_name = $args['block']['blockName'] ?? '';

			// Has no feature.
			if ( ! $this->has_feature( 'withColor', $block_name ) ) {
				return '';
			}

			// No value.
			if ( ! isset( $data['withColor'] ) || ( ! isset( $data['withColor']['colors'] ) && ! isset( $data['withColor']['colorsHover'] ) ) ) {
				return '';
			}

			// Get selector.
			$selector = $args['selector'] ?? '';

			if ( 'core/button' === $block_name ) {
				$selector = $selector . ' .wp-block-button__link';
			} elseif ( 'boldblocks/svg-block' === $block_name ) {
				$selector = $selector . ' .wp-block-boldblocks-svg-block__inner';
			}

			// Custom style.
			return $this->build_custom_style(
				array_merge(
					$args,
					[
						'selector'         => $selector,
						'setting_value'    => $data['withColor'],
						'func_build_style' => [ $this, 'build_with_color_style' ],
					]
				),
				$style_array
			);
		}

		/**
		 * Build color style
		 *
		 * @param array $args
		 * @param array &$style_array
		 * @return void
		 */
		private function build_with_color_style( $args, &$style_array ) {
			$setting_value = $args['setting_value'];

			// Get color style.
			$color_css = $this->build_color_css_variable( $setting_value['colors'] ?? [] );

			// Add style to the style_array.
			if ( $color_css ) {
				$this->add_to_style_array( $color_css, $style_array, $args );
			}

			// Get hover color style.
			$hover_color_css = $this->build_color_css_variable( $setting_value['colorsHover'] ?? [] );

			// Add style to the style_array.
			if ( $hover_color_css ) {
				$hover_args             = $args;
				$hover_args['selector'] = "{$args['selector']}:hover";
				$this->add_to_style_array( $hover_color_css, $style_array, $hover_args );
			}

			// We need to return feature classes.
			$has_features = [];

			$combine_color_css = $color_css . $hover_color_css;

			if ( strpos( $combine_color_css, '--be--text-color' ) !== false ) {
				$has_features[] = 'with-text-color';
			}

			if ( strpos( $combine_color_css, '--be--background-color' ) !== false ) {
				$has_features[] = 'with-background-color';
			}

			return $has_features;
		}

		/**
		 * Build CSS variable for color
		 *
		 * @param array $colors
		 * @return string
		 */
		private function build_color_css_variable( $colors ) {
			$color_css = '';
			if ( is_array( $colors ) && ! empty( $colors ) ) {
				$css_text_color = $this->get_css_color_value(
					[
						'slug'  => $colors['colorSlug'] ?? '',
						'value' => $colors['colorValue'] ?? '',
					]
				);

				if ( $css_text_color ) {
					$color_css .= "--be--text-color:{$css_text_color};";
				}

				$css_background_color = $this->get_css_color_value(
					[
						'slug'          => $colors['backgroundSlug'] ?? '',
						'value'         => $colors['backgroundValue'] ?? '',
						'gradientSlug'  => $colors['backgroundGradientSlug'] ?? '',
						'gradientValue' => $colors['backgroundGradientValue'] ?? '',
					]
				);

				if ( $css_background_color ) {
					$color_css .= "--be--background-color:{$css_background_color};";
				}
			}

			return $color_css;
		}

		/**
		 * Build shadow style
		 *
		 * @param array  $args {
		 *   @param array  $data
		 *   @param string $sesector
		 *   @param array  $block
		 *   @param array  $devices
		 * }
		 * @param array  &$style_array
		 * @return void
		 */
		private function get_with_shadow_style( $args, &$style_array ) {
			$data = $args['data'] ?? [];

			// Block name.
			$block_name = $args['block']['blockName'] ?? '';

			// Has no feature.
			if ( ! $this->has_feature( 'withShadow', $block_name ) ) {
				return '';
			}

			// No value.
			if ( ! isset( $data['withShadow'] ) || ( ! isset( $data['withShadow']['shadows'] ) && ! isset( $data['withShadow']['shadowsHover'] ) ) ) {
				return '';
			}

			// Get selector.
			$selector = $args['selector'] ?? '';

			if ( 'core/button' === $block_name ) {
				$selector = $selector . ' .wp-block-button__link';
			} elseif ( 'boldblocks/svg-block' === $block_name ) {
				$selector = $selector . ' .wp-block-boldblocks-svg-block__inner';
			}

			// Custom style.
			return $this->build_custom_style(
				array_merge(
					$args,
					[
						'selector'         => $selector,
						'setting_value'    => $data['withShadow'],
						'func_build_style' => [ $this, 'build_with_shadow_style' ],
					]
				),
				$style_array
			);
		}

		/**
		 * Build shadow style
		 *
		 * @param array $args
		 * @param array &$style_array
		 * @return void
		 */
		private function build_with_shadow_style( $args, &$style_array ) {
			$setting_value = $args['setting_value'];

			// Get shadow style.
			$shadow_css = $this->build_box_shadow_css_variable( $setting_value['shadows'] ?? [], $setting_value['slug'] ?? '' );

			// Add style to the style_array.
			if ( $shadow_css ) {
				$this->add_to_style_array( $shadow_css, $style_array, $args );
			}

			// Get hover shadow style.
			$hover_shadow_css = $this->build_box_shadow_css_variable( $setting_value['shadowsHover'] ?? [], $setting_value['slugHover'] ?? '' );

			// Add style to the style_array.
			if ( $hover_shadow_css ) {
				$hover_args             = $args;
				$hover_args['selector'] = "{$args['selector']}:hover";
				$this->add_to_style_array( $hover_shadow_css, $style_array, $hover_args );
			}

			return $shadow_css || $hover_shadow_css ? [ 'with-shadow' ] : false;
		}

		/**
		 * Build CSS variable for box-shadow
		 *
		 * @param array  $shadows
		 * @param string $slug
		 * @return string
		 */
		private function build_box_shadow_css_variable( $shadows, $slug ) {
			$shadow_css    = '';
			$shadow_styles = [];
			if ( is_array( $shadows ) && ! empty( $shadows ) ) {
				foreach ( $shadows as $shadow ) {
					$color = $this->get_css_color_value( $shadow['color'] ?? '' );
					if ( $color ) {
						$inset           = $shadow['inset'] ? 'inset ' : '';
						$x               = $shadow['x'] ?? '0px';
						$y               = $shadow['y'] ?? '0px';
						$blur            = $shadow['blur'] ?? '0px';
						$spread          = $shadow['spread'] ?? '0px';
						$shadow_styles[] = "{$inset}{$x} {$y} {$blur} {$spread} {$color}";
					}
				}
			}

			// Build the css variable.
			if ( count( $shadow_styles ) > 0 ) {
				$shadow_value = implode( ',', $shadow_styles );
				if ( $slug ) {
					if ( function_exists( '_wp_to_kebab_case' ) ) {
						$slug = _wp_to_kebab_case( $slug );
					}
					$shadow_value = 'var(--wp--preset--shadow--' . $slug . ', ' . $shadow_value . ')';
				}

				$shadow_css = '--be--box-shadow:' . $shadow_value . ';';
			}

			return $shadow_css;
		}

		/**
		 * Build text shadow style
		 *
		 * @param array  $args {
		 *   @param array  $data
		 *   @param string $sesector
		 *   @param array  $block
		 *   @param array  $devices
		 * }
		 * @param array  &$style_array
		 * @return void
		 */
		private function get_with_text_shadow_style( $args, &$style_array ) {
			$data = $args['data'] ?? [];

			// Block name.
			$block_name = $args['block']['blockName'] ?? '';

			// Has no feature.
			if ( ! $this->has_feature( 'withTextShadow', $block_name ) ) {
				return '';
			}

			// No value.
			if ( ! isset( $data['withTextShadow'] ) || ( ! isset( $data['withTextShadow']['shadows'] ) && ! isset( $data['withTextShadow']['shadowsHover'] ) ) ) {
				return '';
			}

			// Get selector.
			$selector = $args['selector'] ?? '';

			if ( 'core/button' === $block_name ) {
				$selector = $selector . ' .wp-block-button__link';
			}

			// Custom style.
			return $this->build_custom_style(
				array_merge(
					$args,
					[
						'selector'         => $selector,
						'setting_value'    => $data['withTextShadow'],
						'func_build_style' => [ $this, 'build_with_text_shadow_style' ],
					]
				),
				$style_array
			);
		}

		/**
		 * Build text shadow style
		 *
		 * @param array $args
		 * @param array &$style_array
		 * @return void
		 */
		private function build_with_text_shadow_style( $args, &$style_array ) {
			$setting_value = $args['setting_value'];

			// Get shadow style.
			$shadow_css = $this->build_text_shadow_css_variable( $setting_value['shadows'] ?? [] );

			// Add style to the style_array.
			if ( $shadow_css ) {
				$this->add_to_style_array( $shadow_css, $style_array, $args );
			}

			// Get hover shadow style.
			$hover_shadow_css = $this->build_text_shadow_css_variable( $setting_value['shadowsHover'] ?? [] );

			// Add style to the style_array.
			if ( $hover_shadow_css ) {
				$hover_args             = $args;
				$hover_args['selector'] = "{$args['selector']}:hover";
				$this->add_to_style_array( $hover_shadow_css, $style_array, $hover_args );
			}

			return $shadow_css || $hover_shadow_css ? [ 'with-text-shadow' ] : false;
		}

		/**
		 * Build CSS variable for text-shadow
		 *
		 * @param array $shadows
		 * @return string
		 */
		private function build_text_shadow_css_variable( $shadows ) {
			$shadow_css    = '';
			$shadow_styles = [];
			if ( is_array( $shadows ) && ! empty( $shadows ) ) {
				foreach ( $shadows as $shadow ) {
					$color = $this->get_css_color_value( $shadow['color'] ?? '' );
					if ( $color ) {
						$x               = $shadow['x'] ?? '0px';
						$y               = $shadow['y'] ?? '0px';
						$blur            = $shadow['blur'] ?? '0px';
						$shadow_styles[] = "{$x} {$y} {$blur} {$color}";
					}
				}
			}

			// Build the css variable.
			if ( count( $shadow_styles ) > 0 ) {
				$shadow_css = '--be--text-shadow:' . implode( ',', $shadow_styles ) . ';';
			}

			return $shadow_css;
		}

		/**
		 * Build transform style
		 *
		 * @param array  $args {
		 *   @param array  $data
		 *   @param string $sesector
		 *   @param array  $block
		 *   @param array  $devices
		 * }
		 * @param array  &$style_array
		 * @param array  &$responsive_style_array
		 * @return void
		 */
		private function get_with_transform_style( $args, &$style_array, &$responsive_style_array ) {
			$data = $args['data'] ?? [];

			// Block name.
			$block_name = $args['block']['blockName'] ?? '';

			// Has no feature.
			if ( ! $this->has_feature( 'withTransform', $block_name ) ) {
				return '';
			}

			// No value.
			if ( ! isset( $data['withTransform'] ) || ( ! isset( $data['withTransform']['transform'] ) && ! isset( $data['withTransform']['transformHover'] ) ) ) {
				return '';
			}

			// Get selector.
			$selector = $args['selector'] ?? '';

			if ( 'core/button' === $block_name ) {
				$selector = $selector . ' .wp-block-button__link';
			} elseif ( 'boldblocks/svg-block' === $block_name ) {
				$selector = $selector . ' .wp-block-boldblocks-svg-block__inner';
			}

			// Custom style.
			return $this->build_custom_style(
				array_merge(
					$args,
					[
						'selector'         => $selector,
						'setting_value'    => $data['withTransform'],
						'func_build_style' => [ $this, 'build_with_transform_style' ],
					]
				),
				$style_array,
				$responsive_style_array
			);
		}

		/**
		 * Build transform style
		 *
		 * @param array $args
		 * @param array &$style_array
		 * @param array &$responsive_style_array
		 * @return void
		 */
		private function build_with_transform_style( $args, &$style_array, &$responsive_style_array ) {
			$setting_value = $args['setting_value'];

			// Responsive style.
			$transform_style = $this->build_responsive_style(
				array_merge(
					$args,
					[
						'setting_value'    => $setting_value['transform'] ?? [],
						'setting_variable' => '--be--transform',
						'func_build_style' => [ $this, 'build_transform_css_value' ],
					]
				),
				$style_array,
				$responsive_style_array
			);

			// Add style to the style_array.
			if ( $transform_style ) {
				$transform_origin_css = $this->build_transform_origin_css_variable( $setting_value['transformOrigin'] ?? [] );
				$this->add_to_style_array( $transform_origin_css, $style_array, $args );
			}

			// Hover args.
			$hover_args             = $args;
			$hover_args['selector'] = "{$args['selector']}:hover";

			// Responsive style hover.
			$transform_style_hover = $this->build_responsive_style(
				array_merge(
					$hover_args,
					[
						'setting_value'    => $setting_value['transformHover'] ?? [],
						'setting_variable' => '--be--transform',
						'func_build_style' => [ $this, 'build_transform_css_value' ],
					]
				),
				$style_array,
				$responsive_style_array
			);

			// Add style to the style_array.
			if ( $transform_style_hover ) {
				$transform_origin_hover = $setting_value['transformOriginHover'] ?? [];
				if ( $transform_origin_hover && isset( $transform_origin_hover['x'] ) && isset( $transform_origin_hover['y'] ) ) {
					$transform_origin_css = $this->build_transform_origin_css_variable( $transform_origin_hover );
					$this->add_to_style_array( $transform_origin_css, $style_array, $hover_args );
				}
			}

			return $transform_style || $transform_style_hover ? [ 'with-transform' ] : false;
		}

		/**
		 * Build CSS value for transform
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_transform_css_value( $args = [] ) {
			$value = $args['value'] ?? [];
			if ( ! empty( $value ) && is_array( $value ) ) {
				return implode( ' ', array_filter( array_map( [ $this, 'build_transform_item' ], $value ) ) );
			}

			return '';
		}

		/**
		 * Build transform item: translate, rotate, scale, skew
		 *
		 * @return string
		 */
		private function build_transform_item( $transform_item ) {
			$style = '';
			if ( is_array( $transform_item ) && count( $transform_item ) > 0 ) {
				// Get tranform type.
				$transform_type  = array_keys( $transform_item )[0];
				$transform_value = $transform_item[ $transform_type ] ?? '';

				if ( $transform_type === 'rotate' ) {
					if ( is_numeric( $transform_value ) ) {
						$style = "rotate({$transform_value}deg)";
					}
				} elseif ( is_array( $transform_value ) ) {
					$suffix = 'skew' === $transform_type ? 'deg' : '';

					$x       = $transform_value['x'] ?? '';
					$y       = $transform_value['y'] ?? '';
					$x_value = preg_replace( '/[^0-9.]/', '', $x );
					$y_value = preg_replace( '/[^0-9.]/', '', $y );

					if ( \is_numeric( $x_value ) || \is_numeric( $y_value ) ) {
						if ( ! \is_numeric( $x_value ) ) {
							if ( 'scale' === $transform_type ) {
								$x = 1;
							} else {
								$x = 0;
							}
						}

						if ( ! \is_numeric( $y_value ) ) {
							if ( 'scale' === $transform_type ) {
								$y = 1;
							} else {
								$y = 0;
							}
						}

						$style = "{$transform_type}({$x}{$suffix}, {$y}{$suffix})";
					}
				}
			}

			return $style;
		}

		/**
		 * Build CSS variable for transform origin
		 *
		 * @param array $args
		 * @return string
		 */
		private function build_transform_origin_css_variable( $transform_origin = [] ) {
			$x = $transform_origin['x'] ?? .5;
			if ( ! \is_numeric( $x ) ) {
				$x = .5;
			}
			$x = round( $x, 2 ) * 100;
			$y = $transform_origin['y'] ?? .5;
			if ( ! \is_numeric( $y ) ) {
				$y = .5;
			}
			$y = round( $y, 2 ) * 100;

			return "--be--transform-origin: {$x}% {$y}%;";
		}

		/**
		 * Build transition style
		 *
		 * @param array  $args {
		 *   @param array  $data
		 *   @param string $sesector
		 *   @param array  $block
		 *   @param array  $devices
		 * }
		 * @param array  &$style_array
		 * @return void
		 */
		private function get_with_transition_style( $args, &$style_array ) {
			$data = $args['data'] ?? [];

			// Block name.
			$block_name = $args['block']['blockName'] ?? '';

			// Has no feature.
			if ( ! $this->has_feature( 'withTransition', $block_name ) ) {
				return '';
			}

			// No value.
			if ( ! isset( $data['withTransition'] ) || ( ! isset( $data['withTransition']['transition'] ) && ! isset( $data['withTransition']['transitionHover'] ) ) ) {
				return '';
			}

			// Get selector.
			$selector = $args['selector'] ?? '';

			if ( 'core/button' === $block_name ) {
				$selector = $selector . ' .wp-block-button__link';
			} elseif ( 'boldblocks/svg-block' === $block_name ) {
				$selector = $selector . ' .wp-block-boldblocks-svg-block__inner';
			}

			// Custom style.
			return $this->build_custom_style(
				array_merge(
					$args,
					[
						'selector'         => $selector,
						'setting_value'    => $data['withTransition'],
						'func_build_style' => [ $this, 'build_with_transition_style' ],
					]
				),
				$style_array
			);
		}

		/**
		 * Build transition style
		 *
		 * @param array $args
		 * @param array &$style_array
		 * @return void
		 */
		private function build_with_transition_style( $args, &$style_array ) {
			$setting_value = $args['setting_value'];

			// Get transition style.
			$transition_css = $this->build_transition_css_variable( $setting_value['transition'] ?? '' );

			// Add style to the style_array.
			if ( $transition_css ) {
				$this->add_to_style_array( $transition_css, $style_array, $args );
			}

			// Get hover transition style.
			$hover_transition_css = $this->build_transition_css_variable( $setting_value['transitionHover'] ?? '' );

			// Add style to the style_array.
			if ( $hover_transition_css ) {
				$hover_args             = $args;
				$hover_args['selector'] = "{$args['selector']}:hover";
				$this->add_to_style_array( $hover_transition_css, $style_array, $hover_args );
			}

			return $transition_css || $hover_transition_css ? [ 'with-transition' ] : false;
		}

		/**
		 * Build CSS variable for transition
		 *
		 * @param string $transition
		 * @return string
		 */
		private function build_transition_css_variable( $transition ) {
			// Build the css variable.
			$transition_css = '';
			if ( $transition ) {
				$transition_css = '--be--transition:' . $transition . ';';
			}

			return $transition_css;
		}

		/**
		 * Build text alignment style
		 *
		 * @param array  $args {
		 *   @param array  $data
		 *   @param string $sesector
		 *   @param array  $block
		 *   @param array  $devices
		 * }
		 * @param array  &$style_array
		 * @param array  &$responsive_style_array
		 * @return void
		 */
		private function get_with_text_alignment_style( $args, &$style_array, &$responsive_style_array ) {
			$data = $args['data'] ?? [];

			// Block name.
			$block_name = $args['block']['blockName'] ?? '';

			// Has no feature.
			if ( ! $this->has_feature( 'withTextAlignment', $block_name ) ) {
				return '';
			}

			// No value.
			if ( ! isset( $data['withTextAlignment'] ) || ! isset( $data['withTextAlignment']['textAlignment'] ) ) {
				return '';
			}

			// Responsive style.
			return $this->build_responsive_style(
				array_merge(
					$args,
					[
						'setting_value'    => $data['withTextAlignment']['textAlignment'],
						'setting_variable' => '--be--text-alignment',
						'func_build_style' => [ $this, 'build_text_alignment_css_value' ],
					]
				),
				$style_array,
				$responsive_style_array
			);
		}

		/**
		 * Build text alignment style
		 *
		 * @param array $args
		 * @return void
		 */
		private function build_text_alignment_css_value( $args ) {
			if ( in_array( $args['value'], [ 'left', 'center', 'right' ] ) ) {
				return $args['value'];
			}

			return '';
		}

		/**
		 * Build typography style by attribute
		 *
		 * @param array  $args {
		 *   @param string $attribute
		 *   @param string $variable
		 *   @param array  $data
		 *   @param string $sesector
		 *   @param array  $block
		 *   @param array  $devices
		 * }
		 * @param array  &$style_array
		 * @param array  &$responsive_style_array
		 * @return void
		 */
		private function get_with_typography_style( $args, &$style_array, &$responsive_style_array ) {
			$data = $args['data'] ?? [];

			// Block name.
			$block_name = $args['block']['blockName'] ?? '';

			// Has no feature.
			if ( ! $this->has_feature( 'withTypography', $block_name ) ) {
				return '';
			}

			$attribute = $args['attribute'] ?? '';
			$variable  = $args['variable'] ?? '';

			if ( ! $attribute || ! $variable ) {
				return '';
			}

			// No value.
			if ( ! isset( $data['withTypography'] ) || ! isset( $data['withTypography'][ $attribute ] ) ) {
				return '';
			}

			if ( 'core/button' === $block_name ) {
				$selector         = $args['selector'] ?? '';
				$args['selector'] = $selector . ' > .wp-block-button__link';
			}

			// Responsive style.
			return $this->build_responsive_style(
				array_merge(
					$args,
					[
						'setting_value'    => $data['withTypography'][ $attribute ],
						'setting_variable' => $variable,
						'func_build_style' => [ $this, 'build_typography_css_value' ],
					]
				),
				$style_array,
				$responsive_style_array
			);
		}

		/**
		 * Build typography style
		 *
		 * @param array $args
		 * @return void
		 */
		private function build_typography_css_value( $args ) {
			return $args['value'] ?? '';
		}

		/**
		 * Build custom style
		 *
		 * @param array $args
		 * @param array &$style_array
		 * @param array &$responsive_style_array
		 * @return string
		 */
		private function build_custom_style( $args, &$style_array = [], &$responsive_style_array = [] ) {
			$func_build_style = $args['func_build_style'] ?? '';

			if ( ! \is_callable( $func_build_style ) ) {
				return '';
			}

			$setting_value = $args['setting_value'] ?? [];
			if ( empty( $setting_value ) ) {
				return '';
			}

			// Build style.
			return $func_build_style( $args, $style_array, $responsive_style_array );
		}

		/**
		 * Build responsive style
		 *
		 * @param array $args
		 * @param array &$style_array
		 * @param array &$responsive_style_array
		 * @return string
		 */
		private function build_responsive_style( $args, &$style_array, &$responsive_style_array ) {
			$func_build_style = $args['func_build_style'] ?? '';
			if ( ! \is_callable( $func_build_style ) ) {
				return '';
			}

			$setting_value = $args['setting_value'] ?? [];
			if ( empty( $setting_value ) || ! \is_array( $setting_value ) ) {
				return '';
			}

			$setting_variable = $args['setting_variable'] ?? [];
			if ( empty( $setting_variable ) ) {
				return '';
			}

			$breakpoints = $args['breakpoints'];
			$selector    = $args['selector'];

			$setting_styles = [];
			if ( is_array( $setting_value ) && ! empty( $setting_value ) ) {
				foreach ( $setting_value as $breakpoint => $value_by_breakpoint ) {
					$value = [];
					if ( isset( $value_by_breakpoint['value'] ) ) {
						$value = $value_by_breakpoint['value'];
					} elseif ( isset( $value_by_breakpoint['inherit'] ) && is_string( $value_by_breakpoint['inherit'] ) ) {
						$value = $setting_value[ $value_by_breakpoint['inherit'] ]['value'] ?? [];
					}

					$style_by_breakpoint = $func_build_style( array_merge( $args, [ 'value' => $value ] ) );
					if ( $style_by_breakpoint ) {
						$setting_styles[ $breakpoint ] = "{$setting_variable}:{$style_by_breakpoint};";
					}
				}
			}

			$style      = '';
			$last_style = '';
			foreach ( $setting_styles as $breakpoint => $style_by_breakpoint ) {
				if ( $style_by_breakpoint !== $last_style ) {
					$style_with_selector = "{$selector}{{$style_by_breakpoint}}";
					$media_query         = $breakpoints[ $breakpoint ]['mediaQuery'] ?? '';
					if ( $media_query ) {
						$style .= \str_replace( '##CONTENT##', $style_with_selector, $media_query );
					} else {
						$style .= $style_with_selector;
					}
					$last_style = $style_by_breakpoint;
				}
			}

			// Add style to the style_array.
			if ( $style ) {
				$responsive_style_array[] = $style;
			}

			return $style;
		}

		/**
		 * Add style to the style array
		 *
		 * @param string $style
		 * @param array  &$style_array
		 * @param array  $args
		 * @return void
		 */
		private function add_to_style_array( $style, &$style_array, $args ) {
			if ( $style ) {
				$selector = $args['selector'];

				if ( ! isset( $style_array[ $selector ] ) ) {
					$style_array[ $selector ] = [];
				}

				$style_array[ $selector ][] = $style;
			}
		}

		/**
		 * Check wether the block markup has a attribute or not.
		 *
		 * @param string $attribute
		 * @param string $block_content
		 * @return boolean
		 */
		private function block_has_attribute( $attribute, $block_content ) {
			$greater_position = \strpos( $block_content, '>' );
			if ( $greater_position !== false ) {
				$block_tag = \substr( $block_content, 0, $greater_position + 1 );

				return \strpos( $block_tag, $attribute . '=' );
			}

			return false;
		}

		/**
		 * Generate block selector.
		 *
		 * @param string $block_name
		 * @param string $prefix
		 * @return string
		 */
		private function generate_selector( $block_name, $prefix = '' ) {
			// Generate an unique value.
			$id              = \uniqid();
			$selector_prefix = str_replace( '/', '-', $block_name );

			// Buil selector.
			return "{$prefix}{$selector_prefix}-{$id}";
		}

		/**
		 * Add CSS class to block wrapper
		 *
		 * @param string $block_content
		 * @param string $classes
		 * @return string
		 */
		private function add_class_to_block( $block_content, $classes ) {
			$tags = new \WP_HTML_Tag_Processor( $block_content );
			if ( $tags->next_tag() ) {
				$tags->add_class( $classes );
			}
			return $tags->get_updated_html();
		}

		/**
		 * Get CSS value for a color object.
		 *
		 * @param array $color_array
		 * @return string
		 */
		private function get_css_color_value( $color_array ) {
			$value = '';

			if ( is_array( $color_array ) && ! empty( $color_array ) ) {
				if ( $color_array['gradientSlug'] ?? false ) {
					$value = "var(--wp--preset--gradient--{$color_array['gradientSlug']}, {$color_array['gradientValue']})";
				} elseif ( $color_array['gradientValue'] ?? false ) {
					$value = $color_array['gradientValue'];
				} elseif ( $color_array['slug'] ?? false ) {
					$value = "var(--wp--preset--color--{$color_array['slug']}, {$color_array['value']})";
				} elseif ( $color_array['value'] ?? false ) {
					$value = $color_array['value'];
				}
			}

			return $value;
		}

		/**
		 * Enqueue style for a block
		 *
		 * @param string $style
		 * @return void
		 */
		private function enqueue_block_style( $style ) {
			wp_add_inline_style( $this->style_handle, $style );
			wp_enqueue_style( $this->style_handle );
		}

		/**
		 * Enqueue all styles for blocks
		 *
		 * @return void
		 */
		public function enqueue_all_block_styles() {
			if ( wp_is_block_theme() ) {
				$style = $this->get_all_block_styles();

				if ( $style ) {
					wp_add_inline_style( $this->style_handle, $style );
					wp_enqueue_style( $this->style_handle );
				}
			}
		}

		/**
		 * Get all block styles
		 *
		 * @return string
		 */
		private function get_all_block_styles() {
			$style = '';

			if ( $this->feature_style_array ) {
				foreach ( $this->feature_style_array as $feature_style ) {
					if ( $feature_style ) {
						$style .= $feature_style;
					}
				}
			}

			if ( $this->style_array ) {
				foreach ( $this->style_array as $selector_type => $value ) {
					if ( count( $value ) > 0 ) {
						$style .= $selector_type . '{' . implode( '', $value ) . '}';
					}
				}
			}

			if ( $this->responsive_style_array ) {
				foreach ( $this->responsive_style_array as $responsive_style ) {
					$style .= $responsive_style;
				}
			}

			return $style;
		}

		/**
		 * Get style by feature name
		 *
		 * @param string $feature_name
		 * @return string
		 */
		private function get_feature_style( $feature_name ) {
			if ( ! isset( $this->feature_style_array[ $feature_name ] ) ) {
				$feature_file_path = $this->the_plugin_instance->get_file_path( '/build/' . $feature_name . '.css' );
				if ( \file_exists( $feature_file_path ) ) {
					$this->feature_style_array[ $feature_name ] = \file_get_contents( $feature_file_path );
				}
			}

			return '';
		}

		/**
		 * Get breakpoints
		 *
		 * @return array
		 */
		private function get_breakpoints() {
			if ( ! $this->breakpoints ) {
				$breakpoints = [];
				if ( class_exists( \BoldBlocks\ContentBlocksBuilder::class ) ) {
					$cbb_breakpoints = get_option( 'cbb_breakpoints' );
					if ( $cbb_breakpoints ) {
						$cbb_breakpoints = array_column( $cbb_breakpoints, null, 'prefix' );
						$sm_breakpoint   = $cbb_breakpoints['sm']['breakpoint'] ?? 576;
						$md_breakpoint   = $cbb_breakpoints['md']['breakpoint'] ?? 768;
						$lg_breakpoint   = $cbb_breakpoints['lg']['breakpoint'] ?? 1024;

						$breakpoints = [
							'sm' => [
								'breakpoint' => $sm_breakpoint . 'px',
								'mediaQuery' => '',
							],
							'md' => [
								'breakpoint' => $md_breakpoint . 'px',
								'mediaQuery' => '@media (min-width: ' . $md_breakpoint . 'px){##CONTENT##}',
							],
							'lg' => [
								'breakpoint' => $lg_breakpoint . 'px',
								'mediaQuery' => '@media (min-width: ' . $lg_breakpoint . 'px){##CONTENT##}',
							],
						];
					}
				}

				if ( empty( $breakpoints ) ) {
					$breakpoints = get_option( 'be_breakpoints' );
					if ( empty( $breakpoints ) ) {
						$breakpoints = [
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
						];
					}
				}

				// Cache the result.
				$this->breakpoints = $breakpoints;
			}

			return $this->breakpoints;
		}

		/**
		 * Render list item block
		 *
		 * @param string $block_content
		 * @param array  $block
		 * @return string
		 */
		public function render_list_item_block( $block_content, $block ) {
			// Bail if if it is admin context.
			if ( is_admin() ) {
				return $block_content;
			}

			// Bail if it is not a list item block.
			if ( 'core/list-item' !== ( $block['blockName'] ?? '' ) ) {
				return $block_content;
			}

			if ( count( $block['innerBlocks'] ?? [] ) > 0 ) {
				// Add the has-children class first.
				$tags = new \WP_HTML_Tag_Processor( $block_content );
				if ( $tags->next_tag( 'li' ) ) {
					$tags->add_class( 'has-children' );
				}
				$block_content = $tags->get_updated_html();

				// Wrap the inner text with a span.
				$pattern     = '/<li([^>]*)>([\s\S]*?)<ul/i';
				$replacement = '<li$1><span class="list-item-text">$2</span><ul';
				$new_content = preg_replace( $pattern, $replacement, $block_content, 1 );
				if ( $new_content ) {
					return $new_content;
				}
			}

			return $block_content;
		}
	}
endif;
