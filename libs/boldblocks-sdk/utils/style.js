/**
 * External dependencies
 */
import { isObject, isString, isUndefined, isNil, isArray } from "lodash";
import { isValidSettingObject, isUnsetValue } from "./value";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { getColorCSSValue } from "./color-gradient";

/**
 * Get CSS value for a box (top, right, bottom, left) property.
 *
 * @param {Object} value
 * @param {String} prefix
 * @param {String} breakpoint
 * @param {Boolean|String} inherit
 * @returns {String}
 */
export const getCSSBoxValue = (
  value,
  prefix,
  breakpoint,
  inherit = false,
  buildStyle = (value) => value + ""
) => {
  let cssValue = {};
  if (isValidSettingObject(value)) {
    let top, right, bottom, left;
    if (value?.top || value?.right || value?.bottom || value?.left) {
      top = value?.top;
      right = value?.right;
      bottom = value?.bottom;
      left = value?.left;
    } else {
      top = right = bottom = left = value;
    }
    // const { top, right, bottom, left } = value;

    if (!isNil(top)) {
      const topStyle = buildStyle(top);
      if (topStyle) {
        cssValue = {
          ...cssValue,
          [`${prefix}-top--${breakpoint}`]: inherit
            ? `var(${prefix}-top--${inherit})`
            : topStyle,
        };
      }
    }
    if (!isNil(right)) {
      const rightStyle = buildStyle(right);
      if (rightStyle) {
        cssValue = {
          ...cssValue,
          [`${prefix}-right--${breakpoint}`]: inherit
            ? `var(${prefix}-right--${inherit})`
            : rightStyle,
        };
      }
    }
    if (!isNil(bottom)) {
      const bottomStyle = buildStyle(bottom);
      if (bottomStyle) {
        cssValue = {
          ...cssValue,
          [`${prefix}-bottom--${breakpoint}`]: inherit
            ? `var(${prefix}-bottom--${inherit})`
            : bottomStyle,
        };
      }
    }
    if (!isNil(left)) {
      const leftStyle = buildStyle(left);
      if (leftStyle) {
        cssValue = {
          ...cssValue,
          [`${prefix}-left--${breakpoint}`]: inherit
            ? `var(${prefix}-left--${inherit})`
            : leftStyle,
        };
      }
    }
  }

  return cssValue;
};

/**
 * Get styles for the toggle group field.
 *
 * @param {Object} attributeValue
 * @param {String} variableName
 */
