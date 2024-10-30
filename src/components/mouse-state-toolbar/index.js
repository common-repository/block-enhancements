/**
 * External dependencies
 */
import { find } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { ToolbarGroup } from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
  MouseStateTypes,
  getMouseState,
  getSetMouseState,
  cursorNormal,
} from "../../utils";

export function MouseStateToolbar(props) {
  const {
    label = __("Change mouse state", "block-enhancements"),
    isCollapsed = true,
    mouseStates = MouseStateTypes,
    activeState = getMouseState(),
    setMouseState = getSetMouseState(),
  } = props;

  function setIcon() {
    const activeMouseState = find(
      mouseStates,
      ({ value }) => value === activeState
    );

    if (activeMouseState) return activeMouseState.icon;

    return cursorNormal;
  }

  return (
    <ToolbarGroup
      isCollapsed={isCollapsed}
      icon={setIcon()}
      label={label}
      controls={mouseStates.map((control) => {
        const { value } = control;
        const isActive = activeState === value;

        return {
          ...control,
          isActive,
          role: isCollapsed ? "menuitemradio" : undefined,
          onClick: () => {
            setMouseState(value);
          },
        };
      })}
    />
  );
}

export default MouseStateToolbar;
