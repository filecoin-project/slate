import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";
import { Boundary } from "~/components/system/components/fragments/Boundary";

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
  background-color: rgba(223, 223, 223, 0.3);
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
  -webkit-backdrop-filter: blur(7px);
  backdrop-filter: blur(7px);
  z-index: ${Constants.zindex.modal};
`;

const STYLES_MODAL = css`
  box-sizing: border-box;
  position: relative;
  max-width: 800px;
  width: 100%;
  border-radius: 4px;
  background-color: ${Constants.system.white};
`;

export class GlobalModal extends React.Component {
  state = {
    modal: null,
    noBoundary: false,
  };

  componentDidMount = () => {
    window.addEventListener("create-modal", this._handleCreate);
    window.addEventListener("delete-modal", this._handleDelete);
    window.addEventListener("keydown", this._handleDocumentKeydown);
    window.addEventListener("scroll", this._handleScroll);
  };

  componentWillUnmount = () => {
    window.removeEventListener("create-modal", this._handleCreate);
    window.removeEventListener("delete-modal", this._handleDelete);
    window.removeEventListener("keydown", this._handleDocumentKeydown);
    window.removeEventListener("scroll", this._handleScroll);
  };

  _handleScroll = (e) => {
    if (this.state.modal) {
      e.stopPropagation();
    }
  };

  _handleCreate = (e) => {
    this.setState({
      modal: e.detail.modal,
      noBoundary: e.detail.noBoundary,
    });
  };

  _handleDelete = (e) => {
    this.setState({ modal: null });
  };

  _handleDocumentKeydown = (e) => {
    if (this.state.modal && e.keyCode === 27) {
      this.setState({ modal: null });
      e.stopPropagation();
    }
  };

  _handleEnterPress = (e) => {
    if (e.key === "Enter") {
      this.setState({ modal: null });
    }
  };

  render() {
    if (!this.state.modal) return null;
    return (
      <div
        css={STYLES_BACKGROUND}
        style={this.props.backgroundStyle}
        role="dialog"
        aria-modal="true"
        aria-label={this.props.label ? this.props.label : "modal"}
      >
        <Boundary
          enabled={!this.state.noBoundary}
          onOutsideRectEvent={this._handleDelete}
          isDataMenuCaptured={true}
        >
          {this.state.modal}
        </Boundary>
      </div>
    );
  }
}
