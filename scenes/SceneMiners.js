import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

let mounted = false;

export default class SceneMiners extends React.Component {
  state = { miners: [] };

  async componentDidMount() {
    if (mounted) {
      return null;
    }

    mounted = true;

    let miners = [];
    try {
      const response = await fetch(
        "https://sentinel.slate.host/api/static-global-miners"
      );
      const json = await response.json();
      const sources = json.data.buckets;

      sources.forEach((group) => {
        miners = [
          ...group.minerAddresses.map((name) => {
            return { location: group.name, name };
          }),
          ...miners,
        ];
      });
    } catch (e) {}

    this.setState({ miners });
  }

  componentWillUnmount() {
    mounted = false;
  }

  render() {
    return (
      <ScenePage>
        <ScenePageHeader title="Trusted miners">
          Whenever you make a deal against the Filecoin Network, Slate works
          with Textile's infrastructure to find the best possible miner to store
          your data. Here is the list of miners.
        </ScenePageHeader>

        <Section title="Miners" style={{ maxWidth: 688, minWidth: "auto" }}>
          <System.Table
            data={{
              columns: [
                {
                  key: "miner",
                  name: "Miner",
                  width: "100%",
                },
                {
                  key: "location",
                  name: "Location",
                  width: "188px",
                },
              ],
              rows: this.state.miners.map((miner) => {
                return {
                  miner: miner.name,
                  location: miner.location,
                };
              }),
            }}
          />
        </Section>
      </ScenePage>
    );
  }
}
