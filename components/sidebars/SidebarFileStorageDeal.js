import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";
import * as System from "~/components/system";

import { css } from "@emotion/react";

const STYLES_FOCUS = css`
  font-size: ${Constants.typescale.lvl1};
  font-family: "inter-medium";
  overflow-wrap: break-word;
  width: 100%;

  strong {
    font-family: "inter-semi-bold";
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

const SELECT_MENU_OPTIONS = [
  { value: "1", name: "Anywhere" },
  { value: "2", name: "China" },
  { value: "3", name: "Russia" },
  { value: "4", name: "USA" },
];

const SELECT_MENU_MAP = {
  "1": "Anywhere",
  "2": "China",
  "3": "Russia",
  "4": "USA",
};

export default class SidebarFileStorageDeal extends React.Component {
  state = {
    settings_deal_duration: 1,
    settings_replication_factor: 1,
    settings_country: "1",
    settings_miners: "t111, t112, t113",
    settings_confirmation: false,
  };

  _handleSubmit = () => {
    alert("TODO: Make a storage deal");
    this.props.onSubmit({});
  };

  _handleCancel = () => {
    this.props.onCancel();
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    let addresses = {};

    this.props.viewer.addresses.forEach((a) => {
      addresses[a.value] = a;
    });

    const currentAddress = addresses[this.props.selected.address];

    return (
      <React.Fragment>
        <System.P style={{ fontFamily: "inter-semi-bold" }}>
          Upload a file to the network
        </System.P>

        <img src="/static/test-image-upload.jpg" css={STYLES_IMAGE_PREVIEW} />

        <div css={STYLES_ITEM}>
          <div css={STYLES_FOCUS}>test-image-upload.jpg</div>
          <div css={STYLES_SUBTEXT}>Name</div>
        </div>

        <div css={STYLES_ITEM}>
          <div css={STYLES_FOCUS}>42 MB</div>
          <div css={STYLES_SUBTEXT}>File size</div>
        </div>

        <System.ButtonSecondaryFull style={{ marginTop: 24 }}>
          Change file
        </System.ButtonSecondaryFull>

        <System.Input
          containerStyle={{ marginTop: 48 }}
          label="Deal duration"
          name="settings_deal_duration"
          value={this.state.settings_deal_duration}
          onChange={this._handleChange}
        />

        <System.Input
          containerStyle={{ marginTop: 24 }}
          label="Replication factor"
          name="settings_replication_factor"
          value={this.state.settings_replication_factor}
          onChange={this._handleChange}
        />

        <System.SelectMenuFull
          containerStyle={{ marginTop: 24 }}
          name="address"
          label="Payment address"
          value={this.props.selected.address}
          category="address"
          onChange={this.props.onSelectedChange}
          options={this.props.viewer.addresses}
        >
          {currentAddress.name}
        </System.SelectMenuFull>

        <System.SelectMenuFull
          containerStyle={{ marginTop: 24 }}
          name="settings_country"
          label="Country"
          value={this.props.settings_country}
          category="miner location"
          onChange={this._handleChange}
          options={SELECT_MENU_OPTIONS}
        >
          {SELECT_MENU_MAP[this.state.settings_country]}
        </System.SelectMenuFull>

        <System.Input
          containerStyle={{ marginTop: 24 }}
          label="Trusted miners"
          name="settings_miners"
          value={this.state.settings_miners}
          onChange={this._handleChange}
        />

        <System.CheckBox
          style={{ marginTop: 24 }}
          name="settings_confirmation"
          value={this.state.settings_confirmation}
          onChange={this._handleChange}
        >
          Please do not show this confirmation again.
        </System.CheckBox>

        <div css={STYLES_ITEM}>
          <div css={STYLES_FOCUS}>2 FIL</div>
          <div css={STYLES_SUBTEXT}>Last order price</div>
        </div>

        <System.ButtonPrimaryFull
          style={{ marginTop: 48 }}
          onClick={this._handleSubmit}
        >
          Make storage deal
        </System.ButtonPrimaryFull>
      </React.Fragment>
    );
  }
}
