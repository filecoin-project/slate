import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

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
  render() {
    return (
      <span css={STYLES_ITEM}>
        <img
          css={STYLES_IMAGE}
          src={this.props.url}
          onClick={this.props.onClick}
        />
      </span>
    );
  }
}

export default class Slate extends React.Component {
  render() {
    return (
      <div css={STYLES_SLATE}>
        {this.props.items.map((each, index) => {
          return (
            <Item
              key={each.id}
              onClick={() => this.props.onSelect(index)}
              url={each.url}
            />
          );
        })}
      </div>
    );
  }
}
