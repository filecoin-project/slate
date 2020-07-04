import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

export default class SystemPageCheckboxes extends React.Component {
  state = {
    exampleOne: false,
    exampleTwo: true,
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <SystemPage title="SDS: Checkboxes" description="..." url="https://fps.onrender.com/system/checkboxes">
        <System.H1>
          Checkboxes <ViewSourceLink file="system/checkboxes.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The Checkbox component is used in forms when a users needs to select one or more values from multiple options.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>
          Import React and the CheckBox Component.
        </System.P>
        <br />
        <br />
        <System.CodeBlock>
{`import * as React from 'react';
import { CheckBox } from 'slate-react-system';`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Declare the CheckBox component.</System.P>
        <br />

        <System.CodeBlock>
{`class ExampleOne extends React.Component {
   state = { exampleOne: false }

   _handleChange = e => this.setState(
     { [e.target.name]: e.target.value }
   );

   render() {
       return(
           <CheckBox
             name="exampleOne"
             value={this.state.exampleOne}
             onChange={this._handleChange}>

             <strong>Unchecked</strong>
             <br />
             This CheckBox default is unchecked.
           </CheckBox>
        )
    }
}


class ExampleTwo extends React.Component {
   state = { ExampleTwo: true }

   _handleChange = e => this.setState(
     { [e.target.name]: e.target.value }
   );

   render() {
       return(
         <CheckBox
           name="ExampleTwo"
           value={this.state.ExampleTwo}
           onChange={this._handleChange}>

           <strong>Checked</strong>
           <br />
           This CheckBox default is checked.
         </CheckBox>
       )
   }
}`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        <System.CheckBox name="exampleOne" value={this.state.exampleOne} onChange={this._handleChange}>
          <strong>Unchecked</strong>
          <br />
          This CheckBox default is unchecked.
        </System.CheckBox>
        <br />
        <br />
        <System.CheckBox name="exampleTwo" value={this.state.exampleTwo} onChange={this._handleChange}>
          <strong>Checked</strong>
          <br />
          This CheckBox default is checked.
        </System.CheckBox>
      </SystemPage>
    );
  }
}
