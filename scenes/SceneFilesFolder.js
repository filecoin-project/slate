import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Events from "~/common/custom-events";

import { css } from "@emotion/react";
import { PopoverNavigation } from "~/components/system/components/PopoverNavigation";
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
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
`;

const STYLES_TOOLTIP_ANCHOR = css`
  border: 1px solid #f2f2f2;
  background-color: ${Constants.system.white};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0px 8px 24px rgba(178, 178, 178, 0.2);
  position: absolute;
  z-index: ${Constants.zindex.tooltip};
`;

const STYLES_FILETYPE_TOOLTIP = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 260px;
`;

const STYLES_PRIVACY_TOOLTIP = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 115px;
  font-family: ${Constants.font.medium};
  font-size: 16px;
`;

export default class SceneFilesFolder extends React.Component {
  state = {
    view: 0,
    filetypeTooltip: false,
    privacyTooltip: false,
    filters: {},
    filtersActive: false,
    privacy: "All",
    files: this.props.viewer.library[0].children,
  };

  _handleFiletypeTooltip = () => {
    this.setState({ filetypeTooltip: !this.state.filetypeTooltip });
  };

  _handlePrivacyTooltip = () => {
    this.setState({ privacyTooltip: !this.state.privacyTooltip });
  };

  _handlePrivacyFilter = (filter) => {
    const viewer = this.props.viewer;
    const filtered = getPublicAndPrivateFiles({ viewer });
    if (filter === "All") {
      this.setState({ privacy: "All" }, this._filterFiles);
    } else if (filter === "Public") {
      this.setState({ privacy: "Public" }, this._filterFiles);
    } else if (filter === "Private") {
      this.setState({ privacy: "Private" }, this._filterFiles);
    } else {
      console.log("this is the worst possible scenario");
    }
  };

  _getPrivacyFiles = (filter) => {
    const viewer = this.props.viewer;
    const filtered = getPublicAndPrivateFiles({ viewer });

    if (filter === "All") {
      return viewer.library[0].children;
    } else if (filter === "Public") {
      return filtered.PublicFiles;
    } else if (filter === "Private") {
      return filtered.PrivateFiles;
    } else {
      console.log("this is the worst possible scenario");
    }
  };

  _handleFiletypeFilter = ({ type, subtype }) => {
    const key = `${type}/${subtype}`;
    this.setState(
      (prevState) => ({
        filters: {
          ...prevState.filters,
          [key]: !prevState.filters[key],
        },
      }),
      this._filterFiles
    );
  };

  _getKey = ({ type, subtype }) => {
    const key = `${type}/${subtype}`;
    return key;
  };

  _filterFiles = () => {
    const privacy = this.state.privacy;
    const library = this._getPrivacyFiles(privacy);
    const filters = this.state.filters;
    const filterKeys = Object.keys(filters).filter((key) => {
      return filters[key] === true;
    });
    const filteredFiles = [];

    if (filterKeys.length && library.length) {
      for (const libraryObject of library) {
        for (const filter of filterKeys) {
          {
            libraryObject.type === filter ? filteredFiles.push(libraryObject) : null;
          }
        }
      }
      this.setState((prevState) => ({
        files: filteredFiles,
        filetypeTooltip: prevState.filetypeTooltip ? true : false,
        filtersActive: true,
      }));
    } else {
      this.setState((prevState) => ({
        files: library,
        filetypeTooltip: prevState.filetypeTooltip ? true : false,
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
            <ButtonTertiary style={{ marginRight: 20 }} onClick={this._handleFiletypeTooltip}>
              <SVG.Filter
                height="18px"
                style={{
                  color: this.state.filtersActive
                    ? Constants.system.brand
                    : Constants.system.textGray,
                }}
              />
              <span style={{ width: 75, paddingLeft: 5, paddingBottom: 1 }}>Filetype</span>
            </ButtonTertiary>
            {this.state.filetypeTooltip ? (
              <Boundary
                captureResize={true}
                captureScroll={false}
                enabled
                onOutsideRectEvent={() => this.setState({ filetypeTooltip: false })}
              >
                <div css={STYLES_TOOLTIP_ANCHOR} style={{ width: 134, left: 2, top: 50 }}>
                  <div css={STYLES_FILETYPE_TOOLTIP}>
                    <CheckBox
                      name="jpg"
                      value={this.state.filters[this._getKey(Constants.filetypes.jpg)]}
                      style={{ padding: 5 }}
                      onChange={() => this._handleFiletypeFilter(Constants.filetypes.jpg)}
                      labelStyle={{
                        fontFamily: Constants.font.medium,
                        fontSize: 16,
                        paddingTop: 0,
                      }}
                    >
                      JPG
                    </CheckBox>
                    <CheckBox
                      name="png"
                      value={this.state.filters[this._getKey(Constants.filetypes.png)]}
                      style={{ padding: 5 }}
                      onChange={() => this._handleFiletypeFilter(Constants.filetypes.png)}
                      labelStyle={{
                        fontFamily: Constants.font.medium,
                        fontSize: 16,
                        paddingTop: 0,
                      }}
                    >
                      PNG
                    </CheckBox>
                    <CheckBox
                      name="mp4"
                      value={this.state.filters[this._getKey(Constants.filetypes.mp4)]}
                      style={{ padding: 5 }}
                      onChange={() => this._handleFiletypeFilter(Constants.filetypes.mp4)}
                      labelStyle={{
                        fontFamily: Constants.font.medium,
                        fontSize: 16,
                        paddingTop: 0,
                      }}
                    >
                      MP4
                    </CheckBox>
                    <CheckBox
                      name="mp3"
                      value={this.state.filters[this._getKey(Constants.filetypes.mp3)]}
                      style={{ padding: 5 }}
                      onChange={() => this._handleFiletypeFilter(Constants.filetypes.mp3)}
                      labelStyle={{
                        fontFamily: Constants.font.medium,
                        fontSize: 16,
                        paddingTop: 0,
                      }}
                    >
                      MP3
                    </CheckBox>
                    <CheckBox
                      name="pdf"
                      value={this.state.filters[this._getKey(Constants.filetypes.pdf)]}
                      style={{ padding: 5 }}
                      onChange={() => this._handleFiletypeFilter(Constants.filetypes.pdf)}
                      labelStyle={{
                        fontFamily: Constants.font.medium,
                        fontSize: 16,
                        paddingTop: 0,
                      }}
                    >
                      PDF
                    </CheckBox>
                    <CheckBox
                      name="epub"
                      value={this.state.filters[this._getKey(Constants.filetypes.epub)]}
                      style={{ padding: 5 }}
                      onChange={() => this._handleFiletypeFilter(Constants.filetypes.epub)}
                      labelStyle={{
                        fontFamily: Constants.font.medium,
                        fontSize: 16,
                        paddingTop: 0,
                      }}
                    >
                      EPUB
                    </CheckBox>
                  </div>
                </div>
              </Boundary>
            ) : null}
          </div>
          <div style={{ position: "relative" }}>
            <ButtonTertiary onClick={this._handlePrivacyTooltip}>
              <span style={{ width: 50 }}>{this.state.privacy}</span>
            </ButtonTertiary>
            {this.state.privacyTooltip ? (
              <Boundary
                captureResize={true}
                captureScroll={false}
                enabled
                onOutsideRectEvent={() => this.setState({ privacyTooltip: false })}
              >
                <div css={STYLES_TOOLTIP_ANCHOR} style={{ width: 91, left: 2, top: 44 }}>
                  <div css={STYLES_PRIVACY_TOOLTIP}>
                    <div
                      style={{
                        color: this.state.privacy === "All" ? Constants.system.brand : null,
                        cursor: "pointer",
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
                      }}
                      onClick={() => this._handlePrivacyFilter("Private")}
                    >
                      Private
                    </div>
                    <div
                      style={{
                        color: this.state.privacy === "Public" ? Constants.system.brand : "inherit",
                        cursor: "pointer",
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
        {this.state.files?.length ? (
          <DataView
            onAction={this.props.onAction}
            viewer={this.props.viewer}
            items={this.state.files}
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
