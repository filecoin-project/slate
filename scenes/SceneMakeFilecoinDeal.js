import * as React from "react";
import * as Strings from "~/common/strings";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as SVG from "~/common/svg";
import * as Window from "~/common/window";
import * as Messages from "~/common/messages";
import * as FileUtilities from "~/common/file-utilities";
import * as Events from "~/common/custom-events";

import { css } from "@emotion/react";
import { createState } from "~/scenes/SceneSettings";
import { LoaderSpinner } from "~/components/system/components/Loaders";
import { FilecoinNumber } from "@glif/filecoin-number";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

const STAGING_DEAL_BUCKET = "stage-deal";

const STYLES_SPINNER_CONTAINER = css`
  width: 100%;
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
  transition: 200ms ease all;
  cursor: pointer;
  :hover {
    color: ${Constants.system.brand};
  }
`;

const DEFAULT_ERROR_MESSAGE = "We could not make your deal. Please try again later.";
let mounted = false;

export default class SceneMakeFilecoinDeal extends React.Component {
  state = { encryption: false };

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
      ...createState(networkViewer.settings),
      encryption: false,
    });
  }

  _handleUpload = async (e) => {
    e.persist();

    if (!e.target.files) {
      return null;
    }

    if (!e.target.files.length) {
      return null;
    }

    this.setState({ loading: true });

    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];

      const response = await FileUtilities.upload({
        bucketName: STAGING_DEAL_BUCKET,
        routes: this.props.resources,
        file,
      });
    }

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

    const response = await Actions.archive({
      bucketName: STAGING_DEAL_BUCKET,
      forceEncryption: this.state.encryption,
      settings: {
        /**
         * RepFactor indicates the desired amount of active deals
         * with different miners to store the data. While making deals
         * the other attributes of FilConfig are considered for miner selection.
         */
        repFactor: Number(this.state.repFactor),

        /**
         * DealMinDuration indicates the duration to be used when making new deals.
         */
        dealMinDuration: this.state.dealMinDuration,

        /**
         * ExcludedMiners is a set of miner addresses won't be ever be selected
         *when making new deals, even if they comply to other filters.
         */
        excludedMiners: this.state.excludedMiners,

        /**
         * TrustedMiners is a set of miner addresses which will be forcibly used
         * when making new deals. An empty/nil list disables this feature.
         */
        trustedMiners: this.state.trustedMiners,

        /**
         * Renew indicates deal-renewal configuration.
         */
        renew: {
          enabled: this.state.renewEnabled,
          threshold: this.state.renewThreshold,
        },

        /**
         * CountryCodes indicates that new deals should select miners on specific countries.
         */
        countryCodes: [],

        /**
         * Addr is the wallet address used to store the data in filecoin
         */
        addr: this.state.addr,

        /**
         * MaxPrice is the maximum price that will be spent to store the data, 0 is no max
         */
        maxPrice: this.state.maxPrice,

        /**
         *
         * FastRetrieval indicates that created deals should enable the
         * fast retrieval feature.
         */
        // fastRetrieval: boolean
        /**
         * DealStartOffset indicates how many epochs in the future impose a
         * deadline to new deals being active on-chain. This value might influence
         * if miners accept deals, since they should seal fast enough to satisfy
         * this constraint.
         */
        // dealStartOffset: number
      },
    });

    if (Events.hasError(response)) {
      this.setState({ archiving: false });
    }

    await Window.delay(5000);
    alert(
      "Your storage deal was put in the queue. This can take up to 36 hours, check back later."
    );

    this.props.onAction({ type: "NAVIGATE", value: "V1_NAVIGATION_ARCHIVE" });
  };

  _handleRemove = async (cid) => {
    this.setState({ loading: true });

    await Actions.removeFromBucket({ bucketName: STAGING_DEAL_BUCKET, cid });

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

  _handleAddTrustedMiner = () => {
    const miner = prompt("Enter the Miner ID to trust.");

    if (Strings.isEmpty(miner)) {
      return Events.dispatchMessage({ message: "You must provide a miner ID." });
    }

    if (this.state.trustedMiners.includes(miner)) {
      return Events.dispatchMessage({
        message: `${miner} is already on your list of miners to try.`,
      });
    }

    this.setState({
      trustedMiners: [miner, ...this.state.trustedMiners],
    });
  };

  _handleAddExcludedMiner = () => {
    const miner = prompt("Enter the Miner ID to exclude.");

    if (Strings.isEmpty(miner)) {
      return Events.dispatchMessage({ message: "You must provide a miner ID." });
    }

    if (this.state.excludedMiners.includes(miner)) {
      return Events.dispatchMessage({
        message: `${miner} is already on your list of miners to exclude.`,
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
      // TODO(jim): restore this when the wallet function is back in Pow.
    }

    let inFil = 0;
    if (networkViewer) {
      const filecoinNumber = new FilecoinNumber(`${this.state.maxPrice}`, "attofil");

      inFil = filecoinNumber.toFil();
    }

    console.log(this.state);

    return (
      <ScenePage>
        <input
          css={STYLES_FILE_HIDDEN}
          multiple
          type="file"
          id="file"
          onChange={this._handleUpload}
        />

        <ScenePageHeader title="Make an one-off Filecoin Storage Deal">
          Upload data and make one-off storage deals in the Filecoin network here. You must store at
          least 100MB of data.
        </ScenePageHeader>

        {this.state.networkViewer ? (
          <React.Fragment>
            <System.DescriptionGroup
              style={{ marginTop: 48, maxWidth: 688 }}
              label="Storage deal files"
              description="You can add up to 4GB of files."
            />

            <Section
              style={{ marginTop: 24, maxWidth: 688, minWidth: "auto" }}
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
                <div css={STYLES_SPINNER_CONTAINER}>
                  <LoaderSpinner style={{ height: 32, width: 32 }} />
                </div>
              ) : (
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
                            <span css={STYLES_LEFT} target="_blank">
                              {file.cid}
                            </span>
                            <span css={STYLES_RIGHT} onClick={() => this._handleRemove(file.cid)}>
                              <SVG.Dismiss height="16px" />
                            </span>
                          </div>
                        ),
                      };
                    }),
                  }}
                />
              )}
            </Section>

            <System.DescriptionGroup
              style={{ marginTop: 64, maxWidth: 688 }}
              label="Miners"
              description="Specify miners for our deal maker to try first, and specify miners for our deal maker to ignore."
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

            <System.DescriptionGroup
              style={{ marginTop: 64, maxWidth: 688 }}
              label="Default Filecoin address"
              description={`${this.state.addr}`}
            />

            <System.Input
              containerStyle={{ marginTop: 32, maxWidth: 688 }}
              descriptionStyle={{ maxWidth: 688 }}
              label="Default Filecoin replication and availability factor"
              description="How many times should we replicate this deal across your selected miners?"
              name="repFactor"
              type="number"
              value={this.state.repFactor}
              placeholder="Type in amount of miners"
              onChange={this._handleChange}
            />

            <System.Input
              containerStyle={{ marginTop: 24, maxWidth: 688 }}
              descriptionStyle={{ maxWidth: 688 }}
              label="Default Filecoin deal duration"
              description={`Your deal is set for ${Strings.getDaysFromEpoch(
                this.state.dealMinDuration
              )}.`}
              name="dealMinDuration"
              type="number"
              unit="epochs"
              value={this.state.dealMinDuration}
              placeholder="Type in epochs (1 epoch = ~30 seconds)"
              onChange={this._handleChange}
            />

            <System.Input
              containerStyle={{ marginTop: 24, maxWidth: 688 }}
              descriptionStyle={{ maxWidth: 688 }}
              label="Max Filecoin price"
              unit="attoFIL"
              type="number"
              description={`Set the maximum Filecoin price you're willing to pay. The current price you have set is equivalent to ${inFil} FIL`}
              name="maxPrice"
              value={this.state.maxPrice}
              placeholder="Type in amount of Filecoin (attoFIL)"
              onChange={this._handleChange}
            />

            <System.CheckBox
              style={{ marginTop: 48 }}
              name="encryption"
              value={this.state.encryption}
              onChange={this._handleChange}
            >
              Encrypt this storage deal. Accessing the contents will require decryption.
            </System.CheckBox>

            <System.ButtonPrimary
              style={{ marginTop: 48 }}
              onClick={this._handleArchive}
              loading={this.state.archiving}
            >
              Make storage deal
            </System.ButtonPrimary>
          </React.Fragment>
        ) : (
          <div css={STYLES_SPINNER_CONTAINER}>
            <LoaderSpinner style={{ height: 32, width: 32 }} />
          </div>
        )}
      </ScenePage>
    );
  }
}
