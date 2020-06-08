import * as React from 'react';
import * as Strings from '~/common/strings';
import * as Constants from '~/common/constants';
import * as System from '~/components/system';

import { css } from '@emotion/react';

const STYLES_FOCUS = css`
  font-size: ${Constants.typescale.lvl1};
  font-family: 'inter-medium';
  overflow-wrap: break-word;
  width: 100%;

  strong {
    font-family: 'inter-semi-bold';
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
    address: '',
    amount: '',
  };

  _handleSubmit = () => {
    let addresses = {};

    this.props.viewer.addresses.forEach((a) => {
      addresses[a.value] = a;
    });

    const currentAddress = addresses[this.props.selected.address];

    if (currentAddress.address === this.state.address) {
      alert('TODO: Proper message for not allowing poeple to send funds to the same address.');
      return;
    }

    this.props.onSubmit({
      type: 'SEND_WALLET_ADDRESS_FILECOIN',
      source: currentAddress.address,
      target: this.state.address,
      amount: this.state.amount,
    });
  };

  _handleCancel = () => {
    this.props.onCancel();
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let addresses = {};

    this.props.viewer.addresses.forEach((a) => {
      addresses[a.value] = a;
    });

    const currentAddress = addresses[this.props.selected.address];

    return (
      <React.Fragment>
        <System.P style={{ fontFamily: 'inter-semi-bold' }}>Send Filecoin</System.P>

        <System.SelectMenuFull
          containerStyle={{ marginTop: 24 }}
          name="address"
          label="From"
          value={this.props.selected.address}
          category="address"
          onChange={this.props.onSelectedChange}
          options={this.props.viewer.addresses}>
          {currentAddress.name}
        </System.SelectMenuFull>

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
          <div css={STYLES_FOCUS}>0 FIL</div>
          <div css={STYLES_SUBTEXT}>Transaction Fee</div>
        </div>

        <div css={STYLES_ITEM}>
          <div css={STYLES_FOCUS}>{Strings.formatNumber(this.state.amount)}</div>
          <div css={STYLES_SUBTEXT}>Total Filecoin</div>
        </div>

        <System.ButtonPrimaryFull style={{ marginTop: 48 }} onClick={this._handleSubmit}>
          Send
        </System.ButtonPrimaryFull>
      </React.Fragment>
    );
  }
}
