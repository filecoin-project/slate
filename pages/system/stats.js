import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

export default class SystemPageStats extends React.Component {
  render() {
    return (
      <SystemPage title="FCDS: Stats" description="Lorem Ipsum." url="https://fps.onrender.com/system/stats">
        <System.H1>
          Stats <ViewSourceLink file="stats.js" />
        </System.H1>
        <br />
        <br />
        <System.P>An example of network statistic components.</System.P>
        <br />
        <br />
        <System.StatUpload>40 mb</System.StatUpload> <System.StatDownload>40 mb</System.StatDownload>
      </SystemPage>
    );
  }
}
