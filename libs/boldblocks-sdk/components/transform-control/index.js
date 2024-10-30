/**
 * External dependencies
 */
import { noop } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { create } from "@wordpress/icons";
import {
  Button,
  Dropdown,
  MenuGroup,
  MenuItem,
  TextControl,
  __experimentalUnitControl as UnitControl,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import { LabelControl } from "../label-control";
import { GroupControl } from "../group-control";
import { RepeaterGroupControl } from "../repeater-group-control";
import { isValidSettingObject } from "../../utils";
import { GroupControlStyled } from "./styles";

/**
 * 2D translate
 *
 * @param {Object}
 * @returns
 */
const TranslateControl = ({ values, onChange, showResponsiveLabel = true }) => {
  return (
    <GroupControl
      label={__("Translate")}
      values={values}
      fields={[
        { name: "x", label: "X" },
        { name: "y", label: "Y" },
      ]}
      renderLabel={({ label, showResponsiveLabel }) => {
        return (
          <LabelControl label={label} isResponsive={showResponsiveLabel} />
        );
      }}
      renderControl={({ label, value, onChange }) => {
        return (
          <UnitControl
            label={label}
            value={value}
            onChange={onChange}
            autoComplete="off"
          />
        );
      }}
      isLinkedGroup={true}
      getInitialLinkedState={({ x, y }) => x === y}
      onChange={onChange}
      columns={2}
      showResponsiveLabel={showResponsiveLabel}
    />
  );
};

/**
 * 2D scale
 *
 * @param {Object}
 * @returns
 */
const ScaleControl = ({ values, onChange, showResponsiveLabel = true }) => (
  <GroupControlStyled
    label={__("Scale")}
    values={values}
    fields={[
      { name: "x", label: "X" },
      { name: "y", label: "Y" },
    ]}
    renderLabel={({ label, showResponsiveLabel }) => {
      return <LabelControl label={label} isResponsive={showResponsiveLabel} />;
    }}
    renderControl={({ label, value = "", onChange }) => (
      <TextControl
        type="number"
        label={label}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    )}
    isLinkedGroup={true}
    getInitialLinkedState={({ x, y }) => x === y}
    onChange={onChange}
    columns={2}
    showResponsiveLabel={showResponsiveLabel}
  />
);

/**
 * 2D rotate
 *
 * @param {Object}
 * @returns
 */
const RotateControl = ({
  label,
  value,
  onChange,
  showResponsiveLabel = true,
}) => (
  <>
    <LabelControl label={label} isResponsive={showResponsiveLabel} />
    <TextControl
      type="number"
      min={-360}
      max={360}
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  </>
);

/**
 * 2D skew
 *
 * @param {Object}
 * @returns
 */
const SkewControl = ({
  label,
  values,
  onChange,
  showResponsiveLabel = true,
}) => (
  <GroupControlStyled
    label={label}
    values={values}
    fields={[
      { name: "x", label: "X" },
      { name: "y", label: "Y" },
    ]}
    renderLabel={({ label, showResponsiveLabel }) => {
      return <LabelControl label={label} isResponsive={showResponsiveLabel} />;
    }}
    renderControl={({ label, value = "", onChange }) => (
      <TextControl
        type="number"
        min={-360}
        max={360}
        label={label}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    )}
    isLinkedGroup={true}
    getInitialLinkedState={({ x, y }) => x === y}
    onChange={onChange}
    columns={2}
    showResponsiveLabel={showResponsiveLabel}
  />
);

/**
 * Transform control
 *
 * @param {Object}
 * @returns
 */
export const TransformControl = ({
  values = [],
  onChange = noop,
  showResponsiveLabel = true,
}) => {
  const addNewButton = () => {
    return (
      <Dropdown
        className="group-add-item"
        contentClassName="group-add-item__content"
        renderToggle={({ isOpen, onToggle }) => (
          <Button
            variant="primary"
            icon={create}
            size="small"
            onClick={onToggle}
            aria-expanded={isOpen}
          >
            {__("Add new transform")}
          </Button>
        )}
        renderContent={({ onClose }) => (
          <MenuGroup>
            <MenuItem
              onClick={() => {
                onChange([...values, { translate: {} }]);
                onClose();
              }}
            >
              {__("Translate")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                onChange([...values, { scale: {} }]);
                onClose();
              }}
            >
              {__("Scale")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                onChange([...values, { rotate: {} }]);
                onClose();
              }}
            >
              {__("Rotate")}
            </MenuItem>
            <MenuItem
              onClick={() => {
                onChange([...values, { skew: {} }]);
                onClose();
              }}
            >
              {__("Skew")}
            </MenuItem>
          </MenuGroup>
        )}
      />
    );
  };

  const renderControl = ({ value, onChange, showResponsiveLabel }) => {
    const createOnChangeHandler = (transformType) => (value) => {
      onChange({ [transformType]: value });
    };

    if (isValidSettingObject(value)) {
      const transformType = Object.keys(value).length
        ? Object.keys(value)[0]
        : false;

      switch (transformType) {
        case "translate":
          return (
            <TranslateControl
              values={value[transformType]}
              onChange={createOnChangeHandler("translate")}
              showResponsiveLabel={showResponsiveLabel}
            />
          );

        case "scale":
          return (
            <ScaleControl
              values={value[transformType]}
              onChange={createOnChangeHandler("scale")}
              showResponsiveLabel={showResponsiveLabel}
            />
          );

        case "rotate":
          return (
            <RotateControl
              label={__("Rotate (deg)")}
              value={value[transformType]}
              onChange={createOnChangeHandler("rotate")}
              showResponsiveLabel={showResponsiveLabel}
            />
          );

        case "skew":
          return (
            <SkewControl
              label={__("Skew (deg)")}
              values={value[transformType]}
              onChange={createOnChangeHandler("skew")}
              showResponsiveLabel={showResponsiveLabel}
            />
          );
      }
    }

    return null;
  };

  return (
    <>
      <RepeaterGroupControl
        values={values}
        addNewButton={addNewButton}
        renderControl={renderControl}
        onChange={onChange}
        showResponsiveLabel={showResponsiveLabel}
      />
    </>
  );
};
