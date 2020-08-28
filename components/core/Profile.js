import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import SlatePreviewBlock from "~/components/core/SlatePreviewBlock";

const STYLES_PROFILE = css`
  text-align: center;
  width: 100%;
  margin-top: 16px;
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

export default class Profile extends React.Component {
  render() {
    let data = this.props.creator ? this.props.creator : this.props.data; //do we need this?
    return (
      <div css={STYLES_PROFILE}>
        <img css={STYLES_PROFILE_IMAGE} src={data.data.photo} />
        <div css={STYLES_NAME}>{data.username}</div>
        {/* TODO: replace with real name when added */}
        {this.props.buttons}
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
                        data: { owner: data, ...slate },
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
