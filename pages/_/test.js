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

    const url = "https://uploads.slate.host/api/public/ed07eb13-7176-4ee5-ab94-c4a1c2227fe4";
    let file = e.target.files[0];
    let data = new FormData();

    data.append("data", file);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Basic SLAf82a5e64-4683-4e97-8cf6-658bd34c0b78TE",
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
        <System.GlobalTooltip />
        <System.H1>Component Library Test</System.H1>
        <br />
        <br />
        <System.P>
          If this works. That means the component library bundle is working correctly.
        </System.P>
        <br />
        <br />
        <div style={{ marginTop: 24 }}>
          <input css={STYLES_FILE_HIDDEN} type="file" id="file" onChange={this._handleUpload} />
          <System.ButtonPrimary style={{ margin: "0 16px 16px 0" }} type="label" htmlFor="file">
            Upload file To network with API
          </System.ButtonPrimary>
          <System.TooltipAnchor
            type="body"
            id="another-unique-tooltip-id"
            tooltip="Hello friends!"
          />
        </div>
      </div>
    );
  }
}
