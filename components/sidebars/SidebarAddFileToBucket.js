import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as System from "~/components/system";
import * as Validations from "~/common/validations";
import * as Store from "~/common/store";
import * as SVG from "~/common/svg";

import { css } from "@emotion/core";
import { DataMeterBar } from "~/components/core/DataMeter";
import { dispatchCustomEvent } from "~/common/custom-events";
import { SidebarWarningMessage } from "~/components/core/WarningMessage";

const STYLES_FILE_HIDDEN = css`
  height: 1px;
  width: 1px;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: -1px;
  left: -1px;
`;

const STYLES_FILE_LINE = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 16px;
  background-color: ${Constants.system.white};
  margin-bottom: 1px;
`;

const STYLES_FILE_NAME = css`
  min-width: 10%;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.9rem;
  font-family: ${Constants.font.medium};
`;

const STYLES_LEFT = css`
  width: 100%;
  min-width: 10%;
  display: flex;
  align-items: center;
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const STYLES_FILE_STATUS = css`
  flex-shrink: 0;
  margin-right: 16px;
  display: flex;
  align-items: center;
`;

const STYLES_BAR_CONTAINER = css`
  background: ${Constants.system.white};
  border-radius: 4px;
  padding: 16px;
  margin-top: 48px;
`;

const STYLES_PERFORMANCE = css`
  font-family: ${Constants.font.code};
  font-size: 12px;
  display: block;
  margin: 0 0 8px 0;
`;

const STYLES_ICONS = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 64px 0;
`;

export default class SidebarAddFileToBucket extends React.Component {
  _handleUpload = (e) => {
    this.props.onUpload({
      files: e.target.files,
      slate:
        this.props.current && this.props.current.slateId
          ? { id: this.props.current.slateId }
          : null,
    });
    this.props.onCancel();
  };

  _handleCancel = (e, key) => {
    e.preventDefault();
    e.stopPropagation();
    dispatchCustomEvent({ name: `cancel-${key}` }); //NOTE(martina): so that will cancel if is in the middle of uploading
    Store.setCancelled(key); //NOTE(martina): so that will cancel if hasn't started uploading yet
    this.props.onAction({ type: "REGISTER_FILE_CANCELLED", value: key }); //NOTE(martina): so that fileLoading registers it
  };

  render() {
    let loaded = 0;
    let total = 0;
    if (this.props.fileLoading) {
      for (let file of Object.values(this.props.fileLoading)) {
        if (typeof file.loaded === "number" && typeof file.total === "number") {
          total += file.total;
          loaded += file.loaded;
        }
      }
    }
    return (
      <React.Fragment>
        <System.P
          style={{
            fontFamily: Constants.font.semiBold,
            fontSize: Constants.typescale.lvl3,
            marginBottom: "64px",
          }}
        >
          Upload data
        </System.P>
        <input
          css={STYLES_FILE_HIDDEN}
          multiple
          type="file"
          id="file"
          onChange={this._handleUpload}
        />
        <div css={STYLES_ICONS}>
          <SVG.Sound height="24px" style={{ margin: "0 16px" }} />
          <SVG.Document height="24px" style={{ margin: "0 16px" }} />
          <SVG.Image height="24px" style={{ margin: "0 16px" }} />
          <SVG.Book height="24px" style={{ margin: "0 16px" }} />
          <SVG.Video height="24px" style={{ margin: "0 16px" }} />
        </div>
        <System.P style={{ marginTop: 24 }}>
          Click below or drop a file anywhere on the page to upload a file
          {this.props.current &&
          (this.props.current.slatename ||
            (this.props.current.data && this.props.current.data.name)) ? (
            <span>
              {" "}
              to <strong>{Strings.getPresentationSlateName(this.props.current)}</strong>
            </span>
          ) : (
            ""
          )}
          .
        </System.P>

        <SidebarWarningMessage />

        <System.ButtonPrimary full type="label" htmlFor="file" style={{ marginTop: 24 }}>
          Add file
        </System.ButtonPrimary>

        <br />
        {this.props.fileLoading && Object.keys(this.props.fileLoading).length ? (
          <div css={STYLES_BAR_CONTAINER}>
            <strong css={STYLES_PERFORMANCE}>
              {Strings.bytesToSize(loaded)} / {Strings.bytesToSize(total)}
            </strong>
            <DataMeterBar bytes={loaded} maximumBytes={total} />
          </div>
        ) : null}
        <div style={{ marginTop: 24 }}>
          {this.props.fileLoading
            ? Object.entries(this.props.fileLoading).map((entry) => {
                let file = entry[1];
                return (
                  <div css={STYLES_FILE_LINE} key={file.name}>
                    <span css={STYLES_LEFT}>
                      <div css={STYLES_FILE_STATUS}>
                        {file.failed ? (
                          <SVG.Alert
                            height="24px"
                            style={{
                              color: Constants.system.red,
                              pointerEvents: "none",
                            }}
                          />
                        ) : file.cancelled ? (
                          <SVG.Dismiss
                            height="24px"
                            style={{
                              color: Constants.system.gray,
                              pointerEvents: "none",
                            }}
                          />
                        ) : file.loaded === file.total ? (
                          <SVG.CheckBox height="24px" />
                        ) : (
                          <System.LoaderSpinner
                            style={{
                              width: "20px",
                              height: "20px",
                              margin: "2px",
                            }}
                          />
                        )}
                      </div>
                      <div
                        css={STYLES_FILE_NAME}
                        style={
                          file.failed
                            ? { color: Constants.system.red }
                            : file.cancelled
                            ? { color: Constants.system.gray }
                            : null
                        }
                      >
                        {file.name}
                      </div>
                    </span>
                    {file.loaded === file.total || file.failed || file.cancelled ? (
                      <div css={STYLES_RIGHT} style={{ height: 24, width: 24 }} />
                    ) : (
                      <span
                        css={STYLES_RIGHT}
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={(e) => this._handleCancel(e, entry[0])}
                      >
                        <SVG.Dismiss
                          height="24px"
                          className="boundary-ignore"
                          style={{
                            color: Constants.system.gray,
                            pointerEvents: "none",
                          }}
                        />
                      </span>
                    )}
                  </div>
                );
              })
            : null}
        </div>
      </React.Fragment>
    );
  }
}
