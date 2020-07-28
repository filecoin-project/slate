import * as React from "react";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";

const STYLES_KEY = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const STYLES_KEY_LEFT = css`
  flex-shrink: 0;
  font-family: ${Constants.font.code};
`;

const STYLES_KEY_RIGHT = css`
  padding-left: 24px;
  min-width: 10%;
  width: 100%;
`;

const STYLES_CIRCLE_BUTTON = css`
  height: 48px;
  width: 48px;
  border-radius: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  background: ${Constants.system.black};
  color: ${Constants.system.white};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  cursor: pointer;
`;

class Key extends React.Component {
  state = { visible: false };

  _handleToggleVisible = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    return (
      <div css={STYLES_KEY}>
        {this.state.visible ? (
          <div css={STYLES_KEY_LEFT}>{this.props.data.key}</div>
        ) : (
          <div css={STYLES_KEY_LEFT}>
            XXXXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXXXX
          </div>
        )}
        <div css={STYLES_KEY_RIGHT}>
          <span
            css={STYLES_CIRCLE_BUTTON}
            onClick={this._handleToggleVisible}
            style={{
              marginRight: 16,
              backgroundColor: this.state.visible
                ? null
                : Constants.system.brand,
            }}
          >
            <SVG.Privacy height="16px" />
          </span>
          <span
            css={STYLES_CIRCLE_BUTTON}
            onClick={() => this.props.onDelete(this.props.data.id)}
          >
            <SVG.Dismiss height="16px" />
          </span>
        </div>
      </div>
    );
  }
}

export default class SceneSettingsDeveloper extends React.Component {
  state = {
    loading: false,
  };

  _handleSave = async (e) => {
    this.setState({ loading: true });

    const response = await Actions.generateAPIKey();
    if (response && response.error) {
      // TODO(jim): Proper error message.
      alert(response.decorator);
      return this.setState({ loading: false });
    }

    await this.props.onRehydrate();

    this.setState({ loading: false });
  };

  _handleDelete = async (id) => {
    this.setState({ loading: true });

    if (
      !window.confirm(
        "Are you sure you want to delete this key? This action is irreversible"
      )
    ) {
      this.setState({ loading: false });
      return;
    }

    const response = await Actions.deleteAPIKey({ id });
    if (response && response.error) {
      // TODO(jim): Proper error message.
      alert(response.decorator);
      return this.setState({ loading: false });
    }

    await this.props.onRehydrate();

    this.setState({ loading: false });
  };

  render() {
    return (
      <ScenePage>
        <System.H1>API Key</System.H1>
        <System.DescriptionGroup
          style={{ marginTop: 48, marginBottom: 48 }}
          label="Generate an API key"
          description="You can use your API key to get and create slates, and add images to slates. You can have a total of 10 keys at any given time."
        />

        {this.props.viewer.keys.map((k) => {
          return <Key key={k.id} data={k} onDelete={this._handleDelete} />;
        })}

        <div style={{ marginTop: 24 }}>
          <System.ButtonPrimary
            onClick={this._handleSave}
            loading={this.state.loading}
          >
            Generate
          </System.ButtonPrimary>
        </div>
      </ScenePage>
    );
  }
}
