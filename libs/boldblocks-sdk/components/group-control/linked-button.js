/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Button, Tooltip } from "@wordpress/components";
import { link, linkOff } from "@wordpress/icons";

/**
 * Internal dependencies
 */

export default function LinkedButton({ isLinked, ...props }) {
  const label = isLinked ? __("Unlink Sides") : __("Link Sides");

  return (
    <Tooltip text={label}>
      <span>
        <Button
          {...props}
          className="component-group-control__linked-button"
          variant={isLinked ? "primary" : "secondary"}
          size="small"
          icon={isLinked ? link : linkOff}
          iconSize={16}
          aria-label={label}
        />
      </span>
    </Tooltip>
  );
}
