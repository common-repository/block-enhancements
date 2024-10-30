/**
 * External dependencies
 */
import clsx from "clsx";
import { nanoid } from "nanoid";

/**
 * WordPress dependencies
 */

/**
 *
 * @param {String} blockType
 * @param {String} featureName
 * @returns
 */
export const blockHasSupportFeature = (blockType, featureName) => {
  if (
    window.BlockEnhancementsFeatures &&
    window.BlockEnhancementsFeatures[featureName] &&
    window.BlockEnhancementsFeatures[featureName]["allowedBlocks"]
  ) {
    return window.BlockEnhancementsFeatures[featureName]["allowedBlocks"].find(
      ({ name }) => {
        const match = blockType.match(new RegExp(name));
        return match && match[0] === blockType;
      },
    );
  }

  return false;
};

/**
 * Filters registered block settings to extend the block edit wrapper
 * to apply the desired styles and className properly.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object}.Filtered block settings.
 */
export const addEditProps = (featureName, addSaveProps) => (settings) => {
  if (!blockHasSupportFeature(settings.name, featureName)) {
    return settings;
  }

  const existingGetEditWrapperProps = settings.getEditWrapperProps;
  settings.getEditWrapperProps = (attributes) => {
    let props = {};
    if (existingGetEditWrapperProps) {
      props = existingGetEditWrapperProps(attributes);
    }

    return addSaveProps(props, settings, attributes);
  };

  return settings;
};

/**
 * Override the default block list element to add custom styles.
 *
 * @param  {Function} BlockListBlock Original component
 * @return {Function}                Wrapped component
 */
export const withCustomStyles = ({
  featureName,
  getSelector,
  buildCSSVariables,
  createHigherOrderComponent,
}) =>
  createHigherOrderComponent((BlockListBlock) => (props) => {
    if (!blockHasSupportFeature(props.name, featureName)) {
      return <BlockListBlock {...props} />;
    }

    const blockClass = props.name.replace("/", "-");
    const selector = `${blockClass}-${nanoid(5)}`;

    const style = buildCSSVariables(
      props.attributes,
      getSelector(`.${selector}`, props.name, featureName),
      props.name,
    );

    return (
      <>
        <BlockListBlock
          {...props}
          className={clsx(props?.className, {
            [blockClass]: style,
            [selector]: style,
          })}
        />
        {style && <style>{style}</style>}
      </>
    );
  });
