import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as System from "~/components/system";

import { css } from "@emotion/react";

const STYLES_CONTAINER = css`
  font-family: ${Constants.font.text};
  box-sizing: border-box;
  border-radius: 4px;
  background-color: ${Constants.system.white};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  border: 1px solid ${Constants.system.border};
  width: 100%;
`;

export class FilecoinDealsList extends React.Component {
  state = {
    selectedRowId: null,
  };

  _handleChange = (e) => {
    this.setState({ selectedRowId: e.target.value });
  };

  render() {
    return (
      <div css={STYLES_CONTAINER} style={this.props.style}>
        <System.Table
          data={{
            columns: [
              {
                key: "type",
                name: "Type",
                type: "DEAL_DIRECTION",
                width: "104px",
              },
              {
                key: "address",
                name: "Address",
                width: "196px",
              },
              {
                key: "rootCid",
                name: "Root cid",
                width: "196px",
              },
              {
                key: "status",
                name: "Status",
                type: "TRANSACTION_STATUS",
                width: "104px",
              },
              {
                key: "time",
                name: "Time",
                width: "104px",
              },
            ],
            rows: this.props.data.map((each) => {
              return {
                id: each.rootCid,
                address: each.addr,
                rootCid: each.rootCid,
                type: "1",
                status: each.pending ? "2" : "1",
                time: each.time,
                children: (
                  <div>
                    {Object.keys(each.dealInfo).map((key) => (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 3fr",
                        }}
                      >
                        <b>{key}</b>
                        <span>{each.dealInfo[key]}</span>
                      </div>
                    ))}
                  </div>
                ),
              };
            }),
          }}
          selectedRowId={this.state.selectedRowId}
          onChange={this._handleChange}
          name={this.props.name}
        />
      </div>
    );
  }
}
