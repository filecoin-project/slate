import * as React from "react";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Strings from "~/common/strings";
import * as Validations from "~/common/validations";
import * as Events from "~/common/custom-events";
import * as SVG from "~/common/svg";

import { RadioGroup } from "~/components/system/components/RadioGroup";
import { css } from "@emotion/react";

const SIZE_LIMIT = 1000000;
const DEFAULT_IMAGE =
  "https://slate.textile.io/ipfs/bafkreiaow45dlq5xaydaeqocdxvffudibrzh2c6qandpqkb6t3ahbvh6re";

const STYLES_HEADER = css`
  font-family: ${Constants.font.semiBold};
`;

const STYLES_TEXT = css`
  color: ${Constants.system.textGray};
  font-size: ${Constants.typescale.lvl0};
`;

const STYLES_IMAGE_BOX = css`
  max-width: 368px;
  max-height: 368px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Constants.system.white};
  overflow: hidden;
  border-radius: 4px;
`;

const STYLES_GROUPING = css`
  width: 100%;
  border: 1px solid rgba(196, 196, 196, 0.5);
  background-color: ${Constants.system.white};
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 24px;
`;

export default class SidebarSingleSlateSettings extends React.Component {
  state = {
    slatename: this.props.data.slatename,
    public: this.props.data.data.public,
    body: this.props.data.data.body,
    name: this.props.data.data.name,
  };

  _handleSubmit = async () => {
    let slates = this.props.viewer.slates;
    for (let slate of slates) {
      if (slate.id === this.props.data.id) {
        slate.data.name = this.state.name;
        slate.data.public = this.state.public;
        slate.data.body = this.state.body;
        this.props.onUpdateViewer({ slates });
        break;
      }
    }

    this.props.onCancel();
    const response = await Actions.updateSlate({
      id: this.props.data.id,
      data: {
        name: this.state.name,
        public: this.state.public,
        body: this.state.body,
      },
    });

    if (Events.hasError(response)) {
      return;
    }
  };

  _handleCancel = () => {
    this.props.onCancel();
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _handleDelete = async (e) => {
    if (
      !window.confirm("Are you sure you want to delete this Slate? This action is irreversible.")
    ) {
      return;
    }

    let slates = this.props.viewer.slates.filter((slate) => slate.id !== this.props.current.id);
    this.props.onUpdateViewer({ slates });

    this.props.onAction({
      type: "NAVIGATE",
      value: "NAV_SLATES",
    });

    const response = await Actions.deleteSlate({
      id: this.props.current.id,
    });

    if (Events.hasError(response)) {
      return;
    }
  };

  render() {
    const slug = Strings.createSlug(this.state.name);
    const url = `/${this.props.viewer.username}/${slug}`;
    let preview = this.props.data.data.preview;
    if (!preview) {
      for (let object of this.props.data.data.objects) {
        if (
          object.type &&
          Validations.isPreviewableImage(object.type) &&
          object.size &&
          object.size < SIZE_LIMIT
        ) {
          preview = object.url;
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
            marginBottom: 36,
          }}
        >
          Slate settings
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
            name="body"
            placeholder="Slate description..."
            value={this.state.body}
            onChange={this._handleChange}
            onSubmit={this._handleSubmit}
          />
        </div>

        {this.state.public ? (
          <div css={STYLES_GROUPING}>
            <System.P css={STYLES_HEADER}>Preview image</System.P>

            <System.P
              css={STYLES_TEXT}
              style={{
                marginTop: 12,
              }}
            >
              This is the image that shows when you share a link to your slate.
            </System.P>

            <div css={STYLES_IMAGE_BOX} style={{ marginTop: 24 }}>
              <img src={preview} alt="" style={{ maxWidth: "368px", maxHeight: "368px" }} />
            </div>
          </div>
        ) : null}

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

        <div style={{ marginTop: 40 }}>
          <System.ButtonPrimary full onClick={this._handleSubmit}>
            Save changes
          </System.ButtonPrimary>

          <div style={{ marginTop: 16 }}>
            <System.ButtonWarning full onClick={this._handleDelete} style={{ overflow: "hidden" }}>
              Delete slate
            </System.ButtonWarning>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
