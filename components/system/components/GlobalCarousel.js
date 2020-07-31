import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";

const STYLES_BACKGROUND = css`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  background-color: ${Constants.system.pitchBlack};
  color: ${Constants.system.white};
  z-index: ${Constants.zindex.modal};
`;

const STYLES_CLOSE_ICON = css`
  height: 24px;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;

const STYLES_PREVIOUS_ICON = css`
  height: 24px;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const STYLES_NEXT_ICON = css`
  height: 24px;
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  cursor: pointer;
`;

export class GlobalCarousel extends React.Component {
  state = {
    slides: null,
    visible: false,
    index: 0,
  };

  componentDidMount = () => {
    window.addEventListener("keydown", this._handleKeyDown);
    window.addEventListener("slate-global-create-carousel", this._handleCreate);
    window.addEventListener("slate-global-delete-carousel", this._handleDelete);
    window.addEventListener("slate-global-open-carousel", this._handleOpen);
    window.addEventListener("slate-global-close-carousel", this._handleClose);
  };

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this._handleKeyDown);
    window.removeEventListener(
      "slate-global-create-carousel",
      this._handleCreate
    );
    window.removeEventListener(
      "slate-global-delete-carousel",
      this._handleDelete
    );
    window.removeEventListener("slate-global-open-carousel", this._handleOpen);
    window.removeEventListener(
      "slate-global-close-carousel",
      this._handleClose
    );
  };

  _handleKeyDown = (e) => {
    switch (e.key) {
      case "Escape":
        this._handleClose();
        break;
      case "Right":
      case "ArrowRight":
        this._handleNext();
        break;
      case "Left":
      case "ArrowLeft":
        this._handlePrevious();
        break;
    }
  };

  _handleOpen = (e) =>
    this.setState({ visible: true, index: e.detail.index || 0 });

  _handleClose = () => this.setState({ visible: false, index: 0 });

  _handleCreate = (e) => {
    this.setState({
      slides: e.detail.slides,
    });
  };

  _handleDelete = (e) => {
    this.setState({ slides: null });
  };

  _handleNext = () => {
    const index = (this.state.index + 1) % this.state.slides.length;
    this.setState({ index });
  };

  _handlePrevious = () => {
    const index =
      (this.state.index + this.state.slides.length - 1) %
      this.state.slides.length;
    this.setState({ index });
  };

  render() {
    const isVisible = this.state.visible && this.state.slides;
    if (!isVisible) {
      return null;
    }

    return (
      <div css={STYLES_BACKGROUND} style={this.props.style}>
        <SVG.Dismiss css={STYLES_CLOSE_ICON} onClick={this._handleClose} />

        <SVG.ChevronLeft
          css={STYLES_PREVIOUS_ICON}
          onClick={this._handlePrevious}
        />

        <SVG.ChevronRight css={STYLES_NEXT_ICON} onClick={this._handleNext} />

        {this.state.slides[this.state.index]}
      </div>
    );
  }
}
