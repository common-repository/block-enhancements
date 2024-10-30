/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { TextareaControl } from "@wordpress/components";

/**
 * Internal dependencies
 */

/**
 * Input a block icon
 *
 * @param {Object}
 */
const SVGInlineControl = ({
  label,
  value,
  onChange,
  help,
  placeholder,
  rows = 4,
  className,
}) => {
  if (!help) {
    help = <>{__("Input SVG markup.")}</>;
  }
  return (
    <div>
      <TextareaControl
        label={label}
        value={value}
        onChange={onChange}
        rows={rows}
        help={help}
        placeholder={placeholder}
        className="svg__input"
      />
    </div>
  );
};

export default SVGInlineControl;
