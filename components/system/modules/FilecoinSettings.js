import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";
import { DescriptionGroup } from "~/components/system/components/fragments/DescriptionGroup";
import { SelectMenu } from "~/components/system/components/SelectMenus";
import { Toggle } from "~/components/system/components/Toggle";
import { Input } from "~/components/system/components/Input";
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
  { value: "hot", label: "Hot Storage" },
  { value: "cold", label: "Cold Storage" },
];

export class FilecoinSettings extends React.Component {
  state = {
    tabGroup: "general",
    addrsList: [],
    fetchedAddrs: false,
    fetchedConfig: false,
  };

  componentDidMount = () => {
    let newState = null;
    if (this.props.defaultStorageConfig) {
      newState = this.unbundleConfig();
    }
    if (this.props.addrsList) {
      if (newState) {
        newState.addrsList = this.props.addrsList;
        newState.fetchedAddrs = true;
      } else {
        newState = { addrsList: this.props.addrsList, fetchedAddrs: true };
      }
    }
    if (newState) {
      this.setState(newState);
    }
  };

  componentDidUpdate = (prevProps) => {
    if (!this.state.fetchedAddrs || !this.state.fetchedConfig) {
      let newState = null;
      if (this.props.defaultStorageConfig != prevProps.defaultStorageConfig) {
        newState = this.unbundleConfig();
      }
      if (this.props.addrsList != prevProps.addrsList) {
        if (newState) {
          newState.addrsList = this.props.addrsList;
          newState.fetchedAddrs = true;
        } else {
          newState = { addrsList: this.props.addrsList, fetchedAddrs: true };
        }
      }
      if (newState) {
        this.setState(newState);
      }
    }
  };

  unbundleConfig = () => {
    let config = {
      settings_hot_enabled: this.props.defaultStorageConfig.hot.enabled,
      settings_hot_allow_unfreeze: this.props.defaultStorageConfig.hot.allowUnfreeze,
      settings_hot_ipfs_add_timeout: this.props.defaultStorageConfig.hot.ipfs.addTimeout,
      settings_cold_enabled: this.props.defaultStorageConfig.cold.enabled,
      settings_cold_default_address: this.props.defaultStorageConfig.cold.filecoin.addr,
      settings_cold_default_duration: this.props.defaultStorageConfig.cold.filecoin.dealMinDuration,
      settings_cold_default_replication_factor: this.props.defaultStorageConfig.cold.filecoin
        .repFactor,
      settings_cold_default_excluded_miners: this.props.defaultStorageConfig.cold.filecoin
        .excludedMinersList,
      settings_cold_default_trusted_miners: this.props.defaultStorageConfig.cold.filecoin
        .trustedMinersList,
      settings_cold_country_codes_list: this.props.defaultStorageConfig.cold.filecoin
        .countryCodesList,
      settings_cold_default_max_price: this.props.defaultStorageConfig.cold.filecoin.maxPrice,
      settings_cold_default_auto_renew: this.props.defaultStorageConfig.cold.filecoin.renew.enabled,
      settings_cold_default_auto_renew_threshold: this.props.defaultStorageConfig.cold.filecoin
        .renew.threshold,
      settings_repairable: this.props.defaultStorageConfig.repairable,
      fetchedConfig: true,
    };
    return config;
  };

