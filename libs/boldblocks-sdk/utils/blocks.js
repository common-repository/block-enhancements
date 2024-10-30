/**
 * External dependencies
 */
import { isArray } from "lodash";

/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from "@wordpress/data";
import {
  useBlockEditContext,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { useMemo } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { useValueRef } from "./hooks";

/**
 * Should display Block controls | Inspector controls or not
 *
 * @returns {Boolean/Array}
 */
export function useDisplayBlockControls() {
  const { isSelected, clientId, name } = useBlockEditContext();

  return useSelect(
    (select) => {
      if (isSelected) {
        return true;
      }

      const {
        getBlockName,
        isFirstMultiSelectedBlock,
        getMultiSelectedBlockClientIds,
      } = select(blockEditorStore);

      if (isFirstMultiSelectedBlock(clientId)) {
        const clientIds = getMultiSelectedBlockClientIds();
        if (clientIds.every((id) => getBlockName(id) === name)) {
          return clientIds;
        }
      }

      return false;
    },
    [clientId, isSelected, name]
  );
}

/**
 * Add the default value for the feature
 *
 * @param {Object} defaultValue
 * @param {Function} hasSupportFeature
 * @param {Object} featureArgs
 * @returns
 */
export const addAttributes = (
  defaultValue = {},
  hasSupportFeature,
  featureArgs
) => (settings) => {
  if (hasSupportFeature(settings, featureArgs)) {
    if (!settings.attributes.boldblocks) {
      settings.attributes.boldblocks = { type: "object", default: {} };
    }

    if (!settings.attributes.boldblocks?.default) {
      settings.attributes.boldblocks.default = {};
    }

    Object.assign(settings.attributes.boldblocks.default, defaultValue);
  }

  return settings;
};

/**
 * Adjust props for the edit the same as save
 *
 * @param {Function} addSaveProps
 * @param {Function} hasSupportFeature
 * @param {Object} featureArgs
 * @returns {Object}
 */
export const addEditProps = (addSaveProps, hasSupportFeature, featureArgs) => (
  settings
) => {
  if (!hasSupportFeature(settings, featureArgs)) {
    return settings;
  }

  const existingGetEditWrapperProps = settings.getEditWrapperProps;
  settings.getEditWrapperProps = (attributes) => {
    let props = {};
    if (existingGetEditWrapperProps) {
      props = existingGetEditWrapperProps(attributes);
    }

    return addSaveProps(props, settings, { ...attributes, isBlockEdit: true });
  };

  return settings;
};

export const useBlockFeature = (props, isMultiple = false) => {
  const { getBlocksByClientId } = useSelect(
    (select) => select(blockEditorStore),
    []
  );

  const { updateBlockAttributes } = useDispatch(blockEditorStore);

  const selectedClientIds = isMultiple
    ? useDisplayBlockControls()
    : props?.isSelected;

  return useMemo(() => {
    const blocks = isArray(selectedClientIds)
      ? getBlocksByClientId(selectedClientIds)
      : false;

    return {
      shouldDisplayBlockControls: selectedClientIds,
      blocks,
      updateBlockAttributes,
    };
  }, [selectedClientIds]);
};

export const usePropsStyle = ({ value, getStyle }) => {
  const valueRef = useValueRef(value);

  return useMemo(getStyle(valueRef.current), [valueRef.current]);
};
