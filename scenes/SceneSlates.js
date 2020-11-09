import * as React from "react";
import * as SVG from "~/common/svg";

import { css } from "@emotion/core";
import { TabGroup } from "~/components/core/TabGroup";
import { ButtonSecondary } from "~/components/system/components/Buttons";
import { dispatchCustomEvent } from "~/common/custom-events";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import SlatePreviewBlocks from "~/components/core/SlatePreviewBlock";
import CircleButtonGray from "~/components/core/CircleButtonGray";
import EmptyState from "~/components/core/EmptyState";

const STYLES_ICONS = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

// TODO(jim): Slates design.
export default class SceneSlates extends React.Component {
  state = {
    tab: 0,
  };

  _handleAdd = () => {
    this.props.onAction({
      name: "Create slate",
      type: "SIDEBAR",
      value: "SIDEBAR_CREATE_SLATE",
    });
  };

  _handleSearch = () => {
    dispatchCustomEvent({
      name: "show-search",
      detail: {},
    });
  };

  render() {
    let subscriptions = this.props.viewer.subscriptions
      .filter((each) => {
        return !!each.target_slate_id;
      })
      .map((relation) => relation.slate);

    return (
      <ScenePage>
        <ScenePageHeader
          title="Slates"
          actions={
            this.state.tab === 0 ? (
              <CircleButtonGray onClick={this._handleAdd} style={{ marginLeft: 12 }}>
                <SVG.Plus height="16px" />
              </CircleButtonGray>
            ) : null
          }
        />

        <TabGroup
          tabs={["My Slates", "Following"]}
          value={this.state.tab}
          onChange={(value) => this.setState({ tab: value })}
        />

        {this.state.tab === 0 ? (
          this.props.viewer.slates && this.props.viewer.slates.length ? (
            <SlatePreviewBlocks
              isOwner
              slates={this.props.viewer.slates}
              username={this.props.viewer.username}
              onAction={this.props.onAction}
            />
          ) : (
            <EmptyState>
              <div css={STYLES_ICONS}>
                <SVG.Sound height="24px" style={{ margin: "0 16px" }} />
                <SVG.Document height="24px" style={{ margin: "0 16px" }} />
                <SVG.Image height="24px" style={{ margin: "0 16px" }} />
                <SVG.Book height="24px" style={{ margin: "0 16px" }} />
                <SVG.Video height="24px" style={{ margin: "0 16px" }} />
              </div>
              <div style={{ marginTop: 24 }}>
                Use slates to create mood boards, share files, and organize research.
              </div>
              <ButtonSecondary onClick={this._handleAdd} style={{ marginTop: 32 }}>
                Create slate
              </ButtonSecondary>
            </EmptyState>
          )
        ) : null}

        {this.state.tab === 1 ? (
          subscriptions && subscriptions.length ? (
            <SlatePreviewBlocks
              slates={subscriptions}
              username={null}
              onAction={this.props.onAction}
            />
          ) : (
            <EmptyState>
              You can follow any public slates on the network.
              <ButtonSecondary onClick={this._handleSearch} style={{ marginTop: 32 }}>
                Browse slates
              </ButtonSecondary>
            </EmptyState>
          )
        ) : null}
      </ScenePage>
    );
  }
}
