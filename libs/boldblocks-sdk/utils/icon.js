/**
 * WordPress dependencies
 */
import { useEffect, useState } from "@wordpress/element";
import { createReduxStore, register, useDispatch } from "@wordpress/data";
import apiFetch from "@wordpress/api-fetch";

/**
 * Internal dependencies
 */
import { useLocalStorage, sanitizeSVG } from "../utils";

/**
 * Only save the sanitized version of inline SVG
 *
 * @param {String} icon
 * @param {Function} update
 * @returns {Array}
 */
export const useInlineSVG = (icon, update) => {
  const [rawIcon, setRawIcon] = useState(icon);
  useEffect(() => {
    const sanitizedIcon = sanitizeSVG(rawIcon);
    if (icon !== sanitizedIcon) {
      update(sanitizedIcon);
    }
  }, [icon, rawIcon]);

  return [rawIcon, setRawIcon];
};

/**
 * Get icons from icon library
 *
 * @param {String} name
 * @param {String} version
 * @param {Promise} version
 * @returns {Array}
 */
export const useIconLibrary = (
  name = "bb-icons",
  version = "1.0.0",
  endpoint
) => {
  if (!endpoint) {
    log("An endpoint is required to get the icon data", "error");
    return;
  }

  // Remove old cached data
  const previousVersion = getPreviousIconLibraryVersion(version);
  if (previousVersion) {
    localStorage.removeItem(`${name}-v${previousVersion}`);
  }

  const cacheKey = `${name}-v${version}`;
  const [icons, setIcons] = useLocalStorage(cacheKey);

  useEffect(() => {
    if (!icons) {
      apiFetch({ path: endpoint }).then((res) => {
        setIcons(res.data);
      });
    }
  }, []);

  return [icons];
};

/**
 * Get the last version from a version string
 *
 * @param {String} version
 */
const getPreviousIconLibraryVersion = (version) => {
  let lastVersion;
  if (version !== "1.0.0") {
    const pieces = version.split(".").map((val) => parseInt(val));
    if (pieces[2] > 0) {
      lastVersion = `${pieces[0]}.${pieces[1]}.${pieces[2] - 1}`;
    } else if (pieces[1] > 0) {
      lastVersion = `${pieces[0]}.${pieces[1] - 1}.${pieces[2]}`;
    } else if (pieces[0] > 0) {
      lastVersion = `${pieces[0] - 1}.${pieces[1]}.${pieces[2]}`;
    }
  }

  return lastVersion;
};

/**
 * Get icon library version
 *
 * @param {String}
 */
export const getIconLibraryVersion = (globalVar) =>
  window[globalVar] && window[globalVar]?.iconsVersion
    ? window[globalVar]?.iconsVersion
    : "1.0.0";

/**
 * Build a data store for the icon library
 *
 * @param {String} storeName
 */
export const buildIconLibraryStore = (storeName) => {
  /**
   * Register store
   */
  const store = createReduxStore(storeName, {
    selectors: {
      getIconLibrary(state) {
        return state?.icons ?? [];
      },
    },
    actions: {
      loadIconLibrary(apiPath) {
        return async ({ select, dispatch }) => {
          if (!apiPath) {
            return;
          }

          let icons = select.getIconLibrary();

          if (icons && icons.length) {
            return icons;
          }

          const res = await apiFetch({
            path: apiPath,
          });

          if (res?.success) {
            dispatch({ type: "UPDATE_ICONS", payload: res?.data ?? [] });
          }

          return res?.data ?? [];
        };
      },
    },
    reducer: (state = { icons: [] }, action) => {
      switch (action.type) {
        case "UPDATE_ICONS":
          return {
            ...state,
            icons: action.payload,
          };

        default:
          return state;
      }
    },
  });

  register(store);
};

/**
 * Load icons from the icon library
 *
 * @param {Object}
 * @returns {Array}
 */
export const useIconLibraryData = ({ isloadData, storeName, apiPath }) => {
  const { loadIconLibrary } = useDispatch(storeName);

  const [icons, setIcons] = useState([]);

  if (isloadData && !icons.length) {
    loadIconLibrary(apiPath).then((res) => {
      setIcons(res);
    });
  }

  return icons;
};
