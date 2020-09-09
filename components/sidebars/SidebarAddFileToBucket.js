import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as System from "~/components/system";
import * as Validations from "~/common/validations";

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

const STYLES_FOCUS = css`
  font-size: ${Constants.typescale.lvl1};
  font-family: ${Constants.font.medium};
  overflow-wrap: break-word;
  width: 100%;

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }
`;

const STYLES_SUBTEXT = css`
  margin-top: 8px;
  font-size: 12px;
`;

const STYLES_ITEM = css`
  margin-top: 16px;
`;

const STYLES_IMAGE_PREVIEW = css`
  display: block;
  width: 100%;
  margin-top: 48px;
`;

const STYLES_STRONG = css`
  display: block;
  margin: 16px 0 4px 0;
  font-weight: 400;
  font-family: ${Constants.font.medium};
  font-size: 0.8rem;
  oveflow-wrap: break-word;
`;

const STYLES_PERFORMANCE = css`
  font-family: ${Constants.font.code};
  font-size: 12px;
  display: block;
  margin: 0 0 8px 0;
`;

export default class SidebarAddFileToBucket extends React.Component {
  _handleUpload = async (e) => {
    e.persist();
    let files = [];
    let fileLoading = {};
    for (let i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i];

      if (!file) {
        alert("We could not find any files to upload.");
        continue;
      }

      const isAllowed = Validations.isFileTypeAllowed(file.type);
      if (!isAllowed) {
        alert(
          `We currently do not accept ${file.type} yet but may in the future.`
        );
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
      alert("We could not find any files to upload.");
      return this.props.onRegisterFileLoading({ fileLoading: null });
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
        alert(
          "Something went wrong with saving your new file. Please refresh your browser."
        );
        continue;
      }

      if (response.error) {
        alert(
          "Something went wrong with saving your new file. Please refresh your browser."
        );
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
    return (
      <React.Fragment>
        <System.P style={{ fontFamily: Constants.font.semiBold }}>
          Upload Data
        </System.P>
        <input
          css={STYLES_FILE_HIDDEN}
          multiple
          type="file"
          id="file"
          onChange={this._handleUpload}
        />

        {this.props.data && this.props.data.decorator === "SLATE" ? (
          <System.P style={{ marginTop: 24 }}>
            This will add data to your Slate named{" "}
            <strong>{this.props.data.slatename}</strong>.
          </System.P>
        ) : null}

        {!this.props.fileLoading ? (
          <System.ButtonPrimary
            full
            type="label"
            htmlFor="file"
            style={{ marginTop: 24 }}
          >
            Add file
          </System.ButtonPrimary>
        ) : null}

        <br />

        {this.props.fileLoading
          ? Object.keys(this.props.fileLoading).map((timestamp) => {
              const p = this.props.fileLoading[timestamp];
              return (
                <React.Fragment key={timestamp}>
                  <strong css={STYLES_STRONG}>{p.name}</strong>

                  <strong css={STYLES_PERFORMANCE}>
                    {Strings.bytesToSize(p.loaded)} /{" "}
                    {Strings.bytesToSize(p.total)}
                  </strong>
                  <DataMeterBar
                    failed={p.failed}
                    leftLabel={p.failed ? "failed" : "uploaded"}
                    rightLabel={p.failed ? null : "total"}
                    bytes={p.loaded}
                    maximumBytes={p.total}
                  />
                </React.Fragment>
              );
            })
          : null}
      </React.Fragment>
    );
  }
}
