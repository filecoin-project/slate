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
import { CheckBox } from "~/components/system/components/CheckBox";
import { Table } from "~/components/core/Table";
import { FileTypeIcon } from "~/components/core/FileTypeIcon";
import { ButtonWarning } from "~/components/system/components/Buttons";
import { TabGroup } from "~/components/core/TabGroup";

import SlateMediaObject from "~/components/core/SlateMediaObject";
import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";

const VIEW_LIMIT = 20;

const STYLES_CONTAINER_HOVER = css`
  display: flex;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_ICON_BOX = css`
  height: 32px;
  width: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 16px;
`;

const STYLES_HEADER_LINE = css`
  display: flex;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 42px;
`;

const STYLES_LINK = css`
  display: inline;
  cursor: pointer;
  transition: 200ms ease all;
  font-size: 0.9rem;
  padding: 12px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const STYLES_VALUE = css`
  font-size: 0.9rem;
  padding: 12px 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const STYLES_ICON_BOX_HOVER = css`
  display: inline-flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_ACTION_ROW = css`
  display: flex;
  align-items: center;
`;

const STYLES_LEFT = css`
  width: 100%;
  min-width: 10%;
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
`;

const STYLES_ICON_ELEMENT = css`
  height: 40px;
  width: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #565151;
  user-select: none;
  cursor: pointer;
  pointer-events: auto;
  margin: 16px 8px;

  :hover {
    color: ${Constants.system.brand};
  }

  svg {
    transform: rotate(0deg);
    transition: 200ms ease transform;
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
  justify-content: space-between;
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
    startIndex: 0,
    checked: {},
    view: "grid",
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

  _increment = (direction) => {
    if (
      direction > 0 &&
      this.state.startIndex + VIEW_LIMIT <
        this.props.viewer.library[0].children.length
    ) {
      this.setState({ startIndex: this.state.startIndex + VIEW_LIMIT });
    } else if (direction < 0 && this.state.startIndex - VIEW_LIMIT >= 0) {
      this.setState({ startIndex: this.state.startIndex - VIEW_LIMIT });
    }
  };

  _handleCheckBox = (e) => {
    let checked = this.state.checked;
    if (e.target.value === false) {
      delete checked[e.target.name];
      this.setState({ checked });
      return;
    }
    this.setState({
      checked: { ...this.state.checked, [e.target.name]: true },
    });
  };

  _handleDeleteFiles = async (e) => {
    const message = `Are you sure you want to delete these ${
      Object.keys(this.state.checked).length
    } files? They will be deleted from your slates as well`;
    if (!window.confirm(message)) {
      return;
    }
    console.log(this.state.checked);
    let cids = Object.keys(this.state.checked).map((id) => {
      let index = parseInt(id.replace("checkbox-", ""));
      return this.props.viewer.library[0].children[index].ipfs.replace(
        "/ipfs/",
        ""
      );
    });
    this._handleLoading({ cids });

    const response = await Actions.deleteBucketItems({ cids });
    if (!response) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message:
              "We're having trouble connecting right now. Please try again later",
          },
        },
      });
      this._handleLoading({ cids });
      return;
    }
    if (response.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { decorator: response.decorator } },
      });
      this._handleLoading({ cids });
      return;
    }
    await this.props.onRehydrate();
    await this._handleUpdate();
    this._handleLoading({ cids });
    this.setState({ checked: {} });
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: { message: "Files successfully deleted!", status: "INFO" },
      },
    });
  };

  _handleDelete = async (cid) => {
    this._handleLoading({ cids: [cid] });

    if (
      !window.confirm(
        "Are you sure you want to delete this? It will be removed from your Slates too."
      )
    ) {
      this._handleLoading({ cids: [cid] });
      return;
    }

    const response = await Actions.deleteBucketItem({ cid });

    if (!response) {
      this._handleLoading({ cids: [cid] });
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message:
              "We're having trouble connecting right now. Please try again later",
          },
        },
      });
      return;
    }

    if (response.error) {
      this._handleLoading({ cids: [cid] });
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { decorator: response.decorator } },
      });
      return;
    }

    await this.props.onRehydrate();
    await this._handleUpdate();
    this._handleLoading({ cids: [cid] });
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: { message: "File successfully deleted!", status: "INFO" },
      },
    });
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

  _handleLoading = ({ cids }) => {
    let loading = this.state.loading;
    for (let cid of cids) {
      System.dispatchCustomEvent({
        name: "cid-viewer-loading",
        detail: { loading: !this.state.loading[cid] },
      });
      loading[cid] = !this.state.loading[cid];
    }
    this.setState({ loading });
  };

  _handleClick = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const header = (
      <div css={STYLES_HEADER_LINE}>
        <TabGroup disabled tabs={["Uploads"]} style={{ margin: 0 }} />
        <React.Fragment>
          <div
            css={STYLES_ICON_BOX}
            onClick={() => {
              this.setState({ view: "grid" });
            }}
          >
            <SVG.GridView
              style={{
                color:
                  this.state.view === "grid"
                    ? Constants.system.black
                    : "rgba(0,0,0,0.25)",
              }}
              height="24px"
            />
          </div>
          <div
            css={STYLES_ICON_BOX}
            onClick={() => {
              this.setState({ view: "list" });
            }}
          >
            <SVG.ListView
              style={{
                color:
                  this.state.view === "list"
                    ? Constants.system.black
                    : "rgba(0,0,0,0.25)",
              }}
              height="24px"
            />
          </div>
        </React.Fragment>
      </div>
    );
    const footer = (
      <div css={STYLES_ACTION_ROW}>
        <div css={STYLES_LEFT}>
          {Object.keys(this.state.checked).length ? (
            <ButtonWarning
              style={{ width: 160 }}
              onClick={this._handleDeleteFiles}
              loading={
                this.state.loading &&
                Object.values(this.state.loading).some((elem) => {
                  return !!elem;
                })
              }
            >
              Delete {Object.keys(this.state.checked).length} file
              {Object.keys(this.state.checked).length > 1 ? "s" : ""}
            </ButtonWarning>
          ) : null}
        </div>
        <div css={STYLES_RIGHT}>
          <span
            css={STYLES_ICON_ELEMENT}
            style={
              this.state.startIndex - VIEW_LIMIT >= 0
                ? null
                : {
                    cursor: "not-allowed",
                    color: Constants.system.border,
                  }
            }
            onClick={() => this._increment(-1)}
          >
            <SVG.NavigationArrow
              height="24px"
              style={{ transform: `rotate(180deg)` }}
            />
          </span>
          <span
            css={STYLES_ICON_ELEMENT}
            style={
              this.state.startIndex + VIEW_LIMIT <
              this.props.viewer.library[0].children.length
                ? null
                : {
                    cursor: "not-allowed",
                    color: Constants.system.border,
                  }
            }
            onClick={() => this._increment(1)}
          >
            <SVG.NavigationArrow height="24px" />
          </span>
        </div>
      </div>
    );
    if (this.state.view === "grid") {
      return (
        <React.Fragment>
          {header}
          <div css={STYLES_IMAGE_GRID}>
            {this.props.items
              .slice(this.state.startIndex, this.state.startIndex + VIEW_LIMIT)
              .map((each, index) => (
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
          {footer}
        </React.Fragment>
      );
    }

    const columns = [
      {
        key: "checkbox",
        name: <span />,
        width: "24px",
      },
      {
        key: "name",
        name: <div style={{ fontSize: "0.9rem", padding: "18px 0" }}>Name</div>,
        width: "100%",
      },
      {
        key: "size",
        name: <div style={{ fontSize: "0.9rem", padding: "18px 0" }}>Size</div>,
        width: "104px",
      },
      {
        key: "more",
        name: <span />,
        width: "48px",
      },
    ];
    const rows = this.props.items
      .slice(this.state.startIndex, this.state.startIndex + VIEW_LIMIT)
      .map((each, index) => {
        const cid = each.ipfs.replace("/ipfs/", "");
        const isOnNetwork = each.networks && each.networks.includes("FILECOIN");

        return {
          ...each,
          checkbox: this._handleCheckBox ? (
            <div
              style={{
                margin: "12px 0",
                opacity:
                  Object.keys(this.state.checked).length > 0
                    ? 1
                    : this.state.hover === index
                    ? 1
                    : 0,
              }}
            >
              <CheckBox
                name={`checkbox-${this.state.startIndex + index}`}
                value={
                  !!this.state.checked[
                    `checkbox-${this.state.startIndex + index}`
                  ]
                }
                onChange={this._handleCheckBox}
                boxStyle={{ height: 16, width: 16 }}
                style={{ position: "relative", right: 3 }}
              />
            </div>
          ) : (
            <div />
          ),
          name: (
            <div
              css={STYLES_CONTAINER_HOVER}
              onClick={() => this._handleSelect(index)}
            >
              <div
                css={STYLES_ICON_BOX_HOVER}
                style={{ paddingLeft: 0, paddingRight: 18 }}
              >
                <FileTypeIcon type={each.type} height="24px" />
              </div>
              <div css={STYLES_LINK}>{each.file || each.name}</div>
            </div>
          ),
          size: <div css={STYLES_VALUE}>{Strings.bytesToSize(each.size)}</div>,
          more: (
            <div
              css={STYLES_ICON_BOX_HOVER}
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
      <React.Fragment>
        {header}
        <Table
          data={data}
          rowStyle={{ padding: "10px 16px" }}
          topRowStyle={{ padding: "0px 16px" }}
          onMouseEnter={(i) => this.setState({ hover: i })}
          onMouseLeave={() => this.setState({ hover: null })}
        />
        {footer}
        <input
          ref={(c) => {
            this._ref = c;
          }}
          readOnly
          value={this.state.copyValue}
          css={STYLES_COPY_INPUT}
        />
      </React.Fragment>
    );
  }
}
