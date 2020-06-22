import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';

export default class SystemPageStats extends React.Component {
  render() {
    return (
      <SystemPage title="FCDS: Stats" description="Lorem Ipsum." url="https://fps.onrender.com/system/stats">
        <System.H1>Stats</System.H1>
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
        <System.StatUpload>40 mb</System.StatUpload> <System.StatDownload>40 mb</System.StatDownload>
      </SystemPage>
    );
  }
}
