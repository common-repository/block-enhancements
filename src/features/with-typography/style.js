/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { buildResponsiveStyle } from "../../utils";

/**
 * Build CSS variables
 *
 * @param {Object} attributes
 * @param {String} selector
 * @param {String} blockName
 * @returns {String}
 */
export function buildCSSVariables(attributes, selector, blockName = "") {
  return getTypographyStyle(attributes?.boldblocks?.withTypography, selector);
}

/**
 * Get styles for the feature.
 *
 * @param {Object} withTypography
 * @param {String} selector
 */
export function getTypographyStyle(withTypography, selector) {
  const {
    fontSize = {},
    lineHeight = {},
    fontWeight = {},
    letterSpacing = {},
  } = withTypography ?? {};

  return `${buildResponsiveStyle({
    settingValue: fontSize,
    settingVariable: "--be--font-size",
    buildCSSCallback: buildAttributeValue,
    selector,
  })}${buildResponsiveStyle({
    settingValue: lineHeight,
    settingVariable: "--be--line-height",
    buildCSSCallback: buildAttributeValue,
    selector,
  })}${buildResponsiveStyle({
    settingValue: fontWeight,
    settingVariable: "--be--font-weight",
    buildCSSCallback: buildAttributeValue,
    selector,
  })}${buildResponsiveStyle({
    settingValue: letterSpacing,
    settingVariable: "--be--letter-spacing",
    buildCSSCallback: buildAttributeValue,
    selector,
  })}`;
}

/**
 * Build CSS value
 *
 * @param {Object}
 * @returns {String}
 */
function buildAttributeValue({ value }) {
  return value ? value : "";
}
