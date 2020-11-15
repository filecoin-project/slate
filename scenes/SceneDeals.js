import * as React from "react";
import * as System from "~/components/system";

import { LoaderSpinner } from "~/components/system/components/Loaders";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

export default class SceneDeals extends React.Component {
  render() {
    let addressSentence = "Your deals are made from your default address.";

    return (
      <React.Fragment>
        <ScenePageHeader>
          View all of your storage deals that are in progress or successful. {addressSentence}
        </ScenePageHeader>

        {this.props.dealsLoaded ? (
          <Section title={"History"} style={{ maxWidth: 960, minWidth: "auto" }}>
            <System.Table
              data={{
                columns: [
                  {
                    key: "dealId",
                    name: "Deal ID",
                    width: "72px",
                  },
                  {
                    key: "rootCid",
                    name: "Root CID",
                    width: "100%",
                  },
                  {
                    key: "miner",
                    name: "Miner ID",
                    width: "72px",
                  },
                  {
                    key: "createdAt",
                    name: "Creation date",
                    width: "112px",
                  },
                  {
                    key: "totalSpeculatedCost",
                    name: "Cost",
                    width: "128px",
                  },
                  {
                    key: "formattedSize",
                    name: "Size",
                    width: "72px",
                  },
                  {
                    key: "formattedDuration",
                    name: "Duration",
                    width: "96px",
                  },
                  {
                    key: "pending",
                    name: "Retrievable",
                    width: "112px",
                    type: "RETRIEVABLE",
                  },
                ],
                rows: this.props.deals,
              }}
            />
          </Section>
        ) : (
          <div style={{ padding: "32px 0 0 0" }}>
            <LoaderSpinner style={{ height: 32, width: 32 }} />
          </div>
        )}
      </React.Fragment>
    );
  }
}
