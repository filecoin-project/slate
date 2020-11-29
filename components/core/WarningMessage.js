import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/core";

const STYLES_BOX = css`
  border: 1px solid rgba(102, 102, 102, 0.5);
  border-radius: 4px;
  padding: 36px;
  margin-top: 36px;
`;

const STYLES_MESSAGE = css`
  line-height: 1.5;
  color: ${Constants.system.grayBlack};
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
