import * as React from "react";
import * as System from "~/components/system";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

export default class SceneSentinel extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ScenePageHeader>
          Slate provides access to recent data on the Filecoin Network through Sentinel. Each of
          these API endpoints can be used programatically.
        </ScenePageHeader>

        <Section title="Filecoin API routes" style={{ maxWidth: 960, minWidth: "auto" }}>
          <System.Table
            data={{
              columns: [
                {
                  key: "route",
                  name: "Route",
                  width: "100%",
                  name: "URL",
                  type: "NEW_WINDOW",
                },
              ],
              rows: this.props.routes.map((r) => {
                const route = `https://sentinel.slate.host${r}?offset=0&limit=200`;
                return {
                  route,
                };
              }),
            }}
          />
        </Section>
      </React.Fragment>
    );
  }
}
