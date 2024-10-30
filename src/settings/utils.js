/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { store as coreStore, useEntityProp } from "@wordpress/core-data";
import { useDispatch } from "@wordpress/data";
import { createContext, useMemo } from "@wordpress/element";
import { getBlockTypes } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { useApiFetch } from "../../libs/boldblocks-sdk/utils";

export const refineBlockTypes = (blockTypes) =>
  blockTypes.reduce((prev, current) => {
    // Ignore reusable block
    if (["core/block", "core/missing"].includes(current?.name)) {
      return prev;
    }

    const cat = current?.category ? current.category : "other";
    if (prev[cat] ?? false) {
      prev[cat].push(current);
    } else {
      prev[cat] = [current];
    }

    return prev;
  }, {});

const useAvailableBlocks = (featureName, blockTypesByFeature, blockTypes) => {
  const pattern = (blockTypesByFeature[featureName]?.availableBlocks ?? [])
    .map(({ name }) => name)
    .join("|");

  return useMemo(() => {
    if (!blockTypes?.length) {
      return [];
    }

    const regExpPattern = new RegExp(pattern);
    const availableBlockTypes = blockTypes.filter(({ name }) => {
      const match = name.match(regExpPattern);
      // Negative look ahead to exlude some blocks the match[0] will be empty.
      return match && (match[0] === name || !match[0]);
    });

    availableBlockTypes.sort(({ title: title1 }, { title: title2 }) => {
      if (title1 > title2) {
        return 1;
      } else if (title1 < title2) {
        return -1;
      }

      return 0;
    });

    return availableBlockTypes;
  }, [pattern, blockTypes]);
};

export const useGlobalData = () => {
  const { loading, error, data: { data } = {} } = useApiFetch(
    "blockenhancements/v1/getDocs"
  );

  return { loading, error, data };
};

export const useFeatureData = () => {
  const blockTypesByFeature = window?.BlockEnhancementsFeatures ?? {};
  const { saveEditedEntityRecord } = useDispatch(coreStore);
  const [featureAllowedBlocks, setFeatureAllowedBlocks] = useEntityProp(
    "root",
    "site",
    "be_allowed_blocks"
  );
  let blockTypes = getBlockTypes();

  const blocksByFeatures = Object.keys(blockTypesByFeature).reduce(
    (prev, featureName) => {
      let feature = (featureAllowedBlocks ?? []).find(
        (item) => item?.featureName === featureName
      );

      return {
        ...prev,
        [featureName]: {
          allowedBlocks: feature
            ? feature?.allowedBlocks ?? []
            : blockTypesByFeature[featureName]?.allowedBlocks ?? [],
          availableBlocks: useAvailableBlocks(
            featureName,
            blockTypesByFeature,
            blockTypes
          ),
        },
      };
    },
    {}
  );

  return {
    blocksByFeatures,
    isLoading: !featureAllowedBlocks,
    updateSettings: (allowedBlocks, featureName) => {
      const newAllowedBlocks = featureAllowedBlocks.map((item) => {
        if (item?.featureName !== featureName) {
          return item;
        } else {
          return { ...item, allowedBlocks };
        }
      });
      // Update entity
      setFeatureAllowedBlocks(newAllowedBlocks);

      // Save to database
      return saveEditedEntityRecord("root", "site");
    },
  };
};

export const DataContext = createContext();
