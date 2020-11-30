import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";

const STYLES_BANNER = css`
  padding: 12px 24px 12px 12px;
  font-size: 12px;
  border-radius: 8px;
  align-items: center;
  justify-content: flex-start;
  background: #ececec;
  color: ${Constants.system.black};
  margin-bottom: 48px;
  margin-top: 4px;
  display: inline-flex;
`;

export default class TestnetBanner extends React.Component {
  render() {
    return (
      <div css={STYLES_BANNER} style={this.props.style}>
        <SVG.FilecoinLogo height="24px" style={{ marginRight: 16 }} /> You are on the Filecoin
        Testnet.{" "}
        {this.props.balance
          ? `You have ${this.props.balance} to use for
        testing.`
          : null}
      </div>
    );
  }
}
