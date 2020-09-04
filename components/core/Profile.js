import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { ProcessedText } from "~/components/system/components/Typography";

import SlatePreviewBlock from "~/components/core/SlatePreviewBlock";

const STYLES_PROFILE = css`
  text-align: center;
  width: 100%;
  margin-top: 16px;
`;

const STYLES_PROFILE_IMAGE = css`
  background-size: cover;
  background-position: 50% 50%;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin: 0 auto;
  padding: 0;
`;

const STYLES_NAME = css`
  font-size: ${Constants.typescale.lvl3};
  font-family: ${Constants.font.medium};
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  padding: 0 24px 0 24px;
`;

const STYLES_DESCRIPTION = css`
  font-size: ${Constants.typescale.lvl1};
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  padding: 0 24px 0 24px;
`;

const STYLES_LINK = css`
  color: ${Constants.system.black};
  text-decoration: none;
`;

export default class Profile extends React.Component {
  render() {
    let data = this.props.creator ? this.props.creator : this.props.data;
    return (
      <div css={STYLES_PROFILE}>
        <div
          css={STYLES_PROFILE_IMAGE}
          style={{ backgroundImage: `url('${data.data.photo}')` }}
        />
        <br />
        <div css={STYLES_NAME}>{data.data.name || data.username}</div>
        <br />
        {data.data.body ? (
          <React.Fragment>
            <div css={STYLES_DESCRIPTION}>
              <ProcessedText text={data.data.body} />
            </div>
            <br />
          </React.Fragment>
        ) : null}
        <br />
        {this.props.buttons}
        <br />
        {data.slates && data.slates.length ? (
          <div>
            {data.slates.map((slate) => {
              if (this.props.onAction) {
                return (
                  <div
                    key={url}
                    onClick={() =>
                      this.props.onAction({
                        type: "NAVIGATE",
                        value: this.props.sceneId,
                        scene: "PUBLIC_SLATE",
                        data: slate,
                      })
                    }
                  >
                    <SlatePreviewBlock
                      key={url}
                      slate={slate}
                      editing={this.props.editing}
                    />
                  </div>
                );
              }
              const url = `/${data.username}/${slate.slatename}`;
              return (
                <a key={url} href={url} css={STYLES_LINK}>
                  <SlatePreviewBlock external slate={slate} />
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
    );
  }
}
