import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import WebsitePrototypeWrapper from "~/components/core/WebsitePrototypeWrapper";

const STYLES_ROOT = css`
  padding: 0px 88px ;
  @media (max-width: 768px) {
    padding: 0px 24px ;
}
`;

const STYLES_404 = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 60vh;
`;

const STYLES_NAV = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 88px 0px;
  font-family: ${Constants.font.text};
`;

const STYLES_NAVLINKS = css`
  display: flex;
  a{
    margin-left: 20px;
    text-decoration none;
  }
  `;

const STYLES_GLITCH = css`
  font-size: 120px;
  ::before,
  ::after {
    right: 0;
    margin: auto;
    content: "404";
    position: absolute;
    overflow: hidden;
    background-color: #f7f7f7;
    color: #000;
  }
  ::before {
    left: 8px;
    text-shadow: 2px 0 #00ffea;
    animation: glitch 3s infinite linear;
  }
  ::after {
    left: 8px;
    text-shadow: -2px 0 #fe3a7f;
    animation: glitch 2s infinite linear;
  }
  @keyframes glitch {
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

const STYLES_FOOTER = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 88px 0px;
  font-family: ${Constants.font.text};
`;

const STYLES_FOOTERLINKS = css`
  display: flex;
  a {
    margin-left: 20px;
    text-decoration: none;
  }
`;

export default class NotFoundPage extends React.Component {
  render() {
    const title = `404`;
    const description = "Oops something broke";
    const url = "https://slate.host/404";

    return (
      <WebsitePrototypeWrapper
        title={title}
        description={description}
        url={url}
      >
        <div css={STYLES_ROOT}>
          <div css={STYLES_NAV}>
            <a href="/">Slate {Constants.values.version}</a>
            <div css={STYLES_NAVLINKS}>
              <a href="/system">Design System</a>
              <a href="https://github.com/filecoin-project/slate">View Source</a>
            </div>
          </div>
          <div css={STYLES_404}>
            <h1 css={STYLES_GLITCH}>404</h1>
            <h2>Page not found</h2>
          </div>
          <div css={STYLES_FOOTER} >
          <p>Powered by <a href="https://textile.io">Textile</a> and <a href="https://filecoin.io">Filecoin</a></p>
          <div css={STYLES_FOOTERLINKS} >
                <a href="https://filecoin.io/slack">Slack</a>
                <a href="https://github.com/filecoin-project/slate/issues">Contact</a>
          </div>
      </div>
        </div>
      </WebsitePrototypeWrapper>
    );
  }
}
