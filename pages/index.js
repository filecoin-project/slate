import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";
import WebsitePrototypeHeader from "~/components/core/WebsitePrototypeHeader";
import WebsitePrototypeFooter from "~/components/core/WebsitePrototypeFooter";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  text-align: center;
  font-size: 1rem;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 0.78rem;
  }
`;

const STYLES_MIDDLE = css`
  position: relative;
  min-height: 10%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 24px;
`;

const STYLES_CARD = css`
  margin: 0 auto 0 auto;
  max-width: 420px;
  width: 100%;
  background: ${Constants.system.pitchBlack};
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
`;

const STYLES_CARD_IMAGE = css`
  width: 100%;
  border-radius: 8px 8px 0 0;
`;

const STYLES_CARD_PARAGRAPH = css`
  padding: 48px;
  font-size: 1.2rem;
  color: ${Constants.system.white};

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 24px;
    font-size: 1rem;
  }
`;

const STYLES_CARD_ACTIONS = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${Constants.system.white};
  padding: 24px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 16px;
  }
`;

const STYLES_CARD_ACTIONS_LEFT = css`
  min-width: 10%;
  width: 100%;
  font-family: ${Constants.font.code};
  text-transform: uppercase;
  font-size: 12px;
  text-align: left;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 10px;
  }
`;

const STYLES_CARD_ACTIONS_RIGHT = css`
  padding: 0 0 0 24px;
  flex-shrink: 0;
`;

const STYLES_LINK = css`
  color: ${Constants.system.green};
  text-decoration: none;
  transition: 200ms ease color;

  :visited {
    color: ${Constants.system.green};
  }

  :hover {
    color: ${Constants.system.brand};
  }
`;

// TODO(jim): Refactor this health check later.
export const getServerSideProps = async (context) => {
  let buckets = false;
  try {
    const response = await fetch("https://slate.textile.io/health", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      buckets = true;
    }
  } catch (e) {
    console.log(e);
  }

  return {
    props: { ...context.query, buckets },
  };
};

export default class IndexPage extends React.Component {
  state = {
    available: this.props.buckets,
  };

  async componentDidMount() {
    const response = await Actions.health({});
    console.log("HEALTH_CHECK", response);

    if (response && response.data) {
      return this.setState({ available: this.props.buckets });
    }

    return this.setState({ available: false });
  }

  render() {
    const title = `Slate`;
    const description =
      "The place for all of your assets. Powered by Textile and Filecoin.";
    const url = "https://slate.host";

    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
      >
        <div css={STYLES_ROOT}>
          <WebsitePrototypeHeader />
          <div css={STYLES_MIDDLE}>
            <div css={STYLES_CARD}>
              <img
                css={STYLES_CARD_IMAGE}
                src="/static/social-github-dark.jpg"
              />
              <p css={STYLES_CARD_PARAGRAPH}>
                Store your files, turn them into collections, and share them
                with the world — with{" "}
                <a
                  css={STYLES_LINK}
                  href="https://github.com/filecoin-project/slate"
                  target="_blank"
                >
                  Filecoin & Slate
                </a>
                .
              </p>
              {this.state.available ? (
                <div css={STYLES_CARD_ACTIONS}>
                  <div css={STYLES_CARD_ACTIONS_LEFT}>
                    Try out our alpha testing application v
                    {Constants.values.version} for Filecoin
                  </div>
                  <div css={STYLES_CARD_ACTIONS_RIGHT}>
                    <System.ButtonPrimary onClick={() => window.open("/_")}>
                      Use Slate
                    </System.ButtonPrimary>
                  </div>
                </div>
              ) : (
                <div css={STYLES_CARD_ACTIONS}>
                  <div
                    css={STYLES_CARD_ACTIONS_LEFT}
                    style={{ textAlign: "center" }}
                  >
                    Slate is currently down for maintenance.
                  </div>
                </div>
              )}
            </div>
          </div>
          <WebsitePrototypeFooter />
        </div>
      </WebsitePrototypeWrapper>
    );
  }
}
