/**
 * External dependencies
 */
import clsx from "clsx";
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __, sprintf } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import {
  TextareaControl,
  ExternalLink,
  Notice,
  Fill,
} from "@wordpress/components";
import { useState } from "@wordpress/element";

/**
 * Internal dependencies
 */
import {
  LabelControl,
  ClickToCopy,
  MouseStateToolbar,
  ToolsPanelItemStyled,
  VStack,
} from "../../components";
import {
  blockHasSupportFeature,
  addAttributes,
  addEditProps,
  withCustomStyles,
  getMouseState,
  handleChangeSettingField,
  handleChangeSettingGroupField,
  getSelector,
} from "../../utils";
import { buildCSSVariables } from "./style";

const HelpStyled = styled.div`
  ul {
    display: inline-flex;
    flex-wrap: wrap;
    margin: 8px 0 0;
  }

  .components-notice {
    padding: 2px 0 2px 8px !important;
    margin: 0 0 8px;
  }
`;

/**
 * Define feature name
 */
const featureName = "withTransition";

/**
 * Add custom attributes.
 *
 * @param {Object} settings Settings for the block.
 * @return {Object} settings Modified settings.
 */
// pretter-ignore
addFilter(
  "blocks.registerBlockType",
  `boldblocks/${featureName}/addAttributes`,
  addAttributes(
    {},
    (settings, { featureName }) =>
      blockHasSupportFeature(settings.name, featureName),
    { featureName },
  ),
);

/**
 * Override the default edit UI to include new inspector controls for custom settings.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} BlockEdit Modified block edit component.
 */
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (!blockHasSupportFeature(props.name, featureName)) {
      return <BlockEdit {...props} />;
    }

    const { attributes, setAttributes, isSelected } = props;
    const {
      boldblocks: { withTransition: { transition, transitionHover } = {} } = {},
    } = attributes;

    // Get the mouse state
    const mouseState = getMouseState();

    // Get value object by mouse state
    const transitionByMouseState =
      mouseState === "hover" ? transitionHover : transition;
    const settingNameByMouseState =
      mouseState === "hover" ? "transitionHover" : "transition";

    const onFeatureChange = (fieldName) => (newValue) => {
      handleChangeSettingGroupField({
        fieldName,
        groupName: "withTransition",
        setAttributes,
        attributes,
      })(newValue);
    };

    const [copiedText, setCopiedText] = useState("");
    const transitionOptions = [
      "all .25s ease",
      "transform .25s",
      "box-shadow .25s",
      "opacity .25s",
      "color .25s",
      "background .25s",
    ];

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && (
          <>
            <Fill name="block-enhancements">
              <ToolsPanelItemStyled
                label={__("With Transition", "block-enhancements")}
                panelId="block-enhancements"
                hasValue={() => !!transition || !!transitionHover}
                onDeselect={() =>
                  handleChangeSettingField({
                    fieldName: "withTransition",
                    setAttributes,
                    attributes,
                  })({})
                }
              >
                <VStack spacing={3}>
                  <LabelControl
                    label={__("Transition", "block-enhancements")}
                    isResponsive={false}
                    OtherControls={<MouseStateToolbar />}
                  />
                  <TextareaControl
                    value={transitionByMouseState}
                    onChange={onFeatureChange(settingNameByMouseState)}
                    rows={3}
                  />
                  <HelpStyled>
                    {__("Common values:", "block-enhancements")}
                    <br />
                    <ul>
                      {transitionOptions.map((value, index) => (
                        <li key={index}>
                          <ClickToCopy
                            value={value}
                            onCopied={({ value, copiedText }) => {
                              onFeatureChange(settingNameByMouseState)(value);

                              setCopiedText(
                                sprintf(
                                  __("Updated to '%s'", "block-enhancements"),
                                  value,
                                ),
                              );
                            }}
                          >
                            <code>{value}</code>
                          </ClickToCopy>
                        </li>
                      ))}
                    </ul>
                    {copiedText && (
                      <Notice
                        isDismissible={true}
                        onRemove={() => setCopiedText("")}
                      >
                        {copiedText}
                      </Notice>
                    )}
                    <ExternalLink
                      href={
                        "https://developer.mozilla.org/en-US/docs/Web/CSS/transition"
                      }
                    >
                      {__(
                        "Learn more about CSS transition",
                        "block-enhancements",
                      )}
                    </ExternalLink>
                  </HelpStyled>
                </VStack>
              </ToolsPanelItemStyled>
            </Fill>
          </>
        )}
      </>
    );
  };
}, "withInspectorControls");
addFilter(
  "editor.BlockEdit",
  `boldblocks/${featureName}/withInspectorControls`,
  withInspectorControls,
);

/**
 * Override props assigned to save component to inject the CSS variables definition.
 *
 * @param {Object} props      Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */
export function addSaveProps(props, blockType, attributes) {
  if (!blockHasSupportFeature(blockType.name, featureName)) {
    return props;
  }

  // Add with-transform class
  const {
    boldblocks: { withTransition: { transition, transitionHover } = {} } = {},
  } = attributes;

  if (transition || transitionHover) {
    props.className = clsx(props.className, "with-transition");
  }

  return props;
}
addFilter(
  "blocks.getSaveContent.extraProps",
  `boldblocks/${featureName}/addSaveProps`,
  addSaveProps,
);

/**
 * Filters registered block settings to extend the block edit wrapper
 * to apply the desired styles and className properly.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object}.Filtered block settings.
 */
addFilter(
  "blocks.registerBlockType",
  `boldblocks/${featureName}/addEditProps`,
  addEditProps(featureName, addSaveProps),
);

/**
 * Override the default block list element to add custom styles.
 *
 * @param  {Function} BlockListBlock Original component
 * @return {Function}                Wrapped component
 */
addFilter(
  "editor.BlockListBlock",
  "boldblocks/style/withCustomStyles",
  withCustomStyles({
    featureName,
    getSelector,
    buildCSSVariables,
    createHigherOrderComponent,
  }),
);
