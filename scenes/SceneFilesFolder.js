import * as React from "react";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as SVG from "~/common/svg";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { TabGroup } from "~/components/core/TabGroup";
import {
  ButtonPrimary,
  ButtonWarning,
} from "~/components/system/components/Buttons";
import { dispatchCustomEvent } from "~/common/custom-events";

import ScenePage from "~/components/core/ScenePage";
import DataView from "~/components/core/DataView";
import DataMeter from "~/components/core/DataMeter";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import EmptyState from "~/components/core/EmptyState";

const VIEW_LIMIT = 20;

const STYLES_ICON_BOX = css`
  height: 32px;
  width: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 16px;
`;

const STYLES_HEADER_LINE = css`
  display: flex;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 42px;
`;

const STYLES_ACTION_ROW = css`
  display: flex;
  align-items: center;
`;

const STYLES_LEFT = css`
  width: 100%;
  min-width: 10%;
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
`;

const STYLES_ICON_ELEMENT = css`
  height: 40px;
  width: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #565151;
  user-select: none;
  cursor: pointer;
  pointer-events: auto;
  margin: 16px 8px;

  :hover {
    color: ${Constants.system.brand};
  }

  svg {
    transform: rotate(0deg);
    transition: 200ms ease transform;
  }
`;

const STYLES_ICONS = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const POLLING_INTERVAL = 10000;

export default class SceneFilesFolder extends React.Component {
  _interval;

  state = {
    view: "grid",
    startIndex: 0,
    checked: {},
  };

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

  _increment = (direction) => {
    if (
      direction > 0 &&
      this.state.startIndex + VIEW_LIMIT <
        this.props.viewer.library[0].children.length
    ) {
      this.setState({ startIndex: this.state.startIndex + VIEW_LIMIT });
    } else if (direction < 0 && this.state.startIndex - VIEW_LIMIT >= 0) {
      this.setState({ startIndex: this.state.startIndex - VIEW_LIMIT });
    }
  };

  _handleCheckBox = (e) => {
    let checked = this.state.checked;
    if (e.target.value === false) {
      delete checked[e.target.name];
      this.setState({ checked });
      return;
    }
    this.setState({
      checked: { ...this.state.checked, [e.target.name]: true },
    });
  };

  _handleDeleteFiles = async (e) => {
    const message = `Are you sure you want to delete these ${
      Object.keys(this.state.checked).length
    } files? They will be deleted from your slates as well`;
    if (!window.confirm(message)) {
      return;
    }
    let cids = Object.keys(this.state.checked).map((id) => {
      let index = parseInt(id.replace("checkbox-", ""));
      return this.props.viewer.library[0].children[index].ipfs.replace(
        "/ipfs/",
        ""
      );
    });
    console.log(cids);

    const response = await Actions.deleteBucketItems({ cids });
    if (!response) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message:
              "We're having trouble connecting right now. Please try again later",
          },
        },
      });
      return null;
    }
    if (response.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { decorator: response.decorator } },
      });
      return null;
    }
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: { message: "Files successfully deleted!", status: "INFO" },
      },
    });
  };

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
          <React.Fragment>
            <div css={STYLES_HEADER_LINE}>
              <TabGroup disabled tabs={["Uploads"]} style={{ margin: 0 }} />
              <React.Fragment>
                <div
                  css={STYLES_ICON_BOX}
                  onClick={() => {
                    this.setState({ view: "grid" });
                  }}
                >
                  <SVG.GridView
                    style={{
                      color:
                        this.state.view === "grid"
                          ? Constants.system.black
                          : "rgba(0,0,0,0.25)",
                    }}
                    height="24px"
                  />
                </div>
                <div
                  css={STYLES_ICON_BOX}
                  onClick={() => {
                    this.setState({ view: "list" });
                  }}
                >
                  <SVG.ListView
                    style={{
                      color:
                        this.state.view === "list"
                          ? Constants.system.black
                          : "rgba(0,0,0,0.25)",
                    }}
                    height="24px"
                  />
                </div>
              </React.Fragment>
            </div>
            <DataView
              view={this.state.view}
              viewer={this.props.viewer}
              items={this.props.viewer.library[0].children.slice(
                this.state.startIndex,
                this.state.startIndex + VIEW_LIMIT
              )}
              startIndex={this.state.startIndex}
              checked={this.state.checked}
              onCheckBox={this._handleCheckBox}
              onRehydrate={this.props.onRehydrate}
            />
            <div css={STYLES_ACTION_ROW}>
              <div css={STYLES_LEFT}>
                {Object.keys(this.state.checked).length ? (
                  <ButtonWarning
                    style={{ width: 160 }}
                    onClick={this._handleDeleteFiles}
                  >
                    Delete {Object.keys(this.state.checked).length} file
                    {Object.keys(this.state.checked).length > 1 ? "s" : ""}
                  </ButtonWarning>
                ) : null}
              </div>
              <div css={STYLES_RIGHT}>
                <span
                  css={STYLES_ICON_ELEMENT}
                  style={
                    this.state.startIndex - VIEW_LIMIT >= 0
                      ? null
                      : {
                          cursor: "not-allowed",
                          color: Constants.system.border,
                        }
                  }
                  onClick={() => this._increment(-1)}
                >
                  <SVG.NavigationArrow
                    height="24px"
                    style={{ transform: `rotate(180deg)` }}
                  />
                </span>
                <span
                  css={STYLES_ICON_ELEMENT}
                  style={
                    this.state.startIndex + VIEW_LIMIT <
                    this.props.viewer.library[0].children.length
                      ? null
                      : {
                          cursor: "not-allowed",
                          color: Constants.system.border,
                        }
                  }
                  onClick={() => this._increment(1)}
                >
                  <SVG.NavigationArrow height="24px" />
                </span>
              </div>
            </div>
          </React.Fragment>
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
