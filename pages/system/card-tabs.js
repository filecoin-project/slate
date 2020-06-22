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
      <SystemPage
        title="FCDS"
        description="This is an early preview of the Filecoin Client Design System (FCDS)."
        url="https://fps.onrender.com/system/card-tabs">
        <System.H1>
          Card Tabs <ViewSourceLink file="card-tabs.js" />
        </System.H1>
        <br />
        <br />
        <System.P>An example of card tabs components.</System.P>
        <br />
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
