import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_ITEM = css`
  width: 288px;
  height: 288px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: 200ms ease all;
  transform: translateX(0px);
`;

const STYLES_IMAGE = css`
  display: block;
  max-width: 100%;
  max-height: 100%;
  cursor: pointer;
`;

const STYLES_ENTITY = css`
  height: 100%;
  width: 100%;
  border: 1px solid ${Constants.system.border};
  background-color: ${Constants.system.foreground};
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
`;

const STYLES_ROOT = css`
  display: flex;
`;

export default class SlateMediaObjectPreview extends React.Component {
  _handleDragStart = (e) => {
    if (!this.props.editing) {
      return;
    }

    e.stopPropagation();

    e.dataTransfer.setData(
      "slate-object-drag-data",
      JSON.stringify({
        ...this.props,
        dragging: true,
      })
    );

    this.props.onSetHiddenIndex({ index: this.props.index });
  };

  _handleDragOver = (e) => {
    if (!this.props.editing) {
      return;
    }

    e.preventDefault();
    this.props.onSetHoveringIndex({ index: this.props.index });
  };

  _handleDragEnd = (e) => {
    if (!this.props.editing) {
      return;
    }

    e.preventDefault();
    this.props.onSetHoveringIndex({ index: null });
    this.props.onSetHiddenIndex({ index: null });
  };

  _handleDrop = async (e) => {
    if (!this.props.editing) {
      return;
    }

    e.preventDefault();
    this.props.onSetHoveringIndex({ index: null });
    this.props.onSetHiddenIndex({ index: null });
    const data = e.dataTransfer.getData("slate-object-drag-data");
    if (!data) {
      return;
    }

    let parsed = JSON.parse(data);

    return await this.props.onMoveIndex(parsed, this.props);
  };

  render() {
    let element = (
      <div css={STYLES_ENTITY} onClick={this.props.onClick}>
        No Preview
      </div>
    );

    if (this.props.type && this.props.type.startsWith("video/")) {
      element = (
        <div css={STYLES_ENTITY} onClick={this.props.onClick}>
          Video
        </div>
      );
    }

    if (this.props.type && this.props.type.startsWith("audio/")) {
      element = (
        <div css={STYLES_ENTITY} onClick={this.props.onClick}>
          Audio
        </div>
      );
    }

    if (this.props.type && this.props.type.startsWith("application/epub")) {
      element = (
        <div css={STYLES_ENTITY} onClick={this.props.onClick}>
          EPub
        </div>
      );
    }

    if (this.props.type && this.props.type.startsWith("application/pdf")) {
      element = (
        <div css={STYLES_ENTITY} onClick={this.props.onClick}>
          PDF
        </div>
      );
    }

    if (this.props.type && this.props.type.startsWith("image/")) {
      element = (
        <img
          css={STYLES_IMAGE}
          src={this.props.url}
          onClick={this.props.onClick}
        />
      );
    }

    const translateDirection = this.props.lastIndex
      ? `translateX(-228px)`
      : `translateX(228px)`;

    return (
      <div
        css={STYLES_ROOT}
        onDragStart={this._handleDragStart}
        onDragOver={this._handleDragOver}
        onDragEnd={this._handleDragEnd}
        onDrop={this._handleDrop}
        style={{
          visibility:
            this.props.hiddenIndex === this.props.index ? "hidden" : null,
        }}
        draggable="true"
      >
        <span
          css={STYLES_ITEM}
          style={{
            transform: this.props.hovering ? translateDirection : null,
            zIndex: this.props.hovering ? `1` : null,
          }}
        >
          {element}
        </span>
      </div>
    );
  }
}
