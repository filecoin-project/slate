import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";

import GlobalViewerCIDSidebar from "~/components/core/viewers/GlobalViewerCIDSidebar";

const STYLES_ROOT = css`
  background-color: ${Constants.system.white};
  color: ${Constants.system.pitchBlack};
  z-index: ${Constants.zindex.modal};
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @supports (
    (-webkit-backdrop-filter: blur(15px)) or (backdrop-filter: blur(15px))
  ) {
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    background-color: rgba(255, 255, 255, 0.5);
  }

  @keyframes global-data-fade-in {
    from {
      transform: translateX(8px);
      opacity: 0;
    }

    to {
      transform: translateX(0px);
      opacity: 1;
    }
  }

  animation: global-data-fade-in 400ms ease;
`;

const STYLES_BOX = css`
  background-color: rgba(248, 248, 248, 0.75);
  color: ${Constants.system.grayBlack};
  z-index: ${Constants.zindex.modal};
  user-select: none;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: auto;
  padding: 0;

  :hover {
    background-color: ${Constants.system.gray};
  }
`;

const STYLES_ROOT_CONTENT = css`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const STYLES_EXPANDER = css`
  color: ${Constants.system.darkGray};
  position: absolute;
  padding: 4px;
  top: 16px;
  right: 16px;
  cursor: pointer;

  :hover {
    color: ${Constants.system.black};
  }
`;

const STYLES_DISMISS_BOX = css`
  position: absolute;
  top: 16px;
  right: 16px;
  color: ${Constants.system.darkGray};
  cursor: pointer;

  :hover {
    color: ${Constants.system.black};
  }

  @media (min-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_MOBILE_ONLY = css`
  @media (min-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

export class GlobalViewerCID extends React.Component {
  state = {
    index: 0,
    slides: null,
    visible: false,
    loading: false,
    saving: false,
    showSidebar: true,
  };

  componentDidMount = () => {
    window.addEventListener("keydown", this._handleKeyDown);
    window.addEventListener("cid-viewer-create", this._handleCreate);
    window.addEventListener("cid-viewer-delete", this._handleDelete);
    window.addEventListener("cid-viewer-open", this._handleOpen);
    window.addEventListener("cid-viewer-close", this._handleClose);
    window.addEventListener("cid-viewer-loading", this._handleSetLoading);
  };

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this._handleKeyDown);
    window.removeEventListener("cid-viewer-create", this._handleCreate);
    window.removeEventListener("cid-viewer-delete", this._handleDelete);
    window.removeEventListener("cid-viewer-open", this._handleOpen);
    window.removeEventListener("cid-viewer-close", this._handleClose);
    window.removeEventListener("cid-viewer-loading", this._handleSetLoading);
  };

  _handleKeyDown = (e) => {
    const inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
      if (document.activeElement === inputs[i]) {
        return;
      }
    }

    const textareas = document.querySelectorAll("textarea");
    for (let i = 0; i < textareas.length; i++) {
      if (document.activeElement === textareas[i]) {
        return;
      }
    }

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

  _handleSetLoading = (e) => this.setState({ ...e.detail });

  _handleOpen = (e) => {
    this.setState({
      visible: true,
      index: e.detail.index || 0,
      loading: false,
      saving: false,
    });
  };

  _handleClose = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({ visible: false, index: 0, loading: false, saving: false });
  };

  _handleCreate = (e) => {
    const shouldPersist =
      this.state.visible && this.state.index < e.detail.slides.length;

    this.setState({
      slides: [...e.detail.slides],
      visible: shouldPersist ? true : false,
      index: shouldPersist ? this.state.index : 0,
    });
  };

  _handleDelete = (e) => {
    this.setState({ slides: null, visible: false, index: 0 });
  };

  _handleNext = () => {
    const index = (this.state.index + 1) % this.state.slides.length;
    this.setState({ index, loading: false, saving: false });
  };

  _handlePrevious = () => {
    const index =
      (this.state.index + this.state.slides.length - 1) %
      this.state.slides.length;
    this.setState({ index, loading: false, saving: false });
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
      <div css={STYLES_ROOT}>
        <div css={STYLES_ROOT_CONTENT} style={this.props.style}>
          <span
            css={STYLES_BOX}
            onClick={this._handlePrevious}
            style={{ top: 0, left: 16, bottom: 0 }}
          >
            <SVG.ChevronLeft height="20px" />
          </span>
          <span
            css={STYLES_BOX}
            onClick={this._handleNext}
            style={{ top: 0, right: 16, bottom: 0 }}
          >
            <SVG.ChevronRight height="20px" />
          </span>
          {current.component}
          <span css={STYLES_MOBILE_HIDDEN}>
            <div
              css={STYLES_EXPANDER}
              onClick={() =>
                this.setState({ showSidebar: !this.state.showSidebar })
              }
            >
              {this.state.showSidebar ? (
                <SVG.Maximize height="24px" />
              ) : (
                <SVG.Minimize height="24px" />
              )}
            </div>
          </span>
          <div css={STYLES_DISMISS_BOX} onClick={this._handleClose}>
            <SVG.Dismiss height="24px" />
          </div>
        </div>
        <span css={STYLES_MOBILE_HIDDEN}>
          <GlobalViewerCIDSidebar
            display={this.state.showSidebar ? "block" : "none"}
            onClose={this._handleClose}
            key={current.id}
            saving={this.state.saving}
            loading={this.state.loading}
            onRehydrate={this.props.onRehydrate}
            onAction={this.props.onAction}
            {...current}
          />
        </span>
      </div>
    );
  }
}
