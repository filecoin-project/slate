import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Events from "~/common/custom-events";

import { css } from "@emotion/react";

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

export default class SidebarCreatePaymentChannel extends React.Component {
  state = { address: "", amount: "" };

  _handleSubmit = () => {
    Events.dispatchMessage({ message: "Creating payment channel...", status: "INFO" });
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
      <React.Fragment>
        <System.P
          style={{
            fontFamily: Constants.font.semiBold,
            fontSize: Constants.typescale.lvl3,
          }}
        >
          Create a payment channel
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
          value={this.state.amount}
          onChange={this._handleChange}
        />

        <div css={STYLES_ITEM}>
          <div css={STYLES_FOCUS}>2 FIL</div>
          <div css={STYLES_SUBTEXT}>Transaction Fee</div>
        </div>

        <div css={STYLES_ITEM}>
          <div css={STYLES_FOCUS}>2</div>
          <div css={STYLES_SUBTEXT}>Total Filecoin</div>
        </div>

        <System.ButtonPrimary full style={{ marginTop: 48 }} onClick={this._handleSubmit}>
          Send
        </System.ButtonPrimary>
      </React.Fragment>
    );
  }
}
