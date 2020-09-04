import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { TabGroup } from "~/components/core/TabGroup";

import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import Section from "~/components/core/Section";
import SlatePreviewBlock from "~/components/core/SlatePreviewBlock";
import CircleButtonGray from "~/components/core/CircleButtonGray";
import EmptyState from "~/components/core/EmptyState";

const STYLES_NUMBER = css`
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
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
    console.log(this.props.viewer);
    this.props.onRehydrate();
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
          <SlatePreviewBlock slate={relation.slate} />
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
                    data: slate,
                  })
                }
              >
                <SlatePreviewBlock slate={slate} editing />
              </div>
            ))
          ) : (
            <EmptyState style={{ marginTop: 88 }}>
              You have no slates yet! Create a new slate by clicking the plus
              button
            </EmptyState>
          )
        ) : null}

        {this.state.tab === 1 ? (
          subscriptions.length ? (
            subscriptions
          ) : (
            <EmptyState style={{ marginTop: 88 }}>
              You aren't following any slates yet! Get started by following any
              slates you encounter that you want to be updated on
            </EmptyState>
          )
        ) : null}
      </ScenePage>
    );
  }
}
