import * as React from 'react';
import * as Strings from '~/common/strings';
import * as Constants from '~/common/constants';
import * as SVG from '~/components/system/svg';
import * as System from '~/components/system';

import { css } from '@emotion/react';

const SELECT_MENU_OPTIONS = [
  { value: '1', name: 'BLS' },
  { value: '2', name: 'SECP256K1' },
  { value: '3', name: 'MULTISIG' },
];

const SELECT_MENU_MAP = {
  '1': 'BLS',
  '2': 'SECP256K1',
  '3': 'MULTISIG',
};

export default class SidebarCreateWalletAddress extends React.Component {
  state = {
    name: '',
    type: '1',
  };

  _handleSubmit = () => {
    this.props.onSubmit({ name: this.state.name, type: 'CREATE_WALLET_ADDRESS' });
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
        <System.P style={{ fontFamily: 'inter-semi-bold' }}>Create a new address</System.P>

        <System.Input
          containerStyle={{ marginTop: 24 }}
          label="Address name"
          name="name"
          value={this.state.name}
          onChange={this._handleChange}
        />

        <System.SelectMenuFull
          containerStyle={{ marginTop: 24 }}
          name="type"
          label="Address type"
          value={this.state.type}
          category="type"
          onChange={this._handleChange}
          options={SELECT_MENU_OPTIONS}>
          {SELECT_MENU_MAP[this.state.type]}
        </System.SelectMenuFull>

        <System.ButtonPrimaryFull style={{ marginTop: 48 }} onClick={this._handleSubmit}>
          Create {this.state.name}
        </System.ButtonPrimaryFull>
      </div>
    );
  }
}
