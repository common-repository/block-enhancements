/**
 * External dependencies
 */
import { isObject, isUndefined } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelect } from "@wordpress/data";
import { mobile, tablet, desktop } from "@wordpress/icons";
import { applyFilters } from "@wordpress/hooks";

// Device types
export const Mobile = "Mobile";
export const Tablet = "Tablet";
export const Desktop = "Desktop";

const BREAKPOINTS = {};
const documentElementStyle = getComputedStyle(document.documentElement);

// Mobile breakpoint
BREAKPOINTS[Mobile] =
  documentElementStyle.getPropertyValue("--wp--custom--breakpoint--sm") ||
  "576px";

// Tablet breakpoint
BREAKPOINTS[Tablet] =
  documentElementStyle.getPropertyValue("--wp--custom--breakpoint--md") ||
  "768px";

// Desktop breakpoint
BREAKPOINTS[Desktop] =
  documentElementStyle.getPropertyValue("--wp--custom--breakpoint--lg") ||
  "1024px";

const BREAKPOINT_MEDIA_QUERIES = {};
Object.keys(BREAKPOINTS).map((bp) => {
  if (bp === Mobile) {
    BREAKPOINT_MEDIA_QUERIES[bp] = "";
  } else {
    BREAKPOINT_MEDIA_QUERIES[bp] = `@media (min-width: ${BREAKPOINTS[bp]})`;
  }
});

export { BREAKPOINTS, BREAKPOINT_MEDIA_QUERIES };

// Device types
export const DEVICE_TYPES = [
  {
    icon: mobile,
    title: __("Mobile"),
    device: Mobile,
    breakpoint: "sm",
    mediaQuery: BREAKPOINT_MEDIA_QUERIES[Mobile],
  },
  {
    icon: tablet,
    title: __("Tablet"),
    device: Tablet,
    breakpoint: "md",
    mediaQuery: BREAKPOINT_MEDIA_QUERIES[Tablet],
  },
  {
    icon: desktop,
    title: __("Desktop"),
    device: Desktop,
    breakpoint: "lg",
    mediaQuery: BREAKPOINT_MEDIA_QUERIES[Desktop],
  },
];

/**
 * Get all devices.
 *
 * @returns {Array}
 */
export function getDeviceTypes() {
  return DEVICE_TYPES;
}

/**
 * Get preview device type.
 *
 * @returns {String}
 */
export function getPreviewDeviceType() {
  return useSelect((select) => select("core/editor").getDeviceType(), []);
}

/**
 * Set preview device type.
 *
 * @returns {Function}
 */
export function getSetPreviewDeviceType() {
  return useDispatch("core/editor").setDeviceType;
}

/**
 * Get current breakpoint.
 *
 * @returns {String}
 */
export function getBreakpointType() {
  let breakpoint = "";
  const deviceType = getPreviewDeviceType();
  switch (deviceType) {
    case Mobile:
      breakpoint = "sm";
      break;
    case Tablet:
      breakpoint = "md";
      break;
    case Desktop:
      breakpoint = "lg";
      break;

    default:
      breakpoint = "sm";
      break;
  }

  return breakpoint;
}

/**
 * Get all supported breakpoints.
 *
 * @returns {Array}
 */
export function getAllBreakpoints() {
  return applyFilters("boldblocks.breakpoints", ["sm", "md", "lg"]);
}

/**
 * Find device info by breakpoint
 *
 * @param {String} breakpoint
 * @returns {Object}
 */
export function getDeviceInfoByBreakpoint(breakpoint) {
  return DEVICE_TYPES.find((device) => device.breakpoint === breakpoint);
}

/**
 * Get value by breakpoint from a responsive value
 *
 * @param {Object}
 * @returns {Mixed}
 */
export function getValueByBreakpointFromResponsiveValue({
  fieldValue,
  breakpoint,
  defaultValue,
}) {
  // There is no valid field value is stored.
  if (!fieldValue || !isObject(fieldValue)) {
    return defaultValue;
  }

  // Get value and inherit from current breakpoint.
  const { [breakpoint]: { value, inherit } = {} } = fieldValue;

  if (!isUndefined(value)) {
    return value;
  }

  // Get value from the breakpoint that current breakpoint inherits from.
  if (inherit) {
    if (fieldValue[inherit] && !isUndefined(fieldValue[inherit]["value"])) {
      return fieldValue[inherit]["value"];
    }
  }

  return defaultValue;
}

