import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as Fixtures from "~/common/fixtures";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";

const SELECT_MENU_OPTIONS = [
  { value: "1", name: "China" },
  { value: "2", name: "United States" },
  { value: "3", name: "Russia" },
];

const SELECT_MENU_MAP = {
  "1": "China",
  "2": "United States",
  "3": "Russia",
};

const STYLES_GROUP = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  padding: 12px 0 0 0;
  min-width: 480px;
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  padding-left: 48px;
  padding-top: 16px;
  width: 100%;
`;

export default class SceneSettings extends React.Component {
  _handleChange = (e) => {
    this.props.onViewerChange(e);
  };

  render() {
    return (
      <ScenePage>
        <System.H1>Settings</System.H1>

        <System.H2 style={{ marginTop: 48 }}>Storage defaults</System.H2>

        <div css={STYLES_GROUP} style={{ marginTop: 32 }}>
          <div css={STYLES_LEFT}>
            <System.DescriptionGroup
              label="Automatically approve deals"
              tooltip="When this is enabled you will skip the confirmation step, but if you do not have enough Filecoin you will receive a warning."
              description="Enable this if every storage deal should be automatically approved to skip confirmation."
            />
          </div>
          <div css={STYLES_RIGHT}>
            <System.Toggle
              name="settings_deals_auto_approve"
              onChange={this._handleChange}
              active={this.props.viewer.settings_deals_auto_approve}
            />
          </div>
        </div>

        <System.Input
          containerStyle={{ marginTop: 24 }}
          label="Default deal location"
          description="Choose the amount of months you expect to keep files on the network for."
          tooltip="This is a default value that makes sealing and storing data easier on the network. You can change this value at any time you like. Changing this value will not affect your current deals."
          name="settings_deal_default_duration"
          value={this.props.viewer.settings_deal_default_duration}
          placeholder="Type in an amount of months"
          onChange={this._handleChange}
        />

        <System.Input
          containerStyle={{ marginTop: 32 }}
          label="Default maximum storage"
          description="Choose the maximum Filecoin you are willing to pay for storage."
          tooltip="Changing this value will not affect your current deals."
          name="settings_deal_maximum_storage_payment"
          value={this.props.viewer.settings_deal_maximum_storage_payment}
          placeholder="Type in an amount of Filecoin"
          onChange={this._handleChange}
        />

        <System.Input
          containerStyle={{ marginTop: 32 }}
          label="Default replication factor"
          description="Choose the default amount of times your files should replicate."
          tooltip="Changing this value will not affect your current deals."
          name="settings_deal_replication_factor"
          value={this.props.viewer.settings_deal_replication_factor}
          placeholder="Type a number"
          onChange={this._handleChange}
        />

        <System.DescriptionGroup
          style={{ marginTop: 32 }}
          label="Default miners by ID"
          tooltip="Changing this value will not affect your current deals."
          description="Enter the miner IDs separated by a comma for the miners you specifically want to use."
        />

        <System.Textarea
          value={this.props.viewer.settings_deal_default_miners}
          name="settings_deal_default_miners"
          onChange={this._handleChange}
        />

        <System.SelectMenu
          containerStyle={{ marginTop: 32 }}
          label="Geographic preference"
          description="Pick any location in the world you would like your files to be stored."
          tooltip="Changing this value will not affect your current deals."
          name="settings_deal_country"
          value={this.props.viewer.settings_deal_country}
          onChange={this._handleChange}
          options={SELECT_MENU_OPTIONS}
        >
          {SELECT_MENU_MAP[this.props.viewer.settings_deal_country]}
        </System.SelectMenu>

        <System.Input
          containerStyle={{ marginTop: 32 }}
          label="Transaction password"
          description="Add a password before you perform any transaction."
          type="password"
          tooltip="We will still ask you for your password even if you skip storage deal confirmation."
          name="settings_deal_password"
          value={this.props.viewer.settings_deal_password}
          placeholder="Type a password"
          onChange={this._handleChange}
        />

        <System.H2 style={{ marginTop: 72 }}>Miner</System.H2>

        <System.P style={{ marginTop: 24 }}>
          No miners have been detected, when you a run miners you can configure
          their settings here
        </System.P>

        <System.H2 style={{ marginTop: 72 }}>Extensions</System.H2>

        <System.P style={{ marginTop: 24 }}>
          When third party services become available, you can enable them here
          to automatically use them when you make storage or retrieval deals.
        </System.P>
      </ScenePage>
    );
  }
}
