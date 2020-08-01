import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";
import { Table } from "~/components/system/components/Table";
import { StatUpload, StatDownload } from "~/components/system/components/Stat";

let genericImg =
  "https://hub.textile.io/ipfs/bafybeiblly23jomdjjiq7ilth667npcfm5llqb5xfstodbbfa5pxtoek7u";

const STYLES_BUTTON = `
  font-family: ${Constants.font.text};
  font-size: ${Constants.typescale.lvl1};
  cursor: pointer;
  background: none;
  border: none;
  outline: none;
  padding: 8px;

  :hover {
    background-color: ${Constants.system.gray};
    border-radius: 4px;
  }
`;

const STYLES_ACCEPT_BUTTON = css`
  ${STYLES_BUTTON}
  color: ${Constants.system.brand};
`;

const STYLES_REJECT_BUTTON = css`
  ${STYLES_BUTTON}
  color: ${Constants.system.black};
`;

const centerLeftStyle = {
  display: "flex",
  height: "100%",
  alignItems: "center",
};

const centerRightStyle = {
  display: "flex",
  height: "100%",
  alignItems: "center",
  justifyContent: "flex-end",
};

export class FriendsList extends React.Component {
  state = {
    selectedRowId: null,
  };

  _handleClick = (e) => {
    this.setState({ selectedRowId: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{ fontSize: Constants.typescale.lvl2, marginBottom: "8px" }}
        >
          Requests
        </div>
        <Table
          noColor
          noLabel
          data={{
            columns: [
              {
                key: "image",
                width: "64px",
                style: centerLeftStyle,
              },
              {
                key: "user",
                width: "100%",
                style: centerLeftStyle,
              },
              {
                key: "accept",
                width: "92px",
                style: centerRightStyle,
                contentStyle: { padding: "0px" },
              },
              {
                key: "reject",
                width: "92px",
                style: centerRightStyle,
                contentStyle: { padding: "0px" },
              },
            ],
            rows: this.props.data.requests.map((each) => {
              return {
                id: each.user,
                user: (
                  <a
                    href={"/" + each.user}
                    target="_blank"
                    style={{
                      color: Constants.system.black,
                      fontSize: Constants.typescale.lvl1,
                    }}
                  >
                    {each.user}
                  </a>
                ),
                image: (
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      overflow: "hidden",
                      borderRadius: "4px",
                    }}
                  >
                    <img
                      src={each.img || genericImg}
                      alt=""
                      style={{ width: "40px" }}
                    />
                  </div>
                ),
                accept: (
                  <button type="button" css={STYLES_ACCEPT_BUTTON}>
                    Accept
                  </button>
                ),
                reject: (
                  <button type="button" css={STYLES_REJECT_BUTTON}>
                    Reject
                  </button>
                ),
              };
            }),
          }}
        />
        <br />
        <br />
        <div
          style={{ fontSize: Constants.typescale.lvl2, marginBottom: "8px" }}
        >
          Peers
        </div>
        <Table
          noColor
          noLabel
          selectedRowId={this.state.selectedRowId}
          onClick={this._handleClick}
          data={{
            columns: [
              {
                key: "image",
                width: "64px",
                style: centerLeftStyle,
              },
              {
                key: "user",
                width: "100%",
                style: centerLeftStyle,
              },
            ],
            rows: this.props.data.friends.map((each) => {
              return {
                id: each.user,
                user: (
                  <a
                    href={"/" + each.user}
                    target="_blank"
                    style={{
                      color: Constants.system.black,
                      fontSize: Constants.typescale.lvl1,
                    }}
                  >
                    {each.user}
                  </a>
                ),
                image: (
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      overflow: "hidden",
                      borderRadius: "4px",
                    }}
                  >
                    <img
                      src={each.img || genericImg}
                      alt=""
                      style={{ width: "40px" }}
                    />
                  </div>
                ),
                children: (
                  <div>
                    <div
                      style={{
                        display: "grid",
                        alignItems: "center",
                        gridTemplateColumns: "1fr 1fr",
                      }}
                    >
                      {each.info.location ? (
                        <div>
                          <SVG.LocationPin
                            height="20px"
                            style={{
                              position: "relative",
                              top: "5px",
                              marginRight: "8px",
                            }}
                          />
                          {each.info.location}
                        </div>
                      ) : null}
                      <div style={{ justifySelf: "end" }}>
                        <br />
                        <StatUpload
                          size={each.info.upload}
                          style={{ marginRight: "16px" }}
                        />
                        <StatDownload size={each.info.download} />
                      </div>
                    </div>
                    <br />
                    <div>
                      <strong>Height</strong>: {each.info.height}
                    </div>
                    <br />
                    <div style={{ wordBreak: "break-word" }}>
                      <strong>Chain Head</strong>: {each.info.chainHead}
                    </div>
                  </div>
                ),
              };
            }),
          }}
        />
      </React.Fragment>
    );
  }
}
