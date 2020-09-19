import * as React from "react";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as SVG from "~/common/svg";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { TabGroup } from "~/components/core/TabGroup";
import { ButtonPrimary } from "~/components/system/components/Buttons";
import { dispatchCustomEvent } from "~/common/custom-events";

import ScenePage from "~/components/core/ScenePage";
import DataView from "~/components/core/DataView";
import DataMeter from "~/components/core/DataMeter";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import EmptyState from "~/components/core/EmptyState";

const STYLES_ICONS = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

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
          error: d.error,
        });
      }
    });

    console.log({ jobs });
    if (jobs.length) {
      const response = await Actions.checkCIDStatus(jobs);

      console.log(response);

      if (response && response.update) {
        await this.props.onRehydrate();
      }
    }

    if (this._interval) {
      this._interval = window.setTimeout(this.loop, POLLING_INTERVAL);
    }
  };

  componentDidMount() {
    this.loop();
  }

  componentWillUnmount() {
    window.clearTimeout(this._interval);
    this._interval = null;
  }

  componentDidUpdate(prevProps) {
    if (!this._interval) {
      console.log("Starting loop again");
      this._interval = this.loop();
    }
  }

  render() {
    return (
      <ScenePage>
        <ScenePageHeader
          title="Data"
          actions={
            <ButtonPrimary
              onClick={() => {
                this.props.onAction({
                  type: "SIDEBAR",
                  value: "SIDEBAR_ADD_FILE_TO_BUCKET",
                });
              }}
            >
              Upload data
            </ButtonPrimary>
          }
        />
        <TabGroup disabled tabs={["Usage"]} />
        <DataMeter
          stats={this.props.viewer.stats}
          style={{ margin: "48px 0 48px 0" }}
        />
        {this.props.viewer.library[0].children &&
        this.props.viewer.library[0].children.length ? (
          <DataView
            viewer={this.props.viewer}
            items={this.props.viewer.library[0].children}
            onRehydrate={this.props.onRehydrate}
          />
        ) : (
          <EmptyState>
            <div css={STYLES_ICONS}>
              <SVG.Sound height="24px" style={{ margin: "0 16px" }} />
              <SVG.Document height="24px" style={{ margin: "0 16px" }} />
              <SVG.Image height="24px" style={{ margin: "0 16px" }} />
              <SVG.Book height="24px" style={{ margin: "0 16px" }} />
              <SVG.Video height="24px" style={{ margin: "0 16px" }} />
            </div>
            <div style={{ marginTop: 24 }}>
              Drag and drop files into Slate to upload
            </div>
          </EmptyState>
        )}
      </ScenePage>
    );
  }
}
