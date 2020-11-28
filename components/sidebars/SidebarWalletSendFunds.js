import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Events from "~/common/custom-events";

import { css } from "@emotion/core";

const STYLES_FOCUS = css`
  font-size: ${Constants.typescale.lvl1};
  font-family: ${Constants.font.medium};
  overflow-wrap: break-word;
  width: 100%;

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }
`;

const STYLES_SUBTEXT = css`
  margin-top: 8px;
  font-size: 12px;
`;

const STYLES_ITEM = css`
  margin-top: 16px;
`;

export default class SidebarWalletSendFunds extends React.Component {
  state = {
    address: "",
    amount: "",
  };

  _handleSubmit = async () => {
    this.setState({ loading: true });
    let addresses = {};

    this.props.viewer.addresses.forEach((a) => {
      addresses[a.value] = a;
    });

    const currentAddress = addresses[this.props.selected.address];

    if (currentAddress.address === this.state.address) {
      Events.dispatchMessage({
        message:
          "You cannot send funds from an address to itself. Please enter a different address",
      });

      this.setState({ loading: false });
      return;
    }

    await Actions.sendFilecoin({
      source: currentAddress.address,
      target: this.state.address,
      amount: this.state.amount,
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
      <React.Fragment>
        <System.P
          style={{
            fontFamily: Constants.font.semiBold,
            fontSize: Constants.typescale.lvl3,
          }}
        >
          Send Filecoin
        </System.P>

        <System.SelectMenu
          full
          containerStyle={{ marginTop: 24 }}
          name="address"
          label="From"
          value={this.props.selected.address}
          category="address"
          onChange={this.props.onSelectedChange}
          options={this.props.viewer.addresses}
        />

        <System.Input
          containerStyle={{ marginTop: 24 }}
          label="To"
          name="address"
          value={this.state.address}
          onChange={this._handleChange}
        />

        <System.Input
          containerStyle={{ marginTop: 24 }}
          label="Amount (Filecoin)"
          name="amount"
          type="number"
          value={this.state.amount}
          onChange={this._handleChange}
        />

        <div css={STYLES_ITEM}>
          <div css={STYLES_FOCUS}>0 FIL</div>
          <div css={STYLES_SUBTEXT}>Transaction Fee</div>
        </div>

        <div css={STYLES_ITEM}>
          <div css={STYLES_FOCUS}>{Strings.formatNumber(this.state.amount)}</div>
          <div css={STYLES_SUBTEXT}>Total Filecoin</div>
        </div>

        <System.ButtonPrimary
          full
          style={{ marginTop: 48 }}
          onClick={this._handleSubmit}
          loading={this.state.loading}
        >
          Send
        </System.ButtonPrimary>

        <System.ButtonSecondary full style={{ marginTop: 16 }} onClick={this._handleCancel}>
          Cancel
        </System.ButtonSecondary>
      </React.Fragment>
    );
  }
}
