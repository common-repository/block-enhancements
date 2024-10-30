/**
 * External dependencies
 */
import svgToTinyDataUri from "mini-svg-data-uri";

/**
 * Internal dependencies
 */
import { getSVGNode } from "../utils";

/**
 * Get icon URI string from icon markup
 *
 * @param {String} rawIcon
 */
export const getIconURI = (rawIcon) => {
  const svgNode = getSVGNode(rawIcon);
  if (!svgNode) {
    return "";
  }

  svgNode.removeAttribute("width");
  svgNode.removeAttribute("height");
  svgNode.removeAttribute("class");

  return svgToTinyDataUri(svgNode.outerHTML);
};
