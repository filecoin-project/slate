import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import Section from "~/components/core/Section";
import SlatePreviewBlock from "~/components/core/SlatePreviewBlock";
import CircleButtonGray from "~/components/core/CircleButtonGray";

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

const STYLES_TAB = css`
  padding: 8px 8px 8px 0px;
  margin-right: 24px;
  cursor: pointer;
  display: inline-block;
  font-size: ${Constants.typescale.lvl1};

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-right: 12px;
  }
`;

const STYLES_TAB_GROUP = css`
  ${"" /* border-bottom: 1px solid ${Constants.system.gray}; */}
  margin: 32px 0px 24px 0px;
`;

// TODO(jim): Slates design.
export default class SceneSlates extends React.Component {
  state = {
    tab: "my",
  };

  _handleAdd = () => {
    return this.props.onAction({
      name: "Create slate",
      type: "SIDEBAR",
      value: "SIDEBAR_CREATE_SLATE",
    });
  };

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
        <ScenePageHeader
          title="Slates"
          actions={
            this.state.tab === "my" ? (
              <CircleButtonGray
                onMouseUp={this._handleAdd}
                onTouchEnd={this._handleAdd}
                style={{ marginLeft: 12 }}
              >
                <SVG.Plus height="16px" />
              </CircleButtonGray>
            ) : null
          }
        />
        <div css={STYLES_TAB_GROUP}>
          <div
            css={STYLES_TAB}
            style={{
              color:
                this.state.tab === "my"
                  ? Constants.system.pitchBlack
                  : Constants.system.gray,
            }}
            onClick={() => this.setState({ tab: "my" })}
          >
            My Slates
          </div>
          <div
            css={STYLES_TAB}
            style={{
              color:
                this.state.tab === "following"
                  ? Constants.system.pitchBlack
                  : Constants.system.gray,
            }}
            onClick={() => this.setState({ tab: "following" })}
          >
            Following
          </div>
        </div>
        {this.state.tab === "my"
          ? this.props.data.children.map((slate) => (
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
                <SlatePreviewBlock slate={slate} editing />
              </div>
            ))
          : null}
        {this.state.tab === "following" ? "Coming soon!" : null}
        {/* this.props.viewer.subscriptions
              .filter((each) => {
                return !!each.target_slate_id;
              })
              .map((relation) => (
                <div
                  key={relation.slate.id}
                  onClick={() =>
                    this.props.onAction({
                      type: "NAVIGATE",
                      value: "V1_NAVIGATION_SLATE",
                      data: relation.slate,
                    })
                  }
                >
                  <SlatePreviewBlock slate={relation.slate} />
                </div>
              )) */}
      </ScenePage>
    );
  }
}
