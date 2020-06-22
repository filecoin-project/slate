import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

const RADIO_GROUP_OPTIONS = [
  {
    value: '1',
    label: (
      <React.Fragment>
        <strong>Breakfast Option</strong>
        <br />I want to have cake and soda for breakfast.
      </React.Fragment>
    ),
  },
  {
    value: '2',
    label: (
      <React.Fragment>
        <strong>Lunch Option</strong>
        <br />I want to have cake and soda for lunch.
      </React.Fragment>
    ),
  },
  {
    value: '3',
    label: (
      <React.Fragment>
        <strong>Dinner Option</strong>
        <br />I want to have cake and soda for dinner.
      </React.Fragment>
    ),
  },
  {
    value: '4',
    label:
      'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  },
];

export default class SystemPageRadios extends React.Component {
  state = {
    five: '1',
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
        <System.P>An example of radio components.</System.P>
        <br />
        <br />

        <System.RadioGroup
          name="five"
          options={RADIO_GROUP_OPTIONS}
          selected={this.state.five}
          onChange={this._handleChange}
        />
      </SystemPage>
    );
  }
}
