import * as React from "react";
import * as System from "~/components/system";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

export default class SceneMiners extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ScenePageHeader>
          Whenever you make a deal against the Filecoin Network, Slate works with Textile's
          infrastructure to find the best possible miner to make a storage deal with.
        </ScenePageHeader>

        <Section title="Listing" style={{ maxWidth: 960, minWidth: "auto" }}>
          <System.Table
            data={{
              columns: [
                {
                  key: "id",
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
              rows: this.props.miners.map((each) => {
                return {
                  ...each,
                  ...each.storageAsk,
                };
              }),
            }}
          />
        </Section>
      </React.Fragment>
    );
  }
}
