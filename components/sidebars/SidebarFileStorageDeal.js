import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

const STYLES_FOCUS = css`
  font-size: ${Constants.typescale.lvl1};
  font-family: ${Constants.font.medium};
  overflow-wrap: break-word;
  width: 100%;

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }
`;

const STYLES_SUBTEXT = css`
  margin-top: 8px;
  font-size: 12px;
`;

const STYLES_ITEM = css`
  margin-top: 16px;
`;

const STYLES_IMAGE_PREVIEW = css`
  display: block;
  width: 100%;
  margin-top: 48px;
`;

export default class SidebarFileStorageDeal extends React.Component {
  state = {
    settings_cold_default_duration: this.props.viewer.settings_cold_default_duration,
    settings_cold_default_replication_factor: this.props.viewer
      .settings_cold_default_replication_factor,
    loading: false,
  };

  async componentDidMount() {
    if (!this.props.viewer.settings_deals_auto_approve) {
      return null;
    }

    console.log("SETTINGS: AUTO DEAL");

    await this._handleSubmit();
  }

  _handleMakeDeal = async ({ ipfs }) => {
    const options = {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ipfs }),
    };

    const response = await fetch("/api/data/storage-deal", options);
    const json = await response.json();
    console.log(json);
    return json;
  };

  _handleSubmit = async (e) => {
    if (e) {
      e.persist();
    }

    this.setState({ loading: true });
    await this._handleMakeDeal({ ipfs: `/ipfs/${this.props.data.cid}` });
    this.setState({ loading: false });
    await this.props.onCancel();
  };

  _handleCancel = () => {
    this.props.onCancel();
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const file = this.props.data;

    return (
      <React.Fragment>
        <System.P
          style={{
            fontFamily: Constants.font.semiBold,
            fontSize: Constants.typescale.lvl3,
          }}
        >
          Make Filecoin storage deal
        </System.P>

        <div>
          <div css={STYLES_ITEM}>
            <div css={STYLES_FOCUS}>{file.name}</div>
            <div css={STYLES_SUBTEXT}>Name</div>
          </div>

          <div css={STYLES_ITEM}>
            <div css={STYLES_FOCUS}>{Strings.bytesToSize(file.size)}</div>
            <div css={STYLES_SUBTEXT}>File size</div>
          </div>
        </div>

        {!this.state.loading ? (
          <System.Input
            containerStyle={{ marginTop: 48 }}
            label="Deal duration"
            name="settings_cold_default_duration"
            placeholder="Type in epochs (~25 seconds)"
            type="number"
            value={this.state.settings_cold_default_duration}
            onChange={this._handleChange}
          />
        ) : null}

        {!this.state.loading ? (
          <System.Input
            containerStyle={{ marginTop: 24 }}
            label="Replication factor"
            name="settings_cold_default_replication_factor"
            value={this.state.settings_cold_default_replication_factor}
            onChange={this._handleChange}
          />
        ) : null}

        {!this.state.loading ? (
          <System.SelectMenu
            full
            containerStyle={{ marginTop: 24 }}
            name="address"
            label="Payment address"
            value={this.props.selected.address}
            category="address"
            onChange={this.props.onSelectedChange}
            options={this.props.viewer.addresses}
          />
        ) : null}

        <System.ButtonPrimary
          full
          style={{ marginTop: 48 }}
          onClick={this._handleSubmit}
          loading={this.state.loading}
        >
          Make storage deal
        </System.ButtonPrimary>

        {!this.state.loading ? (
          <System.ButtonSecondary full style={{ marginTop: 16 }} onClick={this._handleCancel}>
            Cancel deal
          </System.ButtonSecondary>
        ) : null}
      </React.Fragment>
    );
  }
}
