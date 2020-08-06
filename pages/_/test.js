import * as React from "react";
import * as System from "~/dist";

import { css } from "@emotion/react";

const STYLES_FILE_HIDDEN = css`
  height: 1px;
  width: 1px;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: -1px;
  left: -1px;
`;

export default class SlateReactSystemPage extends React.Component {
  async componentDidMount() {
    const url = "/api/v1/get";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic --",
      },
    });

    const json = await response.json();
    console.log(json);
  }

  _handleUpload = async (e) => {
    e.persist();

    const url = "/api/v1/upload-data/--";
    let file = e.target.files[0];
    let data = new FormData();

    data.append("data", file);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic --",
      },
      body: data,
    });

    const json = await response.json();
    console.log(json);
  };

  render() {
    console.log(System.Constants);

    return (
      <div>
        <System.H1>Component Library Test</System.H1>
        <br />
        <br />
        <System.P>
          If this works. That means the component library bundle is working
          correctly.
        </System.P>
        <br />
        <br />
        <div style={{ marginTop: 24 }}>
          <input
            css={STYLES_FILE_HIDDEN}
            type="file"
            id="file"
            onChange={this._handleUpload}
          />
          <System.ButtonPrimary
            style={{ margin: "0 16px 16px 0" }}
            type="label"
            htmlFor="file"
          >
            Upload File To Network With API
          </System.ButtonPrimary>
          <System.TooltipAnchor tooltip="Hello friends!!" />
        </div>
      </div>
    );
  }
}
