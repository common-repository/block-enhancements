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
import { ToggleControl, Fill } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import {
  LabelControl,
  SVGInputControl,
  ToggleGroupControl,
  ToggleGroupCustomControl,
  BrowseIconsModal,
  ColorGradientDropdown,
  ToolsPanelItemStyled,
  VStack,
} from "../../components";
import {
  blockHasSupportFeature,
  addAttributes,
  addEditProps,
  withCustomStyles,
  getIconURI,
  getSettingGroupFieldValue,
  handleChangeSettingGroupField,
  useInlineSVG,
  buildIconLibraryStore,
  useIconLibraryData,
  getColorObject,
  useMultipleOriginColors,
  getSelector,
} from "../../utils";
import {
  hasWithIconSupport,
  maybeWrapText,
  maybeUnwrapText,
  keywords,
} from "./utils";
import { buildCSSVariables } from "./style";

const STORE_NAME = "block-enhancements/icon-library";
buildIconLibraryStore(STORE_NAME);

/**
 * Define feature name
 */
const featureName = "withIcon";

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

    const { attributes, setAttributes, name, isSelected } = props;
    const {
      boldblocks = {},
      boldblocks: { withIcon = {} } = {},
      boldblocks: { withIcon: { icon, iconURI, wrapText } = {} } = {},
    } = attributes;

    const { allColors } = useMultipleOriginColors();

    // State for open/close browse icons modal
    const [isOpenBrowseIconsModal, setIsOpenBrowseIconsModal] = useState(false);

    // Get, set raw icon
    const [rawIcon, setRawIcon] = useInlineSVG(icon, (icon) => {
      if ((icon || (!icon && withIcon?.icon)) && icon !== withIcon?.icon) {
        setAttributes({
          boldblocks: {
            ...boldblocks,
            withIcon: {
              ...withIcon,
              ...{
                icon,
                iconURI: getIconURI(icon),
              },
            },
          },
        });
      }
    });

    const icons = useIconLibraryData({
      isloadData: isOpenBrowseIconsModal,
      storeName: STORE_NAME,
      apiPath: "block-enhancements/v1/getIconLibrary",
    });

    const getWithIconFieldValue = (fieldName, defaultValue = undefined) =>
      getSettingGroupFieldValue({
        fieldName,
        groupName: "withIcon",
        attributes,
        defaultValue,
      });

    const handleChangeWithIconField = (fieldName) => (value) =>
      handleChangeSettingGroupField({
        fieldName,
        groupName: "withIcon",
        attributes,
        setAttributes,
      })(value);

    // Color
    const iconColor = getWithIconFieldValue("iconColor");

    const supportWrapText = hasWithIconSupport(name, "wrapText");

    // Wrap around text with a span tag
    useEffect(() => {
      // Check if there is an icon
      if (iconURI && supportWrapText) {
        if (wrapText) {
          maybeWrapText(name, attributes, setAttributes);
        } else {
          maybeUnwrapText(name, attributes, setAttributes);
        }
      }
    }, [supportWrapText, wrapText, iconURI]);

    return (
      <>
        <BrowseIconsModal
          title={__("Icon library", "block-enhancements")}
          isModalOpen={isOpenBrowseIconsModal}
          setIsModalOpen={setIsOpenBrowseIconsModal}
          icons={icons}
          onSubmit={setRawIcon}
          value={rawIcon}
          keywords={keywords}
        />
        <BlockEdit {...props} />
        {isSelected && (
          <>
            <Fill name="block-enhancements">
              <ToolsPanelItemStyled
                label={__("With Icon", "block-enhancements")}
                panelId="block-enhancements"
                hasValue={() => icon && iconURI}
                onDeselect={() =>
                  setAttributes({ boldblocks: { ...boldblocks, withIcon: {} } })
                }
              >
                <VStack spacing={3}>
                  <SVGInputControl
                    value={rawIcon}
                    onChange={setRawIcon}
                    toggleLibraryModal={setIsOpenBrowseIconsModal}
                    label={__("Input icon", "block-enhancements")}
                    uploadLabel={__("Upload SVG icon", "block-enhancements")}
                    inputLabel={__(
                      "Or input SVG icon markup",
                      "block-enhancements",
                    )}
                    rows={6}
                    placeholder={__("Input SVG markup…", "block-enhancements")}
                  />
                  {icon && iconURI && (
                    <>
                      <div>
                        <LabelControl
                          label={__("Icon color", "block-enhancements")}
                          isResponsive={false}
                          isBold={true}
                        />
                        <ColorGradientDropdown
                          enableAlpha={true}
                          settings={[
                            {
                              label: __("Fill color", "block-enhancements"),
                              onColorChange: (value) => {
                                handleChangeWithIconField("iconColor")(
                                  getColorObject(value, allColors),
                                );
                              },
                              colorValue: getColorObject(iconColor, allColors)
                                ?.value,
                            },
                          ]}
                        />
                      </div>
                      <ToggleGroupCustomControl
                        name="iconWidth"
                        label={__(
                          "Icon size(width,height)",
                          "block-enhancements",
                        )}
                        options={[
                          { value: "1em", label: "1em" },
                          { value: "1.5em", label: "1.5em" },
                          { value: "2em", label: "2em" },
                          { value: "3em", label: "3em" },
                          {
                            value: "custom",
                            label: __("Custom", "block-enhancements"),
                          },
                        ]}
                        value={getWithIconFieldValue("iconWidth", {
                          iconWidth: "1em",
                          value: "1em",
                        })}
                        onChange={handleChangeWithIconField("iconWidth")}
                        isResponsive={false}
                      />
                      <ToggleGroupCustomControl
                        name="iconTextSpacing"
                        label={__(
                          "Space between icon & text",
                          "block-enhancements",
                        )}
                        options={[
                          { value: ".25em", label: ".25em" },
                          { value: ".5em", label: ".5em" },
                          { value: "1em", label: "1em" },
                          { value: "1.5em", label: "1.5em" },
                          {
                            value: "custom",
                            label: __("Custom", "block-enhancements"),
                          },
                        ]}
                        value={getWithIconFieldValue("iconTextSpacing", {
                          iconTextSpacing: ".5em",
                          value: ".5em",
                        })}
                        onChange={handleChangeWithIconField("iconTextSpacing")}
                        isResponsive={false}
                      />
                      {hasWithIconSupport(name, "iconMarginTop") && (
                        <ToggleGroupCustomControl
                          name="iconMarginTop"
                          label={__("Margin top", "block-enhancements")}
                          options={[
                            { value: ".25em", label: ".25em" },
                            { value: ".5em", label: ".5em" },
                            {
                              value: "custom",
                              label: __("Custom", "block-enhancements"),
                            },
                          ]}
                          value={getWithIconFieldValue("iconMarginTop")}
                          onChange={handleChangeWithIconField("iconMarginTop")}
                          isResponsive={false}
                        />
                      )}
                      {hasWithIconSupport(name, "iconPosition") && (
                        <ToggleGroupControl
                          label={__("Icon position", "block-enhancements")}
                          options={[
                            {
                              value: "left",
                              label: __("Left", "block-enhancements"),
                            },
                            {
                              value: "right",
                              label: __("Right", "block-enhancements"),
                            },
                          ]}
                          value={getWithIconFieldValue("iconPosition", "left")}
                          onChange={handleChangeWithIconField("iconPosition")}
                          isResponsive={false}
                        />
                      )}
                      {supportWrapText && (
                        <ToggleControl
                          label={__(
                            "Don't wrap text across lines.",
                            "block-enhancements",
                          )}
                          checked={wrapText}
                          onChange={handleChangeWithIconField("wrapText")}
                        />
                      )}
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

  // Add with-icon class
  const {
    boldblocks: {
      withIcon: {
        iconURI,
        iconMarginTop: { value: iconMarginTop } = {},
        textAlignment,
        wrapText,
        iconPosition,
      } = {},
    } = {},
  } = attributes;

  if (!iconURI) {
    return props;
  }

  props.className = clsx(props.className, {
    ["with-icon"]: iconURI,
    ["has-margin-top"]: iconMarginTop,
    ["has-text-align"]: textAlignment,
    ["has-text-nowrap"]:
      hasWithIconSupport(blockType.name, "wrapText") && wrapText,
    ["has-icon-right"]:
      blockType.name === "core/read-more" && iconPosition === "right",
  });

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

/**
 * Override the default block list element to add custom styles.
 *
 * @param  {Function} BlockListBlock Original component
 * @return {Function}                Wrapped component
 */
const withListItemInspectorControls = createHigherOrderComponent(
  (BlockListBlock) => {
    return (props) => {
      if (
        "core/list-item" !== props.name ||
        !blockHasSupportFeature("core/list", featureName)
      ) {
        return <BlockListBlock {...props} />;
      }

      const { hasInnerBlocks } = useSelect(
        (select) => {
          const { getBlocks } = select(blockEditorStore);
          return {
            hasInnerBlocks: !!getBlocks(props.clientId).length,
          };
        },
        [props.clientId],
      );

      return (
        <BlockListBlock
          {...props}
          className={clsx({ "has-children": hasInnerBlocks })}
        />
      );
    };
  },
  "withListItemInspectorControls",
);
addFilter(
  "editor.BlockListBlock",
  `boldblocks/${featureName}/withListItemInspectorControls`,
  withListItemInspectorControls,
);
