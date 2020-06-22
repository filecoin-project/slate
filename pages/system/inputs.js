import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

export default class SystemPageInputs extends React.Component {
  state = {
    twelve: 'Replace me friend.',
    thirteen: '',
    fourteen: '',
    fifteen: 'aaaaa-bbbbb-ccccc-ddddd-eeee',
    sixteen: '',
    seventeen: `Example text`,
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <SystemPage title="FCDS: Inputs" description="Lorem Ipsum." url="https://fps.onrender.com/system/inputs">
        <System.H1>
          Inputs <ViewSourceLink file="inputs.js" />
        </System.H1>
        <br />
        <br />
        <System.P>An example of input components.</System.P>
        <br /> <br />
        <System.Textarea name="seventeen" value={this.state.seventeen} onChange={this._handleChange} />
        <br />
        <br />
        <System.Input name="twelve" value={this.state.twelve} onChange={this._handleChange} />
        <br />
        <br />
        <System.Input
          name="thireteen"
          value={this.state.thirteen}
          placeholder="Enter your favorite year"
          onChange={this._handleChange}
        />
        <br />
        <br />
        <System.Input
          label="Location of your pastries"
          description="We need to know the location of your pastries to sell them to other people."
          tooltip="Hey friends."
          name="fourteen"
          value={this.state.fourteen}
          placeholder="Pastry Location"
          onChange={this._handleChange}
        />
        <br />
        <br />
        <System.Input
          label="Max length is 14"
          max={14}
          name="sixteen"
          value={this.state.sixteen}
          onChange={this._handleChange}
        />
        <br />
        <br />
        <System.Input
          label="Copy and paste (read only)"
          readOnly
          name="fifteen"
          copyable
          value={this.state.fifteen}
          onChange={this._handleChange}
        />
        <br />
        <br />
        <System.Input label="Success" placeholder="This is an uncontrolled input for success." validation="SUCCESS" />
        <br />
        <br />
        <System.Input label="Warning" placeholder="This is an uncontrolled input for warning." validation="WARNING" />
        <br />
        <br />
        <System.Input label="Error" placeholder="This is an uncontrolled input for error." validation="ERROR" />
      </SystemPage>
    );
  }
}
