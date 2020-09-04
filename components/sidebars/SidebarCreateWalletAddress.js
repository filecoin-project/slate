import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as System from "~/components/system";

import { css } from "@emotion/react";

const SELECT_MENU_OPTIONS = [
  { value: "1", name: "BLS" },
  { value: "2", name: "SECP256K1" },
  // { value: '3', name: 'MULTISIG' },
];

const SELECT_MENU_MAP = {
  "1": "BLS",
  "2": "SECP256K1",
  // '3': 'MULTISIG',
};

const SELECT_MENU_SAVE_STRINGS = {
  "1": "bls",
  "2": "secp256k1",
};

export default class SidebarCreateWalletAddress extends React.Component {
  state = {
    name: "",
    type: "1",
    default: false,
    loading: false,
  };

  _handleSubmit = async () => {
    this.setState({ loading: true });

    const data = {
      name: this.state.name,
      wallet_type: SELECT_MENU_SAVE_STRINGS[this.state.type],
      makeDefault: this.state.default,
      type: "CREATE_WALLET_ADDRESS",
    };

    await this.props.onSubmit(data);

    this.setState({ loading: false });
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
          Create a new address
        </System.P>

        <System.Input
          containerStyle={{ marginTop: 24 }}
          label="Address name"
          name="name"
          value={this.state.name}
          onChange={this._handleChange}
        />

        <System.SelectMenu
          full
          containerStyle={{ marginTop: 24 }}
          name="type"
          label="Address type"
          value={this.state.type}
          category="type"
          onChange={this._handleChange}
          options={SELECT_MENU_OPTIONS}
        />

        <System.CheckBox
          style={{ marginTop: 24 }}
          name="default"
          value={this.state.default}
          onChange={this._handleChange}
        >
          Make this wallet the default
        </System.CheckBox>

        <System.ButtonPrimary
          full
          style={{ marginTop: 48 }}
          onClick={this._handleSubmit}
          loading={this.state.loading}
        >
          Create {this.state.name}
        </System.ButtonPrimary>

        <System.ButtonSecondary
          full
          style={{ marginTop: 16 }}
          onClick={this._handleCancel}
        >
          Cancel
        </System.ButtonSecondary>
      </div>
    );
  }
}
