/**
 * External dependencies
 */
import clsx from "clsx";
import styled from "@emotion/styled";

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
import {
  FontSizePicker,
  LineHeightControl,
  __experimentalFontAppearanceControl as FontAppearanceControl,
  __experimentalLetterSpacingControl as LetterSpacingControl,
} from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import {
  blockHasSupportFeature,
  addAttributes,
  addEditProps,
  withCustomStyles,
  useBlockFeature,
  getBreakpointType,
  getAllBreakpoints,
  handleChangeResponsiveSettingGroupField,
  getResponsiveSettingGroupFieldValue,
  handleChangeSettingField,
  isValidSettingObject,
  getSelector,
  toType,
} from "../../utils";

import { buildCSSVariables } from "./style";

/**
 * Define feature name
 */
const featureName = "withTypography";

const TypographyStyled = styled(ToolsPanelItem)`
  display: grid;
  grid-template-columns: repeat(2, minmax(0px, 1fr));
  gap: 16px 8px;
  border-top: 1px solid #ddd;
  margin-top: -1px;
  padding: 16px 0;

  .full-width {
    grid-column: 1 / -1;
  }

  .single-column {
    grid-column: span 1;
  }
`;

const hasValidFeatureValue = (featureValue) => {
  if (toType(featureValue) !== "object") {
    return false;
  }

  return (
    featureValue?.sm?.value ||
    featureValue?.md?.value ||
    featureValue?.lg?.value
  );
};

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
    const { boldblocks: { withTypography = {} } = {} } = attributes;

    // Get current breakpoint
    const breakpoint = getBreakpointType();

    // Get all breakpoints
    const allBreakpoints = getAllBreakpoints();

    const { shouldDisplayBlockControls, blocks, updateBlockAttributes } =
      useBlockFeature(props, true);

    const getFeatureValue = (fieldName) =>
      getResponsiveSettingGroupFieldValue({
        fieldName,
        groupName: "withTypography",
        attributes,
        breakpoint,
      });

    const onFeatureChange = (fieldName) => (newValue) => {
      handleChangeResponsiveSettingGroupField({
        fieldName,
        groupName: "withTypography",
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
              <TypographyStyled
                label={__("With Typography", "block-enhancements")}
                panelId="block-enhancements"
                hasValue={() =>
                  hasValidFeatureValue(withTypography?.fontSize) ||
                  hasValidFeatureValue(withTypography?.lineHeight) ||
                  hasValidFeatureValue(withTypography?.fontWeight) ||
                  hasValidFeatureValue(withTypography?.letterSpacing)
                }
                onDeselect={() =>
                  handleChangeSettingField({
                    fieldName: "withTypography",
                    setAttributes,
                    attributes,
                    blocks,
                    updateBlockAttributes,
                  })({})
                }
              >
                <div className="full-width">
                  <FontSizePicker
                    value={getFeatureValue("fontSize")}
                    onChange={onFeatureChange("fontSize")}
                    withReset={false}
                    withSlider
                    __nextHasNoMarginBottom
                    size="__unstable-large"
                  />
                </div>
                <FontAppearanceControl
                  value={{
                    fontWeight: getFeatureValue("fontWeight"),
                  }}
                  onChange={({ fontWeight }) =>
                    onFeatureChange("fontWeight")(fontWeight)
                  }
                  hasFontStyles={false}
                  hasFontWeights={true}
                  size="__unstable-large"
                  __nextHasNoMarginBottom
                  className="single-column"
                />
                <LineHeightControl
                  value={getFeatureValue("lineHeight")}
                  onChange={onFeatureChange("lineHeight")}
                  size="__unstable-large"
                  __nextHasNoMarginBottom
                  __unstableInputWidth="auto"
                  className="single-column"
                />
                <LetterSpacingControl
                  value={getFeatureValue("letterSpacing")}
                  onChange={onFeatureChange("letterSpacing")}
                  size="__unstable-large"
                  __unstableInputWidth="auto"
                  className="single-column"
                />
              </TypographyStyled>
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
  const { boldblocks: { withTypography = {} } = {} } = attributes;

  if (isValidSettingObject(withTypography)) {
    props.className = clsx(props.className, {
      ["with-font-size"]: hasValidFeatureValue(withTypography?.fontSize),
      ["with-line-height"]: hasValidFeatureValue(withTypography?.lineHeight),
      ["with-font-weight"]: hasValidFeatureValue(withTypography?.fontWeight),
      ["with-letter-spacing"]: hasValidFeatureValue(
        withTypography?.letterSpacing,
      ),
    });
  }

  return props;
}

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