  _handleSave = async () => {
    this.props.onSave({
      cold: {
        enabled: this.state.settings_cold_enabled,
        filecoin: {
          addr: this.state.settings_cold_default_address,
          countryCodesList: this.state.settings_cold_country_codes_list,
          dealMinDuration: this.state.settings_cold_default_duration,
          excludedMinersList: this.state.settings_cold_default_excluded_miners,
          maxPrice: this.state.settings_cold_default_max_price,
          renew: {
            enabled: this.state.settings_cold_default_auto_renew,
            threshold: this.state.settings_cold_default_auto_renew_threshold,
          },
          repFactor: this.state.settings_cold_default_replication_factor,
          trustedMinersList: this.state.settings_cold_default_trusted_miners,
        },
      },
      hot: {
        enabled: this.state.settings_hot_enabled,
        allowUnfreeze: this.state.settings_hot_allow_unfreeze,
        ipfs: {
          addTimeout: this.state.settings_hot_ipfs_add_timeout,
        },
      },
      repairable: this.state.settings_repairable,
    });
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let addrsList = this.state.addrsList.map((each) => {
      return {
        value: each.addr,
        name: each.name,
      };
    });
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
                    style={{ marginTop: 24 }}
                    label="Repairable"
                    description="If this is enabled and the network detects that a miner is no longer storing your file, it will automatically make a storage deal with a new miner to store the file."
                  />
                </div>
                <div css={STYLES_RIGHT}>
                  <Toggle
                    key="settings_repairable"
                    name="settings_repairable"
                    onChange={this._handleChange}
                    active={this.state.settings_repairable}
                  />
                </div>
              </div>
            </div>
          ) : this.state.tabGroup === "cold" ? (
            <div>
              <DescriptionGroup
                full
                style={{ marginTop: 24 }}
                label="What is cold storage?"
                description="Cold storage is storage on the Filecoin network. Think of it as
                storing your files in a long term safety deposit vault, where
                you have proof that they are being stored and can know they are
                secure. However, cold storage is slower to retrieve from and costs
                money."
              />
              <DescriptionGroup
                full
                description="Even if both cold and hot storage are enabled, Slate will try
                and save you money by retrieving from hot storage when it can."
              />

              <div css={STYLES_GROUP} style={{ marginTop: 24 }}>
                <div css={STYLES_LEFT}>
                  <DescriptionGroup
                    label="Enable cold storage"
                    description="By enabling cold storage, every time you make a deal your data will be stored on the Filecoin Network."
                  />
                </div>
                <div css={STYLES_RIGHT}>
                  <Toggle
                    key="settings_cold_enabled"
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
                    options={addrsList}
                  />

                  <Input
                    full
                    containerStyle={{ marginTop: 24 }}
                    label="Default deal duration"
                    description="How long you would like your files stored for, before the deal must be renewed or the file will be removed from the Filecoin network."
                    tooltip="Duration in epochs (~25 seconds)."
                    name="settings_cold_default_duration"
                    unit="epochs"
                    pattern="^\d*$"
                    value={this.state.settings_cold_default_duration}
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
                    unit="miners"
                    pattern="^\d*$"
                    onChange={this._handleChange}
                  />

                  <Input
                    full
                    containerStyle={{ marginTop: 24 }}
                    label="Max Filecoin price"
                    description="The maximum price in Filecoin you're willing to pay to store 1 GB for 1 Epoch (~25 seconds)."
                    tooltip="Slate will always try to find you the best price, regardless of how high you set this."
                    name="settings_cold_default_max_price"
                    pattern="^\d*$"
                    value={this.state.settings_cold_default_max_price}
                    unit="FIL/GB/epoch"
                    onChange={this._handleChange}
                  />

                  <div css={STYLES_GROUP}>
                    <div css={STYLES_LEFT}>
                      <DescriptionGroup
                        style={{ marginTop: 24 }}
                        label="Auto renew deals"
                        description="If enabled, your storage deal will be automatically renewed (and your wallet charged) once the deal duration is up. This ensures your files will remain stored even if you do not manually renew."
                        tooltip="This does not protect your files in the event that your wallet lacks sufficient funds or if there are no miners willing to store it for less than your max auto renew price."
                      />
                    </div>
                    <div css={STYLES_RIGHT}>
                      <Toggle
                        key="settings_cold_default_auto_renew"
                        name="settings_cold_default_auto_renew"
                        onChange={this._handleChange}
                        active={this.state.settings_cold_default_auto_renew}
                      />
                    </div>
                  </div>

                  {this.state.settings_cold_default_auto_renew ? (
                    <div css={STYLES_SUBGROUP}>
                      <Input
                        full
                        containerStyle={{ marginTop: 24 }}
                        label="Auto renew threshold"
                        description="How long before a deal expires should it auto renew."
                        name="settings_cold_default_auto_renew_threshold"
                        pattern="^\d*$"
                        value={this.state.settings_cold_default_auto_renew_threshold}
                        unit="[unit]"
                        onChange={this._handleChange}
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : (
            <div>
              <DescriptionGroup
                full
                style={{ marginTop: 24 }}
                label="What is hot storage?"
                description="Hot storage is storage on IPFS. Retrieval from IPFS is faster and is free for Slate users. It's a good everyday solution, but for more secure storage, cold storage can be a better option."
              />
              <div css={STYLES_GROUP} style={{ marginTop: 24 }}>
                <div css={STYLES_LEFT}>
                  <DescriptionGroup
                    label="Enable hot storage"
                    description="By enabling hot storage, every time you make a deal your data will be stored on IPFS."
                  />
                </div>
                <div css={STYLES_RIGHT}>
                  <Toggle
                    key="settings_hot_enabled"
                    name="settings_hot_enabled"
                    onChange={this._handleChange}
                    active={this.state.settings_hot_enabled}
                  />
                </div>
              </div>

              {this.state.settings_hot_enabled ? (
                <div>
                  <div css={STYLES_GROUP}>
                    <div css={STYLES_LEFT}>
                      <DescriptionGroup
                        style={{ marginTop: 24 }}
                        label="Allow Unfreeze"
                        description="If a file is in cold storage on the Filcoin network but not in hot storage on IPFS, a retrieval deal must be made in order to move it to hot storage. In order to allow this, allow unfreeze must be enabled."
                        tooltip="This is applicable mainly in cases where hot storage was previously disabled then later enabled."
                      />
                    </div>
                    <div css={STYLES_RIGHT}>
                      <Toggle
                        key="settings_hot_allow_unfreeze"
                        name="settings_hot_allow_unfreeze"
                        onChange={this._handleChange}
                        active={this.state.settings_hot_allow_unfreeze}
                      />
                    </div>
                  </div>

                  {this.state.settings_hot_allow_unfreeze ? (
                    <div css={STYLES_SUBGROUP}>
                      <Input
                        full
                        containerStyle={{ marginTop: 24 }}
                        label="Add timeout"
                        pattern="^\d*$"
                        description="How many seconds Slate will search for a file in hot storage before executing an unfreeze retrieval deal to get it from cold storage."
                        name="settings_hot_ipfs_add_timeout"
                        value={this.state.settings_hot_ipfs_add_timeout}
                        unit="seconds"
                        onChange={this._handleChange}
                      />
                    </div>
                  ) : null}
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
