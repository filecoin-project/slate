import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

export default class SystemPageButtons extends React.Component {
  render() {
    return (
      <SystemPage title="SDS: Buttons" description="..." url="https://slate.host/system/buttons">
        <System.H1>
          Buttons <ViewSourceLink file="system/buttons.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The Button component is used to trigger an action or event, such as submitting a form or saving users
          information.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>
          Import React and the Button Components.
        </System.P>
        <br />
        <br />
        <System.CodeBlock>
{`import * as React from 'react';
import {
  ButtonPrimary,
  ButtonPrimaryFull,
  ButtonSecondary,
  ButtonSecondaryFull,
  ButtonDisabled,
  ButtonDisabledFull,
} from 'slate-react-system';`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Regular width</System.H2>
        <hr />
        <br />
        <System.P>
          There are three variations of the regular width button compontent.
          <br />
          Primary, Secondary and Disabled.
        </System.P>
        <br />
        <System.ButtonPrimary>Primary</System.ButtonPrimary> &nbsp;
        <System.ButtonSecondary>Secondary</System.ButtonSecondary> &nbsp;
        <System.ButtonDisabled>Disabled</System.ButtonDisabled>
        <br />
        <br />
        <System.CodeBlock>
{`class ExamplePrimary extends React.Component {
   render() {
       return(
         <ButtonPrimary>
           Primary Button
         </ButtonPrimary>
       )
   }
}


class ExampleSecondary extends React.Component {
   render() {
       return(
         <ButtonSecondary>
           Secondary Button
         </ButtonSecondary>
       )
   }
}


class ExampleDisabled extends React.Component {
   render() {
       return(
         <ButtonDisabled>
           Disabled Button
         </ButtonDisabled>
       )
   }
}`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Full width</System.H2>
        <hr />
        <br />
        <System.P>
          There are three variations of the full width button compontent. <br />
          Primary, Secondary and Disabled.
        </System.P>
        <br />
        <System.ButtonPrimaryFull>Primary Button Full</System.ButtonPrimaryFull>
        <br />
        <System.ButtonSecondaryFull>Secondary Button Full</System.ButtonSecondaryFull>
        <br />
        <System.ButtonDisabledFull>Disabled Button Full</System.ButtonDisabledFull>
        <br />
        <br />
        <System.CodeBlock>
{`class ExamplePrimaryFull extends React.Component {
   render() {
       return(
         <ButtonPrimaryFull>
           Primary Button Full
         </ButtonPrimaryFull>
       )
   }
}


class ExampleSecondaryFull extends React.Component {
   render() {
       return(
         <ButtonSecondaryFull>
           Secondary Button Full
         </ButtonSecondaryFull>
       )
   }
}


class ExampleDisabledFull extends React.Component {
   render() {
       return(
         <ButtonDisabledFull>
           Disabled Button Full
         </ButtonDisabledFull>
       )
   }
}`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Labels</System.H2>
        <hr />
        <br />
        <System.P>
          You can add the <i>type='label'</i> property to convert any of the above buttons into a label.
        </System.P>
        <br />
        <System.ButtonPrimary type="label">Primary Label</System.ButtonPrimary> &nbsp;
        <System.ButtonSecondary type="label">Secondary Label</System.ButtonSecondary> &nbsp;
        <System.ButtonDisabled type="label">Disabled Label</System.ButtonDisabled>
        <br />
        <br />
        <System.CodeBlock>
{`class ExamplePrimaryLabel extends React.Component {
   render() {
       return(
         <ButtonPrimary type="label">
           Primary Button Label
         </ButtonPrimary>
       )
   }
}


class ExampleSecondaryLabel extends React.Component {
   render() {
       return(
         <ButtonSecondary type="label">
           Secondary Button Label
         </ButtonSecondary>
       )
   }
}


class ExampleDisabledLabel extends React.Component {
   render() {
       return(
         <ButtonDisabled type="label">
           Disabled Button Label
         </ButtonDisabled>
       )
   }
}`}
        </System.CodeBlock>
      </SystemPage>
    );
  }
}
