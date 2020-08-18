import * as React from "react";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

const STYLES_GROUP = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const STYLES_LEFT = css`
  padding: 12px 0 0 0;
  min-width: 10%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const STYLES_RIGHT = css`
  padding-left: 48px;
  padding-top: 24px;
  flex-shrink: 0;
`;

export default class SidebarSingleSlateSettings extends React.Component {
  state = {
    slatename: this.props.data.slatename,
    public: this.props.data.data.public,
    loading: false,
  };

  _handleSubmit = async () => {
    this.setState({ loading: true });

    const response = await Actions.updateSlate({
      id: this.props.data.slateId,
      slatename: this.state.slatename,
      data: {
        objects: this.props.data.data.objects,
        public: this.state.public,
      },
    });

    if (!response) {
      alert("TODO: Server Error");
      return this.setState({ loading: false });
    }

    if (response.error) {
      alert(`TODO: ${response.decorator}`);
      return this.setState({ loading: false });
    }

    await this.props.onSubmit({});
  };

  _handleCancel = () => {
    this.props.onCancel();
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _handleDelete = async (e) => {
    this.setState({ loading: true });

    if (
      !window.confirm(
        "Are you sure you want to delete this Slate? This action is irreversible."
      )
    ) {
      return this.setState({ loading: false });
    }

    const response = await Actions.deleteSlate({
      id: this.props.data.slateId,
    });

    if (!response) {
      alert("TODO: Server Error");
      return this.setState({ loading: false });
    }

    if (response.error) {
      alert(`TODO: ${response.decorator}`);
      return this.setState({ loading: false });
    }

    await this.props.onAction({
      type: "NAVIGATE",
      value: "V1_NAVIGATION_SLATES",
    });
    return await this.props.onRehydrate();
  };

  render() {
    const { slatename } = this.state;
    const url = `/${this.props.viewer.username}/${slatename}`;

    return (
      <React.Fragment>
        <System.P style={{ fontFamily: Constants.font.semiBold }}>
          Slate Settings
        </System.P>
        <System.P style={{ marginTop: 24 }}>
          Update settings for {this.props.data.slatename}.
        </System.P>

        <System.Input
          containerStyle={{ marginTop: 48 }}
          style={{ marginTop: 24 }}
          label="Slatename"
          description={
            <React.Fragment>
              Changing the slatename will change your public slate URL. Your
              slate URL is:{" "}
              <a href={url} target="_blank">
                https://slate.host{url}
              </a>
            </React.Fragment>
          }
          name="slatename"
          value={this.state.slatename}
          placeholder="Slatename"
          onChange={this._handleChange}
          onSubmit={this._handleSubmit}
        />

        <div css={STYLES_GROUP} style={{ marginTop: 48 }}>
          <div css={STYLES_LEFT}>
            <System.DescriptionGroup
              label="Change privacy"
              description="If enabled, your slate will be visible to anyone in the world. If disabled, your slate will only be visible to you on this screen."
            />
          </div>
          <div css={STYLES_RIGHT}>
            <System.Toggle
              name="public"
              onChange={this._handleChange}
              active={this.state.public}
            />
          </div>
        </div>

        <div style={{ marginTop: 32 }}>
          <System.ButtonPrimary
            full
            onClick={this._handleSubmit}
            loading={this.state.loading}
          >
            Save changes
          </System.ButtonPrimary>

          {!this.state.loading ? (
            <System.ButtonSecondary
              style={{ marginTop: 16 }}
              full
              onClick={this._handleCancel}
            >
              Cancel
            </System.ButtonSecondary>
          ) : null}
        </div>

        {!this.state.loading ? (
          <System.DescriptionGroup
            style={{ marginTop: 48 }}
            label="Delete this slate"
            description="This action is irreversible."
          />
        ) : null}

        {!this.state.loading ? (
          <div style={{ marginTop: 32 }}>
            <System.ButtonSecondary
              full
              onClick={this._handleDelete}
              loading={this.state.loading}
            >
              Delete {this.props.data.slatename}
            </System.ButtonSecondary>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
