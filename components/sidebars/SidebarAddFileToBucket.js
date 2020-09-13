import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as System from "~/components/system";
import * as Validations from "~/common/validations";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { DataMeterBar } from "~/components/core/DataMeter";
import { dispatchCustomEvent } from "~/common/custom-events";

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
  padding: 8px;
`;

const STYLES_FILE_NAME = css`
  min-width: 10%;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.9rem;
`;

const STYLES_FILE_STATUS = css`
  flex-shrink: 0;
  margin-left: 16px;
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
  _handleUpload = async (e) => {
    e.persist();
    let files = [];
    let fileLoading = {};
    for (let i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i];

      if (!file) {
        dispatchCustomEvent({
          name: "create-alert",
          detail: {
            alert: { message: "We could not find any files to upload." },
          },
        });
        continue;
      }

      const isAllowed = Validations.isFileTypeAllowed(file.type);
      if (!isAllowed) {
        dispatchCustomEvent({
          name: "create-alert",
          detail: {
            alert: {
              message: `We currently do not accept ${file.type} yet but may in the future!`,
            },
          },
        });
        continue;
      }

      files.push(file);
      fileLoading[`${file.lastModified}-${file.name}`] = {
        name: file.name,
        loaded: 0,
        total: file.size,
      };
    }

    if (!files.length) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: { message: "We could not find any files to upload." },
        },
      });
      // return this.props.onRegisterFileLoading({ fileLoading: null });
    }

    this.props.onRegisterFileLoading({ fileLoading });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const slate =
        this.props.data && this.props.data.id
          ? { id: this.props.data.id }
          : null;

      const response = await this.props.onUploadFile({
        file,
        slate,
      });

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
        continue;
      }

      if (response.error) {
        dispatchCustomEvent({
          name: "create-alert",
          detail: { alert: { decorator: response.decorator } },
        });
        continue;
      }
    }

    await this.props.onRehydrate({ resetFiles: true });

    dispatchCustomEvent({
      name: "remote-update-slate-screen",
      detail: {},
    });
  };

  render() {
    let loaded = 0;
    let total = 0;
    if (this.props.fileLoading) {
      for (let file of Object.values(this.props.fileLoading)) {
        if (typeof file.loaded === "number" && typeof file.total === "number") {
          total += curr.total;
          loaded += curr.loaded;
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
          Upload Data
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
          {this.props.data &&
          (this.props.data.slatename ||
            (this.props.data.data && this.props.data.data.name)) ? (
            <span>
              {" "}
              to{" "}
              <strong>
                {this.props.data.data.name || this.props.data.slatename}
              </strong>
            </span>
          ) : (
            ""
          )}
          .
        </System.P>

        <System.ButtonPrimary
          full
          type="label"
          htmlFor="file"
          style={{ marginTop: 24 }}
        >
          Add file
        </System.ButtonPrimary>

        <br />
        {this.props.fileLoading ? (
          <div css={STYLES_BAR_CONTAINER}>
            <strong css={STYLES_PERFORMANCE}>
              {Strings.bytesToSize(loaded)} / {Strings.bytesToSize(total)}
            </strong>
            <DataMeterBar
              failed={false}
              leftLabel={"uploaded"}
              rightLabel={"total"}
              bytes={loaded}
              maximumBytes={total}
            />
          </div>
        ) : null}
        <div style={{ marginTop: 24 }}>
          {this.props.fileLoading
            ? Object.values(this.props.fileLoading).map((file) => (
                <div css={STYLES_FILE_LINE}>
                  <div css={STYLES_FILE_NAME}>{file.name}</div>
                  <div css={STYLES_FILE_STATUS}>
                    {file.loaded === file.total ? (
                      <SVG.CheckBox height="24px" />
                    ) : file.failed ? (
                      <SVG.Dismiss height="24px" />
                    ) : (
                      <System.LoaderSpinner
                        style={{ width: "20px", height: "20px", margin: "2px" }}
                      />
                    )}
                  </div>
                </div>
              ))
            : null}
        </div>
      </React.Fragment>
    );
  }
}
