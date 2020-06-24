import * as React from 'react';
import * as System from '~/components/system';

import Group from '~/components/system/Group';
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

        <System.P>The StatCard component is used to display data on a line chart.</System.P>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Declare the StatCard component.</System.P>
        <br />
        <System.CodeBlock>
{`<System.StatCard
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
</System.StatCard>`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
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
        <System.H2>Props</System.H2>
        <hr />
        <br />
        <Group title='StatCard'>
          <System.Table
            data={{
              columns: [
                { key: 'a', name: 'Name', width: '128px' },
                { key: 'b', name: 'Type', width: '88px' },
                { key: 'c', name: 'Default', width: '88px' },
                { key: 'd', name: 'Description', width: '100%' },

              ],
              rows: [
                { id: 1, a: 'value', b: 'number', c: 'null', d:'The value listed in the header of the StatCard' },
                { id: 2, a: 'denomination', b: 'string', c: 'null', d: 'String name of the value' },
                { id: 3, a: 'data', b: 'array', c: 'null', d: 'Array of data points' },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
