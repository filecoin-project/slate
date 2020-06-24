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
        <System.P>
          The Checkbox component is used in forms when a users needs to select one or more values from multiple options.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Define the boolean Checkbox states and handle the state change the when user checks or unchecks the CheckBox.</System.P>
        <br />
        <System.CodeBlock>
{`state = {
  six: false,
  seven: true,
};

_handleChange = (e) => {
  this.setState({ [e.target.name]: e.target.value });
}; `}
        </System.CodeBlock>
        <br />
        <br />
        <System.P>Declare the CheckBox component.</System.P>
        <br />

        <System.CodeBlock>
{`<System.CheckBox name="six" value={this.state.six} onChange={this._handleChange}>
  <strong>Unchecked</strong>
  <br />
  This CheckBox default is unchecked.
</System.CheckBox>

<System.CheckBox name="seven" value={this.state.seven} onChange={this._handleChange}>
  <strong>Checked</strong>
  <br />
  This CheckBox default is checked.
</System.CheckBox>`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        <System.CheckBox name="six" value={this.state.six} onChange={this._handleChange}>
          <strong>Unchecked</strong>
          <br />
          This CheckBox default is unchecked.
        </System.CheckBox>
        <br />
        <br />
        <System.CheckBox name="seven" value={this.state.seven} onChange={this._handleChange}>
          <strong>Checked</strong>
          <br />
          This CheckBox default is checked.
        </System.CheckBox>
      </SystemPage>
    );
  }
}
