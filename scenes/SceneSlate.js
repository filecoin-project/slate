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
        { key: "name", name: "Data", type: "FILE_LINK", width: "328px" },
        { key: "url", name: "Data URL", width: "100%" },
        { key: "type", name: "Data type", type: "TEXT_TAG", width: "136px" },
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
        name: "Upload data",
        type: "SIDEBAR",
        value: "SIDEBAR_ADD_FILE_TO_BUCKET",
        data: this.props.current,
      },
    ];

    return (
      <ScenePage>
        <System.DescriptionGroup
          label="Will the Slate page look like this in the final product?"
          description="No! Consider this page just a functionality test. Slates will be collaborative mood boards and will have a much more intuitive experience than this."
        />
        <System.H1 style={{ marginTop: 48 }}>
          https://slate.host/@{this.props.viewer.username}/{slatename}
        </System.H1>
        <Section title="Slate elements" buttons={slateButtons} onAction={this.props.onAction}>
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
