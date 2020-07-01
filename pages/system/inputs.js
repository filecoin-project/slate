import * as React from 'react';
import * as System from '~/components/system';

import Group from '~/components/system/Group';
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
      <SystemPage title="SDS: Inputs" description="..." url="https://fps.onrender.com/system/inputs">
        <System.H1>
          Inputs <ViewSourceLink file="system/inputs.js" />
        </System.H1>
        <br />
        <br />
        <System.P>The Input component is used to get a users input in a text field or a textbox.</System.P>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Define the Input value states and handle the state change the when a change is made.</System.P>
        <br />
        <System.CodeBlock>
          {`state = {
  twelve: 'Replace me friend.',
  thirteen: '',
  fourteen: '',
  fifteen: 'aaaaa-bbbbb-ccccc-ddddd-eeee',
  sixteen: '',
  seventeen: 'Example text',
};

_handleChange = (e) => {
  this.setState({ [e.target.name]: e.target.value });
};`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Textarea</System.H2>
        <hr />
        <br />
        <System.P>Declare the Textarea component.</System.P>
        <br />
        <System.Textarea name="seventeen" value={this.state.seventeen} onChange={this._handleChange} />
        <br />
        <System.CodeBlock>
          {`<System.Textarea name="seventeen" value={this.state.seventeen} onChange={this._handleChange} />`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Input with label and description</System.H2>
        <hr />
        <br />
        <System.P>Declare the Input component with a label and description value.</System.P>
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
        <System.CodeBlock>
          {`<System.Input
  label="Location of your pastries"
  description="We need to know the location of your pastries to sell them to other people."
  tooltip="Hey friends."
  name="fourteen"
  value={this.state.fourteen}
  placeholder="Pastry Location"
  onChange={this._handleChange}
/>`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Input with max length</System.H2>
        <hr />
        <br />
        <System.P>Declare the Input component with the maximum number of characters allowed.</System.P>
        <br />
        <System.Input
          label="Max length is 14"
          max={14}
          name="sixteen"
          value={this.state.sixteen}
          onChange={this._handleChange}
        />
        <br />
        <System.CodeBlock>
          {`<System.Input
  label="Max length is 14"
  max={14}
  name="sixteen"
  value={this.state.sixteen}
  onChange={this._handleChange}
/>`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Input with copy and paste</System.H2>
        <hr />
        <br />
        <System.P>Declare the Input component with copyable.</System.P>
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
        <System.CodeBlock>
          {`<System.Input
  label="Copy and paste (read only)"
  readOnly
  name="fifteen"
  copyable
  value={this.state.fifteen}
  onChange={this._handleChange}
/>`}
        </System.CodeBlock>

        <br />
        <br />
        <br />
        <System.H2>Input with validation</System.H2>
        <hr />
        <br />
        <System.P>Declare the Input component with validation.</System.P>
        <br />
        <System.Input label="Success" placeholder="This is an uncontrolled input for success." validation="SUCCESS" />
        <br />
        <br />
        <System.Input label="Warning" placeholder="This is an uncontrolled input for warning." validation="WARNING" />
        <br />
        <br />
        <System.Input label="Error" placeholder="This is an uncontrolled input for error." validation="ERROR" />
        <br />
        <System.CodeBlock>
          {`<System.Input label="Success" placeholder="This is an uncontrolled input for success." validation="SUCCESS" />

<System.Input label="Warning" placeholder="This is an uncontrolled input for warning." validation="WARNING" />

<System.Input label="Error" placeholder="This is an uncontrolled input for error." validation="ERROR" />
`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Props</System.H2>
        <hr />
        <br />
        <Group title="Inputs">
          <System.Table
            data={{
              columns: [
                { key: 'a', name: 'Name', width: '128px' },
                { key: 'b', name: 'Type', width: '88px' },
                { key: 'c', name: 'Default', width: '88px' },
                { key: 'd', name: 'Description', width: '100%' },
              ],
              rows: [
                { id: 1, a: 'name', b: 'string', c: 'null', d: 'Radio Group name' },
                { id: 2, a: 'label', b: 'string', c: 'null', d: 'Label text' },
                { id: 3, a: 'max', b: 'number', c: 'null', d: 'Max number of input characters' },
                { id: 4, a: 'tooltip', b: 'string', c: 'null', d: 'Tooltip text' },
                {
                  id: 5,
                  a: 'validation',
                  b: 'string',
                  c: 'null',
                  d: 'Validation style. Use: SUCCESS, WARNING or ERROR',
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
