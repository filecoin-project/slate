import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Validations from "~/common/validations";

import { css } from "@emotion/react";
import { DataMeterBar } from "~/components/core/DataMeter";

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
`;

export default class SidebarAddFileToBucket extends React.Component {
  _handleUpload = async (e) => {
    console.log("handle upload");

    e.persist();
    let files = [];
    let fileLoading = {};
    for (let i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i];

      if (!file) {
        alert("TODO: Something went wrong");
        continue;
      }

      const isAllowed = Validations.isFileTypeAllowed(file.type);
      if (!isAllowed) {
        alert("TODO: File type is not allowed, yet.");
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
      alert("TODO: Files not supported error");
      return this.props.onRegisterFileLoading({ fileLoading: null });
    }

    this.props.onRegisterFileLoading({ fileLoading });

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const slate =
        this.props.data && this.props.data.slateId
          ? { id: this.props.data.slateId }
          : null;

      const response = await this.props.onUploadFile({
        file,
        slate,
      });

      if (!response) {
        alert("TODO: File upload error");
        continue;
      }

      if (response.error) {
        alert("TODO: File upload error");
        continue;
      }
    }

    console.log("file upload");

    await this.props.onRehydrate({ resetFiles: true });
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

        <System.ButtonPrimary
          full
          type="label"
          htmlFor="file"
          style={{ marginTop: 24 }}
          loading={!!this.props.fileLoading}
        >
          Add file
        </System.ButtonPrimary>

        <br />

        {this.props.fileLoading
          ? Object.keys(this.props.fileLoading).map((timestamp) => {
              const p = this.props.fileLoading[timestamp];
              return (
                <React.Fragment key={timestamp}>
                  <strong css={STYLES_STRONG}>{p.name}</strong>
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
