import * as React from "react";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { ButtonPrimary } from "~/components/system/components/Buttons";
import { FileTypeGroup } from "~/components/core/FileTypeIcon";

import ScenePage from "~/components/core/ScenePage";
import DataView from "~/components/core/DataView";
import DataMeter from "~/components/core/DataMeterDetailed";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import EmptyState from "~/components/core/EmptyState";

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
            onUpdateViewer={this.props.onUpdateViewer}
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
