import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as Fixtures from "~/common/fixtures";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import Avatar from "~/components/core/Avatar";

export default class SceneEditAccount extends React.Component {
  _handleChange = (e) => {
    this.props.onViewerChange(e);
  };

  render() {
    return (
      <ScenePage>
        <System.H1>Account</System.H1>

        <System.DescriptionGroup
          style={{ marginTop: 48 }}
          label="Avatar image"
          description="This image will appear in various lists."
        />

        <Avatar
          style={{ marginTop: 24 }}
          size={256}
          url={this.props.viewer.photoURL}
        />

        <div style={{ marginTop: 24 }}>
          <System.ButtonPrimary style={{ margin: "0 16px 16px 0" }}>
            Upload
          </System.ButtonPrimary>
          <System.ButtonSecondary>Delete</System.ButtonSecondary>
        </div>

        <System.Input
          containerStyle={{ marginTop: 48 }}
          label="Name"
          description="The name of your Filecoin Client can be seen by your peers."
          name="name"
          value={this.props.viewer.name}
          placeholder="Name"
          onChange={this._handleChange}
        />

        <System.DescriptionGroup
          style={{ marginTop: 48 }}
          label="Account secret configuration"
          description="Manage your JSON config for your peer id, private key, and secret."
          tooltip="If you make a mistake here, just click reset and you will have a new key."
        />

        <System.CodeTextarea
          value={this.props.viewer.config}
          onChange={this._handleChange}
          name="config"
        />

        <div style={{ marginTop: 24 }}>
          <System.ButtonSecondary style={{ margin: "0 16px 16px 0" }}>
            Hide
          </System.ButtonSecondary>
          <System.ButtonSecondary style={{ margin: "0 16px 16px 0" }}>
            Reset
          </System.ButtonSecondary>
          <System.ButtonSecondary style={{ margin: "0 16px 16px 0" }}>
            Export
          </System.ButtonSecondary>
        </div>
      </ScenePage>
    );
  }
}
