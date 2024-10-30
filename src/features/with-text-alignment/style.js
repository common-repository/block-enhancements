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
import { textAlignmentOptions } from "./utils";

/**
 * Build CSS variables
 *
 * @param {Object} attributes
 * @param {String} selector
 * @param {String} blockName
 * @returns {String}
 */
export function buildCSSVariables(attributes, selector, blockName = "") {
  // Get transform style
  return getTextAlignmentStyle(
    attributes?.boldblocks?.withTextAlignment,
    selector
  );
}

/**
 * Get styles for the feature.
 *
 * @param {Object} withTextAlignment
 * @param {String} selector
 */
export function getTextAlignmentStyle(withTextAlignment, selector) {
  const { textAlignment = {} } = withTextAlignment ?? {};

  return buildResponsiveStyle({
    settingValue: textAlignment,
    settingVariable: "--be--text-alignment",
    buildCSSCallback: buildTextAlignmentValue,
    selector,
  });
}

/**
 * Build text alignment CSS value
 *
 * @param {Object}
 * @returns {String}
 */
function buildTextAlignmentValue({ value }) {
  if (textAlignmentOptions.includes(value)) {
    return value;
  }

  return "";
}
