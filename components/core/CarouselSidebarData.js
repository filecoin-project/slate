import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as Actions from "~/common/actions";
import * as SVG from "~/common/svg";
import * as Window from "~/common/window";

import { css } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";
import { SlatePicker } from "~/components/core/SlatePicker";
import { dispatchCustomEvent } from "~/common/custom-events";

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
  position: relative;
  ${STYLES_NO_VISIBLE_SCROLL}

  @supports (
    (-webkit-backdrop-filter: blur(75px)) or (backdrop-filter: blur(75px))
  ) {
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

const STYLES_CONTAINER = css`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  padding-bottom: 88px;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const STYLES_META = css`
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

export default class CarouselSidebarData extends React.Component {
  _ref = null;

  state = {
    selected: {},
    isPublic: false,
    copyValue: "",
  };

  componentDidMount = () => {
    let isPublic = false;
    let selected = {};
    const id = this.props.data.id;
    for (let slate of this.props.slates) {
      if (slate.data.objects.some((o) => o.id === id)) {
        if (slate.data.public) {
          isPublic = true;
        }
        selected[slate.id] = true;
      }
    }
    this.setState({ selected, isPublic });
  };

  _handleDownload = () => {
    // NOTE(jim): 2mb limit on this.
    const extension = Strings.getFileExtension(this.props.data.file);
    const download = `${this.props.cid}.${extension}`;
    const uri = Strings.getCIDGatewayURL(this.props.cid);

    Window.saveAs(uri, download);
  };

  _handleCreateSlate = async () => {
    this.props.onClose();
    this.props.onAction({
      type: "SIDEBAR",
      value: "SIDEBAR_CREATE_SLATE",
      data: { files: [this.props.data] },
    });
  };

  _handleAdd = (slate) => {
    if (this.state.selected[slate.id]) {
      this.props.onRemoveFromSlate({
        id: this.props.data.id,
        slate: slate,
        data: this.props.data,
      });
      this.setState({
        selected: { ...this.state.selected, [slate.id]: false },
      });
    } else {
      this.props.onAddToSlate({
        id: this.props.data.id,
        slate: slate,
        data: this.props.data,
      });
      this.setState({
        selected: { ...this.state.selected, [slate.id]: slate },
      });
    }
  };

  _handleCopy = (copyValue, loading) => {
    this.setState({ copyValue, loading }, () => {
      this._ref.select();
      document.execCommand("copy");
    });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 10000);
  };

  _handleDelete = async (cid) => {
    this.setState({ loading: "deleting" });
    if (
      !window.confirm(
        "Are you sure you want to delete this? It will be removed from your Slates too."
      )
    ) {
      this.setState({ loading: false });
      return;
    }

    const response = await Actions.deleteBucketItems({ cids: [cid] });
    if (!response) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message: "We're having trouble connecting right now. Please try again later",
          },
        },
      });
      this.setState({ loading: false });
      return;
    }
    if (response.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { decorator: response.decorator } },
      });
      this.setState({ loading: false });
      return;
    }
    await this.props.onRehydrate();
    this.setState({ loading: false });
    dispatchCustomEvent({
      name: "remote-update-carousel",
      detail: {},
    });
  };

  render() {
    const { cid, file, type, size, url } = this.props.data;
    const elements = [];

    if (this.props.onClose) {
      elements.push(
        <div key="s-1" css={STYLES_DISMISS_BOX} onClick={this.props.onClose}>
          <SVG.Dismiss height="24px" />
        </div>
      );
    }

    elements.push(
      <div css={STYLES_CONTAINER}>
        <div css={STYLES_META}>
          <a css={STYLES_META_TITLE} target="_blank" href={Strings.getCIDGatewayURL(cid)}>
            {file}
          </a>
          <div css={STYLES_META_DETAILS}>
            <span css={STYLES_TAG}>{type}</span> <span>{Strings.bytesToSize(size)}</span>
          </div>
        </div>
        <div css={STYLES_ACTIONS}>
          <div css={STYLES_ACTION} onClick={() => this._handleCopy(cid, "cidCopying")}>
            <SVG.CopyAndPaste height="24px" />
            <span style={{ marginLeft: 16 }}>
              {this.state.loading === "cidCopying" ? "Copied!" : "Copy file CID"}
            </span>
          </div>
          <div css={STYLES_ACTION} onClick={() => this._handleCopy(url, "urlCopying")}>
            <SVG.DeepLink height="24px" />
            <span style={{ marginLeft: 16 }}>
              {this.state.loading === "urlCopying" ? "Copied!" : "Copy link"}
            </span>
          </div>
          <div css={STYLES_ACTION} onClick={() => this._handleDelete(cid)}>
            <SVG.Trash height="24px" />
            {this.state.loading === "deleting" ? (
              <LoaderSpinner style={{ height: 20, width: 20, marginLeft: 16 }} />
            ) : (
              <span style={{ marginLeft: 16 }}>Delete</span>
            )}
          </div>
        </div>
        <div css={STYLES_SECTION_HEADER}>Connected Slates</div>
        <SlatePicker
          dark
          slates={this.props.slates}
          selected={this.state.selected}
          onAdd={this._handleAdd}
          onCreateSlate={this._handleCreateSlate}
          loading={this.props.loading}
          selectedColor={Constants.system.white}
        />
        <div css={STYLES_SECTION_HEADER} style={{ margin: "48px 0px 8px 0px" }}>
          Privacy
        </div>
        <div style={{ color: Constants.system.darkGray, lineHeight: "1.5" }}>
          {this.state.isPublic
            ? "Public. This file is currently visible to others and searchable within Slate through public slates."
            : "Private. This file is currently not visible to others unless they have the link."}
        </div>
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
