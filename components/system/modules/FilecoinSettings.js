import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";
import { DescriptionGroup } from "~/components/system/components/fragments/DescriptionGroup";
import { SelectMenu } from "~/components/system/components/SelectMenus";
import { Toggle } from "~/components/system/components/Toggle";
import { Input } from "~/components/system/components/Input";
import { CheckBox } from "~/components/system/components/CheckBox";
import { ButtonPrimary } from "~/components/system/components/Buttons";
import { CardTabGroup } from "~/components/system/components/CardTabGroup";

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

const TAB_GROUP = [
  { value: "general", label: "General" },
  { value: "cold", label: "Cold Storage" },
  { value: "hot", label: "Hot Storage" },
];

export class FilecoinSettings extends React.Component {
  static defaultProps = {
    addrs: [],
    settings_deals_auto_approve: false,
    settings_hot_enabled: true,
    //settings_hot_allow_unfreeze: this.props.allowUnfreeze,
    settings_hot_ipfs_add_timeout: 60,
    settings_cold_enabled: true,
    //settings_cold_default_address: this.props.defaultAddr,
    settings_cold_default_duration: 1000,
    settings_cold_default_replication_factor: 1,
    settings_cold_default_excluded_miners: [],
    settings_cold_default_trusted_miners: [],
    //settings_cold_default_max_price: this.props.maxPrice,
    settings_cold_default_auto_renew: true,
    //settings_cold_default_auto_renew_max_price: this.props.autoRenewMaxPrice,
    //settings_repairable:
  };

  state = {
    tabGroup: "general",
    addrsList: this.props.addrsList.map((each) => {
      return {
        value: each.addr,
        name: each.name,
      };
    }),
    settings_deals_auto_approve: this.props.autoApprove, //left off changing these to match teh shape of this.props.defaultStorageConfig
    settings_hot_enabled: this.props.hotEnabled, //and incorporate info from aaron
    settings_hot_allow_unfreeze: this.props.allowUnfreeze, //we can use miner api for the list editor component (and incorp reputation)
    settings_hot_ipfs_add_timeout: this.props.addTimeout,
    settings_cold_enabled: this.props.coldEnabled,
    settings_cold_default_address: this.props.defaultAddr,
    settings_cold_default_duration: this.props.dealMinDuration,
    settings_cold_default_replication_factor: this.props.repFactor,
    settings_cold_default_excluded_miners: this.props.excludedMinersList,
    settings_cold_default_trusted_miners: this.props.trustedMinersList,
    settings_cold_default_max_price: this.props.maxPrice,
    settings_cold_default_auto_renew: this.props.autoRenew,
    settings_cold_default_auto_renew_max_price: this.props.autoRenewMaxPrice,
    settings_repairable: this.props.repairable,
  };

