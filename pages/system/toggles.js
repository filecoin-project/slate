import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

export default class SystemPageToggles extends React.Component {
  state = {
    three: true,
    four: false,
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <SystemPage title="SDS: Toggles" description="..." url="https://fps.onrender.com/toggles">
        <System.H1>
          Toggles <ViewSourceLink file="system/toggles.js" />
        </System.H1>
        <br />
        <br />
        <System.P>The Toggle component is used to switch between two states.</System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>
          Import React and the Toggle Component.
        </System.P>
        <br />
        <br />
        <System.CodeBlock>
{`import * as React from 'react';
import { Toggle } from 'slate-react-system';`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Define the Toggle boolean state and handle the state change the when a toggle is changed.</System.P>
        <br />
        <System.CodeBlock>
          {`state = {
  three: true,
  four: false,
};

_handleChange = (e) => {
  this.setState({ [e.target.name]: e.target.value });
};`}
        </System.CodeBlock>
        <br />
        <System.P>Declare the Toggle component.</System.P>
        <br />
        <System.CodeBlock>
          {`const ToggleOn = () => {
  return (
    <div>
      <Toggle
        active={this.state.three}
        name="three"
        onChange={this._handleChange}
      />
    </div>
  );
}

const ToggleOff = () => {
  return (
    <div>
      <Toggle
        active={this.state.four}
        name="four"
        onChange={this._handleChange}
      />
    </div>
  );
}`}
        </System.CodeBlock>

        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        <System.Toggle active={this.state.three} name="three" onChange={this._handleChange} />
        <br />
        <br />
        <System.Toggle active={this.state.four} name="four" onChange={this._handleChange} />
      </SystemPage>
    );
  }
}
