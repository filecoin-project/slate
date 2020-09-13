import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

const STYLES_NESTED_TABLE = css`
  display: grid;
  grid-template-columns: 160px 1fr;
`;

let iterator = 0;
const NestedTable = (data) => {
  let values = [];
  for (let entries of Object.entries(data)) {
    if (entries[0] !== "rootCid") {
      iterator += 1;
      values.push(<div key={iterator}>{entries[0]}</div>);
      values.push(<div key={iterator}>{entries[1]}</div>);
    }
  }
  return <div css={STYLES_NESTED_TABLE}>{values}</div>;
};

export default class SceneDeals extends React.Component {
  state = {};

  async componentDidMount() {
    await this.props.onRehydrate();
  }

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <ScenePage>
        <ScenePageHeader title="Deals [WIP]">
          This scene is currently a work in progress.
        </ScenePageHeader>

        <Section title="Filecoin storage deal history">
          <System.Table
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
                  width: "100%",
                },
                {
                  key: "time",
                  name: "Time",
                },
                {
                  key: "status",
                  name: "Status",
                },
              ],
              rows: this.props.viewer.storageList.map((each) => {
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
          />
        </Section>

        <Section title="Filecoin retrieval deal history">
          <System.Table
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
                  width: "100%",
                },
                {
                  key: "time",
                  name: "Time",
                },
              ],
              rows: this.props.viewer.retrievalList.map((each) => {
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
        </Section>
      </ScenePage>
    );
  }
}
