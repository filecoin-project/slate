import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

const STYLES_EMPTY_STATE = css`
  width: 100%;
  height: 328px;
  border: 1px solid ${Constants.system.border};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 24px;
  border-radius: 4px;
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
