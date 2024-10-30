/**
 * External dependencies
 */
import { isUndefined } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import {
  buildResponsiveSettingValue,
  getAllBreakpoints,
  getValueByBreakpointFromResponsiveValue,
} from "./responsive";

/**
 * Handle change event for a responsive group field.
 *
 * @param {Object} param0
 * @returns {Function}
 */
export function handleChangeResponsiveAttributeGroupField({
  groupName,
  fieldName,
  breakpoint,
  setAttributes,
  attributes,
  allBreakpoints = getAllBreakpoints(),
}) {
  return (newValue) => {
    // Get group setting value such as 'grid', 'carousel'.
    const { [groupName]: groupValue = {} } = attributes;

    // Get setting value such as 'columns', 'gap'.
    let { [fieldName]: fieldValue = {} } = groupValue;

    // Build value for all breakpoints.
    fieldValue = buildResponsiveSettingValue({
      newValue,
      fieldValue,
      breakpoint,
      allBreakpoints,
    });

    // Update settings
    setAttributes({
      [groupName]: {
        ...groupValue,
        [fieldName]: fieldValue,
      },
    });
  };
}

/**
 * Get responsive group field value.
 *
 * @param {Object}
 * @returns {*}
 */
export function getResponsiveAttributeGroupFieldValue({
  fieldName,
  groupName,
  attributes,
  breakpoint,
  defaultValue,
}) {
  const { [groupName]: { [fieldName]: fieldValue } = {} } = attributes;

  return getValueByBreakpointFromResponsiveValue({
    fieldValue,
    breakpoint,
    defaultValue,
  });
}

/**
 * Handle change event for a responsive field.
 *
 * @param {Object} param0
 * @returns {Function}
 */
export function handleChangeResponsiveAttributeField({
  fieldName,
  breakpoint,
  setAttributes,
  attributes,
  allBreakpoints = getAllBreakpoints(),
}) {
  return (newValue) => {
    // Get setting value such as 'textAlignment'.
    let { [fieldName]: fieldValue = {} } = attributes;

    // Build value for all breakpoints.
    fieldValue = buildResponsiveSettingValue({
      newValue,
      fieldValue,
      breakpoint,
      allBreakpoints,
    });

    // Update settings
    setAttributes({
      [fieldName]: fieldValue,
    });
  };
}

/**
 * Get responsive field value.
 *
 * @param {Object}
 * @returns {*}
 */
export function getResponsiveAttributeFieldValue({
  fieldName,
  attributes,
  breakpoint,
  defaultValue,
}) {
  const { [fieldName]: fieldValue } = attributes;

  return getValueByBreakpointFromResponsiveValue({
    fieldValue,
    breakpoint,
    defaultValue,
  });
}

/**
 * Handle change event for a field.
 *
 * @param {Object}
 * @returns {Function}
 */
export function handleChangeAttributeGroupField({
  groupName,
  fieldName,
  setAttributes,
  attributes,
}) {
  return (newValue) => {
    // Get group setting value such as 'grid', 'carousel'.
    const { [groupName]: groupValue = {} } = attributes;

    // Update settings
    setAttributes({
      [groupName]: {
        ...groupValue,
        [fieldName]: newValue,
      },
    });
  };
}

/**
 * Get field value.
 *
 * @param {Object}
 * @returns {*}
 */
export function getAttributeGroupFieldValue({
  fieldName,
  groupName,
  attributes,
  defaultValue,
}) {
  const { [groupName]: { [fieldName]: fieldValue } = {} } = attributes;

  if (!isUndefined(fieldValue)) {
    return fieldValue;
  }

  return defaultValue;
}

/**
 * Handle change event for a field.
 *
 * @param {Object}
 * @returns {Function}
 */
export function handleChangeAttributeField({ fieldName, setAttributes }) {
  return (newValue) => {
    // Update settings
    setAttributes({
      [fieldName]: newValue,
    });
  };
}

/**
 * Get field value.
 *
 * @param {Object}
 * @returns {*}
 */
export function getAttributeFieldValue({
  fieldName,
  attributes,
  defaultValue,
}) {
  const { [fieldName]: fieldValue } = attributes;

  if (!isUndefined(fieldValue)) {
    return fieldValue;
  }

  return defaultValue;
}
