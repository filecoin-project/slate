import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";
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

    if (response && response.error) {
      // TODO(jim): Error task.
      alert(response.decorator);
    }

    this.setState({ loading: false });
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
