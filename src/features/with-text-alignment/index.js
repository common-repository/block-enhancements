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
import { BlockControls, AlignmentToolbar } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import {
  blockHasSupportFeature,
  addAttributes,
  addEditProps,
  withCustomStyles,
  getBreakpointType,
  getAllBreakpoints,
  handleChangeResponsiveSettingGroupField,
  getResponsiveSettingGroupFieldValue,
  isValidSettingObject,
  getSelector,
} from "../../utils";
import { buildCSSVariables } from "./style";

/**
 * Define feature name
 */
const featureName = "withTextAlignment";

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
 * Override the default edit UI to include new block controls for custom settings.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} BlockEdit Modified block edit component.
 */
const withBlockControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    if (!blockHasSupportFeature(props.name, featureName)) {
      return <BlockEdit {...props} />;
    }

    const { attributes, setAttributes, isSelected } = props;

    // Get current breakpoint
    const breakpoint = getBreakpointType();

    // Get all breakpoints
    const allBreakpoints = getAllBreakpoints();

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && (
          <BlockControls>
            <AlignmentToolbar
              label={__("Responsive Text Alignment", "block-enhancements")}
              value={getResponsiveSettingGroupFieldValue({
                fieldName: "textAlignment",
                groupName: "withTextAlignment",
                attributes,
                breakpoint,
              })}
              onChange={handleChangeResponsiveSettingGroupField({
                fieldName: "textAlignment",
                groupName: "withTextAlignment",
                setAttributes,
                attributes,
                breakpoint,
                allBreakpoints,
              })}
            />
          </BlockControls>
        )}
      </>
    );
  };
}, "withBlockControls");
addFilter(
  "editor.BlockEdit",
  `boldblocks/${featureName}/withBlockControls`,
  withBlockControls,
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

  // Add with-icon class
  const { boldblocks: { withTextAlignment: { textAlignment } = {} } = {} } =
    attributes;

  if (isValidSettingObject(textAlignment)) {
    props.className = clsx(props.className, "with-text-alignment");
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
