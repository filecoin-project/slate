import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";

import { error } from "~/common/messages";

import { css } from "@emotion/react";

const STYLES_ALERT = css`
  box-sizing: border-box;
  z-index: ${Constants.zindex.modal};
  position: fixed;
  top: 56px;
  width: calc(100% - ${Constants.sizes.navigation}px);
  min-height: 48px;
  background-color: ${Constants.system.red};
  color: ${Constants.system.white};
  padding: 12px 48px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: calc(100% - 60px);
  }
`;

export class Alert extends React.Component {
  state = {
    alert: null,
  };

  componentDidMount = () => {
    window.addEventListener("create-alert", this._handleCreate);
    window.addEventListener("click", this._handleDelete);
  };

  componentWillUnmount = () => {
    window.removeEventListener("create-alert", this._handleCreate);
    window.removeEventListener("click", this._handleDelete);
  };

  _handleCreate = (e) => {
    this.setState({ alert: e.detail.alert });
  };

  _handleDelete = (e) => {
    if (this.state.alert) {
      this.setState({ alert: null });
    }
  };

  render() {
    if (!this.state.alert) {
      return null;
    }
    return (
      <div
        css={STYLES_ALERT}
        style={
          this.state.alert.status === "INFO"
            ? { backgroundColor: Constants.system.brand }
            : null
        }
      >
        {this.state.alert.message
          ? this.state.alert.message
          : this.state.alert.decorator
          ? error[this.state.alert.decorator] ||
            "Whoops something went wrong! Please try again."
          : "Whoops something went wrong! Please try again."}
      </div>
    );
  }
}

export class Confirm extends React.Component {
  state = {
    alert: null,
  };

  componentDidMount = () => {
    window.addEventListener("create-alert", this._handleCreate);
    window.addEventListener("click", this._handleDelete);
  };

  componentWillUnmount = () => {
    window.removeEventListener("create-alert", this._handleCreate);
    window.removeEventListener("click", this._handleDelete);
  };

  _handleCreate = (e) => {
    this.setState({ alert: e.detail.alert });
  };

  _handleDelete = (e) => {
    if (this.state.alert) {
      this.setState({ alert: null });
    }
  };

  render() {
    if (!this.state.alert) {
      return null;
    }
    return (
      <div
        css={STYLES_ALERT}
        style={
          this.state.alert.status === "INFO"
            ? { backgroundColor: Constants.system.brand }
            : null
        }
      >
        {this.state.alert.message
          ? this.state.alert.message
          : this.state.alert.decorator
          ? error[this.state.alert.decorator] ||
            "Whoops something went wrong! Please try again."
          : "Whoops something went wrong! Please try again."}
      </div>
    );
  }
}
