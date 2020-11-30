import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import ScenePage from "~/components/core/ScenePage";
import DataView from "~/components/core/DataView";
import ScenePageHeader from "~/components/core/ScenePageHeader";

const STYLES_VIDEO_BIG = css`
  display: block;
  background-color: ${Constants.system.moonstone};
  padding: 0;
  outline: 0;
  margin: 48px auto 88px auto;
  border-radius: 4px;
  width: 100%;
  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: ${Constants.sizes.tablet}px) {
    margin: 32px auto 64px auto;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 24px auto 48px auto;
  }
`;

export default class SceneHome extends React.Component {
  _handleCreateSlate = () => {
    this.props.onAction({
      type: "NAVIGATE",
      value: "V1_NAVIGATION_SLATES",
      data: null,
    });
  };

  render() {
    let hasChildren = false;
    if (this.props.viewer && this.props.viewer.library[0].children.length) {
      hasChildren = true;
    }

    return (
      <ScenePage>
        <ScenePageHeader title="Home">
          {hasChildren
            ? "Welcome back! Here is your data."
            : "Welcome to Slate! You can share files with anyone in the world. Here is how it works:"}
        </ScenePageHeader>

        {hasChildren ? (
          <div style={{ marginTop: "48px" }}>
            <DataView
              viewer={this.props.viewer}
              items={this.props.viewer.library[0].children}
              onAction={this.props.onAction}
            />
          </div>
        ) : (
          <React.Fragment>
            <video
              css={STYLES_VIDEO_BIG}
              autoPlay
              loop
              muted
              src="https://slate.textile.io/ipfs/bafybeienjmql6lbtsaz3ycon3ttliohcl7qbquwvny43lhcodky54z65cy"
              type="video/m4v"
              playsInline
              style={{
                backgroundImage: `url('https://slate.textile.io/ipfs/bafybeienjmql6lbtsaz3ycon3ttliohcl7qbquwvny43lhcodky54z65cy')`,
                borderRadius: `4px`,
                width: `100%`,
                boxShadow: `0px 10px 50px 20px rgba(0, 0, 0, 0.1)`,
                backgroundSize: `cover`,
              }}
            />
            <System.P>When you're ready, create a slate!</System.P>
            <br />
            <System.ButtonPrimary onClick={this._handleCreateSlate}>
              Create a slate
            </System.ButtonPrimary>
          </React.Fragment>
        )}
      </ScenePage>
    );
  }
}
