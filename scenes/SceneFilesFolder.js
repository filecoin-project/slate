import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";

export default class SceneFilesFolder extends React.Component {
  state = {};

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.props.data.children);
    let rows = [];
    if (this.props.data.children) {
      rows = [...this.props.data.children];
    }

    const data = {
      columns: [
        { key: "icon", hideLabel: true, width: "32px", type: "ICON" },
        { key: "file", name: "File", width: "100%", type: "FILE_LINK" },
        { key: "size", name: "Size", width: "140px", type: "FILE_SIZE" },
        {
          key: "date",
          name: "Date uploaded",
          width: "160px",
          tooltip:
            "This date represents when the file was first uploaded to IPFS.",
          type: "FILE_DATE",
        },
        {
          key: "network",
          name: "Network",
          type: "NETWORK_TYPE",
        },
      ],
      rows,
    };

    return (
      <ScenePage>
        <Section
          onAction={this.props.onAction}
          onNavigateTo={this.props.onNavigateTo}
          title={this.props.data.name}
          buttons={[
            {
              name: "Upload to IPFS",
              type: "SIDEBAR",
              value: "SIDEBAR_FILE_STORAGE_DEAL",
            },
          ]}
        >
          <System.Table
            key={this.props.data.folderId}
            data={data}
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
            selectedRowId={this.state.table_local_file}
            onChange={this._handleChange}
            name="table_local_file"
          />
        </Section>
      </ScenePage>
    );
  }
}
