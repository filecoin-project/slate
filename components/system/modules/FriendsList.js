import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { Table } from "~/components/system/components/Table";
import { StatUpload, StatDownload } from "~/components/system/components/Stat";

let genericImg = `${Constants.gateways.ipfs}/bafybeiblly23jomdjjiq7ilth667npcfm5llqb5xfstodbbfa5pxtoek7u`;

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

const STYLES_HEADER = css`
  font-size: ${Constants.typescale.lvl2};
  margin-bottom: 8px;
`;

const STYLES_ACCEPT_BUTTON = css`
  ${STYLES_BUTTON}
  color: ${Constants.system.brand};
`;

const STYLES_REJECT_BUTTON = css`
  ${STYLES_BUTTON}
  color: ${Constants.system.black};
`;

const STYLES_CENTER_LEFT = {
  display: "flex",
  height: "100%",
  alignItems: "center",
};

const STYLES_CENTER_RIGHT = {
  display: "flex",
  height: "100%",
  alignItems: "center",
  justifyContent: "flex-end",
};

const ExpandSection = ({ friend }) => {
  return (
    <div>
      <div
        style={{
          display: "grid",
          alignItems: "center",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        {friend.location ? (
          <div>
            <SVG.LocationPin
              height="20px"
              style={{
                position: "relative",
                top: "5px",
                marginRight: "8px",
              }}
            />
            {friend.location}
          </div>
        ) : null}
        <div style={{ justifySelf: "end" }}>
          <br />
          <StatUpload size={friend.upload} style={{ marginRight: "16px" }} />
          <StatDownload size={friend.download} />
        </div>
      </div>
      <br />
      <div>
        <strong>Height</strong>: {friend.height}
      </div>
      <br />
      <div style={{ wordBreak: "break-word" }}>
        <strong>Chain Head</strong>: {friend.chainHead}
      </div>
    </div>
  );
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
        <div css={STYLES_HEADER}>Requests</div>
        <Table
          noColor
          noLabel
          data={{
            columns: [
              {
                key: "image",
                width: "64px",
                style: STYLES_CENTER_LEFT,
              },
              {
                key: "user",
                width: "100%",
                style: STYLES_CENTER_LEFT,
              },
              {
                key: "accept",
                width: "92px",
                style: STYLES_CENTER_RIGHT,
                contentStyle: { padding: "0px" },
              },
              {
                key: "reject",
                width: "92px",
                style: STYLES_CENTER_RIGHT,
                contentStyle: { padding: "0px" },
              },
            ],
            rows: this.props.data.requests.map((each) => {
              return {
                id: each.user,
                user: (
                  <a
                    href={`/${each.user}`}
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
        <div css={STYLES_HEADER}>Peers</div>
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
                style: STYLES_CENTER_LEFT,
              },
              {
                key: "user",
                width: "100%",
                style: STYLES_CENTER_LEFT,
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
                children: <ExpandSection friend={each.info} />,
              };
            }),
          }}
        />
      </React.Fragment>
    );
  }
}
