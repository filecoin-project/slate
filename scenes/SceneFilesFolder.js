import * as React from "react";
import * as SVG from "~/common/svg";
import * as Events from "~/common/custom-events";

import { ButtonPrimary } from "~/components/system/components/Buttons";
import { FileTypeGroup } from "~/components/core/FileTypeIcon";
import { TabGroup, PrimaryTabGroup, SecondaryTabGroup } from "~/components/core/TabGroup";
import { GlobalCarousel } from "~/components/system/components/GlobalCarousel";

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

  componentDidMount = () => {
    let index = -1;
    let page = this.props.page;
    if (page?.fileId || page?.cid || page?.index) {
      if (page?.index) {
        index = page.index;
      } else {
        let library = this.props.viewer.library[0]?.children || [];
        for (let i = 0; i < library.length; i++) {
          let obj = library[i];
          if ((obj.cid && obj.cid === page?.cid) || (obj.id && obj.id === page?.fileId)) {
            index = i;
            break;
          }
        }
      }
    }

    if (index !== -1) {
      Events.dispatchCustomEvent({
        name: "slate-global-open-carousel",
        detail: { index },
      });
    }
  };

  render() {
    return (
      <ScenePage>
        <ScenePageHeader
          title={
            this.props.mobile ? (
              <TabGroup
                tabs={[
                  { title: "Files", value: "NAV_DATA" },
                  { title: "Slates", value: "NAV_SLATES" },
                  { title: "Activity", value: "NAV_ACTIVITY" },
                ]}
                value={0}
                onAction={this.props.onAction}
                onChange={(value) => this.setState({ tab: value })}
                style={{ marginTop: 0, marginBottom: 32 }}
                itemStyle={{ margin: "0px 12px" }}
              />
            ) : (
              <PrimaryTabGroup
                tabs={[
                  { title: "Files", value: "NAV_DATA" },
                  { title: "Slates", value: "NAV_SLATES" },
                  { title: "Activity", value: "NAV_ACTIVITY" },
                ]}
                value={0}
                onAction={this.props.onAction}
              />
            )
          }
          actions={
            this.props.mobile ? null : (
              <SecondaryTabGroup
                tabs={[
                  <SVG.GridView height="24px" style={{ display: "block" }} />,
                  <SVG.TableView height="24px" style={{ display: "block" }} />,
                ]}
                value={this.state.view}
                onChange={(value) => this.setState({ view: value })}
                style={{ margin: "0 0 24px 0" }}
              />
            )
          }
        />
        <GlobalCarousel
          carouselType="DATA"
          onUpdateViewer={this.props.onUpdateViewer}
          resources={this.props.resources}
          viewer={this.props.viewer}
          objects={this.props.viewer?.library[0]?.children || []}
          onAction={this.props.onAction}
          mobile={this.props.mobile}
          isOwner={true}
        />
        <DataMeter
          stats={this.props.viewer.stats}
          style={{ marginBottom: 64 }}
          buttons={
            <ButtonPrimary
              onClick={() => {
                this.props.onAction({
                  type: "SIDEBAR",
                  value: "SIDEBAR_ADD_FILE_TO_BUCKET",
                });
              }}
              style={{ whiteSpace: "nowrap", marginRight: 24 }}
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
