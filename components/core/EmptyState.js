import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_EMPTY_STATE = css`
  width: 100%;
  height: 328px;
  border: 1px solid ${Constants.system.border};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 4px;
  text-align: center;
  margin-top: 48px;
`;

export default class EmptyState extends React.Component {
  render() {
    return (
      <div css={STYLES_EMPTY_STATE} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}
