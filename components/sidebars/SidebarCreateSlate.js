import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Validations from "~/common/validations";
import * as Actions from "~/common/actions";
import * as Events from "~/common/custom-events";
import * as SVG from "~/common/svg";

import { RadioGroup } from "~/components/system/components/RadioGroup";
import { css } from "@emotion/react";

const SLATE_LIMIT = 50;

const STYLES_TEXT = css`
  color: ${Constants.system.textGray};
  font-size: ${Constants.typescale.lvl0};
`;

const STYLES_HEADER = css`
  font-family: ${Constants.font.semiBold};
`;

const STYLES_GROUPING = css`
  width: 100%;
  border: 1px solid rgba(196, 196, 196, 0.5);
  background-color: ${Constants.system.white};
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 24px;
`;

export default class SidebarCreateSlate extends React.Component {
  state = {
    name: "",
    public: true,
    body: "",
    loading: false,
  };

  _handleSubmit = async () => {
    if (this.props.viewer.slates.length >= SLATE_LIMIT) {
      Events.dispatchMessage({ message: `You have reached the limit of ${SLATE_LIMIT} Slates!` });
      return;
    }

    this.setState({ loading: true });

    if (!Validations.slatename(this.state.name)) {
      Events.dispatchMessage({ message: "Please provide a name between 1-48 characters." });
      this.setState({ loading: false });
      return;
    }

    const response = await Actions.createSlate({
      name: this.state.name,
      public: this.state.public,
      body: this.state.body,
    });

    if (Events.hasError(response)) {
      this.setState({ loading: false });
      return;
    }

    if (this.props.sidebarData && this.props.sidebarData.files) {
      let data = this.props.sidebarData.files.map((file) => {
        return { title: file.title || file.name, ...file };
      });
      const addResponse = await Actions.addFileToSlate({
        slate: response.slate,
        data,
        fromSlate: this.props.sidebarData.fromSlate,
      });

      if (Events.hasError(addResponse)) {
        this.setState({ loading: false });
        return;
      }

      const { added, skipped } = addResponse;
      let message = Strings.formatAsUploadMessage(added, skipped, true);
      if (message) {
        Events.dispatchMessage({ message, status: !added ? null : "INFO" });
      }
    }

    this.setState({ loading: false });
    window.setTimeout(
      () =>
        this.props.onAction({
          type: "NAVIGATE",
          value: "NAV_SLATE",
          data: {
            id: response.slate.id,
          },
        }),
      200
    );
  };

  _handleCancel = () => {
    this.props.onCancel();
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const slug = Strings.createSlug(this.state.name);
    const url = `/${this.props.viewer.username}/${slug}`;
    return (
      <div>
        <System.P
          style={{
            fontFamily: Constants.font.semiBold,
            fontSize: Constants.typescale.lvl3,
            marginBottom: 36,
          }}
        >
          Create slate
        </System.P>

        <div css={STYLES_GROUPING}>
          <System.P css={STYLES_HEADER}>Name</System.P>
          <System.P
            css={STYLES_TEXT}
            style={{
              marginTop: 12,
            }}
          >
            Give your slate a name so you and others can find it on Slate and on the web.
          </System.P>

          <System.Input
            autoFocus
            placeholder="Slate name..."
            style={{ marginTop: 12 }}
            name="name"
            value={this.state.name}
            onChange={this._handleChange}
            onSubmit={this._handleSubmit}
            descriptionStyle={{ fontSize: "20px !important" }}
            labelStyle={{ fontSize: "20px" }}
          />
          <System.P
            style={{
              marginTop: 12,
              color: Constants.system.textGrayLight,
              fontSize: Constants.typescale.lvl0,
            }}
          >
            https://slate.host{url}
          </System.P>
        </div>

        <div css={STYLES_GROUPING}>
          <System.P css={STYLES_HEADER}>Description</System.P>
          <System.P
            css={STYLES_TEXT}
            style={{
              marginTop: 12,
            }}
          >
            Give your slate a description, add links, and connect it to other slates.
          </System.P>

          <System.Textarea
            style={{ marginTop: 12 }}
            placeholder="Slate description..."
            name="body"
            value={this.state.body}
            onChange={this._handleChange}
            onSubmit={this._handleSubmit}
          />
        </div>

        <div css={STYLES_GROUPING}>
          <System.P css={STYLES_HEADER} style={{ marginBottom: 12 }}>
            Privacy
          </System.P>
          <System.P
            css={STYLES_TEXT}
            style={{
              marginTop: 12,
            }}
          >
            All slates are public by default. This means they can be discovered and seen by anyone
            on the internet. If you make it private, only you will be able to see it.
          </System.P>
          <RadioGroup
            name="public"
            options={[
              {
                value: true,
                label: (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <SVG.Globe height="16px" style={{ marginRight: 8 }} />
                    Public
                  </div>
                ),
              },
              {
                value: false,
                label: (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <SVG.SecurityLock height="16px" style={{ marginRight: 8 }} />
                    Private
                  </div>
                ),
              },
            ]}
            style={{ marginTop: 12 }}
            labelStyle={{ fontFamily: Constants.font.medium }}
            selected={this.state.public}
            onChange={this._handleChange}
          />
        </div>

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
