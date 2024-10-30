=== Block Enhancements - Add practical features to Gutenberg blocks ===
Contributors:      Mr2P
Tags:              Gutenberg, blocks, responsive, button, icon
Requires PHP:      7.0.0
Requires at least: 6.5
Tested up to:      6.7
Stable tag:        1.2.6
License:           GPL-3.0
License URI:       https://www.gnu.org/licenses/gpl-3.0.html
Donate link:       https://boldblocks.net?utm_source=wp.org&utm_campaign=readme&utm_medium=link&utm_content=BE+Donate

Enhance Gutenberg blocks with practical features such as icons, shadow, transform, transition, responsive typography, text alignment, hover style, etc.

== Description ==

Enhance Gutenberg blocks with practical features such as icons, color, shadow, transform, transition, responsive typography, responsive text alignment, hover style, etc.
Unlike other similar plugins, this plugin is fast, lightweight and clean. It only loads what you need. You can choose which features to apply to specific blocks through the settings page.

*It works with all themes, however, the with-icon feature uses the CSS pseudo `::before` to add icons with the `mask-image` CSS property. It may conflict with other plugins or themes that use the same technique.*

=== Key Features ===

* Add an icon to button, heading, list, list item, navigation, etc. from a library with more than 3000 icons, or upload your custom SVG image.
* Add box-shadow
* Add text-shadow
* Add 2D transform (translate, rotate, skew, scale)
* Add hover state style for shadow, transform, text-color, background-color
* Add responsive text alignment. It's useful for 'container' blocks such as 'core/group', 'core/columns', 'core/column' and/or you want for example text-align center on mobile but text-align left on the desktop
* Add transition
* Add responsive font size, font weight, line height, and letter spacing based on media queries

☐ More features will be added soon.

=== Video tutorials ===

How to customize a core button in Gutenberg:

