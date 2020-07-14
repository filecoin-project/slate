import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";

const STYLES_BACKGROUND = css`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(45, 41, 38, 0.6);
  z-index: ${Constants.zindex.modal};
`;

const STYLES_MODAL = css`
  width: 50vw;
  height: 60vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  background-color: ${Constants.system.white};
`;

const STYLES_X = css`
  height: 24px;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
`;

export class GlobalModal extends React.Component {
  state = {
    modal: null,
  };

  componentDidMount = () => {
    window.addEventListener("create-modal", this._handleCreate);
    window.addEventListener("delete-modal", this._handleDelete);
  };

  componentWillUnmount = () => {
    window.removeEventListener("create-modal", this._handleCreate);
    window.removeEventListener("delete-modal", this._handleDelete);
  };

  _handleCreate = (e) => {
    this.setState({ modal: e.detail.modal });
  };

  _handleDelete = (e) => {
    this.setState({ modal: null });
  };

  render() {
    if (this.state.modal) {
      return (
        <div
          css={STYLES_BACKGROUND}
          style={this.props.backgroundStyle}
          onClick={this._handleDelete}
        >
          <div css={STYLES_MODAL} style={this.props.style}>
            {this.state.modal}
            <SVG.X css={STYLES_X} onClick={this._handleDelete} />
          </div>
        </div>
      );
    }
    return null;
  }
}
