import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_CONTAINER = css`
  font-family: ${Constants.font.code};
  font-size: 12px;
  line-height: 1.25;
  width: 100%;
  display: flex;
  align-items: top;
  justify-content: top;
  padding: 48px 24px;
  background-color: ${Constants.system.black};

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
    justify-content: left;
    height: 100%;
  }
`;

const STYLES_LINK = css`
  color: ${Constants.system.gray};
  text-decoration: none;
  transition: 200ms ease color;

  :visited {
    color: ${Constants.system.green};
  }

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  font-size: 1rem;
  color: ${Constants.system.white};  
`;

const STYLES_SLATE = css`
  flex-shrink: 0;
  padding: 0px 0px 8px 0px;
  font-size: 1rem;
  color: ${Constants.system.white};  
`;

const STYLES_CREDIT = css`
  flex-shrink: 0;
  padding: 8px 0px 8px 0px;
  font-size: 12px;
  color: ${Constants.system.white};  
`;

const STYLES_RIGHT = css`
  min-width: 10%;
  width: 50%;
  display: flex;
  flex: 1 1 0px
  align-items: top;
  justify-content: flex-end;
  position: absolute;
  right: 24px;

  color: ${Constants.system.gray};

  @media (max-width: ${Constants.sizes.mobile}px) {
    position: absolute;
    Left: 24px;
    justify-content: flex-start;
    flex-direction: column;
    margin: 16px 0px 48px 0px;
  }
`;

export default (props) => {
  return (
    <div css={STYLES_CONTAINER} style={props.style}>
      <div css={STYLES_LEFT}>
        <div css={STYLES_SLATE}>
          Slate is the gateway to {" "} 
          <a css={STYLES_LINK} href="https://filecoin.io">Filecoin</a> –
          <br />
          A new network design we trust.  
        </div>
        <div css={STYLES_CREDIT}>
          Powered by{" "}
          <a css={STYLES_LINK} href="https://textile.io">
            Textile
          </a>{" "}
          and{" "}
          <a css={STYLES_LINK} href="https://filecoin.io">
            Filecoin
          </a>
          <br />
          MIT License
        </div>
      </div>
      <br />
      <br />
      <div css={STYLES_RIGHT}>
        <div style={{ flex:1 }}>
          <b>Reach out</b>
          <br />
          <br />
          <a css={STYLES_LINK} href="https://twitter.com/_slate">
            Twitter
          </a>
          <br />
          <a css={STYLES_LINK} href="https://filecoin.io/slack">
            Slack
          </a>
        </div>
        <br />
        <br />
        <div style={{ flex:1 }}>
          Resources
          <br />
          <br />
          <a css={STYLES_LINK} href="https://twitter.com/_slate">
            Github
          </a>
          <br />
          <a css={STYLES_LINK} href="https://github.com/filecoin-project/slate/issues">
            Community Guidelines
          </a>
          <br />
          <a css={STYLES_LINK} href="https://github.com/filecoin-project/slate/issues">
            Privacy
          </a>
        </div>
        <br />
        <br />
        <div style={{ flex:2 }}>
          Stay in the looop
          <br />
          <br />
          <a css={STYLES_LINK} href="https://twitter.com/_slate">
            Github
          </a>
          <br />
          <a css={STYLES_LINK} href="https://github.com/filecoin-project/slate/issues">
            Community Guidelines
          </a>
          <br />
          <a css={STYLES_LINK} href="https://github.com/filecoin-project/slate/issues">
            Privacy
          </a>
          <br />
        </div>
      </div>
    </div>
  );
};
