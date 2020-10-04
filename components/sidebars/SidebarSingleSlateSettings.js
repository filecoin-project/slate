import * as React from "react";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";
import { dispatchCustomEvent } from "~/common/custom-events";

const SIZE_LIMIT = 1000000;
const DEFAULT_IMAGE = "";

const STYLES_GROUP = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  margin-top: 8px;
`;

const STYLES_HEADER = css`
  font-family: ${Constants.font.semiBold};
  ${"" /* margin-top: 32px; */}
`;

const STYLES_IMAGE_BOX = css`
  max-width: 368px;
  max-height: 368px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.system.white};
  overflow: hidden;
  ${"" /* box-shadow: 0 0 0 1px ${Constants.system.border} inset; */}
  border-radius: 4px;
`;

const STYLES_GROUPING = css`
  width: 100%;
  border: 1px solid rgba(196, 196, 196, 0.5);
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 24px;
`;

export default class SidebarSingleSlateSettings extends React.Component {
  state = {
    slatename: this.props.current.slatename,
    public: this.props.current.data.public,
    body: this.props.current.data.body,
    name: this.props.current.data.name,
    loading: false,
  };

  _handleSubmit = async () => {
    this.setState({ loading: true });

    const response = await Actions.updateSlate({
      id: this.props.current.id,
      data: {
        name: this.state.name,
        public: this.state.public,
        body: this.state.body,
      },
    });
    console.log(response);

    if (!response) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message:
              "We're having trouble connecting right now. Please try again later",
          },
        },
      });
      return this.setState({ loading: false });
    }

    if (response.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { decorator: response.decorator } },
      });
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
      id: this.props.current.id,
    });

    if (!response) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: {
            message:
              "We're having trouble connecting right now. Please try again later",
          },
        },
      });
      return this.setState({ loading: false });
    }

    if (response.error) {
      dispatchCustomEvent({
        name: "create-alert",
        detail: { alert: { decorator: response.decorator } },
      });
      return this.setState({ loading: false });
    }

    await this.props.onAction({
      type: "NAVIGATE",
      value: "V1_NAVIGATION_SLATES",
    });

    return await this.props.onRehydrate();
  };

  render() {
    const slug = Strings.createSlug(this.state.name);
    const url = `/${this.props.viewer.username}/${slug}`;
    let preview = this.props.current.data.preview;
    if (!preview) {
      for (let object of this.props.current.data.objects) {
        if (
          object.type &&
          object.type.startsWith("image/") &&
          (!object.size || object.size < SIZE_LIMIT)
        ) {
          preview = object.url.replace("https://undefined", "https://");
          break;
        }
      }
    }
    if (!preview) {
      preview = DEFAULT_IMAGE;
    }

    return (
      <React.Fragment>
        <System.P
          style={{
            fontFamily: Constants.font.semiBold,
            fontSize: Constants.typescale.lvl3,
            marginBottom: 64,
          }}
        >
          Slate settings
        </System.P>

        <div css={STYLES_GROUPING}>
          <System.P css={STYLES_HEADER}>Name</System.P>
          <System.P
            style={{
              marginTop: 12,
            }}
          >
            Changing the slatename will change your public slate URL. Your slate
            URL is:{" "}
          </System.P>
          <System.P
            style={{
              marginTop: 12,
            }}
          >
            <a
              href={url}
              target="_blank"
              style={{ color: Constants.system.brand }}
            >
              https://slate.host{url}
            </a>
          </System.P>

          <System.Input
            placeholder="Slate name..."
            style={{ marginTop: 8, boxShadow: "none" }}
            name="name"
            value={this.state.name}
            placeholder="Name"
            onChange={this._handleChange}
            onSubmit={this._handleSubmit}
            descriptionStyle={{ fontSize: "20px !important" }}
            labelStyle={{ fontSize: "20px" }}
          />
        </div>

        <div css={STYLES_GROUPING}>
          <System.P css={STYLES_HEADER}>Description</System.P>

          <System.Textarea
            style={{ marginTop: 12, boxShadow: "none" }}
            name="body"
            value={this.state.body}
            onChange={this._handleChange}
            onSubmit={this._handleSubmit}
          />
        </div>

        <div css={STYLES_GROUPING}>
          <System.P css={STYLES_HEADER}>Preview image</System.P>

          <System.P
            style={{
              marginTop: 12,
            }}
          >
            This is the image that shows when you share a link to your slate.
          </System.P>

          <div css={STYLES_IMAGE_BOX} style={{ marginTop: 24 }}>
            <img
              src={preview}
              alt=""
              style={{ maxWidth: "368px", maxHeight: "368px" }}
            />
          </div>
        </div>

        <div css={STYLES_GROUPING}>
          <System.P css={STYLES_HEADER}>Privacy</System.P>
          <div css={STYLES_GROUP}>
            <System.P style={{ marginRight: 16 }}>
              {this.state.public
                ? "Public. Anyone can search for and view this slate."
                : "Private. Only you can view this slate."}
            </System.P>
            <System.Toggle
              name="public"
              onChange={this._handleChange}
              active={this.state.public}
            />
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <System.ButtonPrimary
            full
            onClick={this._handleSubmit}
            loading={this.state.loading}
          >
            Save changes
          </System.ButtonPrimary>

          {!this.state.loading ? (
            <System.ButtonWarning
              full
              style={{
                marginTop: 16,
              }}
              onClick={this._handleCancel}
            >
              Cancel
            </System.ButtonWarning>
          ) : null}
        </div>

        {!this.state.loading ? (
          <div style={{ marginTop: 48 }}>
            <System.ButtonWarning
              full
              onClick={this._handleDelete}
              style={{ overflow: "hidden" }}
            >
              Delete{" "}
              {this.props.current.data && this.props.current.data.name
                ? this.props.current.data.name
                : this.props.current.slatename}
            </System.ButtonWarning>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