  _handleSave = async () => {
    this.props.onSave({
      data: {
        settings_deals_auto_approve: this.state.settings_deals_auto_approve,
      },
      config: {
        hot: {
          enabled: this.state.settings_hot_enabled,
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
        repairable: this.state.settings_repairable,
      },
    });
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <CardTabGroup
          name="tabGroup"
          options={TAB_GROUP}
          value={this.state.tabGroup}
          onChange={this._handleChange}
        />
        <div style={{ padding: "16px" }}>
          {this.state.tabGroup === "general" ? (
            <div>
              <div css={STYLES_GROUP}>
                <div css={STYLES_LEFT}>
                  <DescriptionGroup
                    label="Automatically approve deals"
                    tooltip="If you do not have enough Filecoin you will receive a warning, regardless of whether this is enabled."
                    description="When enabled, every storage deal will be automatically approved without asking for confirmation."
                  />
                </div>
                <div css={STYLES_RIGHT}>
                  <Toggle
                    name="settings_deals_auto_approve"
                    onChange={this._handleChange}
                    active={this.state.settings_deals_auto_approve}
                  />
                </div>
              </div>
              <div>
                <DescriptionGroup
                  style={{ marginTop: 24 }}
                  label="Repairable"
                  description="Placeholder."
                  tooltip="Placeholder."
                />
                <CheckBox
                  name="settings_repairable"
                  value={this.state.settings_repairable}
                  onChange={this._handleChange}
                >
                  Repairable
                </CheckBox>
              </div>
            </div>
          ) : this.state.tabGroup === "cold" ? (
            <div>
              <div css={STYLES_GROUP}>
                <div css={STYLES_LEFT}>
                  <DescriptionGroup
                    label="Enable cold storage"
                    tooltip="Placeholder"
                    description="By enabling cold storage, every time you make a deal your data will be stored on the Filecoin Network."
                  />
                </div>
                <div css={STYLES_RIGHT}>
                  <Toggle
                    name="settings_cold_enabled"
                    onChange={this._handleChange}
                    active={this.state.settings_cold_enabled}
                  />
                </div>
              </div>
              {this.state.settings_cold_enabled ? (
                <div>
                  <SelectMenu
                    full
                    containerStyle={{ marginTop: 24 }}
                    label="Default Filecoin address"
                    description="Deal payments will default to this address."
                    tooltip="You will always have the option to choose a different wallet before you make a deal."
                    name="settings_cold_default_address"
                    value={this.state.settings_cold_default_address}
                    category="address"
                    onChange={this._handleChange}
                    options={this.state.addrsList}
                  />

                  <Input
                    full
                    containerStyle={{ marginTop: 24 }}
                    label="Default deal duration"
                    description="How long your files will be stored for."
                    tooltip="Placeholder."
                    name="settings_cold_default_duration"
                    type="number"
                    value={this.state.settings_cold_default_duration}
                    placeholder="Duration in epochs (~25 seconds)"
                    onChange={this._handleChange}
                  />

                  <Input
                    full
                    containerStyle={{ marginTop: 24 }}
                    label="Default replication factor"
                    description="The number of miners that each file will be stored with."
                    tooltip="A higher replication factor means your files are more secure against loss, but also costs more."
                    name="settings_cold_default_replication_factor"
                    value={this.state.settings_cold_default_replication_factor}
                    placeholder="Number of miners"
                    type="number"
                    onChange={this._handleChange}
                  />

                  <Input
                    full
                    containerStyle={{ marginTop: 24 }}
                    label="Max Filecoin price"
                    description="The maximum price you're willing to pay to store your file for the length of one deal duration (as specified above)."
                    tooltip="Slate will always try to find you the best price, regardless of how high you set this."
                    name="settings_cold_default_max_price"
                    type="number"
                    value={this.state.settings_cold_default_max_price}
                    placeholder="Price in Filecoin"
                    onChange={this._handleChange}
                  />

                  <DescriptionGroup
                    style={{ marginTop: 24 }}
                    label="Auto renew deals"
                    description="If auto renew is enabled, your wallet will automatically be charged once the deal duration is up. This guarantees your files will remain stored even if you do not manually renew."
                    tooltip="This does not protect your files in the event that your wallet lacks sufficient funds or if there are no miners willing to store it for less than your max auto renew price."
                  />
                  <CheckBox
                    name="settings_cold_default_auto_renew"
                    value={this.state.settings_cold_default_auto_renew}
                    onChange={this._handleChange}
                  >
                    Enable auto renew
                  </CheckBox>

                  <Input
                    full
                    containerStyle={{ marginTop: 24 }}
                    label="Max auto renew price."
                    description="Set the maximum Filecoin price you're willing to pay to auto renew a storage deal."
                    tooltip="Placeholder."
                    name="settings_cold_default_auto_renew_max_price"
                    type="number"
                    value={
                      this.state.settings_cold_default_auto_renew_max_price
                    }
                    placeholder="Price in Filecoin"
                    onChange={this._handleChange}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <div css={STYLES_GROUP}>
                <div css={STYLES_LEFT}>
                  <DescriptionGroup
                    label="Enable hot storage"
                    tooltip="Placeholder"
                    description="By enabling hot storage, every time you make a deal your data will be stored on IPFS."
                  />
                </div>
                <div css={STYLES_RIGHT}>
                  <Toggle
                    name="settings_hot_enabled"
                    onChange={this._handleChange}
                    active={this.state.settings_hot_enabled}
                  />
                </div>
              </div>

              {this.state.settings_hot_enabled ? (
                <div>
                  <DescriptionGroup
                    style={{ marginTop: 24 }}
                    label="Allow Unfreeze"
                    description="Placeholder."
                    tooltip="Placeholder."
                  />
                  <CheckBox
                    name="settings_hot_allow_unfreeze"
                    value={this.state.settings_hot_allow_unfreeze}
                    onChange={this._handleChange}
                  >
                    IPFS allow unfreeze setting description.
                  </CheckBox>

                  <Input
                    full
                    containerStyle={{ marginTop: 24 }}
                    label="Add timeout"
                    description="Add IPFS timeout setting description."
                    tooltip="Placeholder."
                    name="settings_hot_ipfs_add_timeout"
                    value={this.state.settings_hot_ipfs_add_timeout}
                    placeholder="Type in seconds"
                    onChange={this._handleChange}
                  />
                </div>
              ) : null}
            </div>
          )}
          <div style={{ marginTop: 32 }}>
            <ButtonPrimary onClick={this._handleSave}>Save</ButtonPrimary>
          </div>
        </div>
      </div>
    );
  }
}
