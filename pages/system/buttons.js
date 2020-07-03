import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

export default class SystemPageButtons extends React.Component {
  render() {
    return (
      <SystemPage title="SDS: Buttons" description="..." url="https://fps.onrender.com/system/buttons">
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
{`const ButtonPrimary = () => {
   return (
      <div>
          <ButtonPrimary>
            Primary Button
          </ButtonPrimary>
      </div>
   );
}`}
          <br />
          <br />
{`const ButtonSecondary = () => {
   return (
      <div>
          <ButtonSecondary>
            Secondary Button
          </ButtonSecondary>
      </div>
   );
}`}
          <br />
          <br />
{`const ButtonDisabled = () => {
   return (
      <div>
          <ButtonDisabled>
            Disabled Button
          </ButtonDisabled>
      </div>
   );
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
{`const ButtonPrimaryFull = () => {
   return (
      <div>
          <ButtonPrimaryFull>
            Primary Button Full
          </ButtonPrimaryFull>
      </div>
   );
}`}
          <br />
          <br />
{`const ButtonSecondaryFull = () => {
   return (
      <div>
          <ButtonSecondaryFull>
            Secondary Button Full
          </ButtonSecondaryFull>
      </div>
   );
}`}
          <br />
          <br />
{`const ButtonDisabledFull = () => {
   return (
      <div>
          <ButtonDisabledFull>
            Disabled Button Full
          </ButtonDisabledFull>
      </div>
   );
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
{`const ButtonPrimaryLabel = () => {
   return (
      <div>
          <ButtonPrimary type="label">
            Primary Button Label
          </ButtonPrimary>
      </div>
   );
}`}
          <br />
          <br />
{`const ButtonSecondaryLabel = () => {
   return (
      <div>
          <ButtonSecondary type="label">
            Secondary Button Label
          </ButtonSecondary>
      </div>
   );
}`}
          <br />
          <br />
{`const ButtonDisabledLabel = () => {
   return (
      <div>
          <ButtonDisabled type="label">
            Disabled Button Label
          </ButtonDisabled>
      </div>
   );
}`}
        </System.CodeBlock>
      </SystemPage>
    );
  }
}
