import * as React from "react";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import Section from "~/components/core/Section";

export default class SceneSlate extends React.Component {
  render() {
    const images = this.props.data.data.objects;

    const slates = {
      columns: [
        { key: "name", name: "Data", type: "FILE_LINK", width: "288px" },
        { key: "url", name: "Asset URL", width: "100%" },
      ],
      rows: images,
    };

    // TODO(jim): Refactor later.
    const slateButtons = [
      /*
      { name: "Make public", type: "SIDEBAR", value: "" },
      { name: "Make private", type: "SIDEBAR", value: "" },
      */
      {
        name: "Add image",
        type: "SIDEBAR",
        value: "SIDEBAR_ADD_FILE_TO_BUCKET",
        data: this.props.data,
      },
    ];

    return (
      <ScenePage>
        <System.H1>{this.props.data.slatename}</System.H1>
        <Section
          title="Slates"
          buttons={slateButtons}
          onAction={this.props.onAction}
        >
          <System.Table
            data={slates}
            name="slate"
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
          />
        </Section>
      </ScenePage>
    );
  }
}
