import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";

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

const STYLES_BOX = css`
  user-select: none;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: ${Constants.zindex.modal};
  background: ${Constants.system.pitchBlack};
  color: ${Constants.system.white};
  cursor: pointer;
  margin: auto;

  :hover {
    background-color: ${Constants.system.black};
  }
`;

const STYLES_BUTTON = css`
  font-family: ${Constants.font.code};
  font-size: 10px;
  text-transform: uppercase;
  user-select: none;
  height: 32px;
  padding: 0 16px 0 16px;
  border-radius: 32px;
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: ${Constants.zindex.modal};
  background: ${Constants.system.pitchBlack};
  transition: 200ms ease all;
  color: ${Constants.system.white};
  cursor: pointer;
  margin: auto;

  :hover {
    background-color: ${Constants.system.black};
  }
`;

export class GlobalCarousel extends React.Component {
  state = {
    slides: null,
    visible: false,
    index: 0,
    loading: false,
  };

  componentDidMount = () => {
    window.addEventListener("keydown", this._handleKeyDown);
    window.addEventListener("slate-global-create-carousel", this._handleCreate);
    window.addEventListener("slate-global-delete-carousel", this._handleDelete);
    window.addEventListener("slate-global-open-carousel", this._handleOpen);
    window.addEventListener("slate-global-close-carousel", this._handleClose);
    window.addEventListener("state-global-carousel-loading", this._handleSetLoading);
  };

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this._handleKeyDown);
    window.removeEventListener("slate-global-create-carousel", this._handleCreate);
    window.removeEventListener("slate-global-delete-carousel", this._handleDelete);
    window.removeEventListener("slate-global-open-carousel", this._handleOpen);
    window.removeEventListener("slate-global-close-carousel", this._handleClose);
    window.removeEventListener("state-global-carousel-loading", this._handleSetLoading);
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

  _handleSetLoading = (e) => this.setState({ loading: e.detail.loading });

  _handleOpen = (e) => this.setState({ visible: true, index: e.detail.index || 0, loading: false });

  _handleClose = () => this.setState({ visible: false, index: 0, loading: false });

  _handleCreate = (e) => {
    this.setState({
      slides: e.detail.slides,
    });
  };

  _handleDelete = (e) => {
    this.setState({ slides: null, visible: false, index: 0 });
  };

  _handleNext = () => {
    const index = (this.state.index + 1) % this.state.slides.length;
    this.setState({ index, loading: false });
  };

  _handlePrevious = () => {
    const index = (this.state.index + this.state.slides.length - 1) % this.state.slides.length;
    this.setState({ index, loading: false });
  };

  render() {
    const isVisible = this.state.visible && this.state.slides;
    if (!isVisible) {
      return null;
    }

    const current = this.state.slides[this.state.index];
    if (!current) {
      return null;
    }

    return (
      <div css={STYLES_BACKGROUND} style={this.props.style}>
        {current.onDelete ? (
          <span css={STYLES_BUTTON} onClick={() => current.onDelete(current.id)} style={{ top: 56, right: 16 }}>
            {this.state.loading ? <LoaderSpinner style={{ height: 16, width: 16 }} /> : "Delete Object"}
          </span>
        ) : null}

        <span css={STYLES_BOX} onClick={this._handleClose} style={{ top: 8, right: 16 }}>
          <SVG.Dismiss height="20px" />
        </span>

        <span css={STYLES_BOX} onClick={this._handlePrevious} style={{ top: 0, left: 16, bottom: 0 }}>
          <SVG.ChevronLeft height="20px" />
        </span>

        <span css={STYLES_BOX} onClick={this._handleNext} style={{ top: 0, right: 16, bottom: 0 }}>
          <SVG.ChevronRight height="20px" />
        </span>

        {current.component}
      </div>
    );
  }
}
