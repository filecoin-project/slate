import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';

const SELECT_MENU_OPTIONS = [
  { value: '1', name: 'Capricorn' },
  { value: '2', name: 'Aquarius' },
  { value: '3', name: 'Pisces' },
  { value: '4', name: 'Aries' },
  { value: '5', name: 'Taurus' },
  { value: '6', name: 'Gemini' },
  { value: '7', name: 'Cancer' },
  { value: '8', name: 'Leo' },
  { value: '9', name: 'Virgo' },
  { value: '10', name: 'Libra' },
  { value: '11', name: 'Scorpio' },
  { value: '12', name: 'Sagittarus' },
];

const SELECT_MENU_MAP = {
  '1': 'Capricorn',
  '2': 'Aquarius',
  '3': 'Pisces',
  '4': 'Aries',
  '5': 'Taurus',
  '6': 'Gemini',
  '7': 'Cancer',
  '8': 'Leo',
  '9': 'Virgo',
  '10': 'Libra',
  '11': 'Scorpio',
  '12': 'Sagittarus',
};

export default class SystemPageDropdowns extends React.Component {
  state = {
    one: '1',
    two: '3',
    three: '1',
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <SystemPage title="FCDS: Dropdowns" description="Lorem Ipsum." url="https://fps.onrender.com/system/dropdowns">
        <System.H1>Dropdowns</System.H1>
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
        <System.SelectMenu
          name="one"
          value={this.state.one}
          category="horoscope"
          onChange={this._handleChange}
          options={SELECT_MENU_OPTIONS}>
          {SELECT_MENU_MAP[this.state.one]}
        </System.SelectMenu>
        <br />
        <br />
        <br />
        <System.SelectMenuFull
          name="two"
          value={this.state.two}
          category="horoscope"
          onChange={this._handleChange}
          options={SELECT_MENU_OPTIONS}>
          {SELECT_MENU_MAP[this.state.two]}
        </System.SelectMenuFull>
        <br />
        <br />
        <br />
        <System.SelectMenuFull
          label="Pick a horoscope"
          name="three"
          value={this.state.three}
          category="horoscope"
          onChange={this._handleChange}
          options={SELECT_MENU_OPTIONS}>
          {SELECT_MENU_MAP[this.state.three]}
        </System.SelectMenuFull>
      </SystemPage>
    );
  }
}
