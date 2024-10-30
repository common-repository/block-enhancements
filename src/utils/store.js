/**
 * External dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * WordPress dependencies
 */
import {
  createReduxStore,
  register,
  useSelect,
  useDispatch,
} from "@wordpress/data";

/**
 * Internal dependencies
 */
import { ReactComponent as cursorNormal } from "../assets/cursor-normal.svg";
import { ReactComponent as cursorHover } from "../assets/cursor-hover.svg";

/**
 * Constants
 */
const storeName = "block-enhancements/mousestate";
const initialState = {
  mouseState: "normal",
};

/**
 * Register store
 */
const store = createReduxStore(storeName, {
  selectors: {
    getMouseState(state) {
      return state?.mouseState ?? "normal";
    },
  },
  actions: {
    setMouseState(mouseState) {
      return {
        type: "SET_HOVER_STATE",
        payload: mouseState,
      };
    },
  },
  reducer: (state = initialState, action) => {
    switch (action.type) {
      case "SET_HOVER_STATE":
        return {
          ...state,
          mouseState: action.payload,
        };
    }

    return state;
  },
});

register(store);

// Mouse state types
const MouseStateTypes = [
  {
    icon: cursorNormal,
    value: "normal",
    title: __("Normal", "block-enhancements"),
  },
  {
    icon: cursorHover,
    value: "hover",
    title: __("Hover", "block-enhancements"),
  },
];

/**
 * Get mouse state
 */
function getMouseState() {
  return useSelect((select) => select(storeName).getMouseState(), []);
}

/**
 * Set mouse state
 */
function getSetMouseState() {
  const { setMouseState } = useDispatch(storeName);

  return setMouseState;
}

export {
  storeName as store,
  cursorNormal,
  MouseStateTypes,
  getMouseState,
  getSetMouseState,
};
