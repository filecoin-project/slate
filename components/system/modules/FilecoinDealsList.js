import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";
import { Table } from "~/components/system/components/Table";

import Group from "~/components/system/Group";

const STYLES_NESTED_TABLE = css`
  display: grid;
  grid-template-columns: 160px 1fr;
`;

const NestedTable = (data) => {
  let values = [];
  console.log(Object.entries(data));
  for (let entries of Object.entries(data)) {
    if (entries[0] !== "rootCid") {
      values.push(<div key={entries[0]}>{entries[0]}</div>);
      values.push(<div key={`${entries[0]}value`}>{entries[1]}</div>);
    }
  }
  console.log(values);
  return <div css={STYLES_NESTED_TABLE}>{values}</div>;
};

export class FilecoinStorageDealsList extends React.Component {
  state = {
    selectedRowId: null,
  };

  _handleClick = (e) => {
    this.setState({ selectedRowId: e.target.value });
  };

  render() {
    return (
      <Group title="Storage Deals">
        <Table
          data={{
            columns: [
              {
                key: "address",
                name: "Address",
                width: "196px",
              },
              {
                key: "rootCid",
                name: "Root CID",
                width: "196px",
              },
              {
                key: "status",
                name: "Status",
                type: "STORAGE_DEAL_STATUS",
                width: "104px",
              },
              {
                key: "time",
                name: "Time",
                width: "100%",
              },
            ],
            rows: this.props.data.map((each) => {
              return {
                id: each.rootCid,
                address: each.addr,
                rootCid: each.rootCid,
                status: each.pending ? "2" : "1",
                time: each.time,
                children: NestedTable(each.dealInfo),
              };
            }),
          }}
          selectedRowId={this.state.selectedRowId}
          onClick={this._handleClick}
          name={this.props.name}
        />
      </Group>
    );
  }
}

export class FilecoinRetrievalDealsList extends React.Component {
  state = {
    selectedRowId: null,
  };

  _handleClick = (e) => {
    this.setState({ selectedRowId: e.target.value });
  };

  render() {
    return (
      <Group title="Retrieval Deals">
        <Table
          data={{
            columns: [
              {
                key: "address",
                name: "Address",
                width: "248px",
              },
              {
                key: "rootCid",
                name: "Root CID",
                width: "248px",
              },
              {
                key: "time",
                name: "Time",
                width: "100%",
              },
            ],
            rows: this.props.data.map((each) => {
              return {
                id: each.dealInfo.rootCid,
                address: each.addr,
                rootCid: each.dealInfo.rootCid,
                time: each.time,
                children: NestedTable(each.dealInfo),
              };
            }),
          }}
          selectedRowId={this.state.selectedRowId}
          onClick={this._handleClick}
          name={this.props.name}
        />
      </Group>
    );
  }
}
