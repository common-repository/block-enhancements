/**
 * External dependencies
 */
import { noop } from "lodash";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { __experimentalUnitControl as UnitControl } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { LabelControl } from "../label-control";
import { RepeaterGroupControl } from "../repeater-group-control";
import { TextShadowControlStyled } from "./styles";
import { ColorGradientDropdown } from "../color-gradient-dropdown";
import { useMultipleOriginColors, getColorObject } from "../../utils";

/**
 * Box shadow control: Offset X, Offset Y, Blur, Spread, Inset, Color
 *
 * @param {Object}
 * @returns
 */
export const TextShadowControl = ({ label, values, onChange = noop }) => {
  const fields = [
    { name: "x", label: __("Offset X") },
    { name: "y", label: __("Offset Y") },
    { name: "blur", label: __("Blur") },
    { name: "color", label: __("Color") },
  ];

  const { allColors } = useMultipleOriginColors();

  const renderControl = ({ name, label, value, onChange }) => {
    switch (name) {
      case "x":
      case "y":
      case "blur":
        return <UnitControl label={label} value={value} onChange={onChange} />;

      case "color":
        return (
          <ColorGradientDropdown
            enableAlpha={true}
            settings={[
              {
                label,
                onColorChange: (value) => {
                  onChange(getColorObject(value, allColors));
                },
                colorValue: getColorObject(value, allColors)?.value,
              },
            ]}
            className="is-inner-control"
          />
        );

      default:
        break;
    }

    return null;
  };
  return (
    <>
      <TextShadowControlStyled
        label={label}
        fields={fields}
        values={values}
        renderLabel={({ label }) => {
          return <LabelControl label={label} isResponsive={false} />;
        }}
        renderControl={renderControl}
        isLinkedGroup={false}
        onChange={onChange}
        columns={4}
      />
    </>
  );
};

// Define default text shadow
export const defaultTextShadow = {
  x: "1px",
  y: "1px",
  blur: "2px",
  color: { value: "rgba(20, 20, 20, .6)" },
};

export const TextShadowGroupControl = (props) => {
  const {
    label,
    labelProps: {
      isResponsive = false,
      isBold = true,
      ...otherLabelProps
    } = {},
  } = props;

  const renderShadow = ({ value, onChange, index }) => (
    <TextShadowControl
      label={sprintf(__("Shadow %d"), index + 1)}
      values={value}
      onChange={onChange}
    />
  );
  return (
    <div className="shadow-group-control">
      {label && (
        <LabelControl
          label={label}
          isResponsive={isResponsive}
          isBold={isBold}
          {...(otherLabelProps ?? {})}
        />
      )}
      <RepeaterGroupControl
        {...props}
        addItemLabel={__("Add new shadow")}
        removeItemLabel={__("Remove shadow")}
        renderControl={renderShadow}
        defaultItemValue={defaultTextShadow}
      />
    </div>
  );
};
