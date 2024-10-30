/**
 * External dependencies
 */
import clsx from "clsx";
import { isEmpty } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { Fill } from "@wordpress/components";

/**
 * Internal dependencies
 */
import {
  LabelControl,
  ColorGradientDropdown,
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
  handleChangeSettingField,
  handleChangeSettingGroupField,
  getMouseState,
  getSelector,
  useMultipleOriginColors,
  useColorGradient,
  getColorObject,
} from "../../utils";
import { buildCSSVariables } from "./style";

/**
 * Define feature name
 */
const featureName = "withColor";

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
      boldblocks: { withColor: { colors = {}, colorsHover = {} } = {} } = {},
    } = attributes;

    // Get the mouse state
    const mouseState = getMouseState();

    // Get value object by mouse state
    const colorsByMouseState = mouseState === "hover" ? colorsHover : colors;
    const settingNameByMouseState =
      mouseState === "hover" ? "colorsHover" : "colors";

    const { shouldDisplayBlockControls, blocks, updateBlockAttributes } =
      useBlockFeature(props, true);

    // {
    //   colorValue,
    //   colorSlug,
    //   backgroundValue,
    //   backgroundSlug,
    //   backgroundGradientValue,
    //   backgroundGradientSlug
    // }

    const onFeatureChange = (fieldName) => (newValue) => {
      handleChangeSettingGroupField({
        fieldName,
        groupName: "withColor",
        setAttributes,
        attributes,
        blocks,
        updateBlockAttributes,
      })(newValue);
    };

    const { allColors } = useMultipleOriginColors();

    const onColorChange = (value) => {
      const colorObject = getColorObject(value, allColors);

      onFeatureChange(settingNameByMouseState)({
        ...colorsByMouseState,
        colorValue: colorObject?.value,
        colorSlug: colorObject?.slug,
      });
    };

    const [onBackgroundColorChange, onBackgroundGradientChange] =
      useColorGradient(
        {
          value: colorsByMouseState?.backgroundValue,
          slug: colorsByMouseState?.backgroundSlug,
          gradientValue: colorsByMouseState?.backgroundGradientValue,
          gradientSlug: colorsByMouseState?.backgroundGradientSlug,
        },
        (background) => {
          onFeatureChange(settingNameByMouseState)({
            ...colorsByMouseState,
            backgroundValue: background?.value,
            backgroundSlug: background?.slug,
            backgroundGradientValue: background?.gradientValue,
            backgroundGradientSlug: background?.gradientSlug,
          });
        },
      );

    return (
      <>
        <BlockEdit {...props} />
        {shouldDisplayBlockControls && (
          <>
            <Fill name="block-enhancements">
              <ToolsPanelItemStyled
                label={__("With Color", "block-enhancements")}
                panelId="block-enhancements"
                hasValue={() => !isEmpty(colors) || !isEmpty(colorsHover)}
                onDeselect={() =>
                  handleChangeSettingField({
                    fieldName: "withColor",
                    setAttributes,
                    attributes,
                    blocks,
                    updateBlockAttributes,
                  })({})
                }
              >
                <VStack spacing={3}>
                  <LabelControl
                    label={__("Color", "block-enhancements")}
                    isResponsive={false}
                    OtherControls={<MouseStateToolbar />}
                  />
                  <ColorGradientDropdown
                    enableAlpha={true}
                    settings={[
                      {
                        label: __("Text color", "block-enhancements"),
                        onColorChange: onColorChange,
                        colorValue: colorsByMouseState?.colorValue,
                      },
                      {
                        label: __("Background", "block-enhancements"),
                        onColorChange: onBackgroundColorChange,
                        colorValue: colorsByMouseState?.backgroundValue,
                        onGradientChange: onBackgroundGradientChange,
                        gradientValue:
                          colorsByMouseState?.backgroundGradientValue,
                      },
                    ]}
                  />
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

  // Add with-color class
  const {
    boldblocks: { withColor: { colors = {}, colorsHover = {} } = {} } = {},
  } = attributes;

  if (
    colors?.colorValue ||
    colorsHover?.colorValue ||
    colors?.backgroundValue ||
    colors?.backgroundGradientValue ||
    colorsHover?.backgroundValue ||
    colorsHover?.backgroundGradientValue
  ) {
    props.className = clsx(props.className, {
      ["with-text-color"]: colors?.colorValue || colorsHover?.colorValue,
      ["with-background-color"]:
        colors?.backgroundValue ||
        colors?.backgroundGradientValue ||
        colorsHover?.backgroundValue ||
        colorsHover?.backgroundGradientValue,
    });
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
