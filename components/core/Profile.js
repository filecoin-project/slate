import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { ButtonPrimary } from "~/components/system/components/Buttons";

import SlatePreviewBlock from "~/components/core/SlatePreviewBlock";

const STYLES_PROFILE = css`
  text-align: center;
  width: 100%;
`;

const STYLES_PROFILE_IMAGE = css`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin: 0;
  padding: 0;
`;

const STYLES_NAME = css`
  font-size: ${Constants.typescale.lvl3};
  margin: 16px 0px;
`;

const STYLES_LINK = css`
  color: ${Constants.system.black};
  text-decoration: none;
`;

const BUTTON_STYLE = {
  backgroundColor: "transparent",
  color: Constants.system.brand,
  border: `1px solid ${Constants.system.border}`,
  boxShadow: "none",
  fontFamily: Constants.font.text,
  margin: "8px",
  padding: "8px 16px",
  minHeight: "30px",
};

export default class Profile extends React.Component {
  render() {
    let data = this.props.creator ? this.props.creator : this.props.data;
    return (
      <div css={STYLES_PROFILE}>
        <br />
        <img css={STYLES_PROFILE_IMAGE} src={data.data.photo} />
        <div css={STYLES_NAME}>{data.username}</div>
        {/* TODO: replace with real name when added */}
        {this.props.editing ? null : (
          <div>
            <ButtonPrimary style={BUTTON_STYLE} onClick={this._handleFollow}>
              {this.props.follow ? "Unfollow" : "Follow"}
            </ButtonPrimary>
            <ButtonPrimary style={BUTTON_STYLE} onClick={this._handleTrust}>
              {this.props.trust ? "Remove Peer" : "Add Peer"}
            </ButtonPrimary>
            <ButtonPrimary style={BUTTON_STYLE} onClick={this._handleSendMoney}>
              Send Money
            </ButtonPrimary>
          </div>
        )}
        <br />
        {data.slates && data.slates.length ? (
          <div style={{ width: "100%" }}>
            {data.slates.map((slate) => {
              const url = `/${data.username}/${slate.slatename}`;
              if (this.props.onAction) {
                return (
                  <div
                    key={url}
                    onClick={() =>
                      this.props.onAction({
                        type: "NAVIGATE",
                        value: this.props.sceneId,
                        scene: "SLATE",
                        data: slate,
                      })
                    }
                  >
                    <SlatePreviewBlock slate={slate} />
                  </div>
                );
              }
              return (
                <a key={url} href={url} css={STYLES_LINK}>
                  <SlatePreviewBlock slate={slate} />
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}
