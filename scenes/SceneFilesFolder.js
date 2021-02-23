import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Events from "~/common/custom-events";

import { css } from "@emotion/react";
import { ButtonPrimary, ButtonTertiary } from "~/components/system/components/Buttons";
import { FileTypeGroup } from "~/components/core/FileTypeIcon";
import { TabGroup, PrimaryTabGroup, SecondaryTabGroup } from "~/components/core/TabGroup";
import { CheckBox } from "~/components/system/components/CheckBox.js";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { GlobalCarousel } from "~/components/system/components/GlobalCarousel";
import { getPublicAndPrivateFiles } from "~/common/utilities";
import ScenePage from "~/components/core/ScenePage";
import DataView from "~/components/core/DataView";
import DataMeter from "~/components/core/DataMeterDetailed";
import ScenePageHeader from "~/components/core/ScenePageHeader";
import EmptyState from "~/components/core/EmptyState";

const POLLING_INTERVAL = 10000;

const STYLES_FILTERS_CONTAINER = css`
  height: 60px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;
`;

//TODO(toast): Constants for SDS in future
const STYLES_TOOLTIP_ANCHOR = css`
  border: 1px solid #f2f2f2;
  background-color: ${Constants.system.white};
  border-radius: 2px;
  right: 0px;
  top: 48px;
  width: 256px;
  height: 216px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  box-shadow: 0px 8px 24px rgba(178, 178, 178, 0.2);
  position: absolute;
  z-index: ${Constants.zindex.tooltip};
`;

const STYLES_FILETYPE_TOOLTIP = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 80%;
  width: 50%;
  margin: 24px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const STYLES_PRIVACY_TOOLTIP = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 40%;
  font-family: ${Constants.font.medium};
  font-size: 16px;
  width: 50%;
  margin: 24px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const STYLES_CHECKBOX_LABEL = css`
  padding-top: 0;
  position: relative;
  top: -4px;
  font-family: ${Constants.font.medium};
  font-size: 16px;
  user-select: none;
`;

const STYLES_TOOLTIP_DIVIDER_CONTAINER = css`
  height: 100%;
  width: 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const STYLES_TOOLTIP_DIVIDER = css`
  height: 80%;
  border: 1px solid ${Constants.system.lightBorder};
  width: 1px;
