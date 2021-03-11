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

const STYLES_CONTAINER_WRAPPER = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const STYLES_CONTAINER = css`
  height: 60px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;
`;

const STYLES_COMMAND_WRAPPER = css`
  padding: 4px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

//TODO(toast): Constants for SDS in future
const STYLES_TOOLTIP_ANCHOR = css`
  border: 1px solid #f2f2f2;
  background-color: ${Constants.system.white};
  border-radius: 4px;
  right: 0px;
  top: 48px;
  padding: 20px 24px;
  box-shadow: 0px 8px 24px rgba(178, 178, 178, 0.2);
  position: absolute;
  display: flex;
  z-index: ${Constants.zindex.tooltip};
`;

const STYLES_FILETYPE_TOOLTIP = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-right: 1px solid ${Constants.system.lightBorder};
  padding-right: 4px;
`;

const STYLES_PRIVACY_TOOLTIP = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-family: ${Constants.font.text};
  font-size: ${Constants.typescale.lvl0};
  padding-left: 24px;
`;

const STYLES_CHECKBOX_LABEL = css`
  padding-top: 0;
  position: relative;
  top: -4px;
  font-family: ${Constants.font.text};
  font-size: ${Constants.typescale.lvl0};
  user-select: none;
`;

const STYLES_BUTTONS_ROW = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const STYLES_TOOLTIP_TEXT = css`
  font-family: ${Constants.font.text};
  font-size: 12px;
`;

const STYLES_COMMAND_TOOLTIP_ANCHOR = css`
  border: 1px solid ${Constants.system.bgGray};
  background-color: ${Constants.system.white};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  justify-content: space-around;
  box-shadow: 0px 8px 24px rgba(178, 178, 178, 0.2);
  width: 275px;
  position: absolute;
  top: 4px;
  right: 50px;
  z-index: ${Constants.zindex.tooltip};
  padding: 12px;
