/**
 * External dependencies
 */
import { sanitize } from "dompurify";

/**
 * WordPress dependencies
 */
import { cleanForSlug } from "@wordpress/url";

/**
 * Internal dependencies
 */

/**
 * Sanitize slug
 */
export { cleanForSlug as sanitizeSlug };

/**
 * Sanitize raw SVG string
 *
 * @param {String} dirty
 * @returns {String}
 */
export const sanitizeSVG = (dirty) => {
  return sanitize(dirty, {
    USE_PROFILES: { svg: true, svgFilters: true },
  });
};

/**
 * Remove HTML tag from string
 */
export const sanitizeHTMLTag = (dirty) => {
  return dirty.replace(/(<([^>]+)>)/gi, "");
};
