import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import TestnetBanner from "~/components/core/TestnetBanner";

const STYLES_LABEL = css`
  font-family: ${Constants.font.semiBold};
  font-size: 16px;
  margin-bottom: 16px;
`;

let mounted = false;

export default class SceneArchive extends React.Component {
  state = {
    networkViewer: null,
    allow_encrypted_data_storage: this.props.viewer
      .allow_encrypted_data_storage,
  };

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
    });
  }

  _handleCheckboxChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _handleSaveFilecoin = async (e) => {
    this.setState({ changingFilecoin: true });

    await Actions.updateViewer({
      data: {
        allow_encrypted_data_storage: this.state.allow_encrypted_data_storage,
      },
    });

    await this.props.onRehydrate();

    this.setState({ changingFilecoin: false });
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

    return (
      <ScenePage>
        <ScenePageHeader title="Filecoin: archiving and logs">
          Use this section to archive all of your data on to Filecoin through a
          storage deal. Once you make a storage deal, you can view the logs
          here. <br />
        </ScenePageHeader>

        {this.state.networkViewer ? (
          <React.Fragment>
            <br />
            <System.ButtonPrimary
              onClick={() =>
                this.props.onAction({
                  type: "SIDEBAR",
                  value: "SIDEBAR_FILECOIN_ARCHIVE",
                })
              }
            >
              Make storage deal
            </System.ButtonPrimary>

            <System.DescriptionGroup
              style={{ marginTop: 64 }}
              label="Encryption settings"
              description="You may not want others to be able to read your data on the network."
            />

            <System.CheckBox
              style={{ marginTop: 24 }}
              name="allow_encrypted_data_storage"
              value={this.state.allow_encrypted_data_storage}
              onChange={this._handleCheckboxChange}
            >
              Force encryption on archive storage deals (only you can see
              retrieved data from the Filecoin network).
            </System.CheckBox>

            <div style={{ marginTop: 24 }}>
              <System.ButtonSecondary
                onClick={this._handleSaveFilecoin}
                loading={this.state.changingFilecoin}
              >
                Save archiving settings
              </System.ButtonSecondary>
            </div>

            <Section
              title="Trusted miners"
              style={{ minWidth: "auto", marginTop: 48 }}
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
                  rows: this.state.networkViewer.powerInfo.defaultStorageConfig.cold.filecoin.trustedMinersList.map(
                    (miner) => {
                      return {
                        miner,
                      };
                    }
                  ),
                }}
              />
            </Section>

            <Section
              title="Archive deal logs"
              style={{ minWidth: "auto", marginTop: 48 }}
            >
              <System.Table
                data={{
                  columns: [
                    {
                      key: "job",
                      name: "Job Message",
                      width: "100%",
                    },
                  ],
                  rows: this.state.networkViewer.archive.jobs.map((job) => {
                    return {
                      job: job.msg,
                    };
                  }),
                }}
              />
            </Section>

            <Section
              title="(one-off) Storage deal logs"
              style={{ minWidth: "auto", marginTop: 48 }}
            >
              <System.Table
                data={{
                  columns: [
                    {
                      key: "job",
                      name: "Job Message",
                      width: "100%",
                    },
                  ],
                  rows: this.state.networkViewer.dealJobs.map((job) => {
                    return {
                      job: job.msg,
                    };
                  }),
                }}
              />
            </Section>
          </React.Fragment>
        ) : (
          <LoaderSpinner style={{ marginTop: 48, height: 32, width: 32 }} />
        )}
      </ScenePage>
    );
  }
}
