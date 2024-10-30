/**
 * External dependencies
 */
import { isObject } from "lodash";
import isDeepEqual from "fast-deep-equal/react";

/**
 * Get all value from values
 *
 * @param {Object}
 * @returns
 */
export const getAllValue = ({ values, fields }) => {
  const valueArray = fields.map(({ name }) => values[name] ?? undefined);

  return mode(valueArray.filter((i) => i));
};

/**
 * Gets an items with the most occurrence within an array
 * https://stackoverflow.com/a/20762713
 *
 * @param {Array<any>} arr Array of items to check.
 * @return {any} The item with the most occurrences.
 */
export function mode(arr) {
  return arr
    .sort((a, b) => {
      if (isObject(a)) {
        return (
          arr.filter((v) => isDeepEqual(v, a)).length -
          arr.filter((v) => isDeepEqual(v, b)).length
        );
      } else {
        return (
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
        );
      }
    })
    .pop();
}
