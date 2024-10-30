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
  BoxShadowGroupControl,
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
  getMouseState,
  getSelector,
  useShadow,
  CUSTOM_SHADOW_PRESETS,
} from "../../utils";
import { buildCSSVariables } from "./style";

/**
 * Define feature name
 */
const featureName = "withShadow";

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
        withShadow,
        withShadow: {
          shadows = [],
          shadowsHover = [],
          slug = "",
          slugHover = "",
        } = {},
      } = {},
    } = attributes;

    // Get the mouse state
    const mouseState = getMouseState();

    // Get value object by mouse state
    const shadowsByMouseState = mouseState === "hover" ? shadowsHover : shadows;
    const settingNameByMouseState =
      mouseState === "hover" ? "shadowsHover" : "shadows";

    const slugByMouseState = mouseState === "hover" ? slugHover : slug;
    const slugNameByMouseState = mouseState === "hover" ? "slugHover" : "slug";

    const { shouldDisplayBlockControls, blocks, updateBlockAttributes } =
      useBlockFeature(props, true);

    const [createOnChange, createOnChangeSlug] = useShadow(
      withShadow,
      handleChangeSettingField({
        fieldName: "withShadow",
        setAttributes,
        attributes,
        blocks,
        updateBlockAttributes,
      }),
    );

    return (
      <>
        <BlockEdit {...props} />
        {shouldDisplayBlockControls && (
          <>
            <Fill name="block-enhancements">
              <ToolsPanelItemStyled
                label={__("With Shadow", "block-enhancements")}
                panelId="block-enhancements"
                hasValue={() =>
                  slug ||
                  !!shadows?.length ||
                  slugHover ||
                  !!shadowsHover?.length
                }
                onDeselect={() =>
                  handleChangeSettingField({
                    fieldName: "withShadow",
                    setAttributes,
                    attributes,
                    blocks,
                    updateBlockAttributes,
                  })({})
                }
              >
                <BoxShadowGroupControl
                  label={__("Box shadow", "block-enhancements")}
                  labelProps={{ OtherControls: <MouseStateToolbar /> }}
                  values={shadowsByMouseState}
                  onChange={createOnChange(settingNameByMouseState)}
                  hasPresets={true}
                  customShadowPresets={CUSTOM_SHADOW_PRESETS}
                  slug={slugByMouseState}
                  onChangeSlug={createOnChangeSlug(slugNameByMouseState)}
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

  // Add with-shadow class
  const {
    boldblocks: { withShadow: { shadows = [], shadowsHover = [] } = {} } = {},
  } = attributes;

  if (shadows.length || shadowsHover.length) {
    props.className = clsx(props.className, "with-shadow");
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
