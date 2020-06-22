import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';

export default class SystemPageUsingPowergate extends React.Component {
  render() {
    return (
      <SystemPage
        title="FC: Using Powergate"
        description="A guide to integrate Powergate into your web client."
        url="https://fps.onrender.com/tutorials/using-powergate">
        <System.H1>Using Powergate</System.H1>
        <br />
        <System.P>This tutorial will explain how to use https://github.com/textileio/js-powergate-client.</System.P>
        <br /> <br />
        <System.P>Textile documentation lives here: https://docs.textile.io/.</System.P>
        <br /> <br />
        <System.H2>Getting started</System.H2>
        <br />
        <System.P>More soon.</System.P>
        <br /> <br />
      </SystemPage>
    );
  }
}
