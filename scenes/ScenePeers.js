import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import GLRenderer from "~/components/three/GLRenderer";
import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";

export default class ScenePeers extends React.Component {
  state = {};

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <ScenePage>
        <System.H1>Peers</System.H1>
        <GLRenderer width={1200} height={480} />
        <Section
          onAction={this.props.onAction}
          onNavigateTo={this.props.onNavigateTo}
          title="Peers"
          buttons={[
            {
              name: "Add peer",
              type: "SIDEBAR",
              value: "SIDEBAR_ADD_PEER",
            },
          ]}
        >
          <System.Table
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
            data={{
              columns: [
                {
                  key: "peer-avatar",
                  hideLabel: true,
                  width: "56px",
                  type: "AVATAR",
                },
                {
                  key: "chain-head",
                  name: "Chain Head",
                  tooltip: "What is a Chain Head?",
                  width: "224px",
                },
                {
                  key: "height",
                  name: "Height",
                  tooltip: "Height",
                  width: "120px",
                },
                {
                  key: "location",
                  name: "Location",
                  width: "100%",
                  type: "LOCATION",
                },
                {
                  key: "upload",
                  name: "Upload",
                  width: "120px",
                  type: "BANDWIDTH_UPLOAD",
                },
                {
                  key: "download",
                  name: "Download",
                  width: "120px",
                  type: "BANDWIDTH_DOWNLOAD",
                },
              ],
              rows: this.props.viewer.peers,
            }}
            selectedRowId={this.state.table_peers}
            onChange={this._handleChange}
            name="table_peers"
          />
        </Section>
      </ScenePage>
    );
  }
}
