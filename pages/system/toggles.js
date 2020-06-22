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
      <SystemPage
        title="FCDS: Toggles"
        description="This is an early preview of the Filecoin Client Design System (FCDS)."
        url="https://fps.onrender.com/toggles">
        <System.H1>
          Toggles <ViewSourceLink file="toggles.js" />
        </System.H1>
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

        <System.Toggle active={this.state.three} name="three" onChange={this._handleChange} />
        <br />
        <br />
        <System.Toggle active={this.state.four} name="four" onChange={this._handleChange} />
      </SystemPage>
    );
  }
}