export function getStyleForResponsiveToggleGroupField(
  attributeValue,
  variableName
) {
  let style = {};
  if (isValidSettingObject(attributeValue)) {
    Object.keys(attributeValue).forEach((breakpoint) => {
      const { value: { value } = {}, inherit } = attributeValue[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: { value: inheritValue } = {} } =
            attributeValue[inherit] ?? {};

          if (!isUnsetValue(inheritValue)) {
            style = {
              ...style,
              [`--bb--${variableName}--${breakpoint}`]: `var(--bb--${variableName}--${inherit})`,
            };
          }
        }
      } else {
        if (!isUnsetValue(value)) {
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
 * Get styles for the width feature.
 *
 * @param {Object} attributes
 */
export function getWidthStyle(
  attributes,
  buildStyleForResponsiveToggleGroupField = getStyleForResponsiveToggleGroupField
) {
  const { boldblocks: { width = {} } = {} } = attributes;
  return buildStyleForResponsiveToggleGroupField(width, "width");
}

/**
 * Get styles for the height feature.
 *
 * @param {Object} attributes
 */
export function getHeightStyle(
  attributes,
  buildStyleForResponsiveToggleGroupField = getStyleForResponsiveToggleGroupField
) {
  const { boldblocks: { height = {} } = {} } = attributes;
  return buildStyleForResponsiveToggleGroupField(height, "height");
}

/**
 * Checks is given value is a spacing preset.
 *
 * @param {string} value Value to check
 *
 * @return {boolean} Return true if value is string in format var:preset|spacing|.
 */
export function isValueSpacingPreset(value) {
  if (!value?.includes) {
    return false;
  }
  return value === "0" || value.includes("var:preset|spacing|");
}

/**
 * Converts a spacing preset into a custom value.
 *
 * @param {string} value Value to convert.
 *
 * @return {string | undefined} CSS var string for given spacing preset value.
 */
export function getSpacingPresetCssVar(value) {
  if (!value) {
    return;
  }

  const slug = value.match(/var:preset\|spacing\|(.+)/);

  if (!slug) {
    return value;
  }

  return `var(--wp--preset--spacing--${slug[1]})`;
}

/**
 * Build the CSS value for spacing value
 *
 * @param {Mixed} rawValue
 * @returns {String}
 */
export function buildSpacingCSSValue(rawValue) {
  if (isUnsetValue(rawValue)) {
    return "";
  }

  if (isValueSpacingPreset(rawValue)) {
    return getSpacingPresetCssVar(rawValue);
  }

  if (isObject(rawValue) || isArray(rawValue)) {
    return "";
  }

  return rawValue + "";
}

/**
 * Get styles for the padding feature.
 *
 * @param {Object} attributes
 */
export function getPaddingStyle(attributes) {
  const { boldblocks: { spacing: { padding } = {} } = {} } = attributes;

  let style = {};
  if (isValidSettingObject(padding)) {
    Object.keys(padding).forEach((breakpoint) => {
      const { value, inherit } = padding[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: inheritValue } = padding[inherit] ?? {};
          style = {
            ...style,
            ...getCSSBoxValue(
              inheritValue,
              "--bb--padding",
              breakpoint,
              inherit,
              buildSpacingCSSValue
            ),
          };
        }
      } else {
        style = {
          ...style,
          ...getCSSBoxValue(
            value,
            "--bb--padding",
            breakpoint,
            false,
            buildSpacingCSSValue
          ),
        };
      }
    });
  }

  return style;
}

/**
 * Get styles for the margin feature.
 *
 * @param {Object} attributes
 */
export function getMarginStyle(attributes) {
  const { boldblocks: { spacing: { margin } = {} } = {} } = attributes;

  let style = {};

  if (isValidSettingObject(margin)) {
    Object.keys(margin).forEach((breakpoint) => {
      const { value, inherit } = margin[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: inheritValue } = margin[inherit] ?? {};
          style = {
            ...style,
            ...getCSSBoxValue(
              inheritValue,
              "--bb--margin",
              breakpoint,
              inherit,
              buildSpacingCSSValue
            ),
          };
        }
      } else {
        style = {
          ...style,
          ...getCSSBoxValue(
            value,
            "--bb--margin",
            breakpoint,
            false,
            buildSpacingCSSValue
          ),
        };
      }
    });
  }

  return style;
}

/**
 * Get styles for the spacing feature.
 *
 * @param {Object} attributes
 */
export function getSpacingStyle(attributes) {
  return { ...getPaddingStyle(attributes), ...getMarginStyle(attributes) };
}

/**
 * Get styles for the justify alignment feature.
 *
 * @param {Object} attributes
 */
export function getJustifyAlignmentStyle(attributes) {
  const { boldblocks: { justifyAlignment = {} } = {} } = attributes;

  let style = {};
  if (isValidSettingObject(justifyAlignment)) {
    Object.keys(justifyAlignment).forEach((breakpoint) => {
      const { value, inherit } = justifyAlignment[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: inheritValue } = justifyAlignment[inherit] ?? {};
          if (inheritValue) {
            style = {
              ...style,
              [`--bb--justify-alignment--${breakpoint}`]: `var(--bb--justify-alignment--${inherit})`,
            };
          }
        }
      } else {
        if (value) {
          style = {
            ...style,
            [`--bb--justify-alignment--${breakpoint}`]: value + "",
          };
        }
      }
    });
  }

  return style;
}

/**
 * Build border css style
 *
 * @param {Object} value
 * @returns {String}
 */
export const buildBorderStyle = (
  value,
  buildColorCSSValue = getColorCSSValue
) => {
  let styleArray = [];
  if (isObject(value)) {
    const { width, style, color } = value;
    if (!isUnsetValue(width) && isString(width)) {
      styleArray.push(width);
    }

    if (!isUnsetValue(style) && isString(style)) {
      styleArray.push(style);
    }

    if ((!isUnsetValue(color) && isString(color)) || isObject(color)) {
      styleArray.push(buildColorCSSValue(color));
    }
  }

  return styleArray.join(" ").trim();
};

