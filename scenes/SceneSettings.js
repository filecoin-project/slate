import * as React from "react";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";

const STYLES_GROUP = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-width: 768px;
`;

const STYLES_SUBGROUP = css`
  padding-left: 24px;
  width: 100%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const STYLES_LEFT = css`
  padding: 12px 0 0 0;
  min-width: 10%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const STYLES_RIGHT = css`
  padding-left: 48px;
  padding-top: 24px;
  flex-shrink: 0;
`;

export default class SceneSettings extends React.Component {
  state = { ...this.props.viewer };

  _deferredSave = null;

  _handleSave = async () => {
    await Actions.setDefaultConfig({
      config: {
        hot: {
          enabled: this.state.settings_cold_enabled,
          allowUnfreeze: this.state.settings_hot_allow_unfreeze,
          ipfs: {
            addTimeout: this.state.settings_hot_ipfs_add_timeout,
          },
        },
        cold: {
          enabled: this.state.settings_cold_enabled,
          filecoin: {
            addr: this.state.settings_cold_default_address,
            dealMinDuration: this.state.settings_cold_default_duration,
            repFactor: this.state.settings_cold_default_replication_factor,
            excludedMinersList: this.state
              .settings_cold_default_excluded_miners,
            trustedMinersList: this.state.settings_cold_default_trusted_miners,
            maxPrice: this.state.settings_cold_default_max_price,
            renew: {
              enabled: this.state.settings_cold_default_auto_renew,
              threshold: this.state.settings_cold_default_auto_renew_max_price,
            },
          },
        },
      },
    });
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let addresses = {};

    this.state.addresses.forEach((a) => {
      addresses[a.address] = a;
    });

    const currentAddress = addresses[this.state.settings_cold_default_address];

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
              active={this.state.settings_deals_auto_approve}
            />
          </div>
        </div>

        <div css={STYLES_GROUP} style={{ marginTop: 32 }}>
          <div css={STYLES_LEFT}>
            <System.DescriptionGroup
              label="Enable cold storage"
              tooltip="Placeholder"
              description="By enabling cold storage, every time you make a deal your data will be stored on the Filecoin Network."
            />
          </div>
          <div css={STYLES_RIGHT}>
            <System.Toggle
              name="settings_cold_enabled"
              onChange={this._handleChange}
              active={this.state.settings_cold_enabled}
            />
          </div>
        </div>

        {this.state.settings_cold_enabled ? (
          <div css={STYLES_SUBGROUP}>
            <System.SelectMenu
              containerStyle={{ marginTop: 24 }}
              label="Default Filecoin address"
              description="Default Filecoin address settings description."
              tooltip="Placeholder."
              name="settings_cold_default_address"
              value={this.state.settings_cold_default_address}
              category="address"
              onChange={this._handleChange}
              options={this.state.addresses}
            >
              {currentAddress ? currentAddress.name : "None"}
            </System.SelectMenu>

            <System.Input
              containerStyle={{ marginTop: 24 }}
              label="Default Filecoin deal duration"
              description="Default Filecoin deal duration settings description. Current deal duration is in epochs but should change to months/weeks/days."
              tooltip="Placeholder."
              name="settings_cold_default_duration"
              type="number"
              value={this.state.settings_cold_default_duration}
              placeholder="Type in epochs (~25 seconds)"
              onChange={this._handleChange}
            />

            <System.Input
              containerStyle={{ marginTop: 24 }}
              label="Default Filecoin replication factor"
              description="Default Filecoin replication factor settings description."
              tooltip="Placeholder."
              name="settings_cold_default_replication_factor"
              value={this.state.settings_cold_default_replication_factor}
              placeholder="Type in amount of miners"
              onChange={this._handleChange}
            />

            <System.Input
              containerStyle={{ marginTop: 24 }}
              label="Max Filecoin price."
              description="Set the maximum Filecoin price you're willing to pay."
              tooltip="Placeholder."
              name="settings_cold_default_max_price"
              value={this.state.settings_cold_default_max_price}
              placeholder="Type in amount of Filecoin"
              onChange={this._handleChange}
            />

            <System.CheckBox
              style={{ marginTop: 48 }}
              name="settings_cold_default_auto_renew"
              value={this.state.settings_cold_default_auto_renew}
              onChange={this._handleChange}
            >
              Enable auto renew for Filecoin Network deals.
            </System.CheckBox>

            <System.Input
              containerStyle={{ marginTop: 24 }}
              label="Max Filecoin deal auto renew price."
              description="Set the maximum Filecoin price you're willing to pay for auto renew."
              tooltip="Placeholder."
              name="settings_cold_default_auto_renew_max_price"
              value={this.state.settings_cold_default_auto_renew_max_price}
              placeholder="Type in amount of Filecoin"
              onChange={this._handleChange}
            />
            <div style={{ marginTop: 32 }}>
              <System.ButtonPrimary onClick={this._handleSave}>
                Save
              </System.ButtonPrimary>
            </div>
          </div>
        ) : null}

        <div css={STYLES_GROUP} style={{ marginTop: 32 }}>
          <div css={STYLES_LEFT}>
            <System.DescriptionGroup
              label="Enable hot storage"
              tooltip="Placeholder"
              description="By enabling hot storage, every time you make a deal your data will be stored on IPFS."
            />
          </div>
          <div css={STYLES_RIGHT}>
            <System.Toggle
              name="settings_hot_enabled"
              onChange={this._handleChange}
              active={this.state.settings_hot_enabled}
            />
          </div>
        </div>

        {this.state.settings_hot_enabled ? (
          <div css={STYLES_SUBGROUP}>
            <System.CheckBox
              style={{ marginTop: 48 }}
              name="settings_hot_allow_unfreeze"
              value={this.state.settings_hot_allow_unfreeze}
              onChange={this._handleChange}
            >
              IPFS allow unfreeze setting description.
            </System.CheckBox>

            <System.Input
              containerStyle={{ marginTop: 24 }}
              label="Add timeout"
              description="Add IPFS timeout setting description."
              tooltip="Placeholder."
              name="settings_hot_ipfs_add_timeout"
              value={this.state.settings_hot_ipfs_add_timeout}
              placeholder="Type in seconds"
              onChange={this._handleChange}
            />

            <div style={{ marginTop: 32 }}>
              <System.ButtonPrimary onClick={this._handleSave}>
                Save
              </System.ButtonPrimary>
            </div>
          </div>
        ) : null}
      </ScenePage>
    );
  }
}
