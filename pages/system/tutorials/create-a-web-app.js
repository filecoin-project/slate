import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';

export default class SystemPageTutorialCreateAWebApplication extends React.Component {
  render() {
    return (
      <SystemPage
        title="FC: Create A Web Client"
        description="A guide to creating a web client with the necessary dependencies."
        url="https://fps.onrender.com/tutorials/create-a-web-app">
        <System.H1>Create A Web Client</System.H1>
        <br />
        <System.P>
          This tutorial will teach you how to create a web application and run the Lotus DevNet (https://docs.lotu.sh)
          and Powergate in the background.
        </System.P>
        <br /> <br />
        <System.P>More Soon.</System.P>
        <br /> <br />
        <System.H2>Getting started</System.H2>
        <br />
        <System.P>...</System.P>
        <br /> <br />
        <System.P>...</System.P>
        <br /> <br />
      </SystemPage>
    );
  }
}
