/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { InspectorControls } from "@wordpress/block-editor";
import {
  Slot,
  __experimentalUseSlotFills as useSlotFills,
  __experimentalToolsPanel as ToolsPanel,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import { useBlockFeature } from "../../utils";

/**
 * Define feature name
 */

/**
 * Override the default edit UI to include new inspector controls for custom settings.
 *
 * @param {Function} BlockEdit Block edit component.
 * @return {Function} BlockEdit Modified block edit component.
 */
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    const fills = useSlotFills("block-enhancements");
    const { shouldDisplayBlockControls } = useBlockFeature(props, true);

    if (!fills || !fills?.length) {
      return <BlockEdit {...props} />;
    }

    const { setAttributes, attributes: { boldblocks = {} } = {} } = props;

    return (
      <>
        <BlockEdit {...props} />
        {shouldDisplayBlockControls && (
          <>
            <InspectorControls group="styles">
              <ToolsPanel
                label={__("Block Enhancements", "block-enhancements")}
                panelId="block-enhancements"
                resetAll={() => {
                  setAttributes({
                    boldblocks: {
                      ...boldblocks,
                      withIcon: {},
                      withColor: {},
                      withShadow: {},
                      withTextShadow: {},
                      withTransform: {},
                      withTransition: {},
                    },
                  });
                }}
              >
                <Slot name="block-enhancements" />
              </ToolsPanel>
            </InspectorControls>
          </>
        )}
      </>
    );
  };
}, "withInspectorControls");
addFilter(
  "editor.BlockEdit",
  `boldblocks/blockEnhancements/withInspectorControls`,
  withInspectorControls
);
