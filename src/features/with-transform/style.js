/**
 * External dependencies
 */
import { isArray, isNil, isNumber } from "lodash";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { buildResponsiveStyle, isValidSettingObject } from "../../utils";

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
  return getTransformStyle(attributes?.boldblocks?.withTransform, selector);
}

/**
 * Get styles for the feature.
 *
 * @param {Object} withTransform
 * @param {String} selector
 */
export function getTransformStyle(withTransform, selector) {
  const {
    transform = {},
    transformOrigin: { x = 0.5, y = 0.5 } = {},
    transformHover = {},
    transformOriginHover: { x: xHover, y: yHover } = {},
  } = withTransform ?? {};

  let style = buildResponsiveStyle({
    settingValue: transform,
    settingVariable: "--be--transform",
    buildCSSCallback: buildTransformStyle,
    selector,
  });

  let styleHover = buildResponsiveStyle({
    settingValue: transformHover,
    settingVariable: "--be--transform",
    buildCSSCallback: buildTransformStyle,
    selector: `${selector}:hover`,
  });

  if (style || styleHover) {
    style = `${style}${selector}{--be--transform-origin: ${
      parseFloat(x).toFixed(2) * 100
    }% ${parseFloat(y).toFixed(2) * 100}%;}`;

    if (isNumber(xHover) && isNumber(yHover)) {
      styleHover = `${styleHover}${selector}:hover{--be--transform-origin: ${
        parseFloat(xHover).toFixed(2) * 100
      }% ${parseFloat(yHover).toFixed(2) * 100}%;}`;
    }
  }

  return `${style}${styleHover}`;
}

/**
 * Build transform css style
 *
 * @param {Object}
 * @returns {String}
 */
const buildTransformStyle = ({ value }) => {
  let styleArray = [];
  if (isArray(value)) {
    styleArray = value
      .map((item) => buildTransformTypeCSSValue(item))
      .filter((i) => i);
  }

  return styleArray.join(" ");
};

/**
 * Build transform type value
 *
 * @param {Object} transformItem
 */
const buildTransformTypeCSSValue = (transformItem) => {
  let style = "";
  if (isValidSettingObject(transformItem)) {
    const transformType = Object.keys(transformItem).length
      ? Object.keys(transformItem)[0]
      : false;

    if (transformType) {
      const { [transformType]: transformValue } = transformItem;
      if (isValidSettingObject(transformValue)) {
        if (transformType === "rotate") {
          if (transformValue !== "") {
            style = `rotate(${transformValue}deg)`;
          }
        } else {
          const suffix = "skew" === transformType ? "deg" : "";
          let { x, y } = transformValue;
          if (!isTransformValueEmpty(x) || !isTransformValueEmpty(y)) {
            x = isTransformValueEmpty(x)
              ? transformType === "scale"
                ? 1
                : 0
              : x;
            y = isTransformValueEmpty(y)
              ? transformType === "scale"
                ? 1
                : 0
              : y;
            style = `${transformType}(${x}${suffix}, ${y}${suffix})`;
          }
        }
      }
    }
  }

  return style;
};

/**
 * Check a transform value is empty or not
 *
 * @param {Mixed} value
 * @returns {Boolean}
 */
const isTransformValueEmpty = (value) =>
  isNil(value) || value === "" || value.replaceAll(/[^0-9.]/gi, "") === "";
