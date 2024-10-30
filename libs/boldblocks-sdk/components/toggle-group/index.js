/**
 * External dependencies
 */
import { noop } from "lodash";
import clsx from "clsx";
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  Button,
  ButtonGroup,
  __experimentalVStack as VStack,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import { LabelControl } from "../label-control";
import { UnitRangeControl } from "../unit-range-control";

/**
 * Style
 */
const ButtonGroupStyled = styled(ButtonGroup)`
  margin-top: 1px;
  margin-left: 1px;
  button {
    margin: -1px 0 0 -1px;
    vertical-align: middle;
  }
`;

/**
 * Help control
 */
const HelpStyled = styled.div`
  margin-top: 8px;
  margin-bottom: revert;
  font-size; 12px;
  color: #757575;
`;
const HelpControl = ({ help }) =>
  help ? <HelpStyled className="toggle-group__help">{help}</HelpStyled> : null;

/**
 * Toggle group control
 *
 * @param {Object}
 * @returns
 */
export const ToggleGroupControl = ({
  label,
  value,
  options,
  onChange = noop,
  toggleOff = true,
  isResponsive = false,
  isMultiple = false,
  help,
  className,
}) => {
  const isSelected = (newValue) =>
    isMultiple ? (value ?? []).includes(newValue) : newValue === value;

  const createOnChangeHandler = (newValue) => {
    let newValues = newValue;
    // Toggle off
    if (isSelected(newValue) && toggleOff) {
      if (isMultiple) {
        newValues = (value ?? []).filter((i) => i !== newValue);
      } else {
        newValues = undefined;
      }
    } else {
      if (isMultiple) {
        newValues = [...(value ?? []), newValue];
      }
    }

    onChange(newValues);
  };

  return (
    <div className={clsx("toggle-group-control", className)}>
      <LabelControl label={label} isResponsive={isResponsive} isBold={true} />
      <ButtonGroupStyled aria-label={label}>
        {options.map(({ label, value: optionValue, disabled = false }) => {
          return (
            <Button
              key={optionValue}
              size="small"
              variant={isSelected(optionValue) ? "primary" : undefined}
              onClick={() => createOnChangeHandler(optionValue)}
              disabled={disabled}
            >
              {label}
            </Button>
          );
        })}
      </ButtonGroupStyled>
      <HelpControl help={help} />
    </div>
  );
};

/**
 * Toggle group with custom control
 *
 * @param {Object}
 * @returns
 */
export const ToggleGroupCustomControl = ({
  name,
  label,
  value = {},
  options,
  onChange = noop,
  toggleOff = true,
  customOptions,
  customControlProps = {},
  help,
  ...otherProps
}) => {
  const {
    label: customLabel = __("Custom"),
    toggleValue = "custom",
    name: customName = "value",
    renderControl = ({ label, value, onChange, ...otherProps }) => (
      <UnitRangeControl
        label={label}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
    ),
  } = customOptions ?? {};

  const { [name]: nameValue = "", [customName]: customValue } = value;

  return (
    <VStack className="toggle-group" spacing={2}>
      <ToggleGroupControl
        label={label}
        value={nameValue}
        options={options}
        toggleOff={toggleOff}
        onChange={(optionValue) => {
          let newValue;
          if (optionValue === toggleValue) {
            newValue = { ...value, [name]: optionValue };
          } else {
            newValue = {
              ...value,
              [name]: optionValue,
              [customName]: optionValue,
            };
          }

          onChange(newValue);
        }}
        {...otherProps}
      />
      {nameValue === toggleValue && (
        <div className="toggle-group__custom-control">
          {renderControl({
            label: customLabel,
            value: customValue,
            onChange: (newValue) => {
              onChange({ ...value, [customName]: newValue });
            },
            ...customControlProps,
          })}
        </div>
      )}
      <HelpControl help={help} />
    </VStack>
  );
};
