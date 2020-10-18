import * as React from "react";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

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

export const createState = (config) => {
  return {
    settings_hot_enabled: config.hot.enabled,
    settings_hot_allow_unfreeze: config.hot.allowUnfreeze,
    settings_hot_ipfs_add_timeout: config.hot.ipfs.addTimeout,
    settings_cold_enabled: config.cold.enabled,
    settings_cold_default_address: config.cold.filecoin.addr,
    settings_cold_default_duration: config.cold.filecoin.dealMinDuration,
    settings_cold_default_replication_factor: config.cold.filecoin.repFactor,
    settings_cold_default_excluded_miners: config.cold.filecoin.excludedMinersList,
    settings_cold_default_trusted_miners: config.cold.filecoin.trustedMinersList,
    settings_cold_default_max_price: config.cold.filecoin.maxPrice,
    settings_cold_default_auto_renew: config.cold.filecoin.renew.enabled,
    settings_cold_default_auto_renew_max_price: config.cold.filecoin.renew.threshold,
  };
};

let mounted = false;

export default class SceneSettings extends React.Component {
  state = {};

  async componentDidMount() {
    if (mounted) {
      return null;
    }

    mounted = true;
    let networkViewer;
    try {
      const response = await fetch("/api/network");
      const json = await response.json();
      networkViewer = json.data;
    } catch (e) {}

    this.setState({
      networkViewer,
      ...createState(networkViewer.powerInfo.defaultStorageConfig),
    });
  }

  componentWillUnmount() {
    mounted = false;
  }

  _deferredSave = null;

  _handleSave = async () => {
    this.setState({ loading: true });

    return alert(`Changing settings is currently disabled.`);

    await Actions.updateViewer({
      type: "SET_DEFAULT_STORAGE_CONFIG",
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
            excludedMinersList: this.state.settings_cold_default_excluded_miners,
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

    await this.props.onRehydrate();

    this.setState({ loading: false });
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <ScenePage>
        <ScenePageHeader title="Deal settings (read-only)">
          We do not allow changes to your deal settings at the moment. This is to ensure that your
          storage deals have the maximum chance of success.
        </ScenePageHeader>

        {this.state.networkViewer ? (
          <React.Fragment>
            {/*<div css={STYLES_GROUP} style={{ marginTop: 48 }}>
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
            </div>*/}

            {this.state.settings_cold_enabled ? (
              <div css={STYLES_SUBGROUP}>
                <System.Input
                  containerStyle={{ marginTop: 48 }}
                  label="Default Filecoin address (Read only)"
                  name="settings_cold_default_duration"
                  readOnly
                  type="text"
                  value={this.state.settings_cold_default_address}
                  onChange={this._handleChange}
                />

                <System.Input
                  containerStyle={{ marginTop: 24 }}
                  label="Default Filecoin deal duration"
                  description={`${Strings.getDaysFromEpoch(
                    this.state.settings_cold_default_duration
                  )}`}
                  name="settings_cold_default_duration"
                  type="number"
                  value={this.state.settings_cold_default_duration}
                  placeholder="Type in epochs (~25 seconds)"
                  onChange={this._handleChange}
                />

                <System.Input
                  containerStyle={{ marginTop: 24 }}
                  label="Default Filecoin replication factor"
                  name="settings_cold_default_replication_factor"
                  value={this.state.settings_cold_default_replication_factor}
                  placeholder="Type in amount of miners"
                  onChange={this._handleChange}
                />

                <System.Input
                  containerStyle={{ marginTop: 24 }}
                  label="Max Filecoin price."
                  description="Set the maximum Filecoin price you're willing to pay."
                  name="settings_cold_default_max_price"
                  value={this.state.settings_cold_default_max_price}
                  placeholder="Type in amount of Filecoin"
                  onChange={this._handleChange}
                />

                {/* <System.CheckBox
                  style={{ marginTop: 48 }}
                  name="settings_cold_default_auto_renew"
                  value={this.state.settings_cold_default_auto_renew}
                  onChange={this._handleChange}
                >
                  Enable auto renew for Filecoin Network deals.
                </System.CheckBox> */}

                <System.Input
                  containerStyle={{ marginTop: 24 }}
                  label="Max Filecoin deal auto renew price."
                  name="settings_cold_default_auto_renew_max_price"
                  value={this.state.settings_cold_default_auto_renew_max_price}
                  placeholder="Type in amount of Filecoin"
                  onChange={this._handleChange}
                />
              </div>
            ) : null}
            {/* <div style={{ marginTop: 32 }}>
              <System.ButtonPrimary
                loading={this.state.loading}
                onClick={this._handleSave}
              >
                Save
              </System.ButtonPrimary>
            </div> */}

            {/*<div css={STYLES_GROUP} style={{ marginTop: 32 }}>
              <div css={STYLES_LEFT}>
                <System.DescriptionGroup
                  label="Enable hot storage"
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
            </div> */}

            {this.state.settings_hot_enabled ? (
              <div css={STYLES_SUBGROUP}>
                {/* <System.CheckBox
                  style={{ marginTop: 48 }}
                  name="settings_hot_allow_unfreeze"
                  value={this.state.settings_hot_allow_unfreeze}
                  onChange={this._handleChange}
                >
                  IPFS allow unfreeze setting description.
                </System.CheckBox> */}

                <System.Input
                  containerStyle={{ marginTop: 24 }}
                  label="Add timeout"
                  name="settings_hot_ipfs_add_timeout"
                  value={this.state.settings_hot_ipfs_add_timeout}
                  placeholder="Type in seconds"
                  onChange={this._handleChange}
                />
              </div>
            ) : null}
            {/* <div style={{ marginTop: 32 }}>
              <System.ButtonPrimary
                loading={this.state.loading}
                onClick={this._handleSave}
              >
                Save
              </System.ButtonPrimary>
            </div> */}
          </React.Fragment>
        ) : (
          <LoaderSpinner style={{ marginTop: 48, height: 32, width: 32 }} />
        )}
      </ScenePage>
    );
  }
}
