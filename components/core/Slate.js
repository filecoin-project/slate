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
  cursor: pointer;
`;

const STYLES_PDF = css`
  height: 100%;
  width: 100%;
  border: 1px solid ${Constants.system.border};
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

class Item extends React.Component {
  render() {
    if (this.props.type && this.props.type.startsWith("video/")) {
      return (
        <span css={STYLES_ITEM}>
          <div css={STYLES_PDF} onClick={this.props.onClick}>
            Video
          </div>
        </span>
      );
    }

    if (this.props.type && this.props.type.startsWith("audio/")) {
      return (
        <span css={STYLES_ITEM}>
          <div css={STYLES_PDF} onClick={this.props.onClick}>
            Audio
          </div>
        </span>
      );
    }

    if (this.props.type && this.props.type.startsWith("application/pdf")) {
      return (
        <span css={STYLES_ITEM}>
          <div css={STYLES_PDF} onClick={this.props.onClick}>
            PDF
          </div>
        </span>
      );
    }

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
              type={each.type}
              onClick={() => this.props.onSelect(index)}
              url={each.url}
            />
          );
        })}
      </div>
    );
  }
}
