import * as React from "react";
import * as System from "~/components/system";

import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

export default class SystemPageTables extends React.Component {
  state = {
    exampleOneOutput: null,
    exampleOneProps: null,
    exampleTwoOutput: null,
    exampleTwoProps: null,
  };

  _handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <SystemPage
        title="SDS: Tables"
        description="..."
        url="https://fps.onrender.com/system/tables"
      >
        <System.H1>
          Tables <ViewSourceLink file="system/tables.js" />
        </System.H1>
        <br />
        <br />
        <System.P>An example of a table component.</System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>
          Import React and the TableContent, TableColumn Components.
        </System.P>
        <br />
        <br />
        <System.CodeBlock>
          {`import * as React from 'react';
import { TableContent, TableColumn } from 'slate-react-system';`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Declare the Group and Table components.</System.P>
        <br />

        <System.CodeBlock>
          {`class ExampleOne extends React.Component {
   state = { exampleOne: null }

   _handleChange = e => this.setState(
     { [e.target.name]: e.target.value }
   );

   render() {
       return(
         <Table
           data={{
             columns: [
               { key: 'a', name: 'Link', type: 'FILE_LINK' },
               { key: 'b', name: 'Value', width: '88px' },
               { key: 'c', name: 'Tooltip', tooltip: 'A tooltip.',
                 width: '128px' },
               { key: 'd', name: 'Copyable', copyable: true, width:
                 '88px' },
             ],
             rows: [
               { id: 1, a: 'col 1 row 1', b: 'col 1 row 2', c: 'col
                 1 row 3', d: 'col 1 row 4' },
               { id: 2, a: 'col 2 row 1', b: 'col 2 row 2', c: 'col
                 2 row 3', d: 'col 2 row 4'},
               { id: 3, a: 'col 3 row 1', b: 'col 3 row 2', c: 'col
                 3 row 3', d: 'col 3 row 4' },
               { id: 3, a: 'col 4 row 1', b: 'col 4 row 2', c: 'col
                 4 row 3', d: 'col 4 row 4' },
             ],
           }}

           selectedRowId={this.state.exampleOne}
           onChange={this._handleChange}
           name="exampleOne"
         />
       )
   }
}`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        <System.Table
          data={{
            columns: [
              { key: "a", name: "Link", type: "FILE_LINK" },
              { key: "b", name: "Value", width: "88px" },
              {
                key: "c",
                name: "Tooltip",
                tooltip: "A tooltip.",
                width: "128px",
              },
              { key: "d", name: "Copyable", copyable: true, width: "88px" },
            ],
            rows: [
              {
                id: 1,
                a: "col 1 row 1",
                b: "col 1 row 2",
                c: "col 1 row 3",
                d: "col 1 row 4",
              },
              {
                id: 2,
                a: "col 2 row 1",
                b: "col 2 row 2",
                c: "col 2 row 3",
                d: "col 2 row 4",
              },
              {
                id: 3,
                a: "col 3 row 1",
                b: "col 3 row 2",
                c: "col 3 row 3",
                d: "col 3 row 4",
              },
              {
                id: 3,
                a: "col 4 row 1",
                b: "col 4 row 2",
                c: "col 4 row 3",
                d: "col 4 row 4",
              },
            ],
          }}
          selectedRowId={this.state.exampleOneOutput}
          onChange={this._handleChange}
          name="exampleOneOutput"
        />
        <br />
        <br />
        <System.H2>Accepted React Properties</System.H2>
        <hr />
        <br />
        <Group title="Tables">
          <System.Table
            data={{
              columns: [
                { key: "a", name: "Name", width: "128px" },
                { key: "b", name: "Type", width: "88px", type: "OBJECT_TYPE" },
                { key: "c", name: "Default", width: "88px" },
                { key: "d", name: "Description", width: "100%" },
              ],
              rows: [
                {
                  id: 1,
                  a: "key",
                  b: "string",
                  c: "null",
                  d: "Column key value",
                },
                {
                  id: 2,
                  a: "id",
                  b: "number",
                  c: "null",
                  d: "Row ID value",
                },
                {
                  id: 3,
                  a: "name",
                  b: "string",
                  c: "null",
                  d: "Name of the column",
                },
                {
                  id: 4,
                  a: "text",
                  b: "string",
                  c: "null",
                  d: "Table content text",
                },
                {
                  id: 5,
                  a: "data",
                  b: "string",
                  c: "null",
                  d: "Table content data",
                },
                {
                  id: 6,
                  a: "tooltip",
                  b: "string",
                  c: "null",
                  d: "If not null, a tooltip will be visible",
                },
                {
                  id: 7,
                  a: "copyable",
                  b: "boolean",
                  c: "false",
                  d: "If true, a copyable icon will be visible",
                },
                {
                  id: 8,
                  a: "type",
                  b: "string",
                  c: "null",
                  d: "Use FILE_LINK to add a linkable column",
                },
                {
                  id: 9,
                  a: "width",
                  b: "number",
                  c: "null",
                  d: "Width of the column",
                },
                {
                  id: 10,
                  a: "action",
                  b: "string",
                  c: "null",
                  d: "Row action",
                },
                {
                  id: 11,
                  a: "hideLabel",
                  b: "boolean",
                  c: "false",
                  d: "If true, column label will be hidden",
                },
                {
                  id: 12,
                  a: "children",
                  b: "string",
                  c: "null",
                  d: "Row child value",
                },
                {
                  id: 13,
                  a: "onNavigateTo",
                  b: "string",
                  c: "null",
                  d: "onNavigateTo function binding",
                },
                {
                  id: 14,
                  a: "onAction",
                  b: "string",
                  c: "null",
                  d: "onAction function binding",
                },
                {
                  id: 15,
                  a: "onChange",
                  b: "string",
                  c: "null",
                  d: "onChange function binding",
                },
                {
                  id: 16,
                  a: "selectedRowId",
                  b: "number",
                  c: "null",
                  d: "ID value of the selected row",
                },
              ],
            }}
            selectedRowId={this.state.exampleOneProps}
            onChange={this._handleChange}
            name="exampleOneProps"
          />
        </Group>
        <br />
        <br />
        <br />
        <System.H2>TableContents</System.H2>
        <hr />
        <br />
        <System.P>
          The Table Component has many TableContent properties that can be added
          to alter the column using the <i>type</i> props.
        </System.P>
        <br />
        <System.CodeBlock>
          {`class ExampleTwo extends React.Component {
   state = { exampleTwo: null }

   _handleChange = e => this.setState(
     { [e.target.name]: e.target.value }
   );

   render() {
       return(
         <Table
           data={{
             columns: [
               { key: 'a', name: 'Upload', width: '112px',
                 type: 'BANDWIDTH_UPLOAD' },
               { key: 'b', name: 'Download', width: '112px',
                 type: 'BANDWIDTH_DOWNLOAD' },
               { key: 'c', name: 'Tranaction Status', width: '128px',
                 type: "TRANSACTION_STATUS" },
               { key: 'd', name: 'Deal Status', width:'184px',
                 type: "DEAL_STATUS" },
               { key: 'e', name: 'Icon', width: '88px', type: "ICON" },

             ],
             rows: [
               { id: 1, a: '500', b: '200', c: '2', d: '1', e: 'PNG' },
               { id: 2, a: '20', b: '10', c: '1', d: '2', e: 'FOLDER' },
               { id: 3, a: '100', b: '250', c: '2', d: '3', e: 'PNG'  },
               { id: 3, a: '4', b: '135', c: '1', d: '4', e: 'FOLDER' },
             ],
           }}
           selectedRowId={this.state.exampleTwo}
           onChange={this._handleChange}
           name="exampleTwo"
         />
       )
   }
}`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        <System.Table
          data={{
            columns: [
              {
                key: "a",
                name: "Upload",
                width: "112px",
                type: "BANDWIDTH_UPLOAD",
              },
              {
                key: "b",
                name: "Download",
                width: "112px",
                type: "BANDWIDTH_DOWNLOAD",
              },
              {
                key: "c",
                name: "Tranaction Status",
                width: "128px",
                type: "TRANSACTION_STATUS",
              },
              {
                key: "d",
                name: "Deal Status",
                width: "168px",
                type: "DEAL_STATUS",
              },
              { key: "e", name: "Icon", width: "88px", type: "ICON" },
            ],
            rows: [
              { id: 1, a: "500", b: "200", c: "2", d: "1", e: "PNG" },
              { id: 2, a: "20", b: "10", c: "1", d: "2", e: "FOLDER" },
              { id: 3, a: "100", b: "250", c: "2", d: "3", e: "PNG" },
              { id: 3, a: "4", b: "135", c: "1", d: "4", e: "FOLDER" },
            ],
          }}
          selectedRowId={this.state.exampleTwoOutput}
          onChange={this._handleChange}
          name="exampleTwoOutput"
        />
        <br />
        <br />
        <System.H2>
          Accepted <i>Type</i> Properties
        </System.H2>
        <hr />
        <br />
        <Group title="TableContent">
          <System.Table
            data={{
              columns: [
                { key: "a", name: "Name", width: "184px" },
                { key: "b", name: "Type", width: "88px", type: "OBJECT_TYPE" },
                { key: "c", name: "Description", width: "100%" },
              ],
              rows: [
                {
                  id: 1,
                  a: "DEAL_CATEGORY",
                  b: "number",
                  c: '"1": "Storage", else: "Retrieval"',
                },
                { id: 2, a: "LOCATION", b: "string", c: "String for location" },
                {
                  id: 3,
                  a: "BUTTON",
                  b: "string",
                  c: "String for button text",
                },
                {
                  id: 4,
                  a: "TRANSACTION_DIRECTION",
                  b: "number",
                  c: '"1": incoming badge, "2": outgoing badge',
                },
                {
                  id: 5,
                  a: "TRANSACTION_STATUS",
                  b: "number",
                  c: '"1": complete badge, "2": pending badge',
                },
                {
                  id: 6,
                  a: "ICON",
                  b: "string",
                  c: '"PNG": image icon, "FOLDER": folder icon',
                },
                {
                  id: 7,
                  a: "AVATAR",
                  b: "null",
                  c: "Adds the users avatar and online status",
                },
                {
                  id: 8,
                  a: "DEAL_STATUS_RETRIEVAL",
                  b: "number",
                  c:
                    '"0": "Local file", "1": "Available on network", "2": "Retrieval deal proposed.", "3": "Retrieval deal accepted.", "4": "Data transfer in progress.", "5": "Data transfer completed.", "6": "Retrieved from network.",',
                },
                {
                  id: 9,
                  a: "DEAL_STATUS",
                  b: "number",
                  c:
                    '"0": "Local file", "1": "Available on network", "2": "Retrieval deal proposed.", "3": "Retrieval deal accepted.", "4": "Data transfer in progress.", "5": "Data transfer completed.", "6": "Retrieved from network.",',
                },
                {
                  id: 10,
                  a: "BANDWIDTH_UPLOAD",
                  b: "number",
                  c: "Outputs an upload icon with the {number} of bytes",
                },
                {
                  id: 11,
                  a: "BANDWIDTH_DOWNLOAD",
                  b: "number",
                  c: "Outputs a download icon with the {number} of bytes",
                },
                {
                  id: 12,
                  a: "MINER_AVAILABILITY",
                  b: "number",
                  c: '"1": "true", "2": null',
                },
                {
                  id: 13,
                  a: "DEAL_AUTO_RENEW",
                  b: "number",
                  c: '"1": "true", else: "false"',
                },
                {
                  id: 14,
                  a: "NOTIFICATION_ERROR",
                  b: "string",
                  c: "String with error notification badge",
                },
                { id: 15, a: "FILE_DATE", b: "string", c: "String to date" },
                {
                  id: 16,
                  a: "FILE_SIZE",
                  b: "number",
                  c: 'Outputs "{number} Bytes"',
                },
                {
                  id: 17,
                  a: "FILE_LINK",
                  b: "string",
                  c: "String of file link",
                },
              ],
            }}
            selectedRowId={this.state.exampleTwoProps}
            onChange={this._handleChange}
            name="exampleTwoProps"
          />
        </Group>
      </SystemPage>
    );
  }
}
