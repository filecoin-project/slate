import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { PopoverNavigation } from "~/components/system/components/PopoverNavigation";

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

/*
  {this.state.loading || isOnNetwork ? null : (
    <System.ButtonPrimary
      loading={this.state.loading}
      style={{ marginRight: 16 }}
      onClick={() => this._handleMakeDeal(each)}>
      Store on Filecoin
    </System.ButtonPrimary>
  )}
*/

export default class DataView extends React.Component {
  state = {
    selectedRowId: null,
    menu: null,
  };

  async componentDidMount() {
    await this._handleUpdate();
  }

  _handleUpdate = async () => {
    // NOTE(jim): Hack to handle some race conditions.
    await delay(200);

    System.dispatchCustomEvent({
      name: "slate-global-create-carousel",
      detail: {
        slides: this.props.items.map((each) => {
          // TODO(jim): Shouldn't really be handled here.
          const cid = each.ipfs.replace("/ipfs/", "");
          const url = Strings.getCIDGatewayURL(cid);
          const data = { ...each, url, cid };

          return {
            id: data.id,
            cid,
            data,
            renderPlaceholder: true,
            component: <SlateMediaObject key={data.id} data={data} />,
          };
        }),
      },
    });
  };

  _handleSelect = (index) => {
    System.dispatchCustomEvent({
      name: "slate-global-open-carousel",
      detail: { index },
    });
  };

  // _handleMakeDeal = (data) => {
  //   this.props.onAction({
  //     type: "SIDEBAR",
  //     value: "SIDEBAR_FILE_STORAGE_DEAL",
  //     data,
  //   });
  // };

  _handleCopy = (e, value) => {
    this._handleHide();
    e.stopPropagation();
    this.setState({ copyValue: value }, () => {
      this._ref.select();
      document.execCommand("copy");
    });
  };

  _handleHide = (e) => {
    this.setState({ menu: null });
  };

  _handleDelete = async (cid) => {
    this.setState({ loading: true });
    if (
      !window.confirm(
        "Are you sure you want to delete this? It will be removed from your Slates too."
      )
    ) {
      this.setState({ loading: false });
      return null;
    }

    const response = await Actions.deleteBucketItem({ cid });
    console.log(response);

    if (!response) {
      this.setState({ loading: false });
      alert("TODO: Broken response error");
      return;
    }

    if (response.error) {
      this.setState({ loading: false });
      alert("TODO: Bucket delete error");
      return;
    }

    await this.props.onRehydrate();
    await this._handleUpdate();
    this.setState({ loading: false });
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
              css={STYLES_IMAGE_BOX}
              onClick={() => this._handleSelect(index)}
            >
              <SlateMediaObjectPreview
                url={`https://${each.ipfs.replace(
                  "/ipfs/",
                  ""
                )}.ipfs.slate.textile.io`}
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
            onClick={() => this.setState({ menu: each.id })}
          >
            <SVG.MoreHorizontal height="24px" />
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
          data={data}
          noColor
          topRowStyle={{
            backgroundColor: Constants.system.foreground,
            ...STYLES_TABLE_VALUE,
            fontFamily: Constants.font.semiBold,
            padding: "12px 24px",
          }}
          rowStyle={STYLES_TABLE_VALUE}
          selectedRowId={this.state.selectedRowId}
          name="selectedRowId"
          onAction={this.props.onAction}
          onNavigateTo={this.props.onNavigateTo}
          onChange={this._handleChange}
        />
        <input
          readOnly
          ref={(c) => {
            this._ref = c;
          }}
          value={this.state.copyValue}
          css={STYLES_COPY_INPUT}
        />
      </div>
    );
  }
}
