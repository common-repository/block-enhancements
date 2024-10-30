/**
 * External dependencies
 */
import { isEqual, isNil, isEmpty, isObject } from "lodash";

/**
 * WordPress dependencies
 */

/**
 * Check whether all items of array are equal or not
 *
 * @param Array arr
 */
export const isAllEqual = (arr) =>
  arr.every((val, i, originalArr) => isEqual(val, originalArr[0]));

/**
 * Check whether if the object is a valid setting object
 *
 * @param {Mixed} obj
 */
export function isValidSettingObject(obj) {
  return !(isNil(obj) || (isObject(obj) && isEmpty(obj)));
}

/**
 * Check the value is null, undefined or empty string
 *
 * @param {Mixed} value
 */
export function isUnsetValue(value) {
  return isNil(value) || value === "";
}

/**
 * Compare two semver version
 *
 * @param {String} ver1
 * @param {String} ver2
 */
export const compareVersion = (ver1, ver2) => {
  const [major1 = 0, minor1 = 0, patch1 = 0] = ver1.split(".");
  const [major2 = 0, minor2 = 0, patch2 = 0] = ver2.split(".");
  if (major1 > major2) {
    return 1;
  } else if (major1 < major2) {
    return -1;
  } else if (minor1 > minor2) {
    return 1;
  } else if (minor1 < minor2) {
    return -1;
  } else if (patch1 > patch2) {
    return 1;
  } else if (patch1 < patch2) {
    return -1;
  }

  return 0;
};