[youtube https://www.youtube.com/watch?v=uW3xEH6U-C0]

Please help this plugin grow by reporting issues and giving suggestions.

If this plugin is useful for you, please do a quick review and [rate it](https://wordpress.org/support/plugin/block-enhancements/reviews/#new-post) on WordPress.org to help us spread the word. I would very much appreciate it.

Please check out my other plugins if you're interested:

- **[Content Blocks Builder](https://wordpress.org/plugins/content-blocks-builder)** - This plugin turns the Block Editor into a powerful page builder by allowing you to create blocks, variations, and patterns directly in the Block Editor without needing a code editor.
- **[Meta Field Block](https://wordpress.org/plugins/display-a-meta-field-as-block)** - A block to display custom fields as blocks on the front end. It supports custom fields for posts, terms, users, and setting fields. It can also be used in the Query Loop block.
- **[SVG Block](https://wordpress.org/plugins/svg-block)** - A block to display SVG images as blocks. Useful for images, icons, dividers, and buttons. It allows you to upload SVG images and load them into the icon library.
- **[Icon separator](https://wordpress.org/plugins/icon-separator)** - A tiny block just like the core/separator block but with the ability to add an icon.
- **[Breadcrumb Block](https://wordpress.org/plugins/breadcrumb-block)** - A simple breadcrumb trail block that supports JSON-LD structured data and is compatible with WooCommerce.
- **[Counting Number Block](https://wordpress.org/plugins/counting-number-block)** - A block to display numbers with a counting effect
- **[Better YouTube Embed Block](https://wordpress.org/plugins/better-youtube-embed-block)** - A block to solve the performance issue with embedded YouTube videos. It can also embed multiple videos and playlists.

The plugin is developed using @wordpress/scripts.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/block-enhancements` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress


== Frequently Asked Questions ==

= What problem does this plugin solve? =

It adds more features to make core blocks fit more real-world use cases.

= When should we use this plugin? =

When you want more advanced features on core blocks, but don’t want any third-party blocks from a heavy block library.

= Why do you need this plugin? =

It’s super easy to use and lightweight. It only loads what you need.

= Who needs this plugin? =

Anyone can use this plugin.

= Why does the text of the block break when I add an icon to it? =

It is probably because you added an inline element such as bold, italic, highlight, etc. in the text. To fix it, there is a toggle setting named ‘Don't wrap text across lines.’ in the ‘With icon’ panel. Just turn it on to make the text work properly.

== Screenshots ==

1. Add an icon to a heading

2. Add an icon to a list

3. Add an icon to a button

4. Add responsive settings for font size, line height, font weight, and letter spacing

5. Add responsive text alignment to a group

6. Add text shadow to a group

7. Add box shadow with hover style to a group

8. Add color with hover style to a group

9. Add transform with hover style to a group

10. Add a feature to blocks

11. Add an icon to categories

== Changelog ==

= 1.2.6 =
*Release Date - 24 October 2024*

* Updated  - SDK to implement minor UI changes and remove deprecated code
* Improved - Replaced classnames with clsx
* Updated  - Tested compatibility with WP 6.7 and set minimum requirement to WP 6.5

= 1.2.5 =
*Release Date - 18 June 2024*

* Fixed    - Dirty state when wrapping text is enabled on buttons with icon
* Fixed    - Buttons in a navigation with icon
* Improved - Make the selector of the navigation item more specific than the submenu's

= 1.2.4 =
*Release Date - 17 June 2024*

* Added    - Support the with-icon feature on core/list-item, core/navigation-link, core/navigation, core/navigation-submenu
* Fixed    - Style issues on the color dropdown control and vertical spacings
* Improved - Get responsive settings from CBB

= 1.2.3 =
*Release Date - 06 May 2024*

* Fixed - The custom gap between the icon and the text on buttons not working

= 1.2.2 =
*Release Date - 28 April 2024*

* Updated - Icon Library
* Removed - Upload SVGs to the media library

= 1.2.1 =
*Release Date - 31 March 2024*

* Fixed    - When front-end forms are submitted to admin-post.php, nopriv users are redirected to the login page.
* Refactor - Get/set device preview

= 1.2.0 =
*Release Date - 13 January 2024*

* Added   - Responsive settings for font size, line height, font weight, and letter spacing
* Added   - Allow uploading SVG files and load them into the icon library
* Updated - Increase 'Requires at least' to 6.3
* Updated - Update SDK

= 1.1.20 =
*Release Date - 05 January 2024*

* Fixed - Issue: the nested button blocks get the style from their parent block

= 1.1.19 =
*Release Date - 27 September 2023*

* Updated - Allow adding style on multiple selected blocks
* Updated - Remove deprecated warning

= 1.1.18 =
*Release Date - 11 September 2023*

* DEV - Only core lists can have icons for nested lists.

= 1.1.17 =
*Release Date - 09 September 2023*

* DEV - Support with-icon for nested list of list blocks
* DEV - Update "Requires at least 6.2" for using the new HTML API

= 1.1.16 =
*Release Date - 26 August 2023*

* DEV - Support prefers-reduced-motion

= 1.1.15 =
*Release Date - 13 August 2023*

* FIX - The custom styles have not been loaded in classic themes

= 1.1.14 =
*Release Date - 08 August 2023*

* DEV - Redesign the setting page
* DEV - Add feature classes to all dynamic blocks
* DEV - Add icon to core/categories, core/latest-posts, core/post-title, core/query-title, core/comment-title

= 1.1.13 =
*Release Date - 14 June 2023*

* DEV - Add custom shadow presets
* DEV - Using ToolsPanel instead of PanelBody for more clean UI

= 1.1.12 =
*Release Date - 17 May 2023*

* DEV - Add preset shadows to the with-shadow feature

= 1.1.11 =
*Release Date - 08 April 2023*

* DEV - Move all settings to the styles tab

= 1.1.10 =
*Release Date - 11 March 2023*

* DEV - Update icon library
* DEV - Refactor namespace

= 1.1.9 =
*Release Date - 19 February 2023*

* FIX - Remove the empty class attribute from blocks
* FIX - Remove empty spaces when adding class attribute

= 1.1.8 =
*Release Date - 10 February 2023*

* DEV - Add the with-color feature with the hover state
* DEV - Refactor code, combine all separate styles into one

= 1.1.7 =
*Release Date - 20 January 2023*

* DEV - Add hover state style builder to shadows, transform
* DEV - Add transition feature

= 1.1.6 =
*Release Date - 06 November 2022*

* DEV - Clean up the default value for more cleaning markup

= 1.1.5 =
*Release Date - 27 October 2022*

* DEV - Allow custom ColorGradientControl clearable
* FIX - Add a fallback value for the withIcon feature

= 1.1.4 =
*Release Date - 12 October 2022*

* FIX - Only load CSS files when necessary

= 1.1.3 =
*Release Date - 08 October 2022*

* DEV - Add the withIcon feature to the read more block
* DEV - Refactor the icon library

= 1.1.2 =
*Release Date - 18 September 2022*

* FIX - Compatibility issue with the Gutenberg plugin
* DEV - Load localization

= 1.1.1 =
*Release Date - 28 July 2022*

* FIX - Check whether having an icon or not to improve performance

= 1.1.0 =
*Release Date - 27 July 2022*

* FIX - Edit text after wrapping it inside an element
* DEV - Allow double click to insert icon with the withIcon feature
* FIX - Convert inline style to style object
* REFACTOR - Refactor the withIcon feature

= 1.0.12 =
*Release Date - 20 Jun 2022*

* DEV - Allow uploading SVG icons for the withIcon feature

= 1.0.11 =
*Release Date - 08 May 2022*

* REFACTOR Update SDK

= 1.0.10 =
*Release Date - 08 May 2022*

* DEV - Add responsive text-alignment feature

= 1.0.9 =
*Release Date - 02 May 2022*

* DEV - Add text-shadow feature

= 1.0.8 =
*Release Date - 02 May 2022*

* FIX - Add a setting to prevent text from breaking when there is an inline tag in the text

= 1.0.7 =
*Release Date - 30 April 2022*

* DEV - Use nanoid instead of useInstanceId
* DEV - Update components' style

= 1.0.6 =
*Release Date - 27 April 2022*

* DEV - Add the transform feature

= 1.0.5 =
*Release Date - 27 April 2022*

* DEV - Add settings page to select which blocks should be allowed to add features
* FIX - Make page 'dirty' on page load

= 1.0.4 =
*Release Date - 19 April 2022*

* DEV - Load styles for the iframe editor

= 1.0.3 =
*Release Date - 16 April 2022*

* DEV - Add the 'withShadow' feature
* DEV - Add shortcut keys to the icon library modal, focus on the search box when opening the modal

= 1.0.2 =
*Release Date - 12 April 2022*

* DEV - Update icon pack

= 1.0.1 =
*Release Date - 11 April 2022*

* DEV - Support 'withIcon' to core/heading block

= 1.0.0 =
*Release Date - 09 April 2022*
