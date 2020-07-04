import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

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
    exampleOne: '1',
    exampleTwo: '3',
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <SystemPage title="SDS: Dropdowns" description="..." url="https://fps.onrender.com/system/dropdowns">
        <System.H1>
          Dropdowns <ViewSourceLink file="system/dropdowns.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The Dropdown component is used to present the user a list of values where they can select a single option.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>
          Import React and the SelectMenu and/or the SelectMenuFull Components.
        </System.P>
        <br />
        <br />
        <System.CodeBlock>
{`import * as React from 'react';
import { SelectMenu, SelectMenuFull } from 'slate-react-system';`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Define the dropdown menu options.</System.P>
        <br />
        <System.CodeBlock>
          {`const SELECT_MENU_OPTIONS = [
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
};`}
        </System.CodeBlock>
        <br />
        <System.P>Declare the Dropdown component.</System.P>
        <br />
        <System.CodeBlock>
          {`class ExampleOne extends React.Component {
   state = { exampleOne: '1' }

   _handleChange = e => this.setState(
     { [e.target.name]: e.target.value }
   );

   render() {
     return(
       <SelectMenu
         name="exampleOne"
         value={this.state.exampleOne}
         category="horoscope"
         onChange={this._handleChange}
         options={SELECT_MENU_OPTIONS}>
         {SELECT_MENU_MAP[this.state.exampleOne]}
       </SelectMenu>
     )
   }
}


class ExampleTwo extends React.Component {
  state = { exampleTwo: '3' }

  _handleChange = e => this.setState(
    { [e.target.name]: e.target.value }
  );

  render() {
    return(
      <SelectMenuFull
        label="Pick a horoscope"
        name="exampleTwo"
        value={this.state.exampleTwo}
        category="horoscope"
        onChange={this._handleChange}
        options={SELECT_MENU_OPTIONS}>
        {SELECT_MENU_MAP[this.state.exampleTwo]}
      </SelectMenuFull>
    )
  }
}`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        <System.SelectMenu
          name="exampleOne"
          value={this.state.exampleOne}
          category="horoscope"
          onChange={this._handleChange}
          options={SELECT_MENU_OPTIONS}>
          {SELECT_MENU_MAP[this.state.exampleOne]}
        </System.SelectMenu>
        <br />
        <br />
        <System.SelectMenuFull
          label="Pick a horoscope"
          name="exampleTwo"
          value={this.state.exampleTwo}
          category="horoscope"
          onChange={this._handleChange}
          options={SELECT_MENU_OPTIONS}>
          {SELECT_MENU_MAP[this.state.exampleTwo]}
        </System.SelectMenuFull>
      </SystemPage>
    );
  }
}