/**
 * Build value for a responsive setting field.
 *
 * @param {Object}
 * @returns {Object}
 */
export function buildResponsiveSettingValue({
  breakpoint,
  allBreakpoints,
  fieldValue = {},
  newValue,
}) {
  // Update all breakpoints.
  allBreakpoints.forEach((breakpointKey) => {
    if (breakpointKey === breakpoint) {
      fieldValue = {
        ...fieldValue,
        [breakpoint]: { value: newValue, inherit: null },
      };
    } else {
      if (!fieldValue[breakpointKey] || !isObject(fieldValue[breakpointKey])) {
        fieldValue = {
          ...fieldValue,
          [breakpointKey]: { inherit: breakpoint },
        };
      }
    }
  });

  return fieldValue;
}

function getBoldblocksResponsiveGroupFeatureValue({
  newValue,
  groupName,
  fieldName,
  attributes,
  breakpoint,
  allBreakpoints,
}) {
  // All settings are stored in 'boldblocks' attribute.
  const { boldblocks = {} } = attributes;

  // Get group setting value such as 'grid', 'carousel'.
  const { [groupName]: groupValue = {} } = boldblocks;

  // Get setting value such as 'columns', 'gap'.
  let { [fieldName]: fieldValue = {} } = groupValue;

  // Build value for all breakpoints.
  fieldValue = buildResponsiveSettingValue({
    newValue,
    fieldValue,
    breakpoint,
    allBreakpoints,
  });

  return {
    boldblocks: {
      ...boldblocks,
      [groupName]: {
        ...groupValue,
        [fieldName]: fieldValue,
      },
    },
  };
}

/**
 * Handle change event for a responsive group field.
 *
 * @param {Object} param0
 * @returns {Function}
 */
export function handleChangeResponsiveSettingGroupField({
  groupName,
  fieldName,
  setAttributes,
  attributes,
  blocks,
  updateBlockAttributes,
  breakpoint,
  allBreakpoints,
}) {
  return (newValue) => {
    if (!blocks) {
      // Single update

      // Update settings
      setAttributes(
        getBoldblocksResponsiveGroupFeatureValue({
          newValue,
          groupName,
          fieldName,
          attributes,
          breakpoint,
          allBreakpoints,
        }),
      );
    } else {
      // Multiple update
      blocks.forEach(({ clientId, attributes }) => {
        updateBlockAttributes(
          clientId,
          getBoldblocksResponsiveGroupFeatureValue({
            newValue,
            groupName,
            fieldName,
            attributes,
            breakpoint,
            allBreakpoints,
          }),
        );
      });
    }
  };
}

/**
 * Get responsive group field value.
 *
 * @param {Object}
 * @returns {*}
 */
export function getResponsiveSettingGroupFieldValue({
  fieldName,
  groupName,
  attributes,
  breakpoint,
  defaultValue,
}) {
  const { boldblocks: { [groupName]: { [fieldName]: fieldValue } = {} } = {} } =
    attributes;

  return getValueByBreakpointFromResponsiveValue({
    fieldValue,
    breakpoint,
    defaultValue,
  });
}

function getBoldblocksResponsiveFeatureValue({
  newValue,
  fieldName,
  attributes,
  breakpoint,
  allBreakpoints,
}) {
  // All settings are stored in 'boldblocks' attribute.
  const { boldblocks = {} } = attributes;

  // Get setting value such as 'textAlignment'.
  let { [fieldName]: fieldValue = {} } = boldblocks;

  // Build value for all breakpoints.
  fieldValue = buildResponsiveSettingValue({
    newValue,
    fieldValue,
    breakpoint,
    allBreakpoints,
  });

  return {
    boldblocks: {
      ...boldblocks,
      [fieldName]: fieldValue,
    },
  };
}

/**
 * Handle change event for a responsive field.
 *
 * @param {Object} param0
 * @returns {Function}
 */
export function handleChangeResponsiveSettingField({
  fieldName,
  setAttributes,
  attributes,
  blocks,
  updateBlockAttributes,
  breakpoint,
  allBreakpoints,
}) {
  return (newValue) => {
    if (!blocks) {
      // Single update

      // Update settings
      setAttributes(
        getBoldblocksResponsiveFeatureValue({
          newValue,
          fieldName,
          attributes,
          breakpoint,
          allBreakpoints,
        }),
      );
    } else {
      // Multiple update
      blocks.forEach(({ clientId, attributes }) => {
        updateBlockAttributes(
          clientId,
          getBoldblocksResponsiveFeatureValue({
            newValue,
            fieldName,
            attributes,
            breakpoint,
            allBreakpoints,
          }),
        );
      });
    }
  };
}

