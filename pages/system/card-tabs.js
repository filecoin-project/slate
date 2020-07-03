import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

const TAB_GROUP_TWO = [
  { value: '1', label: 'Capricorn' },
  { value: '2', label: 'Aquarius' },
];

const TAB_GROUP_FOUR = [
  { value: '1', label: 'Capricorn' },
  { value: '2', label: 'Aquarius' },
  { value: '3', label: 'Pisces' },
  { value: '4', label: 'Aries' },
];

export default class SystemPageCardTabs extends React.Component {
  state = {
    eighteen: '2',
    nineteen: null,
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <SystemPage title="SDS: Card Tabs" description="..." url="https://fps.onrender.com/system/card-tabs">
        <System.H1>
          Card Tabs <ViewSourceLink file="system/card-tabs.js" />
        </System.H1>
        <br />
        <br />
        <System.P>The CardTabGroup component is used to allow the users to switch between views.</System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>
          Import React and the ButtonPrimary, ButtonPrimaryFull and/or the ButtonDisabled Components.
        </System.P>
        <br />
        <br />
        <System.CodeBlock>
{`import * as React from 'react';
import { CardTabGroup } from 'slate-react-system';`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Define the tab group values and labels.</System.P>
        <br />
        <System.CodeBlock>
          {`const TAB_GROUP_TWO = [
  { value: '1', label: 'Capricorn' },
  { value: '2', label: 'Aquarius' },
];

const TAB_GROUP_FOUR = [
  { value: '1', label: 'Capricorn' },
  { value: '2', label: 'Aquarius' },
  { value: '3', label: 'Pisces' },
  { value: '4', label: 'Aries' },
];`}
        </System.CodeBlock>
        <br />
        <System.P>Define the CardTab value states and handle the state when a tab is changed.</System.P>
        <br />
        <System.CodeBlock>
          {`state = {
  eighteen: '2',
  nineteen: null,
};

_handleChange = (e) => {
  this.setState({ [e.target.name]: e.target.value });
};`}
        </System.CodeBlock>
        <br />
        <System.P>Declare the CardTabGroup component.</System.P>
        <br />
        <System.CodeBlock>
          {`
const CardTabGroupOne = () => {
   return (
      <div>
        <CardTabGroup
          name="eighteen"
          options={TAB_GROUP_TWO}
          value={this.state.eighteen}
          onChange={this._handleChange}
        />
      </div>
   );
}

const CardTabGroupTwo = () => {
   return (
      <div>
        <CardTabGroup
          name="nineteen"
          options={TAB_GROUP_FOUR}
          value={this.state.nineteen}
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
        <System.CardTabGroup
          name="eighteen"
          options={TAB_GROUP_TWO}
          value={this.state.eighteen}
          onChange={this._handleChange}
        />
        <br />
        <br />
        <System.CardTabGroup
          name="nineteen"
          options={TAB_GROUP_FOUR}
          value={this.state.nineteen}
          onChange={this._handleChange}
        />
      </SystemPage>
    );
  }
}
