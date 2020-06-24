import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

export default class SystemPageButtons extends React.Component {
  render() {
    return (
      <SystemPage title="FCDS: Buttons" description="Lorem Ipsum." url="https://fps.onrender.com/system/buttons">
        <System.H1>
          Buttons <ViewSourceLink file="buttons.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The Button component is used to trigger an action or event, such as submitting a form or saving users information.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Regular width</System.H2>
        <hr />
        <br />
        <System.P>
          There are three variations of the regular width button compontent.<br />
          Primary, Secondary and Disabled.
        </System.P>
        <br />
        <System.ButtonPrimary>Primary</System.ButtonPrimary> &nbsp;
        <System.ButtonSecondary>Secondary</System.ButtonSecondary> &nbsp;
        <System.ButtonDisabled>Disabled</System.ButtonDisabled>
        <br />
        <br />
        <System.CodeBlock>
          {`<System.ButtonPrimary>Primary</System.ButtonPrimary>`}
          <br /><br />
          {`<System.ButtonSecondary>Secondary</System.ButtonSecondary>`}
          <br /><br />
          {`<System.ButtonDisabled>Disabled</System.ButtonDisabled>`}
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
        <System.ButtonPrimaryFull>Primary</System.ButtonPrimaryFull>
        <br />
        <System.ButtonSecondaryFull>Secondary</System.ButtonSecondaryFull>
        <br />
        <System.ButtonDisabledFull>Disabled</System.ButtonDisabledFull>
        <br />
        <br />
        <System.CodeBlock>
          {`<System.ButtonPrimaryFull>Primary</System.ButtonPrimaryFull>`}
          <br /><br />
          {`<System.ButtonSecondaryFull>Secondary</System.ButtonSecondaryFull>`}
          <br /><br />
          {`<System.ButtonDisabledFull>Disabled</System.ButtonDisabledFull>`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Labels</System.H2>
        <hr />
        <br />
        <System.P>
          You can add the <i>type='label'</i> prop to convert any of the above buttons into a label.
        </System.P>
        <br />
        <System.ButtonPrimary type='label'>Label</System.ButtonPrimary> &nbsp;
        <System.ButtonSecondary type='label'>Label</System.ButtonSecondary> &nbsp;
        <System.ButtonDisabled type='label'>Label</System.ButtonDisabled>
        <br />
        <br />
        <System.CodeBlock>
{`<System.ButtonPrimary type='label'>Label</System.ButtonPrimary>

<System.ButtonSecondary type='label'>Label</System.ButtonSecondary>

<System.ButtonDisabled type='label'>Label</System.ButtonDisabled>`}
        </System.CodeBlock>

      </SystemPage>
    );
  }
}
