import * as React from "react";
import * as System from "../dist";

export default class TestPage extends React.Component {
  render() {
    console.log(System.Constants);

    return (
      <div>
        <System.H1>Component Library Test</System.H1>
        <br />
        <br />
        <System.P>
          If this works. That means the component library bundle is working
          correctly.
          <br />
          <br />
          <System.ButtonPrimary>Primary</System.ButtonPrimary> &nbsp;
          <System.ButtonSecondary>Secondary</System.ButtonSecondary> &nbsp;
          <System.ButtonDisabled>Disabled</System.ButtonDisabled>
        </System.P>
      </div>
    );
  }
}
