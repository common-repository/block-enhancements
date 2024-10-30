/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useSettings } from "@wordpress/block-editor";
import { useRef, useEffect } from "@wordpress/element";

/**
 * Internal dependencies
 */

export const CUSTOM_SHADOW_PRESETS = [
  {
    name: "Shadow 1",
    slug: "bb-shadow-1",
    shadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
  },
  {
    name: "Shadow 2",
    slug: "bb-shadow-2",
    shadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
  },
  {
    name: "Shadow 3",
    slug: "bb-shadow-3",
    shadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
  },
  {
    name: "Shadow 4",
    slug: "bb-shadow-4",
    shadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
  },
  {
    name: "Shadow 5",
    slug: "bb-shadow-5",
    shadow:
      "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
  },
  {
    name: "Shadow 6",
    slug: "bb-shadow-6",
    shadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
  },
  {
    name: "Shadow 7",
    slug: "bb-shadow-7",
    shadow: "rgba(0, 0, 0, 0.45) 0px 25px 20px -20px",
  },
  {
    name: "Shadow 8",
    slug: "bb-shadow-8",
    shadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
  },
  {
    name: "Shadow 9",
    slug: "bb-shadow-9",
    shadow:
      "rgb(0, 0, 0) 2px 2px 5px -1px inset, rgba(255, 255, 255, 0.5) -2px -2px 5px 1px inset",
  },
  {
    name: "Shadow 10",
    slug: "bb-shadow-10",
    shadow:
      "rgba(6, 24, 44, 0.4) 0px 0px 0px 1px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
  },
];

/**
 * Get shadow presets
 *
 * @param {Mixed} customPresets
 * @returns {Object}
 */
export const getShadowPresets = (customPresets = false) => {
  const shadows = {};
  const [{ default: defaultShadows, theme: themeShadows }] =
    useSettings("shadow.presets");

  if (themeShadows) {
    shadows.theme = {
      label: __("Theme"),
      presets: themeShadows.filter(({ shadow }) => !shadow.includes("var")),
    };
  }

  if (customPresets && !!customPresets?.length) {
    shadows.custom = {
      label: __("Custom"),
      presets: customPresets,
    };
  }

  if (defaultShadows) {
    shadows.default = {
      label: __("Default"),
      presets: defaultShadows,
    };
  }

  return shadows;
};

/**
 * Handle shadows with slug
 *
 * @param {Object} shadowObject
 * @param {Function} onChange
 * @returns
 */
export const useShadow = (shadowObject, onChange) => {
  const localShadow = useRef(shadowObject);
  useEffect(() => {
    localShadow.current = shadowObject;
  }, [shadowObject]);

  const onChangeShadows =
    (name = "shadows") =>
    (shadows) => {
      const newShadowObject = {
        ...localShadow.current,
        [name]: shadows,
      };
      onChange(newShadowObject);

      localShadow.current = newShadowObject;
    };

  const onChangeSlug =
    (name = "slug") =>
    (slug) => {
      const newShadowObject = {
        ...localShadow.current,
        [name]: slug,
      };
      onChange(newShadowObject);

      localShadow.current = newShadowObject;
    };

  return [onChangeShadows, onChangeSlug];
};
