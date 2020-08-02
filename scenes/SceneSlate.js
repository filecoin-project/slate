import * as React from "react";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import Section from "~/components/core/Section";

const STYLES_GROUP = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-width: 480px;
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

export default class SceneSlate extends React.Component {
  state = {
    slatename: this.props.current.slatename,
    public: this.props.current.data.public,
    loading: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.current.slatename !== this.props.current.slatename) {
      this.setState({
        slatename: this.props.current.slatename,
        public: this.props.current.data.public,
        loading: false,
      });
    }
  }

  _handleSave = async (e) => {
    this.setState({ loading: true });

    const response = await Actions.updateSlate({
      id: this.props.current.slateId,
      slatename: this.state.slatename,
      data: {
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

    await this.props.onRehydrate();
    this.setState({ loading: false });
  };

  _handleChange = (e) => {
    if (e && e.persist) {
      e.persist();
    }

    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { data } = this.props.current;
    const { slatename } = this.state;
    const url = `/@${this.props.viewer.username}/${slatename}`;

    const slates = {
      columns: [
        { key: "name", name: "Data", type: "FILE_LINK", width: "328px" },
        { key: "url", name: "Data URL", width: "100%" },
        { key: "type", name: "Data type", type: "TEXT_TAG", width: "136px" },
      ],
      rows: data.objects,
    };

    const slateButtons = [
      {
        name: "View slate",
        type: "NEW_WINDOW",
        value: url,
      },
      {
        name: "Upload data",
        type: "SIDEBAR",
        value: "SIDEBAR_ADD_FILE_TO_BUCKET",
        data: this.props.current,
      },
    ];

    const slateURL = `https://slate.host/@${this.props.viewer.username}/${slatename}`;

    return (
      <ScenePage>
        <System.DescriptionGroup
          label="Will the Slate page look like this in the final product?"
          description="No! Consider this page just a functionality test. Slates will be collaborative mood boards and will have a much more intuitive experience than this."
        />
        <System.H1 style={{ marginTop: 48 }}>
          https://slate.host/@{this.props.viewer.username}/{slatename}
        </System.H1>
        <Section title="Slate elements" buttons={slateButtons} onAction={this.props.onAction}>
          <System.Table
            data={slates}
            name={slateURL}
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
          />
        </Section>

        <System.Input
          containerStyle={{ marginTop: 48 }}
          label="Slatename"
          description={
            <React.Fragment>
              Changing the slatename will change your public slate URL. Your slate URL is:{" "}
              <a href={slateURL} target="_blank">
                {slateURL}
              </a>
            </React.Fragment>
          }
          name="slatename"
          value={this.state.slatename}
          placeholder="Slatename"
          onChange={this._handleChange}
          onSubmit={this._handleSave}
        />

        <div css={STYLES_GROUP} style={{ marginTop: 48 }}>
          <div css={STYLES_LEFT}>
            <System.DescriptionGroup
              label="Change privacy"
              description="If enabled, your slate will be visible to anyone in the world. If disabled, your slate will only be visible to you on this screen."
            />
          </div>
          <div css={STYLES_RIGHT}>
            <System.Toggle name="public" onChange={this._handleChange} active={this.state.public} />
          </div>
        </div>

        <div style={{ marginTop: 32 }}>
          <System.ButtonPrimary onClick={this._handleSave} loading={this.state.loading}>
            Save changes
          </System.ButtonPrimary>
        </div>
      </ScenePage>
    );
  }
}
