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

const STYLES_ACTIONS = css`
  z-index: ${Constants.zindex.navigation};
  bottom: 16px;
  right: 8px;
  position: absolute;
  flex-direction: column;
  display: flex;
`;

const STYLES_ACTION_BUTTON = css`
  font-family: ${Constants.font.code};
  font-size: 10px;
  text-transform: uppercase;
  user-select: none;
  height: 32px;
  padding: 0 16px 0 16px;
  border-radius: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: ${Constants.zindex.modal};
  background: ${Constants.system.pitchBlack};
  transition: 200ms ease all;
  color: ${Constants.system.white};
  cursor: pointer;
  margin: auto;
  margin: 4px 16px 4px 16px;
  flex-shrink: 0;
  text-decoration: none;
  :hover {
    background-color: ${Constants.system.black};
  }
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
            onClick={() =>
              this.props.onAction({
                type: "NAVIGATE",
                value: slate.id,
                data: slate,
              })
            }
          >
            <SlatePreviewBlock slate={slate} />
          </div>
        ))}
        <div css={STYLES_ACTIONS}>
          <span
            css={STYLES_ACTION_BUTTON}
            onClick={() =>
              this.props.onAction({
                name: "Create slate",
                type: "SIDEBAR",
                value: "SIDEBAR_CREATE_SLATE",
              })
            }
          >
            Create slate
          </span>
        </div>
      </ScenePage>
    );
  }
}
