import * as React from 'react';
import * as System from '~/components/system';
import Group from '~/components/system/Group';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

const RADIO_GROUP_OPTIONS = [
  {
    value: '1',
    label: (
      <React.Fragment>
        <strong>Option one</strong>
        <br />I want to have cake and soda for breakfast.
      </React.Fragment>
    ),
  },
  {
    value: '2',
    label: (
      <React.Fragment>
        <strong>Option two</strong>
        <br />I want to have cake and soda for lunch.
      </React.Fragment>
    ),
  },
  {
    value: '3',
    label: (
      <React.Fragment>
        <strong>Option three</strong>
        <br />I want to have cake and soda for dinner.
      </React.Fragment>
    ),
  }
];

export default class SystemPageRadios extends React.Component {
  state = {
    five: '2',
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <SystemPage
        title="FCDS: Radios"
        description="This is an early preview of the Filecoin Client Design System (FCDS)."
        url="https://fps.onrender.com/system/radios">
        <System.H1>
          Radios <ViewSourceLink file="radios.js" />
        </System.H1>
        <br />
        <br />
        <System.P>The Radio component is used when you require a user to select only one value in a series of options.</System.P>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Define the radio group values and labels.</System.P>
        <br />
        <System.CodeBlock>
{`const RADIO_GROUP_OPTIONS = [
  {
    value: '1',
    label: (
      <React.Fragment>
        <strong>Option one</strong>
        <br />I want to have cake and soda for breakfast.
      </React.Fragment>
    ),
  },
  {
    value: '2',
    label: (
      <React.Fragment>
        <strong>Option two</strong>
        <br />I want to have cake and soda for lunch.
      </React.Fragment>
    ),
  },
  {
    value: '3',
    label: (
      <React.Fragment>
        <strong>Option three</strong>
        <br />I want to have cake and soda for dinner.
      </React.Fragment>
    ),
  }
];`}
        </System.CodeBlock>
        <br />
        <System.P>Define the default selected option and handle the state changes when the users selects a different option.</System.P>
        <br />
        <System.CodeBlock>
{`state = {
  default: '2',
};

_handleChange = (e) => {
  this.setState({ [e.target.name]: e.target.value });
};`}
        </System.CodeBlock>
        <br />
        <System.P>Declare the RadioGroup component.</System.P>
        <br />
        <System.CodeBlock>
{`<System.RadioGroup
  name="five"
  options={RADIO_GROUP_OPTIONS}
  selected={this.state.default}
  onChange={this._handleChange}
/>`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        <System.RadioGroup
          name="five"
          options={RADIO_GROUP_OPTIONS}
          selected={this.state.five}
          onChange={this._handleChange}
        />
        <br />
        <br />
        <System.H2>Props</System.H2>
        <hr />
        <br />
        <Group title='RadioGroup'>
          <System.Table
            data={{
              columns: [
                { key: 'a', name: 'Name', width: '128px' },
                { key: 'b', name: 'Type', width: '88px' },
                { key: 'c', name: 'Default', width: '88px' },
                { key: 'd', name: 'Description', width: '100%' },

              ],
              rows: [
                { id: 2, a: 'options', b: 'array', c: 'null', d: 'Array of options' },
                { id: 3, a: 'selected', b: 'string', c: 'null', d: 'Default selected option based on the options array ID' },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
