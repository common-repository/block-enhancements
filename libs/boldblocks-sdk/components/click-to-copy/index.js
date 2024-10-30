/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Tooltip } from "@wordpress/components";

/**
 * Internal dependencies
 */

export const ClickToCopy = ({
  text = __("Click on the text to copy"),
  copiedText = __("Copied"),
  onCopied,
  value = "",
  children,
  ...otherProps
}) => {
  return (
    <>
      <Tooltip text={text}>
        <div
          onClick={() => {
            navigator.clipboard.writeText(value);

            if (onCopied) {
              onCopied({ value, copiedText });
            }
          }}
          {...otherProps}
        >
          {children}
        </div>
      </Tooltip>
    </>
  );
};
