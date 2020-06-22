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
        <System.P>An example of a toggle component.</System.P>
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
