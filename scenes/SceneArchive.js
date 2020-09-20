import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

const STYLES_LABEL = css`
  font-family: ${Constants.font.semiBold};
  font-size: 16px;
  margin-bottom: 16px;
`;

export default class SceneArchive extends React.Component {
  state = {};

  async componentDidMount() {
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

  render() {
    return (
      <ScenePage>
        <ScenePageHeader title="Filecoin Testnet">
          Filecoin is currently in Testnet phase. You can use this tab to test
          and verify Filecoin deals with Testnet FIL.
        </ScenePageHeader>

        {this.state.networkViewer ? (
          <React.Fragment>
            <Section
              title="Filecoin Testnet trusted miners"
              style={{ marginTop: 48 }}
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
              title="Filecoin Testnet archive deals"
              onAction={this.props.onAction}
              buttons={[
                {
                  name: "Make Filecoin Testnet deal",
                  type: "SIDEBAR",
                  value: "SIDEBAR_FILECOIN_ARCHIVE",
                },
              ]}
            >
              <div style={{ padding: 24 }}>
                <div css={STYLES_LABEL}>Info</div>
                {JSON.stringify(this.state.networkViewer.archive.info, null, 2)}

                <div css={STYLES_LABEL} style={{ marginTop: 24 }}>
                  Status
                </div>
                {JSON.stringify(
                  this.state.networkViewer.archive.status,
                  null,
                  2
                )}

                <div css={STYLES_LABEL} style={{ marginTop: 24 }}>
                  Errors
                </div>
                {JSON.stringify(
                  this.state.networkViewer.archive.errors,
                  null,
                  2
                )}
              </div>
            </Section>

            <Section title="Job history" style={{ marginTop: 48 }}>
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
          </React.Fragment>
        ) : (
          <LoaderSpinner style={{ marginTop: 48, height: 32, width: 32 }} />
        )}
      </ScenePage>
    );
  }
}
