import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as SchemaTable from "~/common/schema-table";
import * as Data from "~/common/data";

import { css } from "@emotion/react";

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
    // TODO(jim): Refactor later.
    const slates = {
      columns: [
        { key: "id", id: "id", name: "ID" },
        {
          key: "slatename",
          name: "Slate Name",
          width: "228px",
          type: "SLATE_LINK",
        },
        { key: "url", name: "URL", width: "268px", type: "NEW_WINDOW" },
        {
          key: "public",
          name: "Public",
          type: "SLATE_PUBLIC_TEXT_TAG",
          width: "188px",
        },
      ],
      rows: this.props.viewer.slates.map((each) => {
        return {
          ...each,
          url: `/@${this.props.viewer.username}/${each.slatename}`,
          public: each.data.public,
        };
      }),
    };

    // TODO(jim): Refactor later.
    const slateButtons = [{ name: "Create slate", type: "SIDEBAR", value: "SIDEBAR_CREATE_SLATE" }];

    // TODO(jim): Refactor later.
    const data = {
      columns: [
        { key: "name", name: "Data", type: "FILE_LINK", width: "100%" },
        { key: "type", name: "Type" },
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
          key: "networks",
          name: "Network",
          type: "NETWORK_TYPE",
          width: "188px",
          tooltip: "This data is publicly available to share on the internet!",
        },
      ],
      rows: this.props.viewer.library[0].children.map((each) => {
        return {
          ...each,
          button: "Store on Filecoin",
        };
      }),
    };

    // TODO(jim): Refactor later.
    const dataButtons = [
      {
        name: "View files",
        type: "NAVIGATE",
        value: this.props.viewer.library[0].id,
      },
      {
        name: "Upload data",
        type: "SIDEBAR",
        value: "SIDEBAR_ADD_FILE_TO_BUCKET",
      },
    ];

    // TODO(jim): Refactor later.
    const wallet = {
      columns: [
        { key: "address", name: "Address" },
        { key: "balance", name: "Filecoin", width: "228px" },
        { key: "type", name: "Type", width: "188px", type: "TEXT_TAG" },
      ],
      rows: this.props.viewer.addresses,
    };

    // TODO(jim): Refactor later.
    const walletButtons = [
      {
        name: "View all",
        type: "NAVIGATE",
        value: 2,
      },
    ];

    return (
      <ScenePage>
        <System.H1>Home</System.H1>
        {this.props.viewer.addresses[0] ? (
          <Section title="Wallet addresses" buttons={walletButtons} onAction={this.props.onAction}>
            <System.Table
              data={wallet}
              name="transaction"
              onAction={this.props.onAction}
              onNavigateTo={this.props.onNavigateTo}
            />
          </Section>
        ) : null}

        <Section title="Slates" buttons={slateButtons} onAction={this.props.onAction}>
          <System.Table
            data={slates}
            name="slate"
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
          />
        </Section>

        {this.props.viewer.library[0] ? (
          <Section title="Recent data" buttons={dataButtons} onAction={this.props.onAction}>
            <System.Table
              data={data}
              name="data"
              onAction={this.props.onAction}
              onNavigateTo={this.props.onNavigateTo}
            />
          </Section>
        ) : null}
      </ScenePage>
    );
  }
}