`;

export default class SceneFilesFolder extends React.Component {
  state = {
    view: 0,
    filterTooltip: false,
    fileTypes: {
      image: false,
      video: false,
      audio: false,
      epub: false,
      pdf: false,
    },
    filtersActive: false,
    privacy: "ALL",
    filteredFiles: this.props.viewer?.library[0].children,
    keyboardTooltip: false,
  };

  componentDidMount = () => {
    this.openCarouselToItem();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.viewer.library[0].children !== this.props.viewer.library[0].children) {
      if (this.state.filtersActive) {
        this._filterFiles();
      }
    }
    if (prevProps.page !== this.props.page) {
      this.openCarouselToItem();
    }
  };

  _handleFilterTooltip = () => {
    this.setState({ filterTooltip: !this.state.filterTooltip });
  };

  _handlePrivacyFilter = (filter) => {
    this.setState({ privacy: filter }, this._filterFiles);
  };

  _getPrivacyFilteredFiles = () => {
    let filter = this.state.privacy;
    const viewer = this.props.viewer;
    if (filter === "ALL") {
      return viewer.library[0].children;
    }

    const filtered = getPublicAndPrivateFiles({ viewer });

    if (filter === "PUBLIC") {
      return filtered.publicFiles;
    } else if (filter === "PRIVATE") {
      return filtered.privateFiles;
    } else {
      console.log("unusable privacy param");
    }
  };

  _handleFiletypeFilter = (type) => {
    this.setState(
      { fileTypes: { ...this.state.fileTypes, [type]: !this.state.fileTypes[type] } },
      this._filterFiles
    );
  };

  _filterFiles = () => {
    const filters = this.state.fileTypes;
    let fileTypeFiltersActive = Object.values(filters).some((val) => val === true);
    let filtersActive = fileTypeFiltersActive || this.state.privacy !== "ALL";

    if (!filtersActive) {
      this.setState({ filtersActive });
      return;
    }

    let filteredFiles = this._getPrivacyFilteredFiles();

    if (fileTypeFiltersActive && this.props.viewer?.library[0].children?.length) {
      filteredFiles = filteredFiles.filter((file) => {
        return (
          (filters.image && file.type.startsWith("image/")) ||
          (filters.video && file.type.startsWith("video/")) ||
          (filters.audio && file.type.startsWith("audio/")) ||
          (filters.epub && file.type.startsWith("application/epub")) ||
          (filters.pdf && file.type.startsWith("application/pdf"))
        );
      });
    }

    this.setState({
      filteredFiles,
      filtersActive,
    });
  };

  openCarouselToItem = () => {
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
    let files = this.state.filtersActive
      ? this.state.filteredFiles
      : this.props.viewer?.library[0].children;
    files = files || [];

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
          objects={files}
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
        <div css={STYLES_CONTAINER_WRAPPER}>
          <div css={STYLES_CONTAINER}>
            <div
              css={STYLES_BUTTONS_ROW}
              style={{ position: "relative", padding: 10, marginRight: 8 }}
              onMouseLeave={() => this.setState({ keyboardTooltip: false })}
            >
              <span
                css={STYLES_COMMAND_WRAPPER}
                onMouseEnter={() => this.setState({ keyboardTooltip: true })}
              >
                <SVG.InfoCircle
                  height="20px"
                  style={{
                    color: this.state.keyboardTooltip
                      ? Constants.system.grayBlack
                      : Constants.system.darkGray,
                  }}
                />
              </span>
              {this.state.keyboardTooltip ? (
                <div css={STYLES_COMMAND_TOOLTIP_ANCHOR}>
                  <div>
                    <p
                      css={STYLES_TOOLTIP_TEXT}
                      style={{
                        fontFamily: Constants.font.semiBold,
                        fontSize: 14,
                        paddingBottom: 4,
                      }}
                    >
                      Keyboard shortcuts
                    </p>
                  </div>
                  <div>
                    <p css={STYLES_TOOLTIP_TEXT}>shift + click</p>
                    <p css={STYLES_TOOLTIP_TEXT} style={{ color: Constants.system.darkGray }}>
                      select a range of items between two selections
                    </p>
                  </div>
                  <div>
                    <p css={STYLES_TOOLTIP_TEXT}>shift + drag</p>
                    <p css={STYLES_TOOLTIP_TEXT} style={{ color: Constants.system.darkGray }}>
                      select items by draging over them
                    </p>
                  </div>
                  <div>
                    <p css={STYLES_TOOLTIP_TEXT}>alt + drag</p>
                    <p css={STYLES_TOOLTIP_TEXT} style={{ color: Constants.system.darkGray }}>
                      deselect items by draging over them
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div css={STYLES_CONTAINER}>
            <div style={{ position: "relative" }}>
              <ButtonTertiary
                style={{ paddingLeft: 12, paddingRight: 12 }}
                onClick={this._handleFilterTooltip}
              >
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
                  onOutsideRectEvent={() => {
                    this.setState({ filterTooltip: false });
                  }}
                >
                  <div css={STYLES_TOOLTIP_ANCHOR}>
                    <div css={STYLES_FILETYPE_TOOLTIP}>
                      <div style={{ width: 100 }}>
                        <CheckBox
                          name="image"
                          value={this.state.fileTypes.image}
                          onChange={() => this._handleFiletypeFilter("image")}
                          boxStyle={{ height: 20, width: 20 }}
                        >
                          <span css={STYLES_CHECKBOX_LABEL}>Image</span>
                        </CheckBox>
                      </div>
                      <div style={{ width: 100, marginTop: 12 }}>
                        <CheckBox
                          name="audio"
                          value={this.state.fileTypes.audio}
                          onChange={() => this._handleFiletypeFilter("audio")}
                          boxStyle={{ height: 20, width: 20 }}
                        >
                          <span css={STYLES_CHECKBOX_LABEL}>Audio</span>
                        </CheckBox>
                      </div>
                      <div style={{ width: 100, marginTop: 12 }}>
                        <CheckBox
                          name="video"
                          value={this.state.fileTypes.video}
                          onChange={() => this._handleFiletypeFilter("video")}
                          boxStyle={{ height: 20, width: 20 }}
                        >
                          <span css={STYLES_CHECKBOX_LABEL}>Video</span>
                        </CheckBox>
                      </div>
                      <div style={{ width: 100, marginTop: 12 }}>
                        <CheckBox
                          name="epub"
                          value={this.state.fileTypes.epub}
                          onChange={() => this._handleFiletypeFilter("epub")}
                          boxStyle={{ height: 20, width: 20 }}
                        >
                          <span css={STYLES_CHECKBOX_LABEL}>Epub</span>
                        </CheckBox>
                      </div>
                      <div style={{ width: 100, marginTop: 12 }}>
                        <CheckBox
                          name="pdf"
                          value={this.state.fileTypes.pdf}
                          onChange={() => this._handleFiletypeFilter("pdf")}
                          boxStyle={{ height: 20, width: 20 }}
                        >
                          <span css={STYLES_CHECKBOX_LABEL}>Pdf</span>
                        </CheckBox>
                      </div>
                    </div>
                    <div css={STYLES_PRIVACY_TOOLTIP}>
                      <div
                        style={{
                          color: this.state.privacy === "ALL" ? Constants.system.brand : null,
                          cursor: "pointer",
                          marginTop: 1,
                        }}
                        onClick={() => this._handlePrivacyFilter("ALL")}
                      >
                        All
                      </div>
                      <div
                        style={{
                          color:
                            this.state.privacy === "PRIVATE" ? Constants.system.brand : "inherit",
                          cursor: "pointer",
                          marginTop: 17,
                        }}
                        onClick={() => this._handlePrivacyFilter("PRIVATE")}
                      >
                        Private
                      </div>
                      <div
                        style={{
                          color:
                            this.state.privacy === "PUBLIC" ? Constants.system.brand : "inherit",
                          cursor: "pointer",
                          marginTop: 18,
                        }}
                        onClick={() => this._handlePrivacyFilter("PUBLIC")}
                      >
                        Public
                      </div>
                    </div>
                  </div>
                </Boundary>
              ) : null}
            </div>
          </div>
        </div>

        {files.length ? (
          <DataView
            onAction={this.props.onAction}
            viewer={this.props.viewer}
            items={files}
            onUpdateViewer={this.props.onUpdateViewer}
            view={this.state.view}
            resources={this.props.resources}
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
