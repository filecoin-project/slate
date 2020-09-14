import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { TabGroup } from "~/components/core/TabGroup";
import { ButtonSecondary } from "~/components/system/components/Buttons";
import { SearchModal } from "~/components/core/SearchModal";
import { dispatchCustomEvent } from "~/common/custom-events";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import Section from "~/components/core/Section";
import SlatePreviewBlock from "~/components/core/SlatePreviewBlock";
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
    this.props.onRehydrate();
  };

  _handleSearch = () => {
    dispatchCustomEvent({
      name: "create-modal",
      detail: { modal: <SearchModal onAction={this.props.onAction} /> },
    });
  };

  render() {
    let subscriptions = this.props.viewer.subscriptions
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
          <SlatePreviewBlock username={null} slate={relation.slate} />
        </div>
      ));

    return (
      <ScenePage>
        <ScenePageHeader
          title="Slates"
          actions={
            this.state.tab === 0 ? (
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
        <TabGroup
          tabs={["My Slates", "Following"]}
          value={this.state.tab}
          onChange={(value) => this.setState({ tab: value })}
        />

        {this.state.tab === 0 ? (
          this.props.viewer.slates && this.props.viewer.slates.length ? (
            this.props.viewer.slates.map((slate) => (
              <div
                key={slate.id}
                onClick={() =>
                  this.props.onAction({
                    type: "NAVIGATE",
                    value: slate.id,
                    data: { decorator: "SLATE", ...slate },
                  })
                }
              >
                <SlatePreviewBlock
                  slate={slate}
                  username={this.props.viewer.username}
                  editing
                />
              </div>
            ))
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
                Use slates to create mood boards, share files, and organize
                research.
              </div>
              <ButtonSecondary
                onClick={this._handleAdd}
                style={{ marginTop: 32 }}
              >
                Create slate
              </ButtonSecondary>
            </EmptyState>
          )
        ) : null}

        {this.state.tab === 1 ? (
          subscriptions.length ? (
            subscriptions
          ) : (
            <EmptyState>
              You can follow any public slates on the network.
              <ButtonSecondary
                onClick={this._handleSearch}
                style={{ marginTop: 32 }}
              >
                Browse slates
              </ButtonSecondary>
            </EmptyState>
          )
        ) : null}
      </ScenePage>
    );
  }
}
