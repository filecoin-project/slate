import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

const STYLES_BOX = css`
  background-color: ${Constants.system.foreground};
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
          Please don't upload sensitive information to Slate yet. Private
          storage is coming soon.
        </div>
      </div>
    );
  }
}

export class SidebarWarningMessage extends React.Component {
  render() {
    return (
      <WarningMessage
        boxStyle={{ backgroundColor: Constants.system.white, padding: 16 }}
      />
    );
  }
}
