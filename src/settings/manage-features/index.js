/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { FeatureAllowedBlocksWidget } from "./feature-allowed-blocks";
import { useFeatureData } from "../utils";
import { Section } from "../../components";

// Mange features section.
const SectionManageFeatures = () => {
  const { blocksByFeatures, isLoading, updateSettings } = useFeatureData();

  const widgetControls = Object.keys(blocksByFeatures).map((featureName) => {
    let title;
    switch (featureName) {
      case "withIcon":
        title = __("With Icon", "block-enhancements");
        break;

      case "withTextAlignment":
        title = __("With Responsive Text Alignment", "block-enhancements");
        break;

      case "withColor":
        title = __("With Color", "block-enhancements");
        break;

      case "withShadow":
        title = __("With Box Shadow", "block-enhancements");
        break;

      case "withTextShadow":
        title = __("With Text Shadow", "block-enhancements");
        break;

      case "withTransform":
        title = __("With Transform", "block-enhancements");
        break;

      case "withTransition":
        title = __("With Transition", "block-enhancements");
        break;

      case "withTypography":
        title = __("With Typography", "block-enhancements");
        break;

      default:
        break;
    }
    return (
      <FeatureAllowedBlocksWidget
        key={featureName}
        featureName={featureName}
        title={title}
        isLoading={isLoading}
        availableBlockTypes={
          blocksByFeatures[featureName]["availableBlocks"] ?? []
        }
        updateSettings={updateSettings}
        selectedBlocks={blocksByFeatures[featureName]["allowedBlocks"] ?? []}
      />
    );
  });

  return (
    <Section
      title={__("Manage allowed blocks for each feature", "block-enhancements")}
    >
      {widgetControls}
    </Section>
  );
};

export default SectionManageFeatures;
