/**
 * External dependencies
 */
import { noop } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Button } from "@wordpress/components";
import { close, create, arrowDown, arrowUp } from "@wordpress/icons";

/**
 * Internal dependencies
 */
import { RepeaterItemStyled } from "./styles";

export const RepeaterGroupControl = ({
  values = [],
  onChange = noop,
  onMove = noop,
  onCreate = noop,
  onRemove = noop,
  renderControl = noop,
  addNewButton = null,
  defaultItemValue = {},
  addItemLabel = __("Add new item"),
  removeItemLabel = __("Remove item"),
  isEditable = true,
  ...otherProps
}) => {
  return (
    <div className="repeater-group">
      {values.map((itemValue, index) => (
        <RepeaterItemStyled className="repeater-group__item" key={index}>
          {renderControl({
            value: itemValue,
            index,
            onChange: (newValue) => {
              const newValues = values.map((value, i) =>
                i === index ? newValue : value
              );

              onChange(newValues);
            },
            isEditable,
            ...otherProps,
          })}
          {isEditable && (
            <div className="repeater-group__item__actions">
              <Button
                icon={close}
                iconSize={12}
                variant="secondary"
                isDestructive
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  const newValues = [...values];
                  newValues.splice(index, 1);

                  onChange(newValues);
                  onRemove(index);
                }}
                className="button-remove-item"
                title={__("Remove item")}
              >
                {removeItemLabel}
              </Button>
              <Button
                disabled={index === 0}
                icon={arrowUp}
                iconSize={12}
                variant="secondary"
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  const newValues = [...values];

                  // Swap order two items
                  [newValues[index - 1], newValues[index]] = [
                    newValues[index],
                    newValues[index - 1],
                  ];

                  onChange(newValues);
                  onMove(index - 1, index);
                }}
                className="button-item-up"
                title={__("Move up")}
              >
                {__("Up")}
              </Button>
              <Button
                disabled={index === values.length - 1}
                icon={arrowDown}
                iconSize={12}
                variant="secondary"
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  const newValues = [...values];

                  // Swap order two items
                  [newValues[index + 1], newValues[index]] = [
                    newValues[index],
                    newValues[index + 1],
                  ];

                  onChange(newValues);
                  onMove(index + 1, index);
                }}
                className="button-item-down"
                title={__("Move down")}
              >
                {__("Down")}
              </Button>
            </div>
          )}
        </RepeaterItemStyled>
      ))}
      {isEditable && (
        <>
          {addNewButton ? (
            addNewButton(values)
          ) : (
            <Button
              icon={create}
              variant="primary"
              size="small"
              onClick={(e) => {
                e.preventDefault();

                onChange([...values, defaultItemValue]);
                onCreate(values?.length ?? 0);
              }}
              className="button-add-item"
              title={__("Add new item")}
            >
              {addItemLabel}
            </Button>
          )}
        </>
      )}
    </div>
  );
};
