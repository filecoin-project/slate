import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as Validations from "~/common/validations";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";
import * as UserBehaviors from "~/common/user-behaviors";
import * as SVG from "~/common/svg";
import * as Events from "~/common/custom-events";
import * as Window from "~/common/window";
import * as FileUtilities from "~/common/file-utilities";

import { css, withTheme } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";
import { SlatePicker } from "~/components/core/SlatePicker";
import { Input } from "~/components/system/components/Input";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { Toggle } from "~/components/system/components/Toggle";

const DEFAULT_BOOK =
  "https://slate.textile.io/ipfs/bafkreibk32sw7arspy5kw3p5gkuidfcwjbwqyjdktd5wkqqxahvkm2qlyi";
const DEFAULT_DATA =
  "https://slate.textile.io/ipfs/bafkreid6bnjxz6fq2deuhehtxkcesjnjsa2itcdgyn754fddc7u72oks2m";
const DEFAULT_DOCUMENT =
  "https://slate.textile.io/ipfs/bafkreiecdiepww52i5q3luvp4ki2n34o6z3qkjmbk7pfhx4q654a4wxeam";
const DEFAULT_VIDEO =
  "https://slate.textile.io/ipfs/bafkreibesdtut4j5arclrxd2hmkfrv4js4cile7ajnndn3dcn5va6wzoaa";
const DEFAULT_AUDIO =
  "https://slate.textile.io/ipfs/bafkreig2hijckpamesp4nawrhd6vlfvrtzt7yau5wad4mzpm3kie5omv4e";

const STYLES_NO_VISIBLE_SCROLL = css`
  overflow-y: scroll;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  ::-webkit-scrollbar {
    width: 0px;
    display: none;
  }
  ::-webkit-scrollbar-track {
    background: ${Constants.system.foreground};
  }
  ::-webkit-scrollbar-thumb {
    background: ${Constants.system.darkGray};
  }
`;

const STYLES_SIDEBAR = css`
  width: 420px;
  padding: 48px 24px 0px 24px;
  flex-shrink: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: rgba(20, 20, 20, 0.8);
  ${STYLES_NO_VISIBLE_SCROLL}

  @supports ((-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))) {
    -webkit-backdrop-filter: blur(75px);
    backdrop-filter: blur(75px);
    background-color: rgba(150, 150, 150, 0.2);
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_DISMISS_BOX = css`
  position: absolute;
  top: 16px;
  right: 16px;
  color: ${Constants.system.darkGray};
  cursor: pointer;

  :hover {
    color: ${Constants.system.white};
  }
`;

const STYLES_META = css`
  text-align: start;
  padding: 14px 0px 8px 0px;
  overflow-wrap: break-word;
`;

const STYLES_META_TITLE = css`
  font-family: ${Constants.font.semiBold};
  color: ${Constants.system.white};
  font-size: ${Constants.typescale.lvl2};
  text-decoration: none;

  :hover {
    color: ${Constants.system.blue};
  }
`;

const STYLES_TAG = css`
  margin-right: 24px;
  padding: 0px 2px;
  border-radius: 2px;
  border: 1px solid ${Constants.system.darkGray};
`;

const STYLES_OPTIONS_SECTION = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0 16px 0;
`;

const STYLES_META_DETAILS = css`
  color: ${Constants.system.darkGray};
  text-transform: uppercase;
  margin: 24px 0px;
  font-family: ${Constants.font.medium};
  font-size: 0.9rem;
`;

const STYLES_ACTIONS = css`
  color: ${Constants.system.white};
  border: 1px solid #3c3c3c;
  border-radius: 4px;
  background-color: transparent;
  margin-bottom: 48px;
`;

const STYLES_ACTION = css`
  cursor: pointer;
  padding: 12px 16px;
  border-bottom: 1px solid #3c3c3c;
  display: flex;
  align-items: center;

  :hover {
    color: ${Constants.system.brand};
  }

  :last-child {
    border: none;
  }
`;

const STYLES_SECTION_HEADER = css`
  font-family: ${Constants.font.semiBold};
  font-size: 1.1rem;
  margin-bottom: 32px;
`;

const STYLES_HIDDEN = css`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const STYLES_IMAGE_BOX = css`
  max-width: 100%;
  max-height: 368px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.system.black};
  overflow: hidden;
  ${"" /* box-shadow: 0 0 0 1px ${Constants.system.border} inset; */}
  border-radius: 4px;
`;

const STYLES_FILE_HIDDEN = css`
  height: 1px;
  width: 1px;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  top: -1px;
  left: -1px;
`;

const STYLES_TEXT = css`
  color: ${Constants.system.darkGray};
  line-height: 1.5;
