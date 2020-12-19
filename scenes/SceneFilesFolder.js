import * as React from "react";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { ButtonPrimary } from "~/components/system/components/Buttons";
import { FileTypeGroup } from "~/components/core/FileTypeIcon";
import { PrimaryTabGroup, SecondaryTabGroup } from "~/components/core/TabGroup";

import ScenePage from "~/components/core/ScenePage";
import DataView from "~/components/core/DataView";
import DataMeter from "~/components/core/DataMeterDetailed";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import EmptyState from "~/components/core/EmptyState";

const POLLING_INTERVAL = 10000;

export default class SceneFilesFolder extends React.Component {
  state = {
    view: 0,
  };

  render() {
    return (
      <ScenePage>
        <ScenePageHeader
          title={
            <PrimaryTabGroup
              tabs={[
                { title: "Files", value: "NAV_DATA" },
                { title: "Slates", value: "NAV_SLATES" },
                { title: "Activity", value: "NAV_ACTIVITY" },
              ]}
              value={0}
              onAction={this.props.onAction}
            />
          }
          actions={
            <SecondaryTabGroup
              tabs={[
                <SVG.GridView height="24px" style={{ display: "block" }} />,
                <SVG.TableView height="24px" style={{ display: "block" }} />,
              ]}
              value={this.state.view}
              onChange={(value) => this.setState({ view: value })}
              style={{ margin: "0 0 24px 0" }}
            />
          }
        />
        {/* <ScenePageHeader
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
        /> */}

        <DataMeter stats={this.props.viewer.stats} style={{ marginBottom: 64 }} />
        {this.props.viewer.library[0].children && this.props.viewer.library[0].children.length ? (
          <DataView
            onAction={this.props.onAction}
            viewer={this.props.viewer}
            items={this.props.viewer.library[0].children}
            onUpdateViewer={this.props.onUpdateViewer}
            view={this.state.view}
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
