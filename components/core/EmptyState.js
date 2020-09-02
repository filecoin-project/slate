import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

const STYLES_EMPTY_STATE = css`
  max-width: 420px;
  text-align: center;
  padding: 24px;
  width: 100%;
  margin: 0 auto 0 auto;
`;

export default class EmptyState extends React.Component {
  render() {
    return (
      <article
        css={STYLES_EMPTY_STATE}
        onClick={this.props.onClick}
        style={this.props.style}
      >
        <System.P>{this.props.children}</System.P>
      </article>
    );
  }
}
