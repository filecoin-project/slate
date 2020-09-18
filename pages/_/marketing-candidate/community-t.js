import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/NewWebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/NewWebsitePrototypeFooter";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 1440px;
  margin: -88px 0 0 0;
  background-color: ${Constants.system.foreground};
`;

const STYLES_H1 = css`
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl5};
  letter-spacing: -0.022rem;
  line-height: 1.3;
  color: ${Constants.system.slate};
  margin-bottom: 1rem;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl4};
  }
`;

const STYLES_P = css`
  font-family: ${Constants.font.text};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;
  line-height: 1.3;
  color: ${Constants.system.slate};
  opacity: 0.7;
`;

const STYLES_SECTION_WRAPPER = css`
  width: 100%;
  padding: 88px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 24px;
  }
`;

const STYLES_DINNER_TABLE = css`
  width: 50%;
  padding: 48px 64px;
  background: ${Constants.system.wall};
  display: inline-block;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    padding: 24px 32px;
  }
`;

const STYLES_TABLE_ROW = css`
  width: 100%;
`;

const STYLES_FIGURES_GROUP = css`
  width: 50%;
  margin: 0 auto;

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
    margin: 10vh 0 0 0;
  }
`;

const STYLES_FIGURE = css`
  width: 50%;
`;

const STYLES_FIGURES_BOTTOM = css`
  width: 50%;
  margin: 0 auto;
  transform: rotate(180deg);

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }
`;

const STYLES_FIGURE_RIGHT = css`
  width: 25%;
  transform: rotate(90deg);

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_FIGURE_LEFT = css`
  width: 25%;
  transform: rotate(-90deg);

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_BUTTON = css`
  margin-top: 48px;
  min-height: 48px;
  box-sizing: border-box;
  border: 0;
  border-radius: 4px;
  padding: 0 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  background: ${Constants.system.slate};
  color: ${Constants.system.white};
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
  font-size: ${Constants.typescale.lvl1};
  letter-spacing: -0.011rem;

  box-shadow: 0px 10px 50px 20px rgba(0, 0, 0, 0.1);
  transition: 200ms ease all;
  cursor: pointer;

  :hover {
    background: ${Constants.system.white};
    color: ${Constants.system.slate};
  }
`;

export const getServerSideProps = async (context) => {
  return {
    props: { ...context.query },
  };
};

export default class CommunityPage extends React.Component {
  async componentDidMount() {
    const response = await Actions.health();
    console.log("HEALTH_CHECK", response);
  }

  render() {
    const title = `Slate`;
    const description =
      "Slate is designed and built by a growing community of hackers, artists, and creatives on the web.";
    const url = "https://slate.host/community";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <WebsitePrototypeHeader />
        <div css={STYLES_ROOT}>
          <section css={STYLES_SECTION_WRAPPER}>
            <div css={STYLES_FIGURES_GROUP}>
              <img
                css={STYLES_FIGURE}
                src="https://slate.textile.io/ipfs/bafybeiekksvkiaa2vwyzaitjb44adb5mfbqaqkagizwuw5odmgcwdmmiha"
              />
              <img
                css={STYLES_FIGURE}
                src="https://slate.textile.io/ipfs/bafybeiehufugq7vujsclzdpkdhff5kop6c4uw6emjuswwp3jhpznaou2se"
              />
            </div>
            <div css={STYLES_TABLE_ROW}>
              <img
                css={STYLES_FIGURE_LEFT}
                src="https://slate.textile.io/ipfs/bafybeiehufugq7vujsclzdpkdhff5kop6c4uw6emjuswwp3jhpznaou2se"
              />
              <div css={STYLES_DINNER_TABLE}>
                <h1 css={STYLES_H1}>An open invitation to everyone</h1>
                <p css={STYLES_P}>
                  Slate is designed and built by a growing community of hackers, artists, and creatives on the web.
                </p>
                <button css={STYLES_BUTTON}>Join our community </button>
              </div>
              <img
                css={STYLES_FIGURE_RIGHT}
                src="https://slate.textile.io/ipfs/bafybeiehufugq7vujsclzdpkdhff5kop6c4uw6emjuswwp3jhpznaou2se"
              />
            </div>
            <div css={STYLES_FIGURES_BOTTOM}>
              <img
                css={STYLES_FIGURE}
                src="https://slate.textile.io/ipfs/bafybeiekksvkiaa2vwyzaitjb44adb5mfbqaqkagizwuw5odmgcwdmmiha"
              />
              <img
                css={STYLES_FIGURE}
                src="https://slate.textile.io/ipfs/bafybeiehufugq7vujsclzdpkdhff5kop6c4uw6emjuswwp3jhpznaou2se"
              />
            </div>
          </section>
        </div>
        <WebsitePrototypeFooter />
      </WebsitePrototypeWrapper>
    );
  }
}
