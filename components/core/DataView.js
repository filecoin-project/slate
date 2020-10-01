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
import {
  ButtonPrimary,
  ButtonWarning,
} from "~/components/system/components/Buttons";
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

const STYLES_CANCEL_BOX = css`
  height: 16px;
  width: 16px;
  background-color: ${Constants.system.brand};
  border-radius: 3px;
  position: relative;
  right: 3px;
  cursor: pointer;
  box-shadow: 0 0 0 1px ${Constants.system.brand};
`;

const STYLES_HEADER_LINE = css`
  display: flex;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 30px;
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

const STYLES_ICON_BOX_BACKGROUND = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 3px;
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

const STYLES_ARROWS = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const STYLES_ACTION_BAR = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 0 1px ${Constants.system.lightBorder} inset,
    0 0 4px 2px ${Constants.system.shadow};
  border-radius: 4px;
  padding: 12px 32px;
  box-sizing: border-box;
  background-color: ${Constants.system.foreground};
  position: fixed;
  bottom: 12px;
  width: calc(100vw - ${Constants.sizes.sidebar}px + 32px);
  max-width: ${Constants.sizes.desktop}px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: calc(100vw - ${Constants.sizes.mobileSidebar}px - 64px);
  }
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const STYLES_LEFT = css`
  width: 100%;
  min-width: 10%;
  display: flex;
  align-items: center;
`;

const STYLES_FILES_SELECTED = css`
  font-family: ${Constants.font.semiBold};

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(214px, 1fr));
  margin: 0 -27px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0px -12px;
  }
`;

const STYLES_IMAGE_BOX = css`
  width: 160px;
  height: 160px;
  margin: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0px 1px ${Constants.system.lightBorder} inset,
    0 0 40px 0 ${Constants.system.shadow};
  cursor: pointer;
  position: relative;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 144px;
    height: 144px;
    margin: 12px auto;
  }