`;

const STYLES_INPUT = {
  marginBottom: 16,
  backgroundColor: "transparent",
  boxShadow: "0 0 0 1px #3c3c3c inset",
  color: Constants.system.white,
  height: 48,
};

const STYLES_AUTOSAVE = css`
  font-size: 12px;
  line-height: 1.225;
  display: flex;
  justify-content: baseline;
  color: ${Constants.system.yellow};
  opacity: 0;
  margin: 26px 24px;

  @keyframes slate-animations-autosave {
    0% {
      opacity: 0;
      transform: translateX(0);
    }
    10% {
      opacity: 1;
      transform: translateX(12px);
    }
    90% {
      opacity: 1;
      transform: translateX(12px);
    }
    100% {
      opacity: 0;
    }
  }
  animation: slate-animations-autosave 4000ms ease;
`;

const STYLES_SPINNER = css`
  width: 24px;
  height: 24px;
`;

export const FileTypeDefaultPreview = () => {
  if (props.type && props.type.startsWith("video/")) {
    return DEFAULT_VIDEO;
  }

  if (props.type && props.type.startsWith("audio/")) {
    return DEFAULT_AUDIO;
  }

  if (props.type && props.type.startsWith("application/epub")) {
    return DEFAULT_BOOK;
  }

  if (props.type && props.type.startsWith("application/pdf")) {
    return DEFAULT_DOCUMENT;
  }

  return DEFAULT_DATA;
};

class CarouselSidebarData extends React.Component {
  _ref = null;

  state = {
    name: Strings.isEmpty(this.props.data.name) ? "" : this.props.data.name,
    selected: {},
    isPublic: false,
    inPublicSlates: false,
    copyValue: "",
    loading: false,
    changingPreview: false,
    unsavedChanges: false,
    isEditing: false,
    isDownloading: false,
  };

  componentDidMount = () => {
    this.setState({ unsavedChanges: true });
    if (this.props.isOwner && !this.props.external) {
      this.debounceInstance = Window.debounce(() => this._handleSave(), 3000);
      let inPublicSlates = false;
      let selected = {};
      const id = this.props.data.id;
      for (let slate of this.props.slates) {
        if (slate.data.objects.some((o) => o.id === id)) {
          if (slate.data.public) {
            inPublicSlates = true;
          }
          selected[slate.id] = true;
        }
      }
      this.setState({ selected, inPublicSlates, isPublic: this.props.data.public });
    }
  };

  _handleDarkMode = async (e) => {
    Events.dispatchCustomEvent({
      name: "set-slate-theme",
      detail: { darkmode: e.target.value },
    });
  };

  _handleChange = (e) => {
    if (this.props.isOwner && !this.props.external) {
      this.debounceInstance();
      this.setState({ [e.target.name]: e.target.value, unsavedChanges: true });
    }
  };

  _handleSave = async () => {
    let name = { name: this.state.name };
    this.props.onSave(name, this.props.index);
    await setTimeout(() => {
      this.setState({ unsavedChanges: false });
    }, 500);
    await setTimeout(() => {
      this.setState({ unsavedChanges: true });
    }, 4000);
  };

  _handleToggleAutoPlay = async (e) => {
    await this.props.onSave(
      { settings: { ...this.props.data?.settings, autoPlay: e.target.value } },
      this.props.index
    );
  };

  _handleUpload = async (e) => {
    e.persist();
    this.setState({ changingPreview: true });
    let previousCoverCid = this.props.data?.coverImage?.cid;
    if (!e || !e.target) {
      this.setState({ changingPreview: false });
      return;
    }
    let json = await UserBehaviors.uploadImage(e.target.files[0], this.props.resources, true);
    if (!json) {
      this.setState({ changingPreview: false });
      return;
    }

    json.data.url = Strings.getCIDGatewayURL(json.data.cid);

    let updateReponse = await Actions.updateData({
      data: {
        id: this.props.data.id,
        coverImage: json.data,
      },
    });

    if (previousCoverCid) {
      let libraryCids = this.props.viewer.library[0].children.map((obj) => obj.cid);
      if (!libraryCids.includes(this.props.data.coverImage.cid)) {
        await UserBehaviors.deleteFiles(
          this.props.data.coverImage.cid,
          this.props.data.coverImage.id,
          true
        );
      }
    }

    Events.hasError(updateReponse);
    this.setState({ changingPreview: false });
  };

  _handleDownload = () => {
    if (this.props.data.type === "application/unity") {
      this.setState({ isDownloading: true }, async () => {
        const response = await UserBehaviors.downloadZip(this.props.data);
        this.setState({ isDownloading: false });

        Events.hasError(response);
      });
    } else {
      UserBehaviors.download(this.props.data);
    }
  };

  _handleCreateSlate = async () => {
    this.props.onClose();
    this.props.onAction({
      type: "SIDEBAR",
      value: "SIDEBAR_CREATE_SLATE",
      data: { files: [this.props.data] },
    });
  };

  _handleCopy = (copyValue, loading) => {
    this.setState({ copyValue, loading }, () => {
      this._ref.select();
      document.execCommand("copy");
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  _handleDelete = (cid) => {
    if (!this.props.isOwner) return;
    const message = `Are you sure you want to delete this? It will be deleted from your slates as well`;
    if (!window.confirm(message)) {
      return;
    }

    let library = this.props.viewer.library;
    library[0].children = library[0].children.filter((obj) => obj.cid !== cid);
    this.props.onUpdateViewer({ library });

    // NOTE(jim): Accepts ID as well if CID can't be found.
    // Since our IDS are unique.
    UserBehaviors.deleteFiles(cid, this.props.data.id);
  };

  _handleAdd = async (slate) => {
    this.setState({
      selected: { ...this.state.selected, [slate.id]: !this.state.selected[slate.id] },
    });
    if (this.state.selected[slate.id]) {
      await UserBehaviors.removeFromSlate({ slate, ids: [this.props.data.id] });
    } else {
      await UserBehaviors.addToSlate({
        slate,
        files: [this.props.data],
        fromSlate: this.props.fromSlate,
      });
    }
  };

  _handleEditFilename = async () => {
    this.setState({ isEditing: !this.state.isEditing }, () => {
      if (this.state.isEditing == false) {
        this._handleSave();
      }
    });
  };

  _handleToggleVisibility = async (e) => {
    const isVisible = this.state.inPublicSlates || this.state.isPublic;
    let selected = this.state.selected;
    if (this.state.inPublicSlates) {
      const slateIds = Object.entries(this.state.selected)
        .filter((entry) => entry[1])
        .map((entry) => entry[0]);
      const publicSlateIds = [];
      const publicSlateNames = [];
      for (let slate of this.props.slates) {
        if (slate.data.public && slateIds.includes(slate.id)) {
          publicSlateNames.push(slate.data.name);
          publicSlateIds.push(slate.id);
          selected[slate.id] = false;
        }
      }
      const message = `Making this file private will remove it from the following public slates: ${publicSlateNames.join(
        ", "
      )}. Do you wish to continue?`;
      if (!window.confirm(message)) {
        return;
      }
    }
    let response = await Actions.toggleFilePrivacy({
      data: {
        id: this.props.data.id,
        public: !isVisible,
      },
    });
    if (isVisible) {
      this.setState({ inPublicSlates: false, isPublic: false, selected });
    } else {
      this.setState({ isPublic: true });
    }
  };

  render() {
    const isVisible = this.state.inPublicSlates || this.state.isPublic;
    const { cid, file, name, coverImage, type, size, url, blurhash } = this.props.data;
    const elements = [];
    if (this.props.onClose) {
      elements.push(
        <div key="s-1" css={STYLES_DISMISS_BOX} onClick={this.props.onClose}>
          <SVG.Dismiss height="24px" />
        </div>
      );
    }

    elements.push(
      <div key="s-2" style={{ marginBottom: 80 }}>
        <div css={STYLES_META}>
          {this.state.isEditing && this.props.isOwner && !this.props.external ? (
            <Boundary enabled onOutsideRectEvent={this._handleEditFilename}>
              <Input
                full
                value={this.state.name}
                name="name"
                onChange={this._handleChange}
                id={`sidebar-label-name`}
                style={STYLES_INPUT}
              />
            </Boundary>
          ) : (
            <span
              css={STYLES_META_TITLE}
              style={{
                color: this.props.isOwner && !this.props.external ? "auto" : Constants.system.white,
              }}
              onClick={
                this.props.external || !this.props.isOwner ? () => {} : this._handleEditFilename
              }
            >
              {this.state.name}
            </span>
          )}

          <div style={{ display: `flex`, justifyContent: `baseline` }}>
            <div css={STYLES_META_DETAILS}>
              <span css={STYLES_TAG}>{type}</span> <span>{Strings.bytesToSize(size)}</span>
            </div>
            {this.state.unsavedChanges == false ? (
              <div css={STYLES_AUTOSAVE}>
                <SVG.Check height="14px" style={{ marginRight: 4 }} />
                Filename saved
              </div>
            ) : null}
          </div>
        </div>
        <div css={STYLES_ACTIONS}>
          {/* {this.props.isOwner ? (
            <div css={STYLES_ACTION} onClick={() => this._handleCopy(cid, "cidCopying")}>
              <SVG.CopyAndPaste height="24px" />
              <span style={{ marginLeft: 16 }}>
                {this.state.loading === "cidCopying" ? "Copied!" : "Copy file CID"}
              </span>
            </div>
          ) : null}
          <div css={STYLES_ACTION} onClick={() => this._handleCopy(url, "gatewayUrlCopying")}>
            <SVG.Data height="24px" />
            <span style={{ marginLeft: 16 }}>
              {this.state.loading === "gatewayUrlCopying" ? "Copied!" : "Copy file URL"}
            </span>
          </div> */}
          {this.props.external ? null : (
            <div css={STYLES_ACTION} onClick={this._handleDownload}>
              {this.state.isDownloading ? (
                <>
                  <LoaderSpinner css={STYLES_SPINNER} />
                  <span style={{ marginLeft: 16 }}>Downloading</span>
                </>
              ) : (
                <>
                  <SVG.Download height="24px" />
                  <span style={{ marginLeft: 16 }}>Download</span>
                </>
              )}
            </div>
          )}
          {this.props.isOwner ? (
            <div css={STYLES_ACTION} onClick={() => this._handleDelete(cid)}>
              <SVG.Trash height="24px" />
              <span style={{ marginLeft: 16 }}>Delete</span>
            </div>
          ) : null}
        </div>
        {this.props.external ? null : (
          <React.Fragment>
            <div css={STYLES_SECTION_HEADER}>Connected Slates</div>
            <SlatePicker
              dark
              slates={this.props.slates}
              onCreateSlate={this._handleCreateSlate}
              selectedColor={Constants.system.white}
              files={[this.props.data]}
              selected={this.state.selected}
              onAdd={this._handleAdd}
            />
          </React.Fragment>
        )}
        {type && Validations.isPreviewableImage(type) ? null : (
          <div>
            <System.P css={STYLES_SECTION_HEADER} style={{ margin: "48px 0px 8px 0px" }}>
              Preview image
            </System.P>
            {coverImage ? (
              <React.Fragment>
                <System.P css={STYLES_TEXT}>This is the preview image of your file.</System.P>
                <div css={STYLES_IMAGE_BOX} style={{ marginTop: 24 }}>
                  <img
                    src={coverImage.url}
                    alt=""
                    style={{ maxWidth: "368px", maxHeight: "368px" }}
                  />
                </div>
              </React.Fragment>
            ) : (
              <System.P css={STYLES_TEXT}>Add a cover image for your file.</System.P>
            )}
            <div style={{ marginTop: 16 }}>
              <input css={STYLES_FILE_HIDDEN} type="file" id="file" onChange={this._handleUpload} />
              <System.ButtonPrimary
                full
                type="label"
                htmlFor="file"
                loading={this.state.changingPreview}
              >
                Upload image
              </System.ButtonPrimary>
            </div>
          </div>
        )}
        {this.props.isOwner ? (
          <React.Fragment>
            <div css={STYLES_SECTION_HEADER} style={{ margin: "48px 0px 8px 0px" }}>
              Visibility
            </div>
            <div css={STYLES_OPTIONS_SECTION}>
              <div css={STYLES_TEXT}>{isVisible ? "Everyone" : "Link only"}</div>
              <Toggle dark active={isVisible} onChange={this._handleToggleVisibility} />
            </div>
            <div style={{ color: Constants.system.darkGray, marginTop: 8 }}>
              {isVisible
                ? "This file is currently visible to everyone and searchable within Slate through public slates."
                : "This file is currently not visible to others unless they have the link."}
            </div>
          </React.Fragment>
        ) : null}
        {this.props.data.name.endsWith(".md") ? (
          <React.Fragment>
            <div css={STYLES_SECTION_HEADER} style={{ margin: "48px 0px 8px 0px" }}>
              Settings
            </div>
            <div css={STYLES_OPTIONS_SECTION}>
              <div css={STYLES_TEXT}>Dark mode</div>
              <Toggle dark active={this.props?.theme?.darkmode} onChange={this._handleDarkMode} />
            </div>
          </React.Fragment>
        ) : null}
        {this.props.isOwner && type?.startsWith("video/") ? (
          <React.Fragment>
            <div css={STYLES_SECTION_HEADER} style={{ margin: "48px 0px 8px 0px" }}>
              Settings
            </div>
            <div css={STYLES_OPTIONS_SECTION}>
              <div css={STYLES_TEXT}>AutoPlay</div>
              <Toggle
                dark
                active={this.props?.data?.settings?.autoPlay}
                onChange={this._handleToggleAutoPlay}
              />
            </div>
            <div style={{ color: Constants.system.darkGray, marginTop: 8 }}>
              {this.props?.data?.settings?.autoPlay
                ? "This video will be autoplayed when opened by others."
                : "This video will be paused when opened by others."}
            </div>
          </React.Fragment>
        ) : null}
        <input
          css={STYLES_HIDDEN}
          ref={(c) => {
            this._ref = c;
          }}
          readOnly
          value={this.state.copyValue}
        />
      </div>
    );

    if (!elements.length) {
      return null;
    }

    return (
      <div css={STYLES_SIDEBAR} style={{ display: this.props.display }}>
        {elements}
      </div>
    );
  }
}

export default withTheme(CarouselSidebarData);
