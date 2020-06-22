import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

export default class SystemPageTooltips extends React.Component {
  render() {
    return (
      <SystemPage title="FCDS: Tooltips" description="Lorem Ipsum." url="https://fps.onrender.com/system/tooltips">
        <System.H1>
          Tooltips <ViewSourceLink file="tooltips.js" />
        </System.H1>
        <br />
        <br />
        <System.P>An example of tooltip being used.</System.P>
        <br />
        <br />

        <System.TooltipAnchor tooltip="Hello friends!!" />
      </SystemPage>
    );
  }
}