`;

const STYLES_MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
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
      window.addEventListener("remote-update-carousel", this._handleUpdate);
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
    window.removeEventListener("remote-update-carousel", this._handleUpdate);
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
    const message = `Are you sure you want to delete these files? They will be deleted from your slates as well`;
    if (!window.confirm(message)) {
      return;
    }
    let cids = Object.keys(this.state.checked).map((id) => {
      let index = parseInt(id);
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

    const addResponse = await Actions.addFileToSlate({
      slate,
      data: [{ title: data.name, ...data }],
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
    }

    if (addResponse.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { decorator: addResponse.decorator } },
      });
      return null;
    }

    const { added, skipped } = addResponse;
    let message = `${added || 0} file${added !== 1 ? "s" : ""} uploaded. `;
    if (skipped) {
      message += `${skipped || 0} duplicate / existing file${
        added !== 1 ? "s were" : " was"
      } skipped.`;
    }
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: { message, status: !added ? null : "INFO" },
      },
    });

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

  _handleAddToSlate = (e) => {
    let userFiles = this.props.viewer.library[0].children;
    let files = Object.keys(this.state.checked).map(
      (index) => userFiles[index]
    );
    this.props.onAction({
      type: "SIDEBAR",
      value: "SIDEBAR_ADD_FILE_TO_SLATE",
      data: { files },
    });
    this._handleUncheckAll();
  };

  _handleUncheckAll = () => {
    this.setState({ checked: {} });
  };

  render() {
    let numChecked = Object.keys(this.state.checked).length || 0;
    const header = (
      <div css={STYLES_HEADER_LINE}>
        <TabGroup disabled tabs={["Uploads"]} style={{ margin: 0 }} />
        <span css={STYLES_MOBILE_HIDDEN}>
          <div
            css={STYLES_ICON_BOX}
            onClick={() => {
              this.setState({ view: "grid", menu: null });
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
        </span>
        <span css={STYLES_MOBILE_HIDDEN}>
          <div
            css={STYLES_ICON_BOX}
            onClick={() => {
              this.setState({ view: "list", menu: null });
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
        </span>
      </div>
    );
    const footer = (
      <React.Fragment>
        <div css={STYLES_ARROWS}>
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
        {numChecked ? (
          <div css={STYLES_ACTION_BAR}>
            <div css={STYLES_LEFT}>
              <span css={STYLES_FILES_SELECTED}>
                {numChecked} file{numChecked > 1 ? "s" : ""} selected
              </span>
            </div>
            <div css={STYLES_RIGHT}>
              <ButtonPrimary transparent onClick={this._handleAddToSlate}>
                Add to slate
              </ButtonPrimary>
              <ButtonWarning
                transparent
                style={{ marginLeft: 8 }}
                onClick={this._handleDeleteFiles}
                loading={
                  this.state.loading &&
                  Object.values(this.state.loading).some((elem) => {
                    return !!elem;
                  })
                }
              >
                Delete files
              </ButtonWarning>
              <div
                css={STYLES_ICON_BOX}
                onClick={() => this.setState({ checked: {} })}
              >
                <SVG.Dismiss
                  height="20px"
                  style={{ color: Constants.system.darkGray }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
    if (this.state.view === "grid") {
      return (
        <React.Fragment>
          {header}
          <div css={STYLES_IMAGE_GRID}>
            {this.props.items
              .slice(this.state.startIndex, this.state.startIndex + VIEW_LIMIT)
              .map((each, i) => {
                const cid = each.ipfs.replace("/ipfs/", "");
                return (
                  <div
                    key={each.id}
                    css={STYLES_IMAGE_BOX}
                    onClick={() =>
                      this._handleSelect(i + this.state.startIndex)
                    }
                    onMouseEnter={() => this.setState({ hover: i })}
                    onMouseLeave={() => this.setState({ hover: null })}
                  >
                    <SlateMediaObjectPreview
                      url={`${Constants.gateways.ipfs}/${each.ipfs.replace(
                        "/ipfs/",
                        ""
                      )}`}
                      title={each.file || each.name}
                      type={each.type || each.icon}
                    />
                    <span css={STYLES_MOBILE_HIDDEN}>
                      {numChecked ||
                      this.state.hover === i ||
                      this.state.menu === each.id ? (
                        <React.Fragment>
                          <div
                            css={STYLES_ICON_BOX_BACKGROUND}
                            onClick={
                              this.state.loading[cid]
                                ? () => {}
                                : (e) => {
                                    e.stopPropagation();
                                    this.setState({
                                      menu:
                                        this.state.menu === each.id
                                          ? null
                                          : each.id,
                                    });
                                  }
                            }
                          >
                            {this.state.loading[cid] ? (
                              <LoaderSpinner
                                style={{ height: 24, width: 24 }}
                              />
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
                                    top: "32px",
                                    right: "0px",
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
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              let checked = this.state.checked;
                              if (checked[this.state.startIndex + i]) {
                                delete checked[this.state.startIndex + i];
                              } else {
                                checked[this.state.startIndex + i] = true;
                              }
                              this.setState({ checked });
                            }}
                          >
                            <CheckBox
                              name={this.state.startIndex + i}
                              value={
                                !!this.state.checked[this.state.startIndex + i]
                              }
                              onChange={this._handleCheckBox}
                              boxStyle={{
                                height: 24,
                                width: 24,
                                backgroundColor: this.state.checked[
                                  this.state.startIndex + i
                                ]
                                  ? Constants.system.brand
                                  : "rgba(255, 255, 255, 0.75)",
                              }}
                              style={{
                                position: "absolute",
                                bottom: 8,
                                left: 8,
                              }}
                            />
                          </div>
                        </React.Fragment>
                      ) : null}
                    </span>
                  </div>
                );
              })}
          </div>
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

    const columns = [
      {
        key: "checkbox",
        name: numChecked ? (
          <div
            css={STYLES_CANCEL_BOX}
            onClick={() => this.setState({ checked: {} })}
          >
            <SVG.Minus
              height="16px"
              style={{ color: Constants.system.white }}
            />
          </div>
        ) : (
          <span />
        ),
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
          checkbox: (
            <CheckBox
              name={this.state.startIndex + index}
              value={!!this.state.checked[this.state.startIndex + index]}
              onChange={this._handleCheckBox}
              boxStyle={{ height: 16, width: 16 }}
              style={{
                position: "relative",
                right: 3,
                margin: "12px 0",
                opacity:
                  numChecked > 0 || this.state.hover === index ? "100%" : "0%",
              }}
            />
          ),
          name: (
            <div
              css={STYLES_CONTAINER_HOVER}
              onClick={() => this._handleSelect(this.state.startIndex + index)}
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
                  : () =>
                      this.setState({
                        menu: this.state.menu === each.id ? null : each.id,
                      })
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
