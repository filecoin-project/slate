import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";
import * as System from "~/components/system";

import { css } from "@emotion/react";

export default class SidebarDeleteWalletAddress extends React.Component {
  _handleSubmit = () => {
    alert("TODO: Delete wallet address");
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
        <System.P style={{ fontFamily: Constants.font.semiBold }}>
          Are you sure you want to delete the selected wallet?
        </System.P>

        <System.ButtonPrimaryFull
          style={{ marginTop: 48 }}
          onClick={this._handleSubmit}
        >
          Delete
        </System.ButtonPrimaryFull>

        <System.ButtonSecondaryFull
          style={{ marginTop: 16 }}
          onClick={this._handleCancel}
        >
          Cancel
        </System.ButtonSecondaryFull>
      </div>
    );
  }
}
