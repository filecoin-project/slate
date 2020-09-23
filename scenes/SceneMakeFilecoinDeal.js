import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";
import { createState } from "~/scenes/SceneSettings";
import { LoaderSpinner } from "~/components/system/components/Loaders";
import { FilecoinNumber, Converter } from "@openworklabs/filecoin-number";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import TestnetBanner from "~/components/core/TestnetBanner";

const STYLES_SECTION_UPLOAD = css`
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 88px 48px 88px 48px;
  border: 1px solid #ececec;
  margin-top: 48px;
  max-width: 688px;
  font-family: ${Constants.font.semiBold};
`;

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

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillUnmount() {
    mounted = false;
  }

  render() {
    let inFil = 0;
    if (this.state.networkViewer) {
      const filecoinNumber = new FilecoinNumber(
        `${this.state.settings_cold_default_max_price}`,
        "attofil"
      );

      inFil = filecoinNumber.toFil();
    }

    return (
      <ScenePage>
        <TestnetBanner />
        <ScenePageHeader title="Make an one-off Flecoin Storage Deal">
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
                },
              ]}
            >
              <div style={{ padding: 24 }}>No files added, yet</div>
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
              description="The minimum deal time for a Filecoin deal is 6 months."
              name="settings_cold_default_duration"
              type="number"
              unit="epochs"
              value={this.state.settings_cold_default_duration}
              placeholder="Type in epochs (~25 seconds)"
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

            <System.ButtonPrimary style={{ marginTop: 48 }}>
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
