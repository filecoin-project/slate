import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";

const POLLING_INTERVAL = 10000;

export default class SceneFilesFolder extends React.Component {
  _interval;

  loop = async () => {
    let jobs = [];

    this.props.viewer.library[0].children.forEach((d) => {
      if (d.networks && d.networks.includes("FILECOIN")) {
        console.log(d);
        jobs.push({
          ipfs: d.ipfs,
          cid: d.ipfs.replace("/ipfs/", ""),
          job: d.job,
        });
      }
    });

    console.log({ jobs });

    const response = await Actions.checkCIDStatus(jobs);

    console.log(response);

    if (response && response.update) {
      await this.props.onRehydrate();
    }

    if (this._interval) {
      this._interval = window.setTimeout(this.loop, POLLING_INTERVAL);
    }
  };

  componentDidMount() {
    this._interval = this.loop();
  }

  componentWillUnmount() {
    window.clearTimeout(this._interval);
    this._interval = null;
  }

  render() {
    let rows = this.props.viewer.library[0].children.map((each) => {
      return {
        ...each,
        button:
          each.networks && each.networks.includes("FILECOIN")
            ? null
            : "Store on Filecoin",
      };
    });

    const data = {
      columns: [
        { key: "name", name: "File", type: "FILE_LINK" },
        {
          key: "size",
          name: "Size",
          width: "140px",
          type: "FILE_SIZE",
        },
        {
          key: "date",
          name: "Date uploaded",
          width: "160px",
          type: "FILE_DATE",
          tooltip:
            "This date represents when the file was first uploaded to IPFS.",
        },
        {
          key: "networks",
          name: "Networks",
          type: "NETWORK_TYPE",
        },
        {
          key: "storage",
          name: "Storage Deal Status",
          width: "148px",
          type: "STORAGE_DEAL_STATUS",
        },
        {
          key: "button",
          hideLabel: true,
          type: "BUTTON",
          action: "SIDEBAR_FILE_STORAGE_DEAL",
          width: "148px",
        },
      ],
      rows,
    };

    return (
      <ScenePage>
        <System.H1>{this.props.current.name}</System.H1>
        <Section
          onAction={this.props.onAction}
          title={this.props.current.name}
          buttons={[
            {
              name: "Upload to IPFS",
              type: "SIDEBAR",
              value: "SIDEBAR_ADD_FILE_TO_BUCKET",
            },
          ]}
        >
          <System.Table
            key={this.props.current.folderId}
            data={data}
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
            onChange={this._handleChange}
          />
        </Section>
      </ScenePage>
    );
  }
}
