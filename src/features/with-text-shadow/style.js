/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { buildStyle, getColorCSSValue } from "../../utils";

/**
 * Build CSS variables
 *
 * @param {Object} attributes
 * @param {String} selector
 * @param {String} blockName
 * @returns {String}
 */
export function buildCSSVariables(attributes, selector, blockName = "") {
  const style = buildStyle({
    settingValue: attributes?.boldblocks?.withTextShadow?.shadows,
    settingVariable: "--be--text-shadow",
    buildCSSCallback: getTextShadowStyle,
    selector,
  });

  const styleHover = buildStyle({
    settingValue: attributes?.boldblocks?.withTextShadow?.shadowsHover,
    settingVariable: "--be--text-shadow",
    buildCSSCallback: getTextShadowStyle,
    selector: `${selector}:hover`,
  });

  return `${style}${styleHover}`;
}

/**
 * Get styles for the text shadow feature.
 *
 * @param {Object} shadows
 */
export function getTextShadowStyle(shadows) {
  let style = "";
  if (Array.isArray(shadows) && shadows.length) {
    let shadowStyles = [];
    shadows.forEach(({ x = "0px", y = "0px", blur = "0px", color = "" }) => {
      const colorCssValue = getColorCSSValue(color);

      if (colorCssValue) {
        shadowStyles.push(`${x} ${y} ${blur} ${colorCssValue}`);
      }
    });

    style = shadowStyles.join(",");
  }

  return style;
}
