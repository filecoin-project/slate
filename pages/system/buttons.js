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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </System.P>
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
