import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

const SELECT_MENU_OPTIONS = [
  { value: "1", name: "BLS" },
  { value: "2", name: "SECP256K1" },
];

const SELECT_MENU_SAVE_STRINGS = {
  1: "bls",
  2: "secp256k1",
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

    await Actions.updateViewer({
      type: "CREATE_FILECOIN_ADDRESS",
      address: {
        name: this.state.name,
        type: SELECT_MENU_SAVE_STRINGS[this.state.type],
        makeDefault: this.state.default,
      },
    });
    this.props.onCancel();

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
        <System.P
          style={{
            fontFamily: Constants.font.semiBold,
            fontSize: Constants.typescale.lvl3,
          }}
        >
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

        <System.ButtonSecondary full style={{ marginTop: 16 }} onClick={this._handleCancel}>
          Cancel
        </System.ButtonSecondary>
      </div>
    );
  }
}
