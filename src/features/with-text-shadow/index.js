/**
 * External dependencies
 */
import clsx from "clsx";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import {
  Fill,
  __experimentalToolsPanelItem as ToolsPanelItem,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
  TextShadowGroupControl,
  MouseStateToolbar,
  ToolsPanelItemStyled,
} from "../../components";
import {
  blockHasSupportFeature,
  addAttributes,
  addEditProps,
  withCustomStyles,
  useBlockFeature,
  handleChangeSettingField,
  handleChangeSettingGroupField,
  getMouseState,
  getSelector,
} from "../../utils";
import { buildCSSVariables } from "./style";

/**
 * Define feature name
 */
const featureName = "withTextShadow";

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

    const { attributes, setAttributes } = props;
    const {
      boldblocks: {
        withTextShadow: { shadows = [], shadowsHover = [] } = {},
      } = {},
    } = attributes;

    // Get the mouse state
    const mouseState = getMouseState();

    // Get value object by mouse state
    const shadowsByMouseState = mouseState === "hover" ? shadowsHover : shadows;
    const settingNameByMouseState =
      mouseState === "hover" ? "shadowsHover" : "shadows";

    const { shouldDisplayBlockControls, blocks, updateBlockAttributes } =
      useBlockFeature(props, true);

    const onFeatureChange = (fieldName) => (newValue) => {
      handleChangeSettingGroupField({
        fieldName,
        groupName: "withTextShadow",
        setAttributes,
        attributes,
        blocks,
        updateBlockAttributes,
      })(newValue);
    };

    return (
      <>
        <BlockEdit {...props} />
        {shouldDisplayBlockControls && (
          <>
            <Fill name="block-enhancements">
              <ToolsPanelItemStyled
                label={__("With Text Shadow", "block-enhancements")}
                panelId="block-enhancements"
                hasValue={() => !!shadows?.length || !!shadowsHover?.length}
                onDeselect={() =>
                  handleChangeSettingField({
                    fieldName: "withTextShadow",
                    setAttributes,
                    attributes,
                    blocks,
                    updateBlockAttributes,
                  })({})
                }
              >
                <TextShadowGroupControl
                  label={__("Text shadow", "block-enhancements")}
                  labelProps={{ OtherControls: <MouseStateToolbar /> }}
                  values={shadowsByMouseState}
                  onChange={onFeatureChange(settingNameByMouseState)}
                />
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

  // Add with-text-shadow class
  const {
    boldblocks: {
      withTextShadow: { shadows = [], shadowsHover = [] } = {},
    } = {},
  } = attributes;

  if (shadows.length || shadowsHover.length) {
    props.className = clsx(props.className, "with-text-shadow");
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
