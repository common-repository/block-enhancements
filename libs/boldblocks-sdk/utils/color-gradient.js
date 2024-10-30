/**
 * External dependencies
 */
import { isObject, isString } from "lodash";

/**
 * WordPress dependencies
 */
import { _x } from "@wordpress/i18n";
import { useCallback, useRef, useEffect } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import {
  useBlockEditContext,
  store as blockEditorStore,
  getColorObjectByColorValue,
  getGradientSlugByValue,
  __experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { isValidSettingObject } from "./value";

/**
 * Retrieves color related settings.
 *
 * The arrays for colors are made up of color palettes from each
 * origin i.e. "Core", "Theme", and "User".
 *
 * @return {Object} Color related settings.
 */
export function useMultipleOriginColors() {
  const { colors } = useMultipleOriginColorsAndGradients();
  return {
    colors,
    allColors: colors.reduce(
      (previous, palette) => previous.concat(palette.colors),
      []
    ),
  };
}

/**
 * Get and set values for a list of color attributes
 *
 * @param {String} colorType
 * @param {Array} allColors
 * @returns {Array}
 */
export function useColor(
  colorType,
  allColors = null,
  hasGradient = false,
  allGradients = null
) {
  const { clientId } = useBlockEditContext();

  if (!allColors) {
    allColors = useMultipleOriginColors().allColors;
  }

  const colorObject = useSelect(
    (select) => {
      const { getBlockAttributes } = select(blockEditorStore);
      const attributes = getBlockAttributes(clientId) || {};
      return attributes[colorType] ?? {};
    },
    [clientId, colorType]
  );

  const localColorObject = useRef(colorObject);
  useEffect(() => {
    localColorObject.current = colorObject;
  }, [colorObject]);

  const { updateBlockAttributes } = useDispatch(blockEditorStore);
  const setColor = useCallback(
    (newColorValue) => {
      const newColorObject = {
        ...localColorObject.current,
        value: newColorValue,
        slug: getColorObjectByColorValue(allColors, newColorValue)?.slug,
      };
      updateBlockAttributes(clientId, {
        [colorType]: newColorObject,
      });

      localColorObject.current = newColorObject;
    },
    [allColors, clientId, updateBlockAttributes]
  );

  let result = [localColorObject.current, setColor];

  // Add gradient setter if supported.
  if (hasGradient) {
    if (!allGradients) {
      allGradients = useMultipleOriginGradients().gradients;
    }

    const setGradient = useCallback(
      (newGradientValue) => {
        const newColorObject = {
          ...localColorObject.current,
          gradientValue: newGradientValue,
          gradientSlug: getGradientSlugByValue(allGradients, newGradientValue),
        };

        updateBlockAttributes(clientId, {
          [colorType]: newColorObject,
        });

        localColorObject.current = newColorObject;
      },
      [allGradients, clientId, updateBlockAttributes]
    );

    result.push(setGradient);
  }

  return result;
}

/**
 * Retrieves gradient related settings.
 *
 * The arrays for gradients are made up of color palettes from each
 * origin i.e. "Core", "Theme", and "User".
 *
 * @return {Object} Gradient related settings.
 */
export function useMultipleOriginGradients() {
  const { gradients } = useMultipleOriginColorsAndGradients();

  return gradients;
}

/**
 * Get color object {value, slug}
 *
 * @returns {Object}
 */
export const getColorObject = (value, allColors) => {
  if (isString(value)) {
    return { value, slug: getColorObjectByColorValue(allColors, value)?.slug };
  }

  return !isObject(value) ? {} : value ?? {};
};

/**
 * Build get, set for color with gradient support
 *
 * @param {Object} colorObject
 */
export function useColorGradient(colorObject, onChange) {
  const colorGradientSettings = useMultipleOriginColorsAndGradients();
  const allColors = colorGradientSettings.colors.reduce(
    (previous, palette) => previous.concat(palette.colors),
    []
  );
  const allGradients = colorGradientSettings.gradients.reduce(
    (previous, palette) => previous.concat(palette.gradients),
    []
  );

  const localColor = useRef(colorObject);
  useEffect(() => {
    localColor.current = colorObject;
  }, [colorObject]);

  const onColorChange = (colorValue) => {
    const newColorObject = {
      ...localColor.current,
      value: colorValue,
      slug: getColorObjectByColorValue(allColors, colorValue)?.slug,
    };
    onChange(newColorObject);

    localColor.current = newColorObject;
  };
  const onGradientChange = (gradientValue) => {
    const newColorObject = {
      ...localColor.current,
      gradientValue,
      gradientSlug: getGradientSlugByValue(allGradients, gradientValue),
    };
    onChange(newColorObject);

    localColor.current = newColorObject;
  };

  return [onColorChange, onGradientChange];
}

/**
 * Is valid color
 *
 * @param {String}
 * @returns {Boolean}
 */
export function isStringColor(value) {
  if (!value || !isString(value)) {
    return false;
  }

  if (!Number.isNaN(Number(value[0]))) {
    return false;
  }

  if (value.indexOf("#") !== -1 || value.indexOf("rgb") !== -1) {
    return true;
  }

  const s = new Option().style;
  s.color = value;
  return s.color !== "";
}

/**
 * Get CSS value for a color attribute
 *
 * @param {Object|String} colorObject
 */
export function getColorCSSValue(colorObject) {
  if (!colorObject) {
    return "";
  }

  if (isString(colorObject)) {
    colorObject = getColorObjectByColorValue(colorObject);
  }

  if (isValidSettingObject(colorObject)) {
    let hasGradient = colorObject?.gradientSlug || colorObject?.gradientValue;
    return hasGradient
      ? colorObject?.gradientSlug
        ? `var(--wp--preset--gradient--${colorObject.gradientSlug}, ${colorObject?.gradientValue})`
        : colorObject?.gradientValue
      : colorObject?.slug
      ? `var(--wp--preset--color--${colorObject.slug}, ${colorObject?.value})`
      : colorObject?.value;
  }
}
