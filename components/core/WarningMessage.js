import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_BOX = css`
  background-color: ${Constants.system.white};
  border-radius: 4px;
  padding: 36px;
  margin-top: 36px;
`;

const STYLES_MESSAGE = css`
  line-height: 1.5;
  font-size: ${Constants.typescale.lvl0};
  color: ${Constants.system.textGray};
`;

export class WarningMessage extends React.Component {
  render() {
    return (
      <div css={STYLES_BOX} style={this.props.boxStyle}>
        <div css={STYLES_MESSAGE}>
          Please don't upload sensitive information to Slate yet. All uploaded data can currently be
          accessed by anyone with the link. Private storage is coming soon.
        </div>
      </div>
    );
  }
}

export class SidebarWarningMessage extends React.Component {
  render() {
    return <WarningMessage boxStyle={{ padding: 16 }} />;
  }
}
