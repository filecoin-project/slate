import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

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
        <System.H1>
          Checkboxes <ViewSourceLink file="checkboxes.js" />
        </System.H1>
        <br />
        <br />
        <System.P>An example of checkbox components.</System.P>
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
