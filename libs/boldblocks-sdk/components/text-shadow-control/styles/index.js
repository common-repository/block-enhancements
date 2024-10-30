/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { GroupControl } from "../../group-control";

export const TextShadowControlStyled = styled(GroupControl)`
  > .group-control__body {
    align-items: flex-end;
  }

  .block-editor-panel-color-gradient-settings__item {
    padding: 4px !important;
  }

  .block-editor-panel-color-gradient-settings__dropdown > .components-flex {
    gap: 0;
  }

  .component-color-indicator {
    width: 14px;
    height: 14px;

    &,
    + * {
      margin-left: 2px;
    }
  }
`;
