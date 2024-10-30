/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
  Button,
  CheckboxControl,
  Spinner,
  Notice,
  Icon,
} from "@wordpress/components";
import { useState, memo, useMemo, useCallback } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { Widget, Fieldset } from "../../components";
import { log } from "../../utils";
import { refineBlockTypes } from "../utils";

const WidgetStyled = styled(Widget)`
  fieldset {
    min-height: 60px;
    overflow: auto;
  }

  .blocktype-checkbox {
    > .components-base-control__field {
      display: flex;
      align-items: center;
    }
    .components-checkbox-control__label {
      display: inline-flex;
      align-items: center;

      svg {
        width: 18px;
        height: 18px;
        margin-right: 8px;
      }
    }

    .label {
      display: block;
      max-width: 170px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;

const CheckList = ({
  blockTypes,
  featureName,
  selectedBlocks,
  setSelectedBlocks,
  isChecked,
  title,
}) => {
  return (
    <>
      {!!title && <h4 className="list-title">{title}</h4>}
      <ul className="fieldset__list">
        {blockTypes.map((item) => (
          <li key={`${featureName}-${item?.name}`}>
            <CheckboxControl
              label={
                <>
                  <Icon className="block-icon" icon={item?.icon?.src} />
                  <span
                    className="label"
                    title={item?.title}
                  >{`${item?.title}`}</span>
                </>
              }
              checked={isChecked(item?.name)}
              onChange={(checked) => {
                let newSelectedBlocks = [];
                if (checked) {
                  const seletecItem = blockTypes.find(
                    ({ name }) => name === item?.name,
                  );
                  newSelectedBlocks = [
                    ...selectedBlocks,
                    { name: seletecItem.name },
                  ];
                } else {
                  newSelectedBlocks = selectedBlocks.filter(
                    ({ name }) => name !== item?.name,
                  );
                }

                setSelectedBlocks([...newSelectedBlocks], featureName);
              }}
              className="blocktype-checkbox"
            />
          </li>
        ))}
      </ul>
    </>
  );
};

// Allowed blocks widget.
export const FeatureAllowedBlocksWidget = memo(
  ({
    featureName,
    availableBlockTypes,
    isLoading,
    selectedBlocks,
    title,
    description,
    updateSettings,
  }) => {
    const [allowedBlocks, setAllowedBlocks] = useState(selectedBlocks);
    const refinedBlockTypes = useMemo(
      () => refineBlockTypes(availableBlockTypes),
      [availableBlockTypes?.length],
    );
    // Is current block selected.
    const isChecked = useCallback(
      (checkingName) =>
        !!allowedBlocks.find(({ name }) => name === checkingName),
      [allowedBlocks],
    );

    const [messageData, setMessageData] = useState({
      type: "success",
      message: "",
    });

    // Save button.
    const saveActions = () => {
      const [isSaving, setIsSaving] = useState(false);
      return (
        <>
          <Button
            variant="primary"
            disabled={isSaving}
            onClick={(e) => {
              e.preventDefault();
              setIsSaving(true);
              updateSettings(allowedBlocks, featureName)
                .then(() => {
                  setMessageData({
                    type: "success",
                    message: __("Setttings saved!", "block-enhancements"),
                  });
                })
                .catch((error) => {
                  log(error, "error");
                  setMessageData({
                    type: "error",
                    message: __(
                      "Something went wrong, please contact the author for support!",
                      "block-enhancements",
                    ),
                  });
                })
                .finally(() => {
                  setIsSaving(false);
                });
            }}
          >
            {__("Update settings", "block-enhancements")}
          </Button>
          {isSaving && <Spinner />}
        </>
      );
    };

    return (
      <WidgetStyled
        title={title}
        renderFooter={saveActions}
        isFullRow={true}
        settingsName="be-settings"
        initialOpen={false}
      >
        <p>{description}</p>
        <Fieldset className="fieldset">
          <div className="fieldset__label">
            <strong>
              {__(
                "Choose which blocks should be supported.",
                "block-enhancements",
              )}
            </strong>
          </div>
          {isLoading ? (
            <Spinner />
          ) : (
            availableBlockTypes?.length > 0 && (
              <fieldset>
                <CheckboxControl
                  label={__("Toggle All", "block-enhancements")}
                  checked={allowedBlocks.length === availableBlockTypes.length}
                  onChange={(checked) => {
                    if (checked) {
                      setAllowedBlocks(
                        availableBlockTypes.map(({ name }) => ({ name })),
                      );
                    } else {
                      setAllowedBlocks([]);
                    }
                  }}
                />
                {availableBlockTypes.length < 24 ? (
                  <CheckList
                    blockTypes={availableBlockTypes}
                    featureName={featureName}
                    selectedBlocks={allowedBlocks}
                    setSelectedBlocks={setAllowedBlocks}
                    isChecked={isChecked}
                  />
                ) : (
                  <>
                    {Object.keys(refinedBlockTypes).map((title) => {
                      return (
                        <CheckList
                          key={title}
                          title={title.toUpperCase()}
                          blockTypes={refinedBlockTypes[title]}
                          featureName={featureName}
                          selectedBlocks={allowedBlocks}
                          setSelectedBlocks={setAllowedBlocks}
                          isChecked={isChecked}
                        />
                      );
                    })}
                  </>
                )}
              </fieldset>
            )
          )}
        </Fieldset>
        {messageData && messageData?.message && (
          <Notice status={messageData?.type} isDismissible={false}>
            {messageData.message}
          </Notice>
        )}
      </WidgetStyled>
    );
  },
);
