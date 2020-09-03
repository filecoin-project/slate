import React, { Component } from "react";

import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";

const STYLES_IMAGE_ROW = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 170px;
  overflow: hidden;
  margin-right: -34px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    justify-content: center;
  }
`;

const STYLES_ITEM_BOX = css`
  width: 170px;
  height: 170px;
  margin-right: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0px 1px ${Constants.system.gray} inset;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 0 auto;
  }
`;

export function SlatePreviewRow(props) {
  let numItems = props.numItems || 5;
  let objects =
    props.slate.data.objects.length > numItems
      ? props.slate.data.objects.slice(0, numItems)
      : props.slate.data.objects;
  return (
    <div css={STYLES_IMAGE_ROW} style={props.containerStyle}>
      {objects.map((each) => (
        <div key={each.url} css={STYLES_ITEM_BOX} style={props.style}>
          <SlateMediaObjectPreview
            type={each.type}
            url={each.url}
            style={props.previewStyle}
            title={each.title || each.name}
            small={props.small}
          />
        </div>
      ))}
    </div>
  );
}

const STYLES_BLOCK = css`
  border: 1px solid ${Constants.system.border};
  border-radius: 20px;
  padding: 32px 40px;
  font-size: 12px;
  text-align: left;
  margin: 24px auto 48px auto;
  max-width: 1058px;
  cursor: pointer;
`;

const STYLES_TITLE_LINE = css`
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  font-size: ${Constants.typescale.lvl1};
  margin-bottom: 16px;
`;

const STYLES_BUTTON = css`
  display: inline-block;
  margin-left: 12px;
  padding: 4px 8px;
  cursor: pointer;
  color: ${Constants.system.brand};
`;

const STYLES_COPY_INPUT = css`
  pointer-events: none;
  position: absolute;
  tabindex: -1;
  opacity: 0;
`;

const STYLES_TAG = css`
  margin-left: 24px;
  padding: 4px 8px;
  border-radius: 2px;
  background-color: ${Constants.system.gray};
  color: ${Constants.system.white};
`;

export default class SlatePreviewBlock extends Component {
  _ref;

  state = {
    copyable: "",
  };

  _handleCopy = (e, value) => {
    console.log("copy");
    this.setState({ copyable: value }, () => {
      this._ref.select();
      document.execCommand("copy");
    });
    e.stopPropagation();
  };

  render() {
    return (
      <div css={STYLES_BLOCK}>
        <div css={STYLES_TITLE_LINE}>
          <strong style={{ fontSize: Constants.typescale.lvl2 }}>
            {this.props.slate.data.name}
          </strong>
          {this.props.editing ? (
            this.props.slate.data.public ? (
              <div
                css={STYLES_TAG}
                style={{ backgroundColor: Constants.system.brand }}
              >
                Public
              </div>
            ) : (
              <div css={STYLES_TAG}>Private</div>
            )
          ) : null}
          {this.props.editing ? (
            <div style={{ justifySelf: "end" }}>
              <div
                css={STYLES_BUTTON}
                onClick={(e) => this._handleCopy(e, this.props.slate.id)}
              >
                Copy ID
              </div>
            </div>
          ) : null}
        </div>
        <SlatePreviewRow
          {...this.props}
          previewStyle={this.props.previewStyle}
        />
        <input
          readOnly
          ref={(c) => {
            this._ref = c;
          }}
          value={this.state.copyable}
          css={STYLES_COPY_INPUT}
        />
      </div>
    );
  }
}
