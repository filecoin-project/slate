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
      const response = await fetch("https://sentinel.slate.host/api/mapped-static-global-miners");
      const json = await response.json();
      const sources = json.data;

      sources.forEach((group) => {
        miners = [
          ...group.minerAddresses.map((entity) => {
            return { location: group.name, ...entity };
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
        <ScenePageHeader title="Miners">
          Whenever you make a deal against the Filecoin Network, Slate works with Textile's
          infrastructure to find the best possible miner to make a storage deal with.
        </ScenePageHeader>

        <Section title="Listing" style={{ maxWidth: 960, minWidth: "auto" }}>
          <System.Table
            data={{
              columns: [
                {
                  key: "miner",
                  name: "Miner",
                  width: "96px",
                },
                {
                  key: "minPieceSizeFormatted",
                  name: "Minimum size",
                  width: "124px",
                },
                {
                  key: "minDealDuration",
                  name: "Minimum duration",
                  width: "140px",
                },
                {
                  key: "location",
                  name: "Location",
                  width: "188px",
                },
                {
                  key: "priceFIL",
                  name: "Price",
                  width: "100%",
                },
              ],
              rows: this.state.miners,
            }}
          />
        </Section>
      </ScenePage>
    );
  }
}
