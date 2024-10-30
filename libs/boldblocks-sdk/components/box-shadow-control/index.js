/**
 * External dependencies
 */
import { noop } from "lodash";
import clsx from "clsx";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import {
  ToggleControl,
  __experimentalUnitControl as UnitControl,
} from "@wordpress/components";
import { Fragment } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { LabelControl } from "../label-control";
import { RepeaterGroupControl } from "../repeater-group-control";
import { BoxshadowControlStyled, BoxShadowGroupControlStyled } from "./styles";
import { ColorGradientDropdown } from "../color-gradient-dropdown";
import {
  useMultipleOriginColors,
  getColorObject,
  getShadowPresets,
  isStringColor,
} from "../../utils";

/**
 * Box shadow control: Offset X, Offset Y, Blur, Spread, Inset, Color
 *
 * @param {Object}
 * @returns
 */
export const BoxShadowControl = ({
  label,
  values,
  onChange = noop,
  allColors,
}) => {
  const fields = [
    { name: "x", label: __("Offset X") },
    { name: "y", label: __("Offset Y") },
    { name: "blur", label: __("Blur") },
    { name: "spread", label: __("Spread") },
    { name: "color", label: __("Color") },
    { name: "inset", label: __("Inset?") },
  ];

  const renderControl = ({ name, label, value, onChange }) => {
    switch (name) {
      case "x":
      case "y":
      case "blur":
      case "spread":
        return <UnitControl label={label} value={value} onChange={onChange} />;

      case "inset":
        return (
          <ToggleControl label={label} checked={value} onChange={onChange} />
        );

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
      <BoxshadowControlStyled
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

// Define default shadow
export const defaultShadowValue = {
  x: "0px",
  y: "2px",
  blur: "6px",
  spread: "0px",
  color: { value: "rgba(0, 0, 0, .24)" },
  inset: false,
};

export const BoxShadowGroupControl = (props) => {
  const {
    label,
    slug: shadowSlug,
    onChangeSlug = noop,
    onChange,
    hasPresets = false,
    customShadowPresets = [],
    defaultShadow = defaultShadowValue,
    labelProps: {
      isResponsive = false,
      isBold = true,
      ...otherLabelProps
    } = {},
  } = props;

  const shadowPresets = getShadowPresets(customShadowPresets);

  const { allColors } = useMultipleOriginColors();

  const renderShadow = ({ value, onChange, index }) => (
    <BoxShadowControl
      label={sprintf(__("Shadow %d"), index + 1)}
      values={value}
      onChange={onChange}
      allColors={allColors}
    />
  );

  return (
    <BoxShadowGroupControlStyled className="shadow-group-control">
      {label && (
        <LabelControl
          label={label}
          isResponsive={isResponsive}
          isBold={isBold}
          {...(otherLabelProps ?? {})}
        />
      )}
      {hasPresets && (
        <div className="shadow-presets">
          {Object.keys(shadowPresets).map((key) => (
            <Fragment key={key}>
              <h3 className="shadow-list__title">
                {shadowPresets[key]["label"]}
              </h3>
              <div className={`shadow-list ${key}-presets`}>
                {shadowPresets[key]["presets"].map(({ slug, shadow }) => (
                  <div
                    key={slug}
                    onClick={() => {
                      const shadows = shadow.split(/,\s*(?![^\(]*\))/);
                      const refinedShadows = shadows
                        .map((shadowString) => {
                          // Ignore css variable items
                          if (shadowString.includes("var")) {
                            return false;
                          }

                          const shadowObject = {};
                          let shadowWithoutInset = shadowString;
                          if (shadowString.includes("inset")) {
                            shadowObject.inset = true;
                            shadowWithoutInset = shadowString
                              .replace("inset", "")
                              .trim();
                          } else {
                            shadowObject.inset = false;
                          }

                          shadowWithoutInset = shadowWithoutInset.replaceAll(
                            /\s{2,}/g,
                            " ",
                          );
                          const propArray =
                            shadowWithoutInset.split(/ (?![^\(]*\))/);

                          // Invalid value
                          if (propArray.length < 2 || propArray.length > 5) {
                            return false;
                          }

                          if (isStringColor(propArray[0])) {
                            shadowObject.color = { value: propArray.shift() };
                          } else if (
                            isStringColor(propArray[propArray.length - 1])
                          ) {
                            shadowObject.color = { value: propArray.pop() };
                          }

                          for (let i = 0; i < propArray.length; i++) {
                            if (i === 0) {
                              shadowObject.x = propArray[i];
                            } else if (i === 1) {
                              shadowObject.y = propArray[i];
                            } else if (i === 2) {
                              shadowObject.blur = propArray[i];
                            } else if (i === 3) {
                              shadowObject.spread = propArray[i];
                            }
                          }
                          return shadowObject;
                        })
                        .filter((i) => i);

                      onChange([...refinedShadows]);
                      onChangeSlug(slug);
                    }}
                    className={clsx("shadow-item", slug, {
                      "is-selected": slug === shadowSlug,
                    })}
                    style={{ boxShadow: shadow }}
                  ></div>
                ))}
              </div>
            </Fragment>
          ))}
        </div>
      )}
      <RepeaterGroupControl
        {...props}
        onChange={(values) => {
          onChange(values);
          onChangeSlug("");
        }}
        addItemLabel={__("Add new shadow")}
        removeItemLabel={__("Remove shadow")}
        renderControl={renderShadow}
        defaultItemValue={defaultShadow}
      />
    </BoxShadowGroupControlStyled>
  );
};
