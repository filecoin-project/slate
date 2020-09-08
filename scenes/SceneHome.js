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

const STYLES_VIDEO_BIG = css`
  display: block;
  background-color: ${Constants.system.moonstone};
  padding: 0;
  outline: 0;
  margin: 48px auto 88px auto;
  border-radius: 4px;
  width: 100%;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: ${Constants.sizes.tablet}px) {
    margin: 32px auto 64px auto;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 24px auto 48px auto;
  }
`;

export default class SceneHome extends React.Component {
  render() {
    // TODO(jim): Refactor later.
    const slates = {
      columns: [
        {
          key: "name",
          name: "Slate Name",
          width: "100%",
          type: "SLATE_LINK",
        },
        { key: "url", width: "268px", name: "URL", type: "NEW_WINDOW" },
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
          url: `https://slate.host/${this.props.viewer.username}/${each.slatename}`,
          name: each.data.name,
          public: each.data.public,
          objects: <span css={STYLES_NUMBER}>{each.data.objects.length}</span>,
        };
      }),
    };

    // TODO(jim): Refactor later.
    const slateButtons = [
      { name: "Create slate", type: "SIDEBAR", value: "SIDEBAR_CREATE_SLATE" },
    ];

    /*
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
    */

    /*
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
  */

    return (
      <ScenePage>
        <ScenePageHeader title="Home">
          {this.props.viewer.library[0].length
            ? "Welcome back! Here is your data."
            : "Welcome to Slate! Here's how to get started."}
        </ScenePageHeader>

        {this.props.viewer.library[0].length ? (
          <div style={{ marginTop: "48px" }}>
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
          </div>
        ) : (
          <video
            css={STYLES_VIDEO_BIG}
            autoPlay
            loop
            muted
            src="https://bafybeienjmql6lbtsaz3ycon3ttliohcl7qbquwvny43lhcodky54z65cy.ipfs.slate.textile.io"
            type="video/m4v"
            playsInline
            style={{
              backgroundImage: `url('https://bafybeienjmql6lbtsaz3ycon3ttliohcl7qbquwvny43lhcodky54z65cy.ipfs.slate.textile.io')`,
              borderRadius: `4px`,
              width: `100%`,
              boxShadow: `0px 10px 50px 20px rgba(0, 0, 0, 0.1)`,
              backgroundSize: `cover`,
            }}
          />
        )}
      </ScenePage>
    );
  }
}
