import * as React from 'react';
import * as System from '~/components/system';

import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

export default class SystemPageLineCharts extends React.Component {
  render() {
    return (
      <SystemPage
        title="FCDS: Line Charts"
        description="Lorem Ipsum."
        url="https://fps.onrender.com/system/line-charts">
        <System.H1>
          Line Charts <ViewSourceLink file="line-charts.js" />
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

        <System.StatCard
          denomination="Filecoin"
          value={423123121323}
          data={[
            ['2017-01-01 00:00:00 UTC', 7],
            ['2017-05-01 00:00:00 UTC', 12],
            ['2017-20-01 00:00:00 UTC', 16],
            ['2017-24-01 00:00:00 UTC', 20],
            [new Date(), 24],
          ]}>
          Amount of Filecoin
        </System.StatCard>
        <br />
        <br />
        <System.StatCard
          denomination="Bitcoin"
          value={12321345}
          data={[
            ['2017-01-01 00:00:00 UTC', 27],
            ['2017-05-01 00:00:00 UTC', 112],
            ['2017-20-01 00:00:00 UTC', 416],
            ['2017-24-01 00:00:00 UTC', 1120],
            [new Date(), 827],
          ]}>
          Amount of Bitcoin
        </System.StatCard>
      </SystemPage>
    );
  }
}
