import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { ButtonPrimary } from "~/components/system/components/Buttons";

import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";

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

const STYLES_BLOCK = css`
  border: 1px solid ${Constants.system.border};
  border-radius: 16px;
  padding: 24px;
  font-size: 12px;
  text-align: left;
  margin: 24px auto;
  width: 95%;
  max-width: 850px;
  cursor: pointer;
`;

const STYLES_IMAGE_ROW = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const STYLES_SLATE_NAME = css`
  font-size: ${Constants.typescale.lvl1};
`;

const STYLES_ITEM_BOX = css`
  width: 160px;
  height: 160px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
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

function SlateBlock(props) {
  let data = props.slate.data;
  let objects =
    data.objects.length > 5 ? data.objects.slice(0, 5) : data.objects;
  return (
    <div css={STYLES_BLOCK}>
      <div css={STYLES_SLATE_NAME}>{data.name}</div>
      <div css={STYLES_IMAGE_ROW}>
        {objects.map((each) => (
          <div css={STYLES_ITEM_BOX}>
            <SlateMediaObjectPreview type={each.type} url={each.url} />
          </div>
        ))}
        {/* <Slate
          itemStyle={{
            height: "160px",
            width: "160px",
            padding: "16px",
          }}
          onSelect={(i) => {}}
          items={
            !data.objects || !data.objects.length
              ? []
              : data.objects.length > 5
              ? data.objects.slice(0, 5)
              : data.objects
          }
        /> */}
      </div>
    </div>
  );
}

export default class Profile extends React.Component {
  render() {
    let data = this.props.creator ? this.props.creator : this.props.data;
    return (
      <div css={STYLES_PROFILE}>
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
                    <SlateBlock slate={slate} />
                  </div>
                );
              }
              return (
                <a key={url} href={url} css={STYLES_LINK}>
                  <SlateBlock slate={slate} />
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}
