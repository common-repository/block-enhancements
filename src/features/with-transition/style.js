/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { buildStyle } from "../../utils";

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
    settingValue: attributes?.boldblocks?.withTransition?.transition,
    settingVariable: "--be--transition",
    buildCSSCallback: getTransitionStyle,
    selector,
  });

  const styleHover = buildStyle({
    settingValue: attributes?.boldblocks?.withTransition?.transitionHover,
    settingVariable: "--be--transition",
    buildCSSCallback: getTransitionStyle,
    selector: `${selector}:hover`,
  });

  return `${style}${styleHover}`;
}

/**
 * Get styles for the transition feature.
 *
 * @param {Object} transition
 */
export function getTransitionStyle(transition) {
  return transition;
}
