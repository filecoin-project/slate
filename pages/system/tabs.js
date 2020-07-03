import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

const TAB_GROUP_TWO = [
  { value: '1', label: 'Capricorn' },
  { value: '2', label: 'Aquarius' },
];

const TAB_GROUP_THREE = [
  { value: '1', label: 'Capricorn' },
  { value: '2', label: 'Aquarius' },
  { value: '3', label: 'Pisces' },
];

const TAB_GROUP_FOUR = [
  { value: '1', label: 'Capricorn' },
  { value: '2', label: 'Aquarius' },
  { value: '3', label: 'Pisces' },
  { value: '4', label: 'Aries' },
];

export default class SystemPageTabs extends React.Component {
  state = {
    eight: '1',
    nine: '1',
    ten: '1',
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <SystemPage title="SDS: Tabs" description="..." url="https://fps.onrender.com/system/tabs">
        <System.H1>
          Tabs <ViewSourceLink file="system/tabs.js" />
        </System.H1>
        <br />
        <br />
        <System.P>The TabGroup component is used to allow the users to switch between views.</System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>
          Import React and the TabGroup Component.
        </System.P>
        <br />
        <br />
        <System.CodeBlock>
{`import * as React from 'react';
import { TabGroup } from 'slate-react-system';`}
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

const TAB_GROUP_THREE = [
  { value: '1', label: 'Capricorn' },
  { value: '2', label: 'Aquarius' },
  { value: '3', label: 'Pisces' },
];`}
        </System.CodeBlock>
        <br />
        <System.P>Define the Tab value states and handle the state when a tab is changed.</System.P>
        <br />
        <System.CodeBlock>
          {`state = {
  eight: '1',
  nine: '1',
  ten: '1',
};

_handleChange = (e) => {
  this.setState({ [e.target.name]: e.target.value });
};`}
        </System.CodeBlock>
        <br />
        <System.P>Declare the TabGroup component.</System.P>
        <br />
        <System.CodeBlock>
          {`const TabsTwo = () => {
  return (
    <div>
      <TabGroup
        name="eight"
        options={TAB_GROUP_TWO}
        value={this.state.eight}
        onChange={this._handleChange}
      />
    </div>
);
}

const TabsThree = () => {
  return (
    <div>
      <TabGroup
        name="nine"
        options={TAB_GROUP_THREE}
        value={this.state.nine}
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
        <System.TabGroup name="eight" options={TAB_GROUP_TWO} value={this.state.eight} onChange={this._handleChange} />
        <System.TabGroup name="nine" options={TAB_GROUP_THREE} value={this.state.nine} onChange={this._handleChange} />
      </SystemPage>
    );
  }
}
