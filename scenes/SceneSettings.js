import * as React from 'react';
import * as Actions from '~/common/actions';
import * as System from '~/components/system';

import { css } from '@emotion/react';

import ScenePage from '~/components/core/ScenePage';

const STYLES_GROUP = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const STYLES_SUBGROUP = css`
  padding-left: 24px;
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  padding: 12px 0 0 0;
  min-width: 480px;
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  padding-left: 48px;
  padding-top: 24px;
  width: 100%;
`;

export default class SceneSettings extends React.Component {
  _deferredSave = null;

  _handleSave = async () => {
    await Actions.setDefaultConfig({
      config: {
        hot: {
          enabled: this.props.viewer.settings_cold_enabled,
          allowUnfreeze: this.props.viewer.settings_hot_allow_unfreeze,
          ipfs: {
            addTimeout: this.props.viewer.settings_hot_ipfs_add_timeout,
          },
        },
        cold: {
          enabled: this.props.viewer.settings_cold_enabled,
          filecoin: {
            addr: this.props.viewer.settings_cold_default_address,
            dealMinDuration: this.props.viewer.settings_cold_default_duration,
            repFactor: this.props.viewer.settings_cold_default_replication_factor,
            excludedMinersList: this.props.viewer.settings_cold_default_excluded_miners,
            trustedMinersList: this.props.viewer.settings_cold_default_trusted_miners,
            maxPrice: this.props.viewer.settings_cold_default_max_price,
            renew: {
              enabled: this.props.viewer.settings_cold_default_auto_renew,
              threshold: this.props.viewer.settings_cold_default_auto_renew_max_price,
            },
          },
        },
      },
    });
  };

  _handleChange = (e) => {
    window.clearTimeout(this._deferredSave);
    this._deferredSave = null;
    this.props.onViewerChange(e);

    this._deferredSave = window.setTimeout(async () => {
      await this._handleSave();
    }, 2000);
  };

  render() {
    let addresses = {};

    this.props.viewer.addresses.forEach((a) => {
      addresses[a.address] = a;
    });

    const currentAddress = addresses[this.props.viewer.settings_cold_default_address];

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
              active={this.props.viewer.settings_cold_enabled}
            />
          </div>
        </div>

        {this.props.viewer.settings_cold_enabled ? (
          <div css={STYLES_SUBGROUP}>
            <System.SelectMenu
              containerStyle={{ marginTop: 24 }}
              label="Default Filecoin address"
              description="Default Filecoin address settings description."
              tooltip="Placeholder."
              name="settings_cold_default_address"
              value={this.props.viewer.settings_cold_default_address}
              category="address"
              onChange={this._handleChange}
              options={this.props.viewer.addresses}>
              {currentAddress ? currentAddress.name : 'None'}
            </System.SelectMenu>

            <System.Input
              containerStyle={{ marginTop: 24 }}
              label="Default Filecoin deal duration"
              description="Default Filecoin deal duration settings description."
              tooltip="Placeholder."
              name="settings_cold_default_duration"
              type="number"
              value={this.props.viewer.settings_cold_default_duration}
              placeholder="Type in months"
              onChange={this._handleChange}
            />

            <System.Input
              containerStyle={{ marginTop: 24 }}
              label="Default Filecoin replication factor"
              description="Default Filecoin replication factor settings description."
              tooltip="Placeholder."
              name="settings_cold_default_replication_factor"
              value={this.props.viewer.settings_cold_default_replication_factor}
              placeholder="Type in amount of miners"
              onChange={this._handleChange}
            />

            <System.Input
              containerStyle={{ marginTop: 24 }}
              label="Max Filecoin price."
              description="Set the maximum Filecoin price you're willing to pay."
              tooltip="Placeholder."
              name="settings_cold_default_max_price"
              value={this.props.viewer.settings_cold_default_max_price}
              placeholder="Type in amount of Filecoin"
              onChange={this._handleChange}
            />

            <System.CheckBox
              style={{ marginTop: 48 }}
              name="settings_cold_default_auto_renew"
              value={this.props.viewer.settings_cold_default_auto_renew}
              onChange={this._handleChange}>
              Enable auto renew for Filecoin Network deals.
            </System.CheckBox>

            <System.Input
              containerStyle={{ marginTop: 24 }}
              label="Max Filecoin deal auto renew price."
              description="Set the maximum Filecoin price you're willing to pay for auto renew."
              tooltip="Placeholder."
              name="settings_cold_default_auto_renew_max_price"
              value={this.props.viewer.settings_cold_default_auto_renew_max_price}
              placeholder="Type in amount of Filecoin"
              onChange={this._handleChange}
            />
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
              active={this.props.viewer.settings_hot_enabled}
            />
          </div>
        </div>

        {this.props.viewer.settings_hot_enabled ? (
          <div css={STYLES_SUBGROUP}>
            <System.CheckBox
              style={{ marginTop: 48 }}
              name="settings_hot_allow_unfreeze"
              value={this.props.viewer.settings_hot_allow_unfreeze}
              onChange={this._handleChange}>
              IPFS allow unfreeze setting description.
            </System.CheckBox>

            <System.Input
              containerStyle={{ marginTop: 24 }}
              label="Add timeout"
              description="Add IPFS timeout setting description."
              tooltip="Placeholder."
              name="settings_hot_ipfs_add_timeout"
              value={this.props.viewer.settings_hot_ipfs_add_timeout}
              placeholder="Type in seconds"
              onChange={this._handleChange}
            />
          </div>
        ) : null}
      </ScenePage>
    );
  }
}

/*

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
          options={SELECT_MENU_OPTIONS}>
          {SELECT_MENU_MAP[this.props.viewer.settings_deal_country]}
        </System.SelectMenu>
        */
