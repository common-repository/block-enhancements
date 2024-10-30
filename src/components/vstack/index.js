/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __experimentalVStack as VStack } from "@wordpress/components";

const VStackStyled = styled(VStack)`
  > * {
    margin-bottom: 0 !important;
  }

  > .label-control,
  > hr {
    margin: 0 !important;
  }

  .components-tools-panel-item {
    margin-top: 0 !important;
  }
`;
export default VStackStyled;
