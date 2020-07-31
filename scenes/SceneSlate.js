import * as React from "react";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import Section from "~/components/core/Section";

export default class SceneSlate extends React.Component {
  render() {
    const { data, slatename } = this.props.current;
    const images = data.objects;
    const url = `/@${this.props.viewer.username}/${slatename}`;

    const slates = {
      columns: [
        { key: "name", name: "Data", type: "FILE_LINK", width: "288px" },
        { key: "url", name: "Asset URL", width: "100%" },
      ],
      rows: images,
    };

    // TODO(jim): Refactor later.
    // Actually just delete later, we're doing something else.
    const slateButtons = [
      /*
      { name: "Make public", type: "SIDEBAR", value: "" },
      { name: "Make private", type: "SIDEBAR", value: "" },
      */
      {
        name: "View slate",
        type: "NEW_WINDOW",
        value: url,
      },
      {
        name: "Add image",
        type: "SIDEBAR",
        value: "SIDEBAR_ADD_FILE_TO_BUCKET",
        data: this.props.current,
      },
    ];

    return (
      <ScenePage>
        <System.H1>
          https://slate.host/@{this.props.viewer.username}/{slatename}
        </System.H1>
        <Section
          title="Images"
          buttons={slateButtons}
          onAction={this.props.onAction}
        >
          <System.Table
            data={slates}
            name={`/@${this.props.viewer.username}/${slatename}`}
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
          />
        </Section>
      </ScenePage>
    );
  }
}