`;

export default class SceneFilesFolder extends React.Component {
  state = {
    view: 0,
    filterTooltip: false,
    filters: {
      images: false,
      audio: false,
      assets: false,
      videos: false,
      books: false,
    },
    filtersActive: false,
    privacy: "All",
    files: this.props.viewer?.library[0].children,
  };

  _handleFilterTooltip = () => {
    this.setState({ filterTooltip: !this.state.filterTooltip });
  };

  _handlePrivacyFilter = (filter) => {
    const viewer = this.props.viewer;
    if (filter === "All") {
      this.setState({ privacy: "All" }, this._filterFiles);
    } else if (filter === "Public") {
      this.setState({ privacy: "Public" }, this._filterFiles);
    } else if (filter === "Private") {
      this.setState({ privacy: "Private" }, this._filterFiles);
    } else {
      console.log("unusable privacy param");
    }
  };

  _getPrivacyFiles = (filter) => {
    const viewer = this.props.viewer;
    const filtered = getPublicAndPrivateFiles({ viewer });

    if (filter === "All") {
      return viewer.library[0].children;
    } else if (filter === "Public") {
      return filtered.publicFiles;
    } else if (filter === "Private") {
      return filtered.privateFiles;
    } else {
      console.log("unusable privacy param");
    }
  };

  _handleFiletypeFilter = (type) => {
    this.setState(
      (prevState) => ({
        filters: {
          ...prevState.filters,
          [type]: !prevState.filters[type],
        },
      }),
      this._filterFiles
    );
  };

  _filterFiles = () => {
    const filteredFiles = [];
    const privacy = this.state.privacy;
    const library = this._getPrivacyFiles(privacy);
    const filters = this.state.filters;
    const filterKeys = Object.keys(filters).filter((key) => {
      return filters[key] === true;
    });

    if (filterKeys.length && library?.length) {
      for (const libraryObject of library) {
        for (const type of filterKeys) {
          for (const mimeType of Constants.filetypes[type]) {
            {
              libraryObject.type === mimeType ? filteredFiles.push(libraryObject) : null;
            }
          }
        }
      }
      this.setState((prevState) => ({
        files: filteredFiles,
        filterTooltip: true,
        filtersActive: true,
      }));
    } else {
      this.setState((prevState) => ({
        files: library,
        filterTooltip: true,
        filtersActive: false,
      }));
    }
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
    let files = this.props.viewer?.library[0].children || [];
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
        <div css={STYLES_FILTERS_CONTAINER}>
          <div style={{ position: "relative" }}>
            <ButtonTertiary style={{ margin: 0 }} onClick={this._handleFilterTooltip}>
              <SVG.Filter
                height="18px"
                style={{
                  color: this.state.filtersActive
                    ? Constants.system.brand
                    : Constants.system.textGray,
                }}
              />
            </ButtonTertiary>
            {this.state.filterTooltip ? (
              <Boundary
                captureResize={true}
                captureScroll={false}
                enabled
                onOutsideRectEvent={() => this.setState({ filetypeTooltip: false })}
              >
                <div css={STYLES_TOOLTIP_ANCHOR}>
                  <div css={STYLES_FILETYPE_TOOLTIP}>
                    <div style={{ width: 100 }}>
                      <CheckBox
                        name="images"
                        value={this.state.filters["images"]}
                        onChange={() => this._handleFiletypeFilter("images")}
                        boxStyle={{ height: 20, width: 20 }}
                      >
                        <span css={STYLES_CHECKBOX_LABEL}>Images</span>
                      </CheckBox>
                    </div>
                    <div style={{ width: 100, marginTop: 12 }}>
                      <CheckBox
                        name="audio"
                        value={this.state.filters["audio"]}
                        onChange={() => this._handleFiletypeFilter("audio")}
                        boxStyle={{ height: 20, width: 20 }}
                      >
                        <span css={STYLES_CHECKBOX_LABEL}>Audio</span>
                      </CheckBox>
                    </div>
                    <div style={{ width: 100, marginTop: 12 }}>
                      <CheckBox
                        name="assets"
                        value={this.state.filters["assets"]}
                        onChange={() => this._handleFiletypeFilter("assets")}
                        boxStyle={{ height: 20, width: 20 }}
                      >
                        <span css={STYLES_CHECKBOX_LABEL}>Assets</span>
                      </CheckBox>
                    </div>
                    <div style={{ width: 100, marginTop: 12 }}>
                      <CheckBox
                        name="videos"
                        value={this.state.filters["videos"]}
                        onChange={() => this._handleFiletypeFilter("videos")}
                        boxStyle={{ height: 20, width: 20 }}
                      >
                        <span css={STYLES_CHECKBOX_LABEL}>Videos</span>
                      </CheckBox>
                    </div>
                    <div style={{ width: 100, marginTop: 12 }}>
                      <CheckBox
                        name="books"
                        value={this.state.filters["books"]}
                        onChange={() => this._handleFiletypeFilter("books")}
                        boxStyle={{ height: 20, width: 20 }}
                      >
                        <span css={STYLES_CHECKBOX_LABEL}>Books</span>
                      </CheckBox>
                    </div>
                  </div>
                  <div css={STYLES_TOOLTIP_DIVIDER_CONTAINER}>
                    <div css={STYLES_TOOLTIP_DIVIDER}></div>
                  </div>
                  <div css={STYLES_PRIVACY_TOOLTIP}>
                    <div
                      style={{
                        color: this.state.privacy === "All" ? Constants.system.brand : null,
                        cursor: "pointer",
                        marginTop: 1,
                      }}
                      onClick={() => this._handlePrivacyFilter("All")}
                    >
                      All
                    </div>
                    <div
                      style={{
                        color:
                          this.state.privacy === "Private" ? Constants.system.brand : "inherit",
                        cursor: "pointer",
                        marginTop: 17,
                      }}
                      onClick={() => this._handlePrivacyFilter("Private")}
                    >
                      Private
                    </div>
                    <div
                      style={{
                        color: this.state.privacy === "Public" ? Constants.system.brand : "inherit",
                        cursor: "pointer",
                        marginTop: 18,
                      }}
                      onClick={() => this._handlePrivacyFilter("Public")}
                    >
                      Public
                    </div>
                  </div>
                </div>
              </Boundary>
            ) : null}
          </div>
        </div>
        {files.length ? (
          <DataView
            onAction={this.props.onAction}
            viewer={this.props.viewer}
            items={files}
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
