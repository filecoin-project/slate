import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as System from "~/components/system";

import { css } from "@emotion/react";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default class SidebarCreateSlate extends React.Component {
  state = {
    name: "",
    loading: false,
  };

  _handleSubmit = async () => {
    this.setState({ loading: true });

    if (Strings.isEmpty(this.state.name)) {
      alert("TODO: Provide a name");
      this.setState({ loading: false });
      return;
    }

    const response = await this.props.onSubmit({
      type: "CREATE_SLATE",
      name: this.state.name,
    });

    console.log(response);

    if (response && response.error) {
      // TODO(jim): Error task.
      alert(response.decorator);
      return;
    }

    this.setState({ loading: false });
    this.props.onAction({
      type: "NAVIGATE",
      value: response.slate.id,
      data: response.slate,
    });
  };

  _handleCancel = () => {
    this.props.onCancel();
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <System.P style={{ fontFamily: Constants.font.semiBold }}>
          Create Slate
        </System.P>

        <System.Input
          containerStyle={{ marginTop: 24 }}
          label="Slate name"
          name="name"
          value={this.state.name}
          onChange={this._handleChange}
          onSubmit={this._handleSubmit}
        />

        <System.P style={{ marginTop: 24 }}>
          This will create a new slate address at https://slate.host/
          {this.props.viewer.username}/{Strings.createSlug(this.state.name)}
        </System.P>

        <System.ButtonPrimary
          full
          style={{ marginTop: 48 }}
          onClick={this._handleSubmit}
          loading={this.state.loading}
        >
          Create {this.state.name}
        </System.ButtonPrimary>
      </div>
    );
  }
}
