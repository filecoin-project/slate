import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

let mounted = false;

export default class SceneDeals extends React.Component {
  state = { deals: [], loaded: false };

  async componentDidMount() {
    if (mounted) {
      return null;
    }

    mounted = true;
    let deals = [];
    try {
      const response = await fetch("/api/network-deals");
      const json = await response.json();
      deals = json.data.deals;
    } catch (e) {}

    if (!deals || !deals.length) {
      this.setState({ loaded: true });
      return null;
    }

    this.setState({ deals, loaded: true });
  }

  componentWillUnmount() {
    mounted = false;
  }

  render() {
    let addressSentence = "Your deals are made from your default address.";

    return (
      <ScenePage>
        <ScenePageHeader title="Storage deal history">
          View all of your storage deals that are in progress or successful. {addressSentence}
        </ScenePageHeader>

        {this.state.loaded ? (
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
                rows: this.state.deals,
              }}
            />
          </Section>
        ) : (
          <div style={{ padding: "32px 0 0 0" }}>
            <LoaderSpinner style={{ height: 32, width: 32 }} />
          </div>
        )}
      </ScenePage>
    );
  }
}
