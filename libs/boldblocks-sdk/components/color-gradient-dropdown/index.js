/**
 * External dependencies
 */
import clsx from "clsx";
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import {
  __experimentalColorGradientControl as ColorGradientControl,
  __experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from "@wordpress/block-editor";
import {
  Dropdown,
  Button,
  ColorIndicator,
  Flex,
  FlexItem,
} from "@wordpress/components";

/**
 * Internal dependencies
 */

const ColorPanelsStyled = styled.div`
  > .block-editor-tools-panel-color-gradient-settings__item {
    margin: 0 !important;
    border-right: 1px solid #0000001a;
    border-bottom: 1px solid #0000001a;
    border-left: 1px solid #0000001a;

    &:first-of-type {
      border-top: 1px solid #0000001a;
    }
  }

  .block-editor-tools-panel-color-gradient-settings__dropdown {
    display: block;
  }

  &.is-inner-control {
    > * {
      margin: 0 !important;
      border: 0 !important;
    }

    .block-editor-tools-panel-color-gradient-settings__dropdown {
      display: flex;
      align-items: center;
      align-self: flex-end;
      height: 32px;
      border: 1px solid #757575;

      > button {
        height: 100%;
        padding: 4px;
      }
    }
  }
`;

const LabeledColorIndicator = ({ colorValue, label }) => (
  <Flex justify="flex-start">
    <ColorIndicator
      className="block-editor-panel-color-gradient-settings__color-indicator"
      colorValue={colorValue}
    />
    <FlexItem
      className="block-editor-panel-color-gradient-settings__color-name"
      title={label}
    >
      {label}
    </FlexItem>
  </Flex>
);

// Renders a color dropdown's toggle as an `Item` if it is within an `ItemGroup`
// or as a `Button` if it isn't e.g. the controls are being rendered in
// a `ToolsPanel`.
const renderToggle =
  (settings) =>
  ({ onToggle, isOpen }) => {
    const { colorValue, label } = settings;

    const toggleProps = {
      onClick: onToggle,
      className: clsx("block-editor-panel-color-gradient-settings__dropdown", {
        "is-open": isOpen,
      }),
      "aria-expanded": isOpen,
    };

    return (
      <Button {...toggleProps}>
        <LabeledColorIndicator colorValue={colorValue} label={label} />
      </Button>
    );
  };

// Renders a collection of color controls as dropdowns. Depending upon the
// context in which these dropdowns are being rendered, they may be wrapped
// in an `ItemGroup` with each dropdown's toggle as an `Item`, or alternatively,
// the may be individually wrapped in a `ToolsPanelItem` with the toggle as
// a regular `Button`.
//
// For more context see: https://github.com/WordPress/gutenberg/pull/40084
function ColorGradientSettingsDropdown({
  colors,
  disableCustomColors,
  disableCustomGradients,
  enableAlpha,
  gradients,
  settings,
  __experimentalHasMultipleOrigins,
  __experimentalIsRenderedInSidebar,
  className,
  ...props
}) {
  let popoverProps;
  if (__experimentalIsRenderedInSidebar) {
    popoverProps = {
      placement: "left-start",
      offset: 36,
      shift: true,
    };
  }

  return (
    <ColorPanelsStyled
      className={clsx(
        "components-grid components-tools-panel block-editor-panel-color-gradient-settings",
        className,
      )}
    >
      {settings.map((setting, index) => {
        const controlProps = {
          clearable: true,
          colorValue: setting.colorValue,
          colors,
          disableCustomColors,
          disableCustomGradients,
          enableAlpha,
          gradientValue: setting.gradientValue,
          gradients,
          label: setting.label,
          onColorChange: setting.onColorChange,
          onGradientChange: setting.onGradientChange,
          showTitle: false,
          __experimentalHasMultipleOrigins,
          __experimentalIsRenderedInSidebar,
          ...setting,
        };
        const toggleSettings = {
          colorValue: setting.gradientValue ?? setting.colorValue,
          label: setting.label,
        };

        return (
          setting && (
            <div
              key={index}
              className="components-tools-panel-item block-editor-tools-panel-color-gradient-settings__item"
            >
              <Dropdown
                popoverProps={popoverProps}
                className="block-editor-tools-panel-color-gradient-settings__dropdown"
                renderToggle={renderToggle(toggleSettings)}
                renderContent={() => (
                  <div className="block-editor-panel-color-gradient-settings__dropdown-content">
                    <ColorGradientControl {...controlProps} />
                  </div>
                )}
              />
            </div>
          )
        );
      })}
    </ColorPanelsStyled>
  );
}

export const ColorGradientDropdown = ({
  __experimentalHasMultipleOrigins = true,
  __experimentalIsRenderedInSidebar = true,
  enableAlpha,
  settings,
  ...otherProps
}) => {
  return (
    <ColorGradientSettingsDropdown
      {...useMultipleOriginColorsAndGradients()}
      __experimentalIsRenderedInSidebar={__experimentalIsRenderedInSidebar}
      __experimentalHasMultipleOrigins={__experimentalHasMultipleOrigins}
      enableAlpha={enableAlpha}
      settings={settings}
      {...otherProps}
    />
  );
};
