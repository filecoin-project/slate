import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as System from "~/components/system";

import { css } from "@emotion/core";
import { dispatchCustomEvent } from "~/common/custom-events";

export default class SidebarDeleteWalletAddress extends React.Component {
  _handleSubmit = () => {
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: { message: "Deleting wallet address...", status: "INFO" },
      },
    });
    this.props.onSubmit({});
  };

  _handleCancel = () => {
    this.props.onCancel();
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <System.P
          style={{
            fontFamily: Constants.font.semiBold,
            fontSize: Constants.typescale.lvl3,
          }}
        >
          Are you sure you want to delete the selected wallet?
        </System.P>

        <System.ButtonPrimary full style={{ marginTop: 48 }} onClick={this._handleSubmit}>
          Delete
        </System.ButtonPrimary>

        <System.ButtonSecondary full style={{ marginTop: 16 }} onClick={this._handleCancel}>
          Cancel
        </System.ButtonSecondary>
      </div>
    );
  }
}
