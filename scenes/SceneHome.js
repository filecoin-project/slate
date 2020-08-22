import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import DataView from "~/components/core/DataView";
import ScenePageHeader from "~/components/core/ScenePageHeader";

const STYLES_NUMBER = css`
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
`;

export default class SceneHome extends React.Component {
  render() {
    // TODO(jim): Refactor later.
    const slates = {
      columns: [
        {
          key: "slatename",
          name: "Slate Name",
          width: "100%",
          type: "SLATE_LINK",
        },
        { key: "url", name: "URL", width: "268px", type: "NEW_WINDOW" },
        { key: "id", id: "id", name: "Slate ID", width: "296px" },
        {
          key: "objects",
          name: "Objects",
        },
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
          url: `https://slate.host/${this.props.viewer.username}/${
            each.slatename
          }`,
          public: each.data.public,
          objects: <span css={STYLES_NUMBER}>{each.data.objects.length}</span>,
        };
      }),
    };

    // TODO(jim): Refactor later.
    const slateButtons = [
      { name: "Create slate", type: "SIDEBAR", value: "SIDEBAR_CREATE_SLATE" },
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
        value: "V1_NAVIGATION_WALLET",
      },
    ];

    return (
      <ScenePage>
        <ScenePageHeader title="Home [WIP]">
          This scene is currently a work in progress.
        </ScenePageHeader>

        {this.props.viewer.addresses[0] ? (
          <Section
            title="Wallet addresses"
            buttons={walletButtons}
            onAction={this.props.onAction}
          >
            <System.Table
              data={wallet}
              name="transaction"
              onAction={this.props.onAction}
              onNavigateTo={this.props.onNavigateTo}
            />
          </Section>
        ) : null}

        <Section
          title="Slates"
          buttons={slateButtons}
          onAction={this.props.onAction}
        >
          <System.Table
            data={slates}
            name="slate"
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
          />
        </Section>

        {this.props.viewer.library[0] ? (
          <DataView
            buttons={[
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
            ]}
            viewer={this.props.viewer}
            items={this.props.viewer.library[0].children}
            onAction={this.props.onAction}
            onRehydrate={this.props.onRehydrate}
          />
        ) : null}
      </ScenePage>
    );
  }
}
