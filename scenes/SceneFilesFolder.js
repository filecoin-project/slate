import * as React from "react";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as SVG from "~/common/svg";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { TabGroup } from "~/components/core/TabGroup";
import { ButtonPrimary } from "~/components/system/components/Buttons";
import { dispatchCustomEvent } from "~/common/custom-events";
import { WarningMessage } from "~/components/core/WarningMessage";

import ScenePage from "~/components/core/ScenePage";
import DataView from "~/components/core/DataView";
import DataMeter from "~/components/core/DataMeter";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import EmptyState from "~/components/core/EmptyState";

const STYLES_ICONS = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const POLLING_INTERVAL = 10000;

export default class SceneFilesFolder extends React.Component {
  render() {
    return (
      <ScenePage>
        <ScenePageHeader
          title="Data"
          actions={
            <ButtonPrimary
              onClick={() => {
                this.props.onAction({
                  type: "SIDEBAR",
                  value: "SIDEBAR_ADD_FILE_TO_BUCKET",
                });
              }}
            >
              Upload data
            </ButtonPrimary>
          }
        />

        <DataMeter stats={this.props.viewer.stats} style={{ marginTop: 40 }} />
        {this.props.viewer.library[0].children && this.props.viewer.library[0].children.length ? (
          <DataView
            onAction={this.props.onAction}
            viewer={this.props.viewer}
            items={this.props.viewer.library[0].children}
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
            <div style={{ marginTop: 24 }}>Drag and drop files into Slate to upload</div>
          </EmptyState>
        )}
      </ScenePage>
    );
  }
}
