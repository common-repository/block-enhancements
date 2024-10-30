/**
 * External dependencies
 */
import clsx from "clsx";
import { isArray, isEmpty } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { FocalPointPicker, Fill } from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
  TransformControl,
  LabelControl,
  MouseStateToolbar,
  ToolsPanelItemStyled,
  VStack,
} from "../../components";
import {
  blockHasSupportFeature,
  addAttributes,
  addEditProps,
  withCustomStyles,
  useBlockFeature,
  getMouseState,
  getBreakpointType,
  getAllBreakpoints,
  handleChangeSettingField,
  handleChangeSettingGroupField,
  getResponsiveSettingGroupFieldValue,
  handleChangeResponsiveSettingGroupField,
  isValidSettingObject,
  getSelector,
} from "../../utils";
import { buildCSSVariables } from "./style";

/**
 * Define feature name
 */
const featureName = "withTransform";

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
        withTransform: {
          transform,
          transformHover,
          transformOrigin,
          transformOriginHover,
        } = {},
      } = {},
    } = attributes;

    // Get the mouse state
    const mouseState = getMouseState();

    // Get value object by mouse state
    const transformNameByMouseState =
      mouseState === "hover" ? "transformHover" : "transform";

    const transformOriginByMouseState =
      mouseState === "hover" ? transformOriginHover : transformOrigin;
    const transformOriginNameByMouseState =
      mouseState === "hover" ? "transformOriginHover" : "transformOrigin";

    const { shouldDisplayBlockControls, blocks, updateBlockAttributes } =
      useBlockFeature(props, true);

    // Get current breakpoint
    const breakpoint = getBreakpointType();

    // Get all breakpoints
    const allBreakpoints = getAllBreakpoints();

    // Get transform value
    const transformByMouseState = getResponsiveSettingGroupFieldValue({
      fieldName: transformNameByMouseState,
      groupName: "withTransform",
      attributes,
      breakpoint,
    });

    const onFeatureChange = (fieldName) => (newValue) => {
      handleChangeSettingGroupField({
        fieldName,
        groupName: "withTransform",
        setAttributes,
        attributes,
        blocks,
        updateBlockAttributes,
      })(newValue);
    };

    const onResponsiveFeatureChange = (fieldName) => (newValue) => {
      handleChangeResponsiveSettingGroupField({
        fieldName,
        groupName: "withTransform",
        setAttributes,
        attributes,
        blocks,
        updateBlockAttributes,
        breakpoint,
        allBreakpoints,
      })(newValue);
    };

    return (
      <>
        <BlockEdit {...props} />
        {shouldDisplayBlockControls && (
          <>
            <Fill name="block-enhancements">
              <ToolsPanelItemStyled
                label={__("With Transform", "block-enhancements")}
                panelId="block-enhancements"
                hasValue={() => !isEmpty(transform) || !isEmpty(transformHover)}
                onDeselect={() =>
                  handleChangeSettingField({
                    fieldName: "withTransform",
                    setAttributes,
                    attributes,
                    blocks,
                    updateBlockAttributes,
                  })({})
                }
              >
                <VStack spacing={3}>
                  <LabelControl
                    label={__("Transform", "block-enhancements")}
                    isResponsive={true}
                    OtherControls={<MouseStateToolbar />}
                  />
                  <TransformControl
                    values={transformByMouseState}
                    onChange={onResponsiveFeatureChange(
                      transformNameByMouseState,
                    )}
                    showResponsiveLabel={false}
                  />
                  {isArray(transformByMouseState) &&
                    transformByMouseState?.length > 0 && (
                      <>
                        <hr />
                        <FocalPointPicker
                          label={__("Transform origin", "block-enhancements")}
                          value={transformOriginByMouseState}
                          onChange={onFeatureChange(
                            transformOriginNameByMouseState,
                          )}
                        />
                      </>
                    )}
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
    boldblocks: { withTransform: { transform, transformHover } = {} } = {},
  } = attributes;

  if (isValidSettingObject(transform) || isValidSettingObject(transformHover)) {
    props.className = clsx(props.className, "with-transform");
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
