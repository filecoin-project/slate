import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";

const STYLES_BANNER = css`
  padding: 24px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid #ececec;
  margin-bottom: 32px;
`;

export default class TestnetBanner extends React.Component {
  render() {
    return (
      <div css={STYLES_BANNER} style={this.props.style}>
        <SVG.FilecoinLogo height="40px" style={{ marginRight: 24 }} /> You are
        on the Filecoin Testnet. Any storage deal you make may not remain on the
        network when the Mainnet launches.
      </div>
    );
  }
}
