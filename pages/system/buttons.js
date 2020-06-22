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
        <System.P>An example of button components.</System.P>
        <br />
        <br />

        <System.ButtonPrimary>Button Primary</System.ButtonPrimary>
        <br />
        <br />
        <System.ButtonPrimaryFull>Button Primary Full</System.ButtonPrimaryFull>
        <br />
        <br />
        <System.ButtonSecondary>Button Secondary</System.ButtonSecondary>
        <br />
        <br />
        <System.ButtonSecondaryFull>Button Secondary Full</System.ButtonSecondaryFull>
        <br />
        <br />
        <System.ButtonDisabled>Button Disabled</System.ButtonDisabled>
        <br />
        <br />
        <System.ButtonDisabledFull>Button Disabled</System.ButtonDisabledFull>
      </SystemPage>
    );
  }
}
