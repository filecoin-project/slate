import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";

import { error } from "~/common/messages";
import { css } from "@emotion/react";

const STYLES_ALERT = css`
  box-sizing: border-box;
  z-index: ${Constants.zindex.alert};
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
`;

export class Alert extends React.Component {
  state = {
    message: null,
    status: null,
  };

  componentDidMount = () => {
    window.addEventListener("create-alert", this._handleCreate);
  };

  componentWillUnmount = () => {
    window.removeEventListener("create-alert", this._handleCreate);
  };

  _handleCreate = (e) => {
    if (e.detail.alert) {
      if (e.detail.alert.decorator && error[e.detail.alert.decorator]) {
        this.setState({
          message: error[e.detail.alert.decorator],
          status: e.detail.alert.status || null,
        });
      } else {
        this.setState({
          message:
            e.detail.alert.message ||
            "Whoops something went wrong! Please try again.",
          status: e.detail.alert.status || null,
        });
      }
      window.setTimeout(this._handleDelete, 5000);
    }
  };

  _handleDelete = (e) => {
    if (this.state.message) {
      this.setState({ message: null, status: null });
    }
  };

  render() {
    if (!this.state.message) {
      return null;
    }
    return (
      <div
        css={STYLES_ALERT}
        style={{
          backgroundColor:
            this.state.status === "INFO" ? Constants.system.brand : "auto",
          ...this.props.style,
        }}
      >
        {this.state.message}
      </div>
    );
  }
}
