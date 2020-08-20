import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";

import { css } from "@emotion/react";

import Section from "~/components/core/Section";
import SlateMediaObject from "~/components/core/SlateMediaObject";

const COLUMNS_SCHEMA = [
  { key: "cid", name: "CID", width: "100%" },
  {
    key: "size",
    name: "Size",
    width: "84px",
  },
  { key: "type", name: "Type", type: "TEXT_TAG", width: "172px" },
  {
    key: "networks",
    name: "Networks",
    type: "NETWORK_TYPE",
  },
  {
    key: "storage",
    name: "Storage Deal Status",
    width: "148px",
    type: "STORAGE_DEAL_STATUS",
  },
];

const STYLES_LINK = css`
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
  cursor: pointer;
  transition: 200ms ease all;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_LABEL = css`
  letter-spacing: 0.1px;
  font-size: 12px;
  text-transform: uppercase;
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
  color: ${Constants.system.black};
`;

const STYLES_SECTION = css`
  margin: 12px 0 16px 0;
`;

const delay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

export default class DataView extends React.Component {
  state = {
    selectedRowId: null,
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
          const cid = each.ipfs.replace("/ipfs/", "");
          return {
            id: each.id,
            cid,
            component: <SlateMediaObject key={each.id} data={each} />,
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

  _handleMakeDeal = (data) => {
    this.props.onAction({
      type: "SIDEBAR",
      value: "SIDEBAR_FILE_STORAGE_DEAL",
      data,
    });
  };

  _handleDelete = async (cid) => {
    this.setState({ loading: true });
    if (!window.confirm("Are you sure you want to delete this? It will be removed from your Slates too.")) {
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
    const columns = COLUMNS_SCHEMA;
    const rows = this.props.items.map((each, index) => {
      const cid = each.ipfs.replace("/ipfs/", "");
      const isOnNetwork = each.networks && each.networks.includes("FILECOIN");

      return {
        ...each,
        cid: (
          <span css={STYLES_LINK} onClick={() => this._handleSelect(index)}>
            {cid}
          </span>
        ),
        size: <span>{Strings.bytesToSize(each.size)}</span>,
        children: (
          <div>
            <React.Fragment>
              <div css={STYLES_LABEL}>Actions</div>
              <div css={STYLES_SECTION}>
                {this.state.loading || isOnNetwork ? null : (
                  <System.ButtonPrimary
                    loading={this.state.loading}
                    style={{ marginRight: 16 }}
                    onClick={() => this._handleMakeDeal(each)}>
                    Store on Filecoin
                  </System.ButtonPrimary>
                )}

                <System.ButtonSecondary loading={this.state.loading} onClick={() => this._handleDelete(cid)}>
                  Delete
                </System.ButtonSecondary>
              </div>
            </React.Fragment>
            {each.error ? (
              <React.Fragment>
                <div css={STYLES_LABEL} style={{ marginTop: 24 }}>
                  Errors
                </div>
                <div css={STYLES_SECTION}>{each.error}</div>
              </React.Fragment>
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
      <Section
        onAction={this.props.onAction}
        title={`${Strings.bytesToSize(this.props.viewer.stats.bytes)} uploaded`}
        style={{ minWidth: "880px" }}
        buttons={this.props.buttons}>
        <System.Table
          data={data}
          selectedRowId={this.state.selectedRowId}
          name="selectedRowId"
          onAction={this.props.onAction}
          onNavigateTo={this.props.onNavigateTo}
          onChange={this._handleChange}
          onClick={this._handleClick}
        />
      </Section>
    );
  }
}
