import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

export default class SceneSentinel extends React.Component {
  state = { routes: [] };

  async componentDidMount() {
    let routes;
    try {
      const response = await fetch("https://sentinel.slate.host/api");
      const json = await response.json();
      routes = json.data;
    } catch (e) {}

    this.setState({ routes });
  }

  render() {
    console.log(this.props);
    return (
      <ScenePage>
        <ScenePageHeader title="Filecoin Network">
          Slate provides access to live data on the Filecoin Network through
          Sentinel. Each of these API endpoints can be used programatically.
        </ScenePageHeader>

        <Section title="Filecoin network API routes">
          <System.Table
            data={{
              columns: [
                {
                  key: "route",
                  name: "Route",
                  width: "100%",
                },
              ],
              rows: this.state.routes.map((r) => {
                const route = `https://sentinel.slate.host${r}?offset=0&limit=200`;
                return {
                  route: (
                    <a href={route} target="_blank">
                      {route}
                    </a>
                  ),
                };
              }),
            }}
          />
        </Section>
      </ScenePage>
    );
  }
}
