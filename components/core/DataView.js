import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { PopoverNavigation } from "~/components/system/components/PopoverNavigation";
import { LoaderSpinner } from "~/components/system/components/Loaders";
import { dispatchCustomEvent } from "~/common/custom-events";
import { generateLayout } from "~/components/core/Slate";

import SlateMediaObject from "~/components/core/SlateMediaObject";
import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";

const COLUMNS_SCHEMA = [
  {
    key: "name",
    name: <span style={{ fontSize: "0.9rem" }}>Name</span>,
    width: "100%",
  },
  {
    key: "size",
    name: <span style={{ fontSize: "0.9rem" }}>Size</span>,
    width: "104px",
  },
  {
    key: "more",
    name: <div />,
    width: "64px",
  },
];

const STYLES_LINK = css`
  cursor: pointer;
  transition: 200ms ease all;
  font-size: 0.9rem;
  padding: 12px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_VALUE = css`
  font-size: 0.9rem;
  padding: 12px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const STYLES_TABLE_VALUE = {
  fontFamily: Constants.font.medium,
  padding: "0px 24px",
};

const STYLES_TABLE_CONTAINER = css`
  border: 1px solid rgba(229, 229, 229, 0.75);
`;

const STYLES_ICON_BOX = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px;
  cursor: pointer;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_COPY_INPUT = css`
  pointer-events: none;
  position: absolute;
  opacity: 0;
`;

const STYLES_IMAGE_GRID = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -27px;
`;

const STYLES_IMAGE_BOX = css`
  width: 160px;
  height: 160px;
  margin: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0px 1px rgba(229, 229, 229, 0.5) inset;
  cursor: pointer;
