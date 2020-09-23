import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";

const STYLES_BANNER = css`
  padding: 12px 24px 12px 12px;
  font-size: 12px;
  font-family: ${Constants.font.semiBold};
  border-radius: 8px;
  align-items: center;
  justify-content: flex-start;
  background: #0047ff;
  color: ${Constants.system.white};
  margin-bottom: 32px;
  margin-top: 4px;
  display: inline-flex;
`;

export default class TestnetBanner extends React.Component {
  render() {
    return (
      <div css={STYLES_BANNER} style={this.props.style}>
        <SVG.FilecoinLogo height="24px" style={{ marginRight: 16 }} /> You are
        on the Filecoin Testnet.
      </div>
    );
  }
}
