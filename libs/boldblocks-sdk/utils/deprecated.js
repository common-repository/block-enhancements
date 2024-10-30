/**
 * External dependencies
 */
import { isUndefined, isString, isNil, isObject } from "lodash";

/**
 * Internal dependencies
 */
import { isValidSettingObject, getColorCSSValue } from "../utils";

/**
 * Get CSS value for a color attribute
 *
 * @param {Object} colorObject
 */
export function getColorCSSValueDeprecatedV1(colorObject) {
  let hasGradient = colorObject?.gradientSlug || colorObject?.gradientValue;
  return hasGradient
    ? colorObject?.gradientSlug
      ? `var(--wp--preset--gradient--${colorObject.gradientSlug})`
      : colorObject?.gradientValue
    : colorObject?.slug
    ? `var(--wp--preset--color--${colorObject.slug})`
    : colorObject?.value;
}

/**
 * Get styles for the toggle group field.
 *
 * @param {Object} attributeValue
 * @param {String} variableName
 */
export function getStyleForResponsiveToggleGroupFieldDeprecatedV1(
  attributeValue,
  variableName
) {
  let style = {};
  if (isValidSettingObject(attributeValue)) {
    Object.keys(attributeValue).forEach((breakpoint) => {
      const { value: { value } = {}, inherit } = attributeValue[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: inheritValue } = attributeValue[inherit] ?? {};

          if (inheritValue) {
            style = {
              ...style,
              [`--bb--${variableName}--${breakpoint}`]: `var(--bb--${variableName}--${inherit})`,
            };
          }
        }
      } else {
        if (value) {
          style = {
            ...style,
            [`--bb--${variableName}--${breakpoint}`]: value + "",
          };
        }
      }
    });
  }

  return style;
}

/**
 * Get CSS value for a box (top, right, bottom, left) property.
 *
 * @param {Object} value
 * @param {String} prefix
 * @param {String} breakpoint
 * @param {Boolean|String} inherit
 * @returns {String}
 */
export const getCSSBoxValueDeprecatedV1 = (
  value,
  prefix,
  breakpoint,
  inherit = false,
  buildStyle = (value) => value + ""
) => {
  let cssValue = {};
  // Override the parameter
  buildStyle = buildBorderStyleDeprecatedV1;
  if (isValidSettingObject(value)) {
    const { top, right, bottom, left } = value;

    if (!isNil(top)) {
      cssValue = {
        ...cssValue,
        [`${prefix}-top--${breakpoint}`]: inherit
          ? `var(${prefix}-top--${inherit})`
          : buildStyle(top),
      };
    }
    if (!isNil(right)) {
      cssValue = {
        ...cssValue,
        [`${prefix}-right--${breakpoint}`]: inherit
          ? `var(${prefix}-right--${inherit})`
          : buildStyle(right),
      };
    }
    if (!isNil(bottom)) {
      cssValue = {
        ...cssValue,
        [`${prefix}-bottom--${breakpoint}`]: inherit
          ? `var(${prefix}-bottom--${inherit})`
          : buildStyle(bottom),
      };
    }
    if (!isNil(left)) {
      cssValue = {
        ...cssValue,
        [`${prefix}-left--${breakpoint}`]: inherit
          ? `var(${prefix}-left--${inherit})`
          : buildStyle(left),
      };
    }
  }

  return cssValue;
};

/**
 * Build border css style
 *
 * @param {Object} value
 * @returns {String}
 */
export const buildBorderStyleDeprecatedV1 = (
  value,
  buildColorCSSValue = getColorCSSValue
) => {
  let styleArray = [];
  if (isObject(value)) {
    const { width, style, color } = value;
    if (isString(width)) {
      styleArray.push(width);
    }

    if (isString(style)) {
      styleArray.push(style);
    }

    if (isString(color) || isObject(color)) {
      styleArray.push(buildColorCSSValue(color));
    }
  }

  return styleArray.join(" ");
};
