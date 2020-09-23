import * as React from "react";
import * as Strings from "~/common/strings";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as SVG from "~/common/svg";
import * as Window from "~/common/window";
import * as Messages from "~/common/messages";

import { css } from "@emotion/react";
import { createState } from "~/scenes/SceneSettings";
import { LoaderSpinner } from "~/components/system/components/Loaders";
import { FilecoinNumber, Converter } from "@openworklabs/filecoin-number";
import { dispatchCustomEvent } from "~/common/custom-events";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import TestnetBanner from "~/components/core/TestnetBanner";

const STYLES_FILE_HIDDEN = css`
  height: 1px;
  width: 1px;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: -1px;
  left: -1px;
`;

const STYLES_ROW = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const STYLES_LEFT = css`
  color: ${Constants.system.black};
  transition: 200ms ease all;
  min-width: 10%;
  width: 100%;

  :visited {
    color: ${Constants.system.black};
  }

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
  transition: 200ms ease all;
  cursor: pointer;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const DEFAULT_ERROR_MESSAGE =
  "We could not make your deal. Please try again later.";
let mounted = false;

export default class SceneMakeFilecoinDeal extends React.Component {
  state = {};

  async componentDidMount() {
    if (mounted) {
      return;
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
      settings_cold_default_max_price: 1000000000000000,
    });
  }

  _handleUpload = async (e) => {
    this.setState({ loading: true });

    await this.props.onUpload({
      files: e.target.files,
      bucketName: "deal",
    });

    let networkViewer;
    try {
      const response = await fetch("/api/network");
      const json = await response.json();
      networkViewer = json.data;
    } catch (e) {}

    this.setState({
      networkViewer,
      loading: false,
    });
  };

  _handleArchive = async (e) => {
    this.setState({ archiving: true });
    const response = await Actions.archive({ bucketName: "deal" });

    if (!response) {
      this.setState({ archiving: false });
      return dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: DEFAULT_ERROR_MESSAGE,
          },
        },
      });
    }

    if (response.error) {
      this.setState({ archiving: false });

      if (response.message) {
        return dispatchCustomEvent({
          name: "create-alert",
          detail: {
            alert: {
              message: `From Textile: ${response.message}`,
            },
          },
        });
      }

      return dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: Messages.error[response.decorator]
              ? Messages.error[response.decorator]
              : DEFAULT_ERROR_MESSAGE,
          },
        },
      });
    }

    await Window.delay(5000);
    alert("The storage deal was made!");

    this.props.onAction({ type: "NAVIGATE", value: "V1_NAVIGATION_ARCHIVE" });
  };

  _handleRemove = async (cid) => {
    this.setState({ loading: true });

    await Actions.removeFromBucket({ bucketName: "deal", cid });

    let networkViewer;
    try {
      const response = await fetch("/api/network");
      const json = await response.json();
      networkViewer = json.data;
    } catch (e) {}

    this.setState({
      networkViewer,
      loading: false,
    });
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillUnmount() {
    mounted = false;
  }

  render() {
    const { networkViewer } = this.state;
    const addressMap = {};
    const addresses = [];
    let selected = null;
    let balance = 0;

    if (networkViewer) {
      networkViewer.powerInfo.balancesList.forEach((a) => {
        addressMap[a.addr.addr] = { ...a.addr, balance: a.balance };
        addresses.push({ ...a.addr, balance: a.balance });
      });

      if (addresses.length) {
        selected = addresses[0];
      }

      let transactions = [];
      if (selected.transactions) {
        transactions = [...selected.transactions];
      }

      balance = Strings.formatAsFilecoinConversion(selected.balance);
    }

    let inFil = 0;
    if (networkViewer) {
      const filecoinNumber = new FilecoinNumber(
        `${this.state.settings_cold_default_max_price}`,
        "attofil"
      );

      inFil = filecoinNumber.toFil();
    }

    return (
      <ScenePage>
        <input
          css={STYLES_FILE_HIDDEN}
          multiple
          type="file"
          id="file"
          onChange={this._handleUpload}
        />
        <TestnetBanner balance={balance} />
        <ScenePageHeader title="Make an one-off Filecoin Storage Deal">
          This is a simple tool to upload data and make one-off storage deals in
          the Filecoin network.
        </ScenePageHeader>

        {this.state.networkViewer ? (
          <React.Fragment>
            <Section
              title="Files"
              style={{ marginTop: 48, maxWidth: 688, minWidth: "auto" }}
              onAction={this.props.onAction}
              buttons={[
                {
                  name: "Add file",
                  multiple: true,
                  type: "file",
                  id: "file",
                },
              ]}
            >
              {this.state.loading ? (
                <div style={{ padding: 24 }}>
                  <LoaderSpinner style={{ height: 32, width: 32 }} />
                </div>
              ) : (
                <React.Fragment>
                  {this.state.networkViewer.deal.length ? (
                    <System.Table
                      data={{
                        columns: [
                          {
                            key: "cid",
                            name: "CID",
                            width: "100%",
                          },
                        ],
                        rows: this.state.networkViewer.deal.map((file) => {
                          return {
                            cid: (
                              <div css={STYLES_ROW}>
                                <a
                                  css={STYLES_LEFT}
                                  href={Strings.getCIDGatewayURL(file.cid)}
                                  target="_blank"
                                >
                                  {file.cid}
                                </a>
                                <span
                                  css={STYLES_RIGHT}
                                  onClick={() => this._handleRemove(file.cid)}
                                >
                                  <SVG.Dismiss height="16px" />
                                </span>
                              </div>
                            ),
                          };
                        }),
                      }}
                    />
                  ) : (
                    <div style={{ padding: 24 }}>No files have been added.</div>
                  )}
                </React.Fragment>
              )}
            </Section>

            <System.Input
              containerStyle={{ marginTop: 48, maxWidth: 688 }}
              descriptionStyle={{ maxWidth: 688 }}
              readOnly
              label="Filecoin address (read only)"
              description="This is the Filecoin address your funds will come from."
              name="settings_cold_default_duration"
              readOnly
              type="text"
              value={this.state.settings_cold_default_address}
              onChange={this._handleChange}
            />

            <System.Input
              containerStyle={{ marginTop: 24, maxWidth: 688 }}
              descriptionStyle={{ maxWidth: 688 }}
              readOnly
              label="Default Filecoin replication and availability factor (read only)"
              description="How many times should we replicate this deal across your selected miners?"
              name="settings_cold_default_replication_factor"
              type="number"
              value={this.state.settings_cold_default_replication_factor}
              placeholder="Type in amount of miners"
              onChange={this._handleChange}
            />

            <System.Input
              containerStyle={{ marginTop: 24, maxWidth: 688 }}
              descriptionStyle={{ maxWidth: 688 }}
              readOnly
              label="Default Filecoin deal duration (read only)"
              description={`Your deal is set for ${this.state
                .settings_cold_default_duration /
                30 /
                2 /
                60 /
                24} days.`}
              name="settings_cold_default_duration"
              type="number"
              unit="epochs"
              value={this.state.settings_cold_default_duration}
              placeholder="Type in epochs (1 epoch = ~30 seconds)"
              onChange={this._handleChange}
            />

            <System.Input
              containerStyle={{ marginTop: 24, maxWidth: 688 }}
              descriptionStyle={{ maxWidth: 688 }}
              readOnly
              label="Max Filecoin price (read only)"
              unit="attoFIL"
              type="number"
              description={`Set the maximum Filecoin price you're willing to pay. The current price you have set is equivalent to ${inFil} FIL`}
              name="settings_cold_default_max_price"
              value={this.state.settings_cold_default_max_price}
              placeholder="Type in amount of Filecoin (attoFIL)"
              onChange={this._handleChange}
            />

            <Section
              title="Targeted miners (read only)"
              style={{ marginTop: 48, maxWidth: 688, minWidth: "auto" }}
              onAction={this.props.onAction}
            >
              <System.Table
                data={{
                  columns: [
                    {
                      key: "miner",
                      name: "Miner ID",
                      width: "100%",
                    },
                  ],
                  rows: this.state.settings_cold_default_trusted_miners.map(
                    (miner) => {
                      return {
                        miner,
                      };
                    }
                  ),
                }}
              />
            </Section>

            <System.ButtonPrimary
              style={{ marginTop: 48 }}
              onClick={this._handleArchive}
              loading={this.state.archiving}
            >
              Make storage deal
            </System.ButtonPrimary>
          </React.Fragment>
        ) : (
          <LoaderSpinner style={{ marginTop: 48, height: 32, width: 32 }} />
        )}
      </ScenePage>
    );
  }
}
