import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';

export default class SystemPageCheckboxes extends React.Component {
  state = {
    six: false,
    seven: true,
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <SystemPage title="FCDS: Checkboxes" description="Lorem Ipsum" url="https://fps.onrender.com/system/checkboxes">
        <System.H1>Checkboxes</System.H1>
        <br />
        <br />
        <System.P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </System.P>
        <br />
        <br />
        <System.CheckBox name="six" value={this.state.six} onChange={this._handleChange}>
          <strong>I want to attend IPFS Pinning Summit</strong>
          <br />
          The IPFS Pinning Summit is a 2-day virtual conference designed for the infrastructure and service providers of
          the distributed web.
        </System.CheckBox>
        <br />
        <br />

        <System.CheckBox name="seven" value={this.state.seven} onChange={this._handleChange}>
          <strong>Return Cake</strong>
          <br />I want Cake to become a different object.
        </System.CheckBox>
      </SystemPage>
    );
  }
}
