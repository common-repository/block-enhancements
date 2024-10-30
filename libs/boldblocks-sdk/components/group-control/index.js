/**
 * External dependencies
 */
import clsx from "clsx";
import { noop } from "lodash";

/**
 * WordPress dependencies
 */
import { useState, useEffect, Fragment } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { Root, Header, Body } from "./styles";
import LinkedButton from "./linked-button";
import { getAllValue } from "./utils";

/**
 * The linked state hook
 *
 * @param {Boolean} initialLinked
 * @returns
 */
function useLinkedGroup(initialLinked) {
  const [isLinked, setIsLinked] = useState(initialLinked);

  useEffect(() => setIsLinked(initialLinked), [initialLinked]);

  return [isLinked, setIsLinked];
}

/**
 * The controls for each fields group.
 *
 * @param {InputControlsProps}
 */
const InputControls = ({
  values,
  fields,
  renderControl,
  onChange,
  normalizeValue,
}) => {
  const createOnChangeHandler = (side) => (next) => {
    next = normalizeValue({ side, value: next });

    onChange({ ...values, [side]: next });
  };

  return fields.map((props) => {
    const { name } = props;

    return (
      <Fragment key={`group-control-${name}`}>
        {renderControl({
          value: values[name] ?? undefined,
          onChange: createOnChangeHandler(name),
          fields,
          values,
          ...props,
        })}
      </Fragment>
    );
  });
};

/**
 * The control all linked fields.
 *
 * @param {InputControlsProps}
 */
const AllInputControls = ({
  values,
  fields,
  renderControl,
  renderAllControl = null,
  onChange,
  normalizeValue,
  ...otherProps
}) => {
  const allValue = getAllValue({ values, fields });
  const createOnChangeHandler = (next) => {
    next = normalizeValue({ side: "all", value: next });
    let nextValues = { ...values };

    fields.forEach(({ name }) => {
      nextValues = { ...nextValues, [name]: next };
    });

    onChange(nextValues);
  };

  if (!renderAllControl) {
    renderAllControl = renderControl;
  }

  return renderAllControl({
    value: allValue,
    fields,
    values,
    onChange: createOnChangeHandler,
    ...otherProps,
  });
};

/**
 * Group control
 */
export const GroupControl = ({
  label,
  fields = [],
  values = {},
  renderLabel = noop,
  renderControl = noop,
  onChange = noop,
  normalizeValue = ({ side, value }) => value,
  isLinkedGroup = true,
  getInitialLinkedState = noop,
  className,
  columns,
  ...otherProps
}) => {
  // Input props
  const inputProps = {
    fields,
    values,
    renderControl,
    onChange,
    normalizeValue,
    ...otherProps,
  };

  // Get linked state and set linked state function
  const [isLinked, setIsLinked] = isLinkedGroup
    ? useLinkedGroup(getInitialLinkedState(values))
    : [false, noop];

  return (
    <Root
      className={clsx("group-control", className, {
        [`is-${columns}-columns`]: columns,
      })}
      {...otherProps}
    >
      <Header className="group-control__header">
        {renderLabel({ label, isLinkedGroup, ...otherProps })}
        {isLinkedGroup && (
          <LinkedButton
            onClick={() => {
              setIsLinked(!isLinked);
            }}
            isLinked={isLinked}
          />
        )}
      </Header>
      <Body className="group-control__body">
        {isLinked && <AllInputControls {...inputProps} />}
        {!isLinked && <InputControls {...inputProps} />}
      </Body>
    </Root>
  );
};
