import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import Section from "~/components/core/Section";
import SlatePreviewBlock from "~/components/core/SlatePreviewBlock";

const STYLES_NUMBER = css`
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
`;

// TODO(jim): Slates design.
export default class SceneSlates extends React.Component {
  render() {
    // TODO(jim): Refactor later.
    const slates = this.props.viewer.slates.map((each) => {
      return {
        ...each,
        url: `https://slate.host/${this.props.viewer.username}/${each.slatename}`,
        public: each.data.public,
        objects: <span css={STYLES_NUMBER}>{each.data.objects.length}</span>,
      };
    });

    // TODO(jim): Refactor later.
    const slateButtons = [
      { name: "Create slate", type: "SIDEBAR", value: "SIDEBAR_CREATE_SLATE" },
    ];
    console.log(this.props);
    return (
      <ScenePage>
        <ScenePageHeader title="Slates">
          This scene is currently a work in progress.
        </ScenePageHeader>
        {this.props.data.children.map((slate) => (
          <div
            key={slate.id}
            // onClick={() =>
            //   this.props.onAction({
            //     type: "NAVIGATE",
            //     value: slate.id,
            //   })
            // }
          >
            <SlatePreviewBlock slate={slate} />
          </div>
        ))}
      </ScenePage>
    );
  }
}
