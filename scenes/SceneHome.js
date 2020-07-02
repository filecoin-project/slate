import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as SchemaTable from "~/common/schema-table";
import * as Data from "~/common/data";

import { css } from "@emotion/react";

import GLRenderer from "~/components/three/GLRenderer";
import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";

const STYLES_ROW = css`
  display: flex;
  margin-top: 24px;
  width: 100%;

  :first-child {
    margin-top: 0px;
  }
`;

const STYLES_COLUMN = css`
  display: inline-flex;
  padding: 0 12px 0 12px;
  max-width: 25%;
  width: 100%;

  :first-child {
    padding: 0 12px 0 0;
  }

  :last-child {
    padding: 0 0 0 12px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export default class SceneHome extends React.Component {
  state = {
    data: null,
    transaction: null,
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <ScenePage>
        {this.props.viewer.library[0] ? (
          <Section
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
            title="Recent data"
            buttons={[
              {
                name: "View files",
                type: "NAVIGATE",
                value: this.props.viewer.library[0].folderId,
              },
              {
                name: "Store file on network",
                type: "SIDEBAR",
                value: "SIDEBAR_FILE_STORAGE_DEAL",
              },
            ]}>
            <System.Table
              data={{
                columns: [
                  { key: "file", name: "File", type: "FILE_LINK" },
                  {
                    key: "size",
                    name: "Size",
                    width: "140px",
                    type: "FILE_SIZE",
                  },
                  {
                    key: "date",
                    name: "Date uploaded",
                    width: "160px",
                    type: "FILE_DATE",
                  },
                  {
                    key: "storage_status",
                    name: "Status",
                    type: "DEAL_STATUS",
                  },
                ],
                rows: this.props.viewer.library[0].children,
              }}
              selectedRowId={this.state.data}
              onChange={this._handleChange}
              onAction={this.props.onAction}
              onNavigateTo={this.props.onNavigateTo}
              name="data"
            />
          </Section>
        ) : null}

        {this.props.viewer.addresses[0] ? (
          <Section
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
            title="Wallet addresses"
            buttons={[
              {
                name: "View all",
                type: "NAVIGATE",
                value: 2,
              },
            ]}>
            <System.Table
              data={{
                columns: [
                  { key: "address", name: "Address" },
                  { key: "balance", name: "Filecoin", width: "228px" },
                  { key: "type", name: "Type" },
                ],
                rows: this.props.viewer.addresses,
              }}
              selectedRowId={this.state.transaction}
              onChange={this._handleChange}
              onAction={this.props.onAction}
              onNavigateTo={this.props.onNavigateTo}
              name="transaction"
            />
          </Section>
        ) : null}
      </ScenePage>
    );
  }
}
