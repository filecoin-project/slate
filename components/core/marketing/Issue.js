import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

const STYLES_ISSUE_CARD = css`
  width: 33.33%;
  height: calc(100vh / 4);
  margin: -1px 0 0 -1px;
  transition: 200ms ease box-shadow;
  border: 1px solid ${Constants.system.darkGray};
  :hover {
    transition: 200ms ease box-shadow;
    box-shadow: 0px 10px 40px 20px rgba(0, 0, 0, 0.1);
  }
`;

const STYLES_ISSUE_CARD_TEXT = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: left;
  width: 100%;
  height: 100%;
  padding: 12px;
`;

const STYLES_ISSUE_CARD_TITLE = css`
  padding: 12px;
  font-size: ${Constants.typescale.lvl1};
  text-align: left;
  width: 100%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 0px;
    font-size: 1rem;
  }
`;

const STYLES_ISSUE_CARD_EXPLAINER = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 12px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 0px;
  }
`;

const STYLES_ISSUE_CARD_PARAGRAPH = css`
  font-size: ${Constants.typescale.lvl0};
  text-align: left;
  text-decoration: none;
  color: ${Constants.system.pitchBlack};
  transition: 200ms ease all;
  :hover,
  :active {
    color: ${Constants.system.pitchBlack};
    background-color: transparent;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 0.78rem;
  }
`;

export default class Issue extends React.Component {
  render() {
    return (
      <div css={STYLES_ISSUE_CARD}>
        <a
          css={STYLES_ISSUE_CARD_PARAGRAPH}
          href={this.props.url}
          target="_blank"
        >
          <div css={STYLES_ISSUE_CARD_TEXT}>
            <div css={STYLES_ISSUE_CARD_TITLE}>{this.props / title}</div>
            <div css={STYLES_ISSUE_CARD_EXPLAINER}>
              <div>View Issue</div>
              <div>-&gt;</div>
            </div>
          </div>
        </a>
      </div>
    );
  }
}
