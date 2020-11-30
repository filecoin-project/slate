import * as React from "react";

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
`;

// TODO(jim): Brand system colors.
const STYLES_GLITCH = css`
  font-size: 64px;
  position: relative;

  ::before,
  ::after {
    content: "Sorry!";
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
    animation: slate-client-animation-glitch 3s infinite linear;
  }

  ::after {
    text-shadow: -2px 0 #fe3a7f;
    animation: slate-client-animation-glitch 2s infinite linear;
  }

  @keyframes slate-client-animation-glitch {
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

export default class SlateMaintenancePage extends React.Component {
  render() {
    const title = `Maintenance`;
    const description = "Slate is down.";
    const url = "https://slate.host/maintenance";

    return (
      <WebsitePrototypeWrapper title={title} description={description} url={url}>
        <div css={STYLES_ROOT}>
          <WebsitePrototypeHeader />

          <div css={STYLES_MIDDLE}>
            <h1 css={STYLES_GLITCH}>Sorry</h1>
            <h2>Slate is performing infrastructure updates, check back later!</h2>
          </div>

          <WebsitePrototypeFooter />
        </div>
      </WebsitePrototypeWrapper>
    );
  }
}
