/**
 * External dependencies
 */
import { isObject } from "lodash";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { getColorCSSValue } from "../../utils";

/**
 * Build CSS variables
 *
 * @param {Object} attributes
 * @param {String} selector
 * @param {String} blockName
 * @returns {String}
 */
export function buildCSSVariables(attributes, selector, blockName = "") {
  const {
    boldblocks: {
      withIcon: {
        iconURI,
        iconWidth: { value: iconWidth = "1em" } = {},
        iconTextSpacing: { value: iconTextSpacing = ".5em" } = {},
        iconColor,
        iconMarginTop: { value: iconMarginTop } = {},
        iconPosition = "left",
        textAlignment,
      } = {},
    } = {},
  } = attributes;

  // Children selector
  const nestedSelector = `${selector} > *`;

  // Icon selector
  const iconSelector = `${selector}::before`;

  const style = [];
  const iconVariables = [];
  const itemVariables = [];
  const nestedVariables = [];

  const isGridLayout = blockName === "core/button";

  const isSupportedPosition = ["core/button", "core/read-more"].includes(
    blockName,
  );

  if (iconURI) {
    // Icon variables
    // URI
    iconVariables.push(`--be--with-icon--uri:url("${iconURI}")`);

    // Margin top
    if (iconMarginTop) {
      iconVariables.push(`--be--with-icon--mt:${iconMarginTop}`);
    }

    // Color
    if (isObject(iconColor) && iconColor?.value) {
      const cssColor = getColorCSSValue(iconColor);
      iconVariables.push(`--be--with-icon--color:${cssColor}`);
    }

    // Item variables
    // Text alignment
    if (textAlignment) {
      itemVariables.push(`--be--with-icon--text-align:${textAlignment}`);
    }

    // Spacing
    itemVariables.push(`--be--with-icon--spacing:${iconTextSpacing}`);

    // Icon width
    itemVariables.push(`--be--with-icon--width:${iconWidth}`);

    if (isGridLayout) {
      // Grid template columns
      itemVariables.push(
        `--be--with-icon--gtc:${
          iconPosition === "left" ? `${iconWidth} 1fr` : `1fr ${iconWidth}`
        }`,
      );
    }

    if (isSupportedPosition) {
      // Grid column for icon
      iconVariables.push(
        `--be--with-icon--icon-column: ${iconPosition === "left" ? 1 : 2}`,
      );

      // Nested variables
      nestedVariables.push(
        `--be--with-icon--text-column: ${iconPosition === "left" ? 2 : 1}`,
      );
    }

    // Push item variables
    style.push(`${selector}{${itemVariables.join(";")}}`);

    // Push children variables
    style.push(`${nestedSelector}{${nestedVariables.join(";")}}`);

    // Push icon variables
    style.push(`${iconSelector}{${iconVariables.join(";")}}`);
  }

  return style.join("");
}
