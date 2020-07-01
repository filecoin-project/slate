import * as React from 'react';
import * as System from '~/components/system';

import Group from '~/components/system/Group';
import SystemPage from '~/components/system/SystemPage';
import ViewSourceLink from '~/components/system/ViewSourceLink';

export default class SystemPageTables extends React.Component {
  state = {
    table_data: null,
  };

  render() {
    return (
      <SystemPage title="FCDS: Tables" description="Lorem Ipsum." url="https://fps.onrender.com/system/tables">
        <System.H1>
          Tables <ViewSourceLink file="tables.js" />
        </System.H1>
        <br />
        <br />
        <System.P>An example of a table component.</System.P>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Import Group component.</System.P>
        <br />
        <System.CodeBlock>
        {`import Group from '~/components/system/Group';`}
        </System.CodeBlock>
        <br />
        <System.P>Define the table data states.</System.P>
        <br />
        <System.CodeBlock>
{`state = {
  table_data: null,
};`}
        </System.CodeBlock>
        <br />
        <System.P>Declare the Group and Table components.</System.P>
        <br />

        <System.CodeBlock>
{`<Group title="Table example">
  <System.Table
    data={{
      columns: [
        { key: 'a', name: 'Link', type: 'FILE_LINK' },
        { key: 'b', name: 'Value', width: '88px' },
        { key: 'c', name: 'Tooltip', tooltip: 'A tooltip.', width: '128px' },
        { key: 'd', name: 'Copyable', copyable: true, width: '88px' },
      ],
      rows: [
        { id: 1, a: 'col 1 row 1', b: 'col 1 row 2', c: 'col 1 row 3', d: 'col 1 row 4' },
        { id: 2, a: 'col 2 row 1', b: 'col 2 row 2', c: 'col 2 row 3', d: 'col 2 row 4'},
        { id: 3, a: 'col 3 row 1', b: 'col 3 row 2', c: 'col 3 row 3', d: 'col 3 row 4' },
        { id: 3, a: 'col 4 row 1', b: 'col 4 row 2', c: 'col 4 row 3', d: 'col 4 row 4' },
      ],
    }}
    selectedRowId={this.state.table_data}
    onChange={this._handleChange}
    name="table_data"
  />
</Group>`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        <Group title="Table example">
          <System.Table
            data={{
              columns: [
                { key: 'a', name: 'Link', type: 'FILE_LINK' },
                { key: 'b', name: 'Value', width: '88px' },
                { key: 'c', name: 'Tooltip', tooltip: 'A tooltip.', width: '128px' },
                { key: 'd', name: 'Copyable', copyable: true, width: '88px' },
              ],
              rows: [
                { id: 1, a: 'col 1 row 1', b: 'col 1 row 2', c: 'col 1 row 3', d: 'col 1 row 4' },
                { id: 2, a: 'col 2 row 1', b: 'col 2 row 2', c: 'col 2 row 3', d: 'col 2 row 4'},
                { id: 3, a: 'col 3 row 1', b: 'col 3 row 2', c: 'col 3 row 3', d: 'col 3 row 4' },
                { id: 3, a: 'col 4 row 1', b: 'col 4 row 2', c: 'col 4 row 3', d: 'col 4 row 4' },
              ],
            }}
            selectedRowId={this.state.table_data}
            onChange={this._handleChange}
            name="table_data"
          />
        </Group>
        <br />
        <br />
        <System.H2>Accepted React Properties</System.H2>
        <hr />
        <br />
        <Group title="Tables">
          <System.Table
            data={{
              columns: [
                { key: 'a', name: 'Name', width: '128px' },
                { key: 'b', name: 'Type', width: '88px' },
                { key: 'c', name: 'Default', width: '88px' },
                { key: 'd', name: 'Description', width: '100%' },

              ],
              rows: [
                { id: 1, a: 'key', b: 'string', c: 'null', d:'Column key value' },
                { id: 2, a: 'id', b: 'number', c: 'null', d:'Row ID value' },
                { id: 3, a: 'name', b: 'string', c: 'null', d: 'Name of the column' },
                { id: 4, a: 'text', b: 'string', c: 'null', d: 'Table content text' },
                { id: 5, a: 'data', b: 'string', c: 'null', d: 'Table content data' },
                { id: 6, a: 'tooltip', b: 'string', c: 'null', d: 'If not null, a tooltip will be visible' },
                { id: 7, a: 'copyable', b: 'boolean', c: 'false', d: 'If true, a copyable icon will be visible' },
                { id: 8, a: 'type', b: 'string', c: 'null', d: 'Use FILE_LINK to add a linkable column' },
                { id: 9, a: 'width', b: 'number', c: 'null', d: 'Width of the column' },
                { id: 10, a: 'action', b: 'string', c: 'null', d: 'Row action' },
                { id: 11, a: 'hideLabel', b: 'boolean', c: 'null', d: 'If true, column label will be hidden' },
                { id: 12, a: 'children', b: 'string', c: 'null', d: 'Row child value' },
                { id: 13, a: 'onNavigateTo', b: 'string', c: 'null', d: 'onNavigateTo function binding' },
                { id: 14, a: 'onAction', b: 'string', c: 'null', d: 'onAction function binding' },
                { id: 15, a: 'onChange', b: 'string', c: 'null', d: 'onChange function binding' },
                { id: 16, a: 'selectedRowId', b: 'number', c: 'null', d: 'ID value of the selected row' },
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
