/**
 * External dependencies
 */
import { find } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { ToolbarGroup } from "@wordpress/components";
import { desktop } from "@wordpress/icons";

/**
 * Internal dependencies
 */
import {
  getDeviceTypes,
  getPreviewDeviceType,
  getSetPreviewDeviceType,
} from "../../utils";

export function PreviewToolbar(props) {
  if (!getSetPreviewDeviceType()) {
    return null;
  }

  const {
    label = __("Change device preview"),
    isCollapsed = true,
    deviceTypes = getDeviceTypes(),
    deviceType = getPreviewDeviceType(),
    setDeviceType = getSetPreviewDeviceType(),
  } = props;

  function applyDeviceChange(newDeviceType) {
    return () => setDeviceType(newDeviceType);
  }

  const activeDevice = find(
    deviceTypes,
    (control) => control.device === deviceType,
  );

  function setIcon() {
    if (activeDevice) return activeDevice.icon;
    return desktop;
  }

  return (
    <ToolbarGroup
      isCollapsed={isCollapsed}
      icon={setIcon()}
      label={label}
      popoverProps={{ variant: "toolbar" }}
      controls={deviceTypes.map((control) => {
        const { device } = control;
        const isActive = deviceType.deviceType === device;

        return {
          ...control,
          isActive,
          role: isCollapsed ? "menuitemradio" : undefined,
          onClick: applyDeviceChange(device),
        };
      })}
    />
  );
}
