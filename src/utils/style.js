/**
 * External dependencies
 */
import { isUndefined, isString } from "lodash";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { isValidSettingObject, getDeviceInfoByBreakpoint } from "../utils";

/**
 * Build style
 *
 * @param {Object}
 */
export function buildStyle({
  settingValue,
  settingVariable,
  buildCSSCallback = noop,
  selector,
}) {
  if (!isValidSettingObject(settingValue)) {
    return "";
  }

  const style = buildCSSCallback(settingValue);
  if (style) {
    return `${selector}{${settingVariable}:${style};}`;
  }

  return "";
}

/**
 * Build responsive style
 *
 * @param {Object}
 */
export const buildResponsiveStyle = ({
  settingValue,
  settingVariable,
  buildCSSCallback,
  selector,
  ...otherProps
}) => {
  let style = "";
  let styleObject = {};
  if (isValidSettingObject(settingValue)) {
    Object.keys(settingValue).forEach((breakpoint) => {
      let { value, inherit } = settingValue[breakpoint];
      if (isUndefined(value) && inherit && isString(inherit)) {
        const { value: inheritValue } = settingValue[inherit] ?? {};

        value = inheritValue;
      }

      const settingStyle = buildCSSCallback({ value, ...otherProps });
      if (settingStyle) {
        styleObject = {
          ...styleObject,
          [breakpoint]: `${settingVariable}: ${settingStyle};`,
        };
      }
    });
  }

  if (isValidSettingObject(styleObject)) {
    let styleByBreakpoint = "";
    let lastStyleByBreakpoint = "";
    let styleWithSelector = "";
    Object.keys(styleObject).forEach((breakpoint) => {
      styleByBreakpoint = styleObject[breakpoint];
      if (styleByBreakpoint && styleByBreakpoint !== lastStyleByBreakpoint) {
        styleWithSelector = `${selector}{${styleByBreakpoint}}`;
        const deviceInfo = getDeviceInfoByBreakpoint(breakpoint);
        if (deviceInfo?.mediaQuery) {
          style = `${style}${deviceInfo?.mediaQuery}{${styleWithSelector}}`;
        } else {
          style = `${style}${styleWithSelector}`;
        }

        lastStyleByBreakpoint = styleByBreakpoint;
      }
    });
  }

  return style;
};

/**
 * Get nested selector for list/button
 *
 * @param {String} selector
 * @param {String} blockName
 * @param {String} featureName
 * @returns {String}
 */
export function getSelector(selector, blockName, featureName) {
  switch (featureName) {
    case "withIcon":
      if (
        [
          "core/list",
          "core/categories",
          "core/latest-posts",
          "core/archives",
        ].includes(blockName)
      ) {
        selector = `${selector} > li`;
      } else if (blockName === "core/button") {
        selector = `${selector} .wp-block-button__link`;
      } else if (blockName === "core/list-item") {
        selector = `${selector}.core-list-item`;
      } else if (blockName === "core/navigation-link") {
        selector = `${selector}.core-navigation-link.with-icon > .wp-block-navigation-item__content`;
      } else if (blockName === "core/navigation") {
        selector = `${selector} .wp-block-navigation-item__content`;
      } else if (blockName === "core/navigation-submenu") {
        selector = `${selector} [class*="wp-block-navigation"] .wp-block-navigation-item__content`;
      }

      return selector;

    case "withShadow":
    case "withTransform":
    case "withTransition":
    case "withColor":
      if (blockName === "core/button") {
        selector = `${selector} .wp-block-button__link`;
      } else if (blockName === "boldblocks/svg-block") {
        selector = `${selector} .wp-block-boldblocks-svg-block__inner`;
      }

      return selector;

    case "withTextShadow":
      if (blockName === "core/button") {
        selector = `${selector} .wp-block-button__link`;
      }

      return selector;

    default:
      return selector;
  }
}
