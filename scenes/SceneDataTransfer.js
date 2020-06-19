import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as Fixtures from "~/common/fixtures";
import * as System from "~/components/system";
import * as SchemaTable from "~/common/schema-table";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import Section from "~/components/core/Section";

export default class SceneDataTransfer extends React.Component {
  state = { sub_navigation: "1" };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <ScenePage>
        <System.H1>Data transfers</System.H1>

        <System.CardTabGroup
          style={{ marginTop: 24 }}
          name="sub_navigation"
          options={[
            { value: "1", label: "Current transfers" },
            { value: "2", label: "Past transfers" },
          ]}
          value={this.state.sub_navigation}
          onChange={this._handleChange}
        />

        {this.state.sub_navigation === "2" ? (
          <Section
            title="Past transfers"
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
          >
            <System.Table
              data={{
                columns: SchemaTable.DataTransfer,
                rows: this.props.viewer.data_transfers,
              }}
              selectedRowId={this.state.table_past_transfer}
              onChange={this._handleChange}
              onNavigateTo={this.props.onNavigateTo}
              onAction={this.props.onAction}
              name="table_past_transfer"
            />
          </Section>
        ) : null}

        {this.state.sub_navigation === "1" ? (
          <Section
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
            title="Current transfers"
          >
            <System.P style={{ padding: 24 }}>There are no transfers</System.P>
          </Section>
        ) : null}
      </ScenePage>
    );
  }
}