`;

const delay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

let mounted = false;

export default class DataView extends React.Component {
  _mounted = false;

  state = {
    menu: null,
    loading: {},
  };

  async componentDidMount() {
    if (!mounted) {
      mounted = true;
      window.addEventListener("remote-data-deletion", this._handleDataDeletion);
      window.addEventListener(
        "remote-slate-object-remove",
        this._handleRemoteSlateObjectRemove
      );
      window.addEventListener(
        "remote-slate-object-add",
        this._handleRemoteSlateObjectAdd
      );
    }

    await this._handleUpdate();
  }

  componentWillUnmount() {
    mounted = false;

    window.removeEventListener(
      "remote-data-deletion",
      this._handleDataDeletion
    );
    window.removeEventListener(
      "remote-slate-object-remove",
      this._handleRemoteSlateObjectRemove
    );
    window.removeEventListener(
      "remote-slate-object-add",
      this._handleRemoteSlateObjectAdd
    );
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.items !== this.props.items) {
      this._handleUpdate();
    }
  };

  _handleUpdate = async () => {
    // NOTE(jim): Hack to handle some race conditions.
    await delay(200);

    System.dispatchCustomEvent({
      name: "cid-viewer-create",
      detail: {
        slides: this.props.items.map((each) => {
          const cid = each.ipfs.replace("/ipfs/", "");
          const url = Strings.getCIDGatewayURL(cid);
          const data = { ...each, url, cid };

          return {
            id: data.id,
            slates: this.props.viewer.slates,
            cid,
            data,
            renderDataControls: true,
            component: <SlateMediaObject key={data.id} data={data} />,
            onDataDelete: () => {
              return dispatchCustomEvent({
                name: "remote-data-deletion",
                detail: { cid },
              });
            },
            onRemoveFromSlate: (data) => {
              return dispatchCustomEvent({
                name: "remote-slate-object-remove",
                detail: { ...data },
              });
            },
            onAddToSlate: (data) => {
              return dispatchCustomEvent({
                name: "remote-slate-object-add",
                detail: { ...data },
              });
            },
          };
        }),
      },
    });
  };

  _handleSelect = (index) => {
    System.dispatchCustomEvent({
      name: "cid-viewer-open",
      detail: { index },
    });
  };

  _handleDataDeletion = (e) => {
    this._handleDelete(e.detail.cid);
  };

  _handleRemoteSlateObjectAdd = async ({ detail }) => {
    const { id, slate, data } = detail;

    System.dispatchCustomEvent({
      name: "cid-viewer-loading",
      detail: { loading: { id: slate.id } },
    });

    const addResponse = await fetch(`/api/slates/add-url`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slate, data: { title: data.name, ...data } }),
    });

    if (!addResponse) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message:
              "We're having trouble connecting right now. Please try again later",
          },
        },
      });
      return null;
    } else if (addResponse.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { decorator: addResponse.decorator } },
      });
      return null;
    }

    await this.props.onRehydrate();
    await this._handleUpdate();

    System.dispatchCustomEvent({
      name: "cid-viewer-loading",
      detail: { loading: false },
    });
  };

  _handleRemoteSlateObjectRemove = async ({ detail }) => {
    const { id, slate } = detail;

    System.dispatchCustomEvent({
      name: "cid-viewer-loading",
      detail: { loading: { id: slate.id } },
    });

    const objects = slate.data.objects.filter((o, i) => {
      return o.id !== id;
    });

    // TODO(jim): This is a brute force way to handle this.
    const layouts = { lg: generateLayout(objects) };

    const response = await Actions.updateSlate({
      id: slate.id,
      data: {
        name: slate.data.name,
        objects,
        layouts,
      },
    });

    if (!response) {
      System.dispatchCustomEvent({
        name: "cid-viewer-loading",
        detail: { loading: false },
      });

      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message:
              "We're having trouble connecting right now and weren't able to delete that. Please try again later",
          },
        },
      });
      return null;
    }

    if (response.error) {
      System.dispatchCustomEvent({
        name: "cid-viewer-loading",
        detail: { loading: false },
      });

      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            decorator: response.decorator,
          },
        },
      });
      return null;
    }

    await this.props.onRehydrate();
    await this._handleUpdate();

    System.dispatchCustomEvent({
      name: "cid-viewer-loading",
      detail: { loading: false },
    });
  };

  _handleCopy = (e, value) => {
    e.stopPropagation();

    this._handleHide();
    this.setState({ copyValue: value }, () => {
      this._ref.select();
      document.execCommand("copy");
    });
  };

  _handleHide = (e) => {
    this.setState({ menu: null });
  };

  _handleRemoteDeletion = async (e) => {
    await this._handleDelete(e.detail.cid);
  };

  _handleLoading = ({ cid }) => {
    System.dispatchCustomEvent({
      name: "cid-viewer-loading",
      detail: { loading: !this.state.loading[cid] },
    });

    this.setState({
      loading: { ...this.state.loading, [cid]: !this.state.loading[cid] },
    });
  };

  _handleDelete = async (cid) => {
    this._handleLoading({ cid });

    if (
      !window.confirm(
        "Are you sure you want to delete this? It will be removed from your Slates too."
      )
    ) {
      this._handleLoading({ cid });
      return null;
    }

    const response = await Actions.deleteBucketItem({ cid });

    if (!response) {
      this._handleLoading({ cid });
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message:
              "We're having trouble connecting right now. Please try again later",
          },
        },
      });
      return null;
    }

    if (response.error) {
      this._handleLoading({ cid });
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { decorator: response.decorator } },
      });
      return null;
    }

    await this.props.onRehydrate();
    await this._handleUpdate();
    this._handleLoading({ cid });
    return null;
  };

  _handleClick = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if (this.props.view === "grid") {
      return (
        <div css={STYLES_IMAGE_GRID}>
          {this.props.items.map((each, index) => (
            <div
              key={each.id}
              css={STYLES_IMAGE_BOX}
              onClick={() => this._handleSelect(index)}
            >
              <SlateMediaObjectPreview
                url={`${Constants.gateways.ipfs}/${each.ipfs.replace(
                  "/ipfs/",
                  ""
                )}`}
                title={each.file || each.name}
                type={each.type || each.icon}
              />
            </div>
          ))}
        </div>
      );
    }

    const columns = COLUMNS_SCHEMA;
    const rows = this.props.items.map((each, index) => {
      const cid = each.ipfs.replace("/ipfs/", "");
      const isOnNetwork = each.networks && each.networks.includes("FILECOIN");

      return {
        ...each,
        name: (
          <div css={STYLES_LINK} onClick={() => this._handleSelect(index)}>
            {each.file || each.name}
          </div>
        ),
        size: <div css={STYLES_VALUE}>{Strings.bytesToSize(each.size)}</div>,
        more: (
          <div
            css={STYLES_ICON_BOX}
            onClick={
              this.state.loading[cid]
                ? () => {}
                : () => this.setState({ menu: each.id })
            }
          >
            {this.state.loading[cid] ? (
              <LoaderSpinner style={{ height: 24, width: 24 }} />
            ) : (
              <SVG.MoreHorizontal height="24px" />
            )}

            {this.state.menu === each.id ? (
              <Boundary
                captureResize={true}
                captureScroll={false}
                enabled
                onOutsideRectEvent={this._handleHide}
              >
                <PopoverNavigation
                  style={{
                    top: "48px",
                    right: "40px",
                  }}
                  navigation={[
                    {
                      text: "Copy CID",
                      onClick: (e) => this._handleCopy(e, cid),
                    },
                    {
                      text: "Copy link",
                      onClick: (e) =>
                        this._handleCopy(
                          e,
                          `${Constants.gateways.ipfs}/${cid}`
                        ),
                    },
                    {
                      text: "Delete",
                      onClick: (e) => {
                        e.stopPropagation();
                        this.setState({ menu: null }, () =>
                          this._handleDelete(cid)
                        );
                      },
                    },
                  ]}
                />
              </Boundary>
            ) : null}
          </div>
        ),
      };
    });

    const data = {
      columns,
      rows,
    };

    return (
      <div css={STYLES_TABLE_CONTAINER}>
        <System.Table
          topRowStyle={{
            ...STYLES_TABLE_VALUE,
            backgroundColor: Constants.system.foreground,
            fontFamily: Constants.font.semiBold,
            padding: "12px 24px",
          }}
          data={data}
          noColor
          rowStyle={STYLES_TABLE_VALUE}
          onAction={this.props.onAction}
          onNavigateTo={this.props.onNavigateTo}
        />
        <input
          ref={(c) => {
            this._ref = c;
          }}
          readOnly
          value={this.state.copyValue}
          css={STYLES_COPY_INPUT}
        />
      </div>
    );
  }
}
