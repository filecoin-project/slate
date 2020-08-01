import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";

const STYLES_ROOT = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  text-align: center;
`;
// TODO(jim): Brand system colors.
const STYLES_GLITCH = css`
  font-size: 120px;
  position: relative;

  ::before,
  ::after {
    content: "404";
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    position: absolute;
    background-color: #f7f7f7;
    color: #000;
  }

  ::before {
    text-shadow: 2px 0 #00ffea;
    animation: slate-animation-glitch 3s infinite linear;
  }

  ::after {
    text-shadow: -2px 0 #fe3a7f;
    animation: slate-animation-glitch 2s infinite linear;
  }

  @keyframes slate-animation-glitch {
    0% {
      clip: rect(64px, 9999px, 66px, 0);
    }
    5% {
      clip: rect(30px, 9999px, 36px, 0);
    }
    10% {
      clip: rect(80px, 9999px, 71px, 0);
    }
    15% {
      clip: rect(65px, 9999px, 64px, 0);
    }
    20% {
      clip: rect(88px, 9999px, 40px, 0);
    }
    25% {
      clip: rect(17px, 9999px, 79px, 0);
    }
    30% {
      clip: rect(24px, 9999px, 26px, 0);
    }
    35% {
      clip: rect(88px, 9999px, 26px, 0);
    }
    40% {
      clip: rect(88px, 9999px, 80px, 0);
    }
    45% {
      clip: rect(28px, 9999px, 51px, 0);
    }
    50% {
      clip: rect(23px, 9999px, 40px, 0);
    }
    55% {
      clip: rect(16px, 9999px, 86px, 0);
    }
    60% {
      clip: rect(23px, 9999px, 94px, 0);
    }
    65% {
      clip: rect(82px, 9999px, 39px, 0);
    }
    70% {
      clip: rect(37px, 9999px, 92px, 0);
    }
    75% {
      clip: rect(71px, 9999px, 52px, 0);
    }
    80% {
      clip: rect(28px, 9999px, 74px, 0);
    }
    85% {
      clip: rect(67px, 9999px, 96px, 0);
    }
    90% {
      clip: rect(40px, 9999px, 88px, 0);
    }
    95% {
      clip: rect(99px, 9999px, 61px, 0);
    }
    100% {
      clip: rect(76px, 9999px, 77px, 0);
    }
  }
`;

const STYLES_TOP = css`
  height: 88px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px 16px 24px;
`;

const STYLES_BOTTOM = css`
  height: 88px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 24px 24px 24px;
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

const STYLES_LINK = css`
  font-family: ${Constants.font.semiBold};
  color: ${Constants.system.pitchBlack};
  text-decoration: none;
  transition: 200ms ease color;

  :visited {
    color: ${Constants.system.black};
  }

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export default class NotFoundPage extends React.Component {
  render() {
    const title = `404`;
    const description = "Oops something broke";
    const url = "https://slate.host/404";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <div css={STYLES_ROOT}>
          <div css={STYLES_TOP}>
            <div css={STYLES_LEFT}>
              <a css={STYLES_LINK} href="/" style={{ marginRight: 16 }}>
                Slate {Constants.values.version}
              </a>
              <a css={STYLES_LINK} href="/system">
                Design System
              </a>
            </div>
            <div css={STYLES_RIGHT}>
              <a css={STYLES_LINK} href="https://github.com/filecoin-project/slate">
                View Source
              </a>
            </div>
          </div>

          <div css={STYLES_MIDDLE}>
            <h1 css={STYLES_GLITCH}>404</h1>
            <h2>The page you are looking for does not exist.</h2>
          </div>

          <div css={STYLES_BOTTOM}>
            <p css={STYLES_LEFT}>
              Powered by{" "}
              <a css={STYLES_LINK} href="https://textile.io">
                Textile
              </a>{" "}
              and{" "}
              <a css={STYLES_LINK} href="https://filecoin.io">
                Filecoin
              </a>
            </p>
            <div css={STYLES_RIGHT}>
              <a css={STYLES_LINK} href="https://filecoin.io/slack" style={{ marginRight: 16 }}>
                Slack
              </a>
              <a css={STYLES_LINK} href="https://github.com/filecoin-project/slate/issues">
                Work on Slate!
              </a>
            </div>
          </div>
        </div>
      </WebsitePrototypeWrapper>
    );
  }
}
