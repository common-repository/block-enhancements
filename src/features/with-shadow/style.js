/**
 * External dependencies
 */
import { kebabCase } from "lodash";

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
    settingValue: {
      shadows: attributes?.boldblocks?.withShadow?.shadows,
      slug: attributes?.boldblocks?.withShadow?.slug,
    },
    settingVariable: "--be--box-shadow",
    buildCSSCallback: getBoxShadowStyle,
    selector,
  });

  const styleHover = buildStyle({
    settingValue: {
      shadows: attributes?.boldblocks?.withShadow?.shadowsHover,
      slug: attributes?.boldblocks?.withShadow?.slugHover,
    },
    settingVariable: "--be--box-shadow",
    buildCSSCallback: getBoxShadowStyle,
    selector: `${selector}:hover`,
  });

  return `${style}${styleHover}`;
}

/**
 * Get styles for the box shadow feature.
 *
 * @param {Object}
 */
export function getBoxShadowStyle({ shadows, slug }) {
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
        const colorCssValue = getColorCSSValue(color);

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

    if (slug) {
      style = `var(--wp--preset--shadow--${kebabCase(slug)}, ${style})`;
    }
  }

  return style;
}
