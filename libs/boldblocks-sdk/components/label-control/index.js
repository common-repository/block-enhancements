/**
 * External dependencies
 */
import clsx from "clsx";
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { BaseControl } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { PreviewToolbar } from "../preview-toolbar";

const BaseControlStyled = styled(BaseControl)`
  margin-bottom: 8px !important;

  &.is-bold {
    font-weight: 600;
  }

  &.h3 {
    font-size: 13px;
    font-weight: bold;
  }

  .components-base-control__field {
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }

  .components-base-control__label {
    margin-bottom: 0;
  }

  div.components-dropdown {
    min-height: 30px;
    margin-bottom: 0;
    border: 0;

    &:first-of-type {
      margin-left: 10px;
    }

    .components-button {
      min-width: 36px;
      height: 30px;

      &.has-icon {
        min-width: 48px;
      }
    }
  }
`;

export function LabelControl({
  label,
  isResponsive = true,
  className,
  isBold = false,
  OtherControls = null,
  ...otherProps
}) {
  return (
    <BaseControlStyled
      label={label}
      {...otherProps}
      className={clsx("label-control", className, {
        "is-bold": isBold,
      })}
    >
      {isResponsive && <PreviewToolbar />}
      {OtherControls}
    </BaseControlStyled>
  );
}
