import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";

export default class SceneMiners extends React.Component {
  state = {};

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <ScenePage>
        <System.H1>Miners</System.H1>
        <Section
          onAction={this.props.onAction}
          onNavigateTo={this.props.onNavigateTo}
          title="Recent"
          buttons={[
            {
              name: "Add miner",
              type: "ACTION",
              value: "ACTION_ADD_MINERS",
            },
            {
              name: "Export",
              type: "DOWNLOAD",
              value: "CSV_ALL_MINERS",
            },
          ]}>
          <System.Table
            data={{
              columns: [
                {
                  key: "availability",
                  name: "Availability",
                  width: "100px",
                  type: "MINER_AVAILABILITY",
                },
                { key: "miner", name: "Miner", width: "100%" },
                { key: "miner-id", name: "Miner ID" },
                { key: "location", name: "Location", type: "LOCATION" },
                {
                  key: "reputation-score",
                  name: "Reputation score",
                  tooltip: "Reputation score explainer",
                  width: "144px",
                },
                {
                  key: "storage-available",
                  name: "Availble storage",
                  width: "120px",
                },
                {
                  key: "storage-proven",
                  name: "Proven storage",
                  tooltip: "Proven storage explainer",
                  width: "144px",
                },
              ],
              rows: [
                {
                  id: 1,
                  availability: 1,
                  miner: "Example Miner A",
                  "miner-id": "t44444",
                  location: 1,
                  "reputation-score": 80,
                  "storage-available": Strings.bytesToSize(244000),
                  "storage-proven": Strings.bytesToSize(22000),
                },
              ],
            }}
            selectedRowId={this.state.table_miners}
            onNavigateTo={this.props.onNavigateTo}
            onAction={this.props.onAction}
            onChange={this._handleChange}
            name="table_miners"
          />
        </Section>
      </ScenePage>
    );
  }
}
