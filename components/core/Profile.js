import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";

import ProcessedText from "~/components/core/ProcessedText";
import SlatePreviewBlocks from "~/components/core/SlatePreviewBlock";
import CTATransition from "~/components/core/CTATransition";
import { SceneUtils } from "three";

const STYLES_PROFILE_BACKGROUND = css`
  background-color: ${Constants.system.white};
  width: 100%;
  padding: 104px 56px 24px 56px;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 80px 24px 16px 24px;
  }
`;

const STYLES_PROFILE_INTERNAL = css`
  width: 100%;
  padding: 64px 56px 0px 56px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 80px 24px 16px 24px;
  }
`;

const STYLES_PROFILE = css`
  width: 100%;
  padding: 32px 32px 0px 32px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  flex-shrink: 0;
  display: block;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 80px 24px 16px 24px;
  }
`;

const STYLES_PROFILE_INFO = css`
  line-height: 1.3;
  width: 50%;
  max-width: 800px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  margin: 0 auto;
  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 100%;
    max-width: 100%;
  }
`;

const STYLES_INFO = css`
  display: block;
  width: 100%;
  text-align: center;
  margin-bottom: 48px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const STYLES_PROFILE_IMAGE = css`
  background-color: ${Constants.system.white};
  background-size: cover;
  background-position: 50% 50%;
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 4px;
  margin: 0 auto;
  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 64px;
    height: 64px;
  }
`;

const STYLES_NAME = css`
  font-size: ${Constants.typescale.lvl4};
  font-family: ${Constants.font.semiBold};
  max-width: 100%;
  font-weight: 400;
  margin: 16px auto;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  color: ${Constants.system.black};
  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-bottom: 8px;
  }
`;

const STYLES_DESCRIPTION = css`
  font-size: ${Constants.typescale.lvl0};
  color: ${Constants.system.darkGray};
  max-width: 100%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-top: 24px;
  }
`;

const STYLES_STATS = css`
  font-size: ${Constants.typescale.lvl0};
  margin: 16px auto;
  display: flex;
  justify-content: center;
  color: ${Constants.system.grayBlack};
`;

const STYLES_STAT = css`
  margin-right: 8px;
  width: 112px;
  flex-shrink: 0;
`;

const STYLES_EXPLORE = css`
  margin: 160px auto 64px auto;
  height: 1px;
  width: 80px;
  background-color: ${Constants.system.gray};
`;

const STYLES_BUTTON = css`
  margin-bottom: 32px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin-bottom: 16px;
  }
`;

export default class Profile extends React.Component {
  state = {
    exploreSlates: [],
  };

  render() {
    const external = !this.props.onAction;
    let data = this.props.creator ? this.props.creator : this.props.data;
    let exploreSlates = this.props.exploreSlates;

    let total = 0;
    for (let slate of data.slates) {
      total += slate.data.objects.length;
    }
    return (
      <div>
        <div css={STYLES_PROFILE_BACKGROUND}>
          <div css={STYLES_PROFILE_INFO}>
            <div
              css={STYLES_PROFILE_IMAGE}
              style={{ backgroundImage: `url('${data.data.photo}')` }}
            />
            <div css={STYLES_INFO}>
              <div css={STYLES_NAME}>{Strings.getPresentationName(data)}</div>
              <div css={STYLES_BUTTON}>{this.props.buttons}</div>
              {data.data.body ? (
                <div css={STYLES_DESCRIPTION}>
                  <ProcessedText text={data.data.body} />
                </div>
              ) : null}
              <div css={STYLES_STATS}>
                <div css={STYLES_STAT}>
                  <div style={{ fontFamily: `${Constants.font.text}` }}>
                    {total}{" "}
                    <span style={{ color: `${Constants.system.darkGray}` }}>Public data</span>
                  </div>
                </div>
                <div css={STYLES_STAT}>
                  <div style={{ fontFamily: `${Constants.font.text}` }}>
                    {data.slates.length}{" "}
                    <span style={{ color: `${Constants.system.darkGray}` }}>Public slates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.visible && (
          <div>
            <CTATransition
              onClose={() => this.setState({ visible: false })}
              viewer={this.props.viewer}
              open={this.state.visible}
              redirectURL={`/_?scene=NAV_PROFILE&user=${data.username}`}
            />
          </div>
        )}

        {this.props.onAction ? (
          <div css={STYLES_PROFILE_INTERNAL}>
            {data.slates && data.slates.length ? (
              <SlatePreviewBlocks
                isOwner={this.props.isOwner}
                external={this.props.onAction ? false : true}
                slates={data.slates}
                username={data.username}
                onAction={this.props.onAction}
              />
            ) : null}
          </div>
        ) : (
          <div css={STYLES_PROFILE}>
            {data.slates && data.slates.length ? (
              <SlatePreviewBlocks
                isOwner={this.props.isOwner}
                external={this.props.onAction ? false : true}
                slates={data.slates}
                username={data.username}
                onAction={this.props.onAction}
              />
            ) : (
              <div>
                {" "}
                <p style={{ marginTop: 40, color: `${Constants.system.darkGray}` }}>
                  No publicly shared slates from @{data.username}.
                </p>
                <div css={STYLES_EXPLORE} />
                <SlatePreviewBlocks
                  slates={exploreSlates}
                  external={this.props.onAction ? false : true}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