/**
 * Get css variable object for border
 *
 * @param {Object} attributes
 * @returns {Object}
 */
export function getBorderStyle(
  attributes,
  buildColorCSSValue = getColorCSSValue,
  buildBorderCSSValue = buildBorderStyle
) {
  const { boldblocks: { border = {} } = {} } = attributes;
  let style = {};
  if (isValidSettingObject(border)) {
    Object.keys(border).forEach((breakpoint) => {
      const { value, inherit } = border[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: inheritValue } = border[inherit] ?? {};
          if (buildBorderCSSValue(inheritValue, buildColorCSSValue)) {
            style = {
              ...style,
              [`--bb--border--${breakpoint}`]: `var(--bb--border--${inherit})`,
            };
          }
        }
      } else {
        const styleByBreakpoint = buildBorderCSSValue(
          value,
          buildColorCSSValue
        );

        if (styleByBreakpoint) {
          style = {
            ...style,
            [`--bb--border--${breakpoint}`]: styleByBreakpoint,
          };
        }
      }
    });
  }

  return style;
}

/**
 * Build border radius style
 *
 * @param {Object} value
 * @returns {String}
 */
function buildBorderRadiusStyle(value) {
  let cssValue = "";
  if (isValidSettingObject(value)) {
    const {
      "top-left": topLeft,
      "top-right": topRight,
      "bottom-right": bottomRight,
      "bottom-left": bottomLeft,
    } = value;
    if (topLeft || topRight || bottomRight || bottomLeft) {
      cssValue = `${topLeft ? topLeft : 0} ${topRight ? topRight : 0} ${
        bottomRight ? bottomRight : 0
      } ${bottomLeft ? bottomLeft : 0}`;
    }
  }

  return cssValue;
}

/**
 * Get css variable object for border radius
 *
 * @param {Object} attributes
 * @returns {Object}
 */
export function getBorderRadiusStyle(attributes) {
  const { boldblocks: { borderRadius = {} } = {} } = attributes;

  let style = {};
  if (isValidSettingObject(borderRadius)) {
    Object.keys(borderRadius).forEach((breakpoint) => {
      const { value, inherit } = borderRadius[breakpoint];
      if (isUndefined(value)) {
        if (inherit && isString(inherit)) {
          const { value: inheritValue } = borderRadius[inherit] ?? {};
          if (buildBorderRadiusStyle(inheritValue)) {
            style = {
              ...style,
              [`--bb--border-radius--${breakpoint}`]: `var(--bb--border-radius--${inherit})`,
            };
          }
        }
      } else {
        const styleByBreakpoint = buildBorderRadiusStyle(value);

        if (styleByBreakpoint) {
          style = {
            ...style,
            [`--bb--border-radius--${breakpoint}`]: styleByBreakpoint,
          };
        }
      }
    });
  }

  return style;
}

/**
 * Build box-shadow style.
 *
 * @param {Array} shadows
 * @param {Function} buildColorCSSValue
 */
export function buildBoxShadowStyle(
  shadows,
  buildColorCSSValue = getColorCSSValue
) {
  let style = "";
  if (Array.isArray(shadows) && shadows.length) {
    let shadowStyles = [];
    shadows.forEach(
      ({
        inset,
        x = "0px",
        y = "0px",
        blur = "0px",
        spread = "0px",
        color = "",
      }) => {
        const colorCssValue = buildColorCSSValue(color);

        if (colorCssValue) {
          shadowStyles.push(
            `${
              inset ? "inset " : ""
            }${x} ${y} ${blur} ${spread} ${colorCssValue}`
          );
        }
      }
    );

    style = shadowStyles.join(",");
  }

  return style;
}

/**
 * Get styles for the box shadow feature.
 *
 * @param {Object} shadows
 * @param {Function} buildColorCSSValue
 */
export function getBoxShadowStyle(
  shadows,
  buildColorCSSValue = getColorCSSValue
) {
  let style = buildBoxShadowStyle(shadows, buildColorCSSValue);
  if (style) {
    return { boxShadow: style };
  }

  return {};
}