/**
 * Get responsive field value.
 *
 * @param {Object}
 * @returns {*}
 */
export function getResponsiveSettingFieldValue({
  fieldName,
  attributes,
  breakpoint,
  defaultValue,
}) {
  const { boldblocks: { [fieldName]: fieldValue } = {} } = attributes;

  return getValueByBreakpointFromResponsiveValue({
    fieldValue,
    breakpoint,
    defaultValue,
  });
}

function getBoldblocksGroupFeatureValue({
  newValue,
  groupName,
  fieldName,
  attributes,
}) {
  // All settings are stored in 'boldblocks' attribute.
  const { boldblocks = {} } = attributes;

  // Get group setting value such as 'grid', 'carousel'.
  const { [groupName]: groupValue = {} } = boldblocks;

  return {
    boldblocks: {
      ...boldblocks,
      [groupName]: {
        ...groupValue,
        [fieldName]: newValue,
      },
    },
  };
}

/**
 * Handle change event for a field.
 *
 * @param {Object}
 * @returns {Function}
 */
export function handleChangeSettingGroupField({
  groupName,
  fieldName,
  setAttributes,
  attributes,
  blocks,
  updateBlockAttributes,
}) {
  return (newValue) => {
    if (!blocks) {
      // Single update

      // Update settings
      setAttributes(
        getBoldblocksGroupFeatureValue({
          newValue,
          groupName,
          fieldName,
          attributes,
        }),
      );
    } else {
      // Multiple update
      blocks.forEach(({ clientId, attributes }) => {
        // All settings are stored in 'boldblocks' attribute.

        updateBlockAttributes(
          clientId,
          getBoldblocksGroupFeatureValue({
            newValue,
            groupName,
            fieldName,
            attributes,
          }),
        );
      });
    }
  };
}

/**
 * Get field value.
 *
 * @param {Object}
 * @returns {*}
 */
export function getSettingGroupFieldValue({
  fieldName,
  groupName,
  attributes,
  defaultValue,
}) {
  const { boldblocks: { [groupName]: { [fieldName]: fieldValue } = {} } = {} } =
    attributes;

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
export function handleChangeSettingField({
  fieldName,
  setAttributes,
  attributes,
  blocks,
  updateBlockAttributes,
}) {
  return (newValue) => {
    if (!blocks) {
      // Single update

      // Update settings
      setAttributes({
        boldblocks: {
          ...(attributes?.boldblocks ?? {}),
          [fieldName]: newValue,
        },
      });
    } else {
      // Multiple update
      blocks.forEach(({ clientId, attributes }) => {
        // All settings are stored in 'boldblocks' attribute.

        updateBlockAttributes(clientId, {
          boldblocks: {
            ...(attributes?.boldblocks ?? {}),
            [fieldName]: newValue,
          },
        });
      });
    }
  };
}

/**
 * Handle change event for a multiple fields.
 *
 * @param {Object}
 * @returns {Function}
 */
export function handleChangeMultipleSettingField({
  setAttributes,
  attributes,
  blocks,
  updateBlockAttributes,
}) {
  return (fieldObject) => {
    if (!blocks) {
      // Single update

      // Update settings
      setAttributes({
        boldblocks: {
          ...(attributes?.boldblocks ?? {}),
          ...fieldObject,
        },
      });
    } else {
      // Multiple update
      blocks.forEach(({ clientId, attributes }) => {
        // All settings are stored in 'boldblocks' attribute.

        updateBlockAttributes(clientId, {
          boldblocks: {
            ...(attributes?.boldblocks ?? {}),
            ...fieldObject,
          },
        });
      });
    }
  };
}

/**
 * Get field value.
 *
 * @param {Object}
 * @returns {*}
 */
export function getSettingFieldValue({ fieldName, attributes, defaultValue }) {
  const { boldblocks: { [fieldName]: fieldValue } = {} } = attributes;

  if (!isUndefined(fieldValue)) {
    return fieldValue;
  }

  return defaultValue;
}
