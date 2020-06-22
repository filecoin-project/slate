import * as React from 'react';
import * as System from '~/components/system';

import Group from '~/components/system/Group';
import SystemPage from '~/components/system/SystemPage';

export default class SystemPageTables extends React.Component {
  state = {
    table_data: null,
  };

  render() {
    return (
      <SystemPage title="FCDS: Tables" description="Lorem Ipsum." url="https://fps.onrender.com/system/tables">
        <System.H1>Tables</System.H1>
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

        <Group title="Table example">
          <System.Table
            data={{
              columns: [
                { key: 'a', name: 'Column A', type: 'FILE_LINK' },
                { key: 'b', name: 'Column B', width: '88px' },
                { key: 'c', name: 'Column C', width: '88px' },
                {
                  key: 'd',
                  name: 'Column D',
                  tooltip: 'A tooltip.',
                  width: '128px',
                },
                {
                  key: 'e',
                  name: 'Column E',
                  copyable: true,
                  width: '88px',
                },
                {
                  key: 'f',
                  name: 'Column F',
                  width: '88px',
                },
              ],
              rows: [
                { id: 1, a: 1, b: 1, c: 1, e: 1, f: 1, d: 1 },
                { id: 2, a: 111, b: 111, c: 111, e: 111, f: 111, d: 111 },
                {
                  id: 3,
                  a: 111111,
                  b: 111111,
                  c: 111111,
                  e: null,
                  f: 111111,
                  d: 1111111,
                },
                {
                  id: 4,
                  a: 111111111111,
                  b: 11111111111,
                  c: 111111111111,
                  e: 11111111111,
                  f: 11111111111111,
                  d: 1111111111111111,
                },
              ],
            }}
            selectedRowId={this.state.table_data}
            onChange={this._handleChange}
            name="table_data"
          />
        </Group>
      </SystemPage>
    );
  }
}
