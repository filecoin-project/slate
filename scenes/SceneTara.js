import * as React from "react";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as SVG from "~/common/svg";
import * as Constants from "~/common/constants";

import { css } from "@emotion/core";
import { TabGroup } from "~/components/core/TabGroup";
import { ButtonPrimary } from "~/components/system/components/Buttons";
import { dispatchCustomEvent } from "~/common/custom-events";
import { FileTypeGroup } from "~/components/core/FileTypeIcon";

import ScenePage from "~/components/core/ScenePage";
import DataView from "~/components/core/DataView";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import EmptyState from "~/components/core/EmptyState";

export default class SceneTara extends React.Component {
  render() {
    return (
      <ScenePage>
        <ScenePageHeader
          title="Tara Sandbox"
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

        {this.props.viewer.library[0].children && this.props.viewer.library[0].children.length ? (
          <DataView
            onAction={this.props.onAction}
            viewer={this.props.viewer}
            items={this.props.viewer.library[0].children}
          />
        ) : (
          <EmptyState>
            <FileTypeGroup />
            <div style={{ marginTop: 24 }}>Drag and drop files into Slate to upload</div>
          </EmptyState>
        )}
      </ScenePage>
    );
  }
}
