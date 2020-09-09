import * as React from "react";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

export default class SceneArchive extends React.Component {
  render() {
    return (
      <ScenePage>
        <ScenePageHeader title="Archive">
          Slate provides a way to archive your data onto the Filecoin network.
          Once your archive is sealed on the Filecoin network, it will be shown
          here.
        </ScenePageHeader>

        <Section
          title="Archives"
          onAction={this.props.onAction}
          buttons={[
            {
              name: "Archive",
              type: "SIDEBAR",
              value: "SIDEBAR_FILECOIN_ARCHIVE",
            },
          ]}
        >
          <System.Table
            data={{
              columns: [
                {
                  key: "job",
                  name: "Job ID",
                  width: "100%",
                },
              ],
              rows: [],
            }}
          />
        </Section>
      </ScenePage>
    );
  }
}
