import * as React from "react";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as Strings from "~/common/strings";
import * as SVG from "~/common/svg";
import * as Constants from "~/common/constants";

import { css } from "@emotion/core";
import { LoaderSpinner } from "~/components/system/components/Loaders";
import { FilecoinNumber } from "@glif/filecoin-number";
import { dispatchCustomEvent } from "~/common/custom-events";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

export const createState = (config) => {
  return {
    ...config,
  };
};

let mounted = false;

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
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
  transition: 200ms ease all;
  cursor: pointer;

  :hover {
    color: ${Constants.system.brand};
  }
`;

export default class SceneSettings extends React.Component {
  state = {};
  _deferredSave = null;

  async componentDidMount() {
    if (mounted) {
      return null;
    }

    mounted = true;
    this.setState({
      networkViewer: this.props.networkViewer,
      ...createState(this.props.networkViewer.settings),
    });
  }

  componentWillUnmount() {
    mounted = false;
  }

  _handleSave = async () => {
    this.setState({ loading: true });

    const response = await Actions.updateViewer({
      type: "SAVE_DEFAULT_ARCHIVE_CONFIG",
      config: {
        addr: this.state.addr,
        countryCodes: this.state.countryCodes,
        dealMinDuration: this.state.dealMinDuration,
        dealStartOffset: this.state.dealStartOffset,
        excludedMiners: this.state.excludedMiners,
        fastRetrieval: this.state.fastRetrieval,
        maxPrice: this.state.maxPrice,
        renew: { enabled: this.state.renewEnabled, threshold: this.state.renewThreshold },
        repFactor: Number(this.state.repFactor),
        trustedMiners: this.state.trustedMiners,
      },
    });

    this.setState({ loading: false });

    return dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: {
          message: "Your default settings are saved.",
          status: "INFO",
        },
      },
    });
  };

  _handleAddTrustedMiner = () => {
    const miner = prompt("Enter the Miner ID to trust.");

    if (Strings.isEmpty(miner)) {
      return dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "You must provide a miner ID.",
          },
        },
      });
    }

    if (this.state.trustedMiners.includes(miner)) {
      return dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: `${miner} is already on your list of miners to try.`,
          },
        },
      });
    }

    this.setState({
      trustedMiners: [miner, ...this.state.trustedMiners],
    });
  };

  _handleAddExcludedMiner = () => {
    const miner = prompt("Enter the Miner ID to exclude.");

    if (Strings.isEmpty(miner)) {
      return dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "You must provide a miner ID.",
          },
        },
      });
    }

    if (this.state.excludedMiners.includes(miner)) {
      return dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: `${miner} is already on your list of miners to exclude.`,
          },
        },
      });
    }

    this.setState({
      excludedMiners: [miner, ...this.state.excludedMiners],
    });
  };

  _handleRemoveTrustedMiner = (minerId) => {
    this.setState({
      trustedMiners: this.state.trustedMiners.filter((m) => m !== minerId),
    });
  };

  _handleRemoveExcludedMiner = (minerId) => {
    this.setState({
      excludedMiners: this.state.excludedMiners.filter((m) => m !== minerId),
    });
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let inFil = 0;
    let inFilRenew = 0;
    if (this.state.networkViewer) {
      const filecoinNumber = new FilecoinNumber(
        `${Strings.isEmpty(this.state.maxPrice) ? `0` : this.state.maxPrice}`,
        "attofil"
      );
      const filecoinNumber2 = new FilecoinNumber(
        `${Strings.isEmpty(this.state.renewThreshold) ? `0` : this.state.renewThreshold}`,
        "attofil"
      );
      inFil = filecoinNumber.toFil();
      inFilRenew = filecoinNumber2.toFil();
    }

    return (
      <React.Fragment>
        {this.state.networkViewer ? (
          <React.Fragment>
            <System.DescriptionGroup
              style={{ marginTop: 48, maxWidth: 688 }}
              label="Archiving Filecoin address"
              description={`${this.state.addr}`}
            />

            <System.DescriptionGroup
              style={{ marginTop: 48, maxWidth: 688 }}
              label="Miners"
              description="Specify miners for our infrastructure to try first, and specify miners for our storage deal maker to ignore."
            />

            <Section
              style={{ marginTop: 24, maxWidth: 688, minWidth: "auto" }}
              buttons={[
                {
                  name: "Add miner",
                  onClick: this._handleAddTrustedMiner,
                },
              ]}
            >
              <System.Table
                data={{
                  columns: [
                    {
                      key: "miner",
                      name: "Miner",
                      width: "100%",
                    },
                  ],
                  rows: this.state.trustedMiners.map((miner) => {
                    return {
                      miner: (
                        <div css={STYLES_ROW} key={miner}>
                          <span css={STYLES_LEFT} target="_blank">
                            {miner}
                          </span>
                          <span
                            css={STYLES_RIGHT}
                            onClick={() => this._handleRemoveTrustedMiner(miner)}
                          >
                            <SVG.Dismiss height="16px" />
                          </span>
                        </div>
                      ),
                    };
                  }),
                }}
              />
            </Section>

            <Section
              style={{ maxWidth: 688, minWidth: "auto" }}
              buttons={[
                {
                  name: "Exclude miner",
                  onClick: this._handleAddExcludedMiner,
                },
              ]}
            >
              <System.Table
                data={{
                  columns: [
                    {
                      key: "miner",
                      name: "Miner",
                      width: "100%",
                    },
                  ],
                  rows: this.state.excludedMiners.map((miner) => {
                    return {
                      miner: (
                        <div css={STYLES_ROW} key={miner}>
                          <span css={STYLES_LEFT} target="_blank">
                            Excluding: {miner}
                          </span>
                          <span
                            css={STYLES_RIGHT}
                            onClick={() => this._handleRemoveExcludedMiner(miner)}
                          >
                            <SVG.Dismiss height="16px" />
                          </span>
                        </div>
                      ),
                    };
                  }),
                }}
              />
            </Section>

            <System.Input
              containerStyle={{ marginTop: 48 }}
              label="Deal duration"
              description={`Your archives will be set for ${Strings.getDaysFromEpoch(
                this.state.dealMinDuration
              )}.`}
              name="dealMinDuration"
              type="number"
              value={this.state.dealMinDuration}
              unit="epochs"
              placeholder="Type in epochs (~25 seconds)"
              onChange={this._handleChange}
            />

            <System.Input
              containerStyle={{ marginTop: 24 }}
              label="Replication factor"
              description="How many times should our deal broker replicate storage deals across your preferred miners?"
              name="repFactor"
              type="number"
              value={this.state.repFactor}
              placeholder="Type in amount of miners"
              onChange={this._handleChange}
            />

            <System.Input
              containerStyle={{ marginTop: 24 }}
              label="Max price"
              description={`Set the maximum attoFIL you're willing to pay. The current price you have set is equivalent to ${inFil} FIL.`}
              name="maxPrice"
              unit="attoFIL"
              value={this.state.maxPrice}
              placeholder="Type in an amount of attoFIL"
              onChange={this._handleChange}
            />

            <System.CheckBox
              style={{ marginTop: 48 }}
              name="renewEnabled"
              value={this.state.renewEnabled}
              onChange={this._handleChange}
            >
              Enable auto renew for Filecoin storage deals.
            </System.CheckBox>

            <System.Input
              containerStyle={{ marginTop: 24 }}
              label="Max auto renew price"
              description={`Set the maximum attoFIL you're willing to pay in attoFIL. The current price you have set is equivalent to ${inFilRenew} FIL.`}
              name="renewThreshold"
              value={this.state.renewThreshold}
              unit="attoFIL"
              placeholder="Type in an amount of attoFIL"
              onChange={this._handleChange}
            />

            <div style={{ marginTop: 32 }}>
              <System.ButtonPrimary loading={this.state.loading} onClick={this._handleSave}>
                Save configuration
              </System.ButtonPrimary>
            </div>
          </React.Fragment>
        ) : (
          <LoaderSpinner style={{ marginTop: 48, height: 32, width: 32 }} />
        )}
      </React.Fragment>
    );
  }
}
