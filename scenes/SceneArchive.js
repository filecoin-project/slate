import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

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
    console.log(this.state.networkViewer);
    return (
      <ScenePage>
        <TestnetBanner />
        <ScenePageHeader title="Archive your data on Filecoin">
          Use this section to archive all of your data on to Filecoin through a
          storage deal.
        </ScenePageHeader>

        {this.state.networkViewer ? (
          <React.Fragment>
            <Section
              title="Trusted miners"
              style={{ minWidth: "auto", marginTop: 48 }}
              onAction={this.props.onAction}
              buttons={[
                {
                  name: "Make storage deal",
                  type: "SIDEBAR",
                  value: "SIDEBAR_FILECOIN_ARCHIVE",
                },
              ]}
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
              title="Storage deal status [WIP]"
              style={{ minWidth: "auto", marginTop: 48 }}
            >
              <div style={{ padding: 24 }}>
                Successful deals will appear here.
              </div>
            </Section>

            <Section
              title="Storage deal logs"
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
          </React.Fragment>
        ) : (
          <LoaderSpinner style={{ marginTop: 48, height: 32, width: 32 }} />
        )}
      </ScenePage>
    );
  }
}
