import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_SLATE = css`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const STYLES_ITEM = css`
  width: 288px;
  height: 288px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: 200ms ease all;
`;

const STYLES_IMAGE = css`
  display: block;
  max-width: 100%;
  max-height: 100%;
`;

class Item extends React.Component {
  state = {
    expanded: false,
  };

  _handleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    return (
      <span css={STYLES_ITEM}>
        <img
          css={STYLES_IMAGE}
          src={this.props.url}
          onClick={this._handleExpand}
        />
      </span>
    );
  }
}

export default class Slate extends React.Component {
  render() {
    return (
      <div css={STYLES_SLATE}>
        {this.props.items.map((each) => {
          return <Item key={each.id} url={each.url} />;
        })}
      </div>
    );
  }
}
