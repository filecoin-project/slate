import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Validations from "~/common/validations";

const SLATE_LIMIT = 20;

export default class SidebarCreateSlate extends React.Component {
  state = {
    name: "",
    loading: false,
  };

  _handleSubmit = async () => {
    if (this.props.viewer.slates.length >= SLATE_LIMIT) {
      alert("You have reached the limit of 20 Slates.");
      return;
    }

    this.setState({ loading: true });

    if (!Validations.slatename(this.state.name)) {
      alert("Please provide a name under 48 characters.");
      this.setState({ loading: false });
      return;
    }

    const response = await this.props.onSubmit({
      type: "CREATE_SLATE",
      name: this.state.name,
    });

    if (response && response.error) {
      alert(
        "Something went wrong while trying to create your new slate. Please try again."
      );
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
        <System.P
          style={{
            fontFamily: Constants.font.semiBold,
            fontSize: Constants.typescale.lvl3,
            marginBottom: "64px",
          }}
        >
          Create Slate
        </System.P>

        <System.P
          style={{
            fontFamily: Constants.font.semiBold,
            fontSize: "1.1rem",
          }}
        >
          Name
        </System.P>
        <System.Input
          name="name"
          style={{ marginTop: 12 }}
          placeholder="Slate name..."
          value={this.state.name}
          onChange={this._handleChange}
          onSubmit={this._handleSubmit}
        />

        <System.P style={{ marginTop: 12 }}>
          Your slate URL will be:{" "}
          <a
            href={`${this.props.viewer.username}/${Strings.createSlug(
              this.state.name
            )}`}
            target="_blank"
          >
            https://slate.host/
            {this.props.viewer.username}/{Strings.createSlug(this.state.name)}
          </a>
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
