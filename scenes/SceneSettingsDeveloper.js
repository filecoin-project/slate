import * as React from "react";
import * as Actions from "~/common/actions";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import CodeBlock from "~/components/system/CodeBlock";

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

const EXAMPLE_GET_SLATE = (
  key,
  slateId
) => `// NOTE: set a slate by ID in an async/await function

const response = await fetch('https://slate.host/api/v1/get-slate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // NOTE: your API key
    Authorization: 'Basic ${key}',
  },
  body: JSON.stringify({ data: {
    // NOTE: your slate id
    id: ${slateId}
  }})
});

const json = await response.json();
console.log(json);`;

const EXAMPLE_GET_SLATE_RESPONSE = (
  key
) => `// NOTE: get a slate by ID JSON response

{
  data: {
    id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    updated_at: '2020-07-27T09:04:53.007Z',
    created_at: '2020-07-27T09:04:53.007Z',
    published_at: '2020-07-27T09:04:53.007Z',
    slatename: 'slatename',
    data: {
      name: "slatename",
      public: true,
      objects: [
        {
          id: "data-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          name: "data-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          ownerId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          url: "https://slate.host/static/social.png"
        }
      ],
      ownerId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
    }
  }
}`;

const EXAMPLE_UPLOAD_TO_SLATE = (key, slateId) => `// NOTE
// Upload data to a Slate by id in an async/await function. 
// Uses event data from a type="file" input.

// NOTE: your slate id
const url = 'https://slate.host/api/v1/upload-data/${slateId}';

let file = e.target.files[0];
let data = new FormData();
data.append("image", file);

const response = await fetch(url, {
  method: 'POST',
  headers: {
    // NOTE: your API key
    Authorization: 'Basic ${key}',
  },
  body: data
});

const json = await response.json();

// NOTE: you will receive a url you can use right away.
console.log(json);`;

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

  async componentDidMount() {
    if (!this.props.viewer.keys) {
      return;
    }

    if (!this.props.viewer.keys.length) {
      return;
    }

    const response = await fetch("/api/v1/get-slate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${this.props.viewer.keys[0].key}`,
      },
    });
    const json = await response.json();
    console.log(json);
  }

  render() {
    let key;
    if (this.props.viewer.keys) {
      if (this.props.viewer.keys.length) {
        key = this.props.viewer.keys[0].key;
      }
    }

    let slateId = "your-slate-uuid-v4-value";
    if (this.props.viewer.slates) {
      if (this.props.viewer.slates.length) {
        slateId = this.props.viewer.slates[0].id;
      }
    }

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

        {key ? (
          <React.Fragment>
            <System.H2 style={{ marginTop: 64 }}>Usage (JavaScript)</System.H2>
            <System.DescriptionGroup
              style={{ marginTop: 48 }}
              label="Get slate by ID"
              description="If you have the ID of your slate you can make a request for it. If you don't provide an ID you will get back the most recent slate you have made."
            />
            <CodeBlock
              children={EXAMPLE_GET_SLATE(key, slateId)}
              style={{ maxWidth: "768px" }}
            />
            <br />
            <br />
            <CodeBlock
              children={EXAMPLE_GET_SLATE_RESPONSE(key)}
              style={{ maxWidth: "768px" }}
            />
            <System.DescriptionGroup
              style={{ marginTop: 48 }}
              label="Upload data to slate by ID"
              description="You can use an HTML input field to get a file from the JavaScript event and upload that file to a slate of your choice. You must have the correct slate ID for this to work."
            />
            <CodeBlock
              children={EXAMPLE_UPLOAD_TO_SLATE(key, slateId)}
              style={{ maxWidth: "768px" }}
            />
          </React.Fragment>
        ) : null}
      </ScenePage>
    );
  }
}
