/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { isValidSettingObject } from "../../utils";

/**
 * Build CSS variables
 *
 * @param {Object} attributes
 * @param {String} selector
 * @param {String} blockName
 * @returns {String}
 */
export function buildCSSVariables(attributes, selector, blockName = "") {
  const style = buildColorStyle(
    attributes?.boldblocks?.withColor?.colors,
    selector
  );

  const styleHover = buildColorStyle(
    attributes?.boldblocks?.withColor?.colorsHover,
    `${selector}:hover`
  );

  return `${style}${styleHover}`;
}

/**
 * Build color css style
 *
 * @param {Object} colors
 * @param {String} selector
 * @returns {String}
 */
function buildColorStyle(colors, selector) {
  let style = "";
  if (isValidSettingObject(colors)) {
    if (colors?.colorValue) {
      const colorCSSValue = colors?.colorSlug
        ? `var(--wp--preset--color--${colors.colorSlug}, ${colors?.colorValue})`
        : colors?.colorValue;

      style = `${style}--be--text-color:${colorCSSValue};`;
    }

    if (colors?.backgroundValue || colors?.backgroundGradientValue) {
      let backgroundCSSValue = "";
      if (colors?.backgroundGradientValue) {
        backgroundCSSValue = colors?.backgroundGradientSlug
          ? `var(--wp--preset--gradient--${colors.backgroundGradientSlug}, ${colors?.backgroundGradientValue})`
          : colors?.backgroundGradientValue;
      } else {
        backgroundCSSValue = colors?.backgroundSlug
          ? `var(--wp--preset--color--${colors.backgroundSlug}, ${colors?.backgroundValue})`
          : colors?.backgroundValue;
      }

      style = `${style}--be--background-color:${backgroundCSSValue};`;
    }
  }

  if (style) {
    return `${selector}{${style}}`;
  }

  return style;
}
