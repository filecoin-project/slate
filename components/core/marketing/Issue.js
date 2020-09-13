import React, { Component } from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import Label from "~/components/core/marketing/Label";

const STYLES_SLATE_CARD_GROUP = css`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 48px;
`;
const STYLES_SLATE_CARD = css`
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
const STYLES_SLATE_CARD_CTA = css`
  width: 100%;
  height: calc(100vh / 2);
  margin-left: -1px;
  box-shadow: 0px 4px 80px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  transition: 200ms ease all;
  :hover {
    box-shadow: 0px 4px 120px 4px rgba(0, 0, 0, 0.1);
    transform: scale(1.01);
  }
`;
const STYLES_SLATE_CARD_TEXT = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: left;
  width: 100%;
  height: 100%;
  padding: 12px;
`;
const STYLES_SLATE_CARD_TITLE = css`
  padding: 12px;
  font-size: ${Constants.typescale.lvl1};
  text-align: left;
  width: 100%;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 0px;
    font-size: 1rem;
  }
`;
const STYLES_SLATE_CARD_CTA_TITLE = css`
  font-size: ${Constants.typescale.lvl5};
  text-align: left;
  line-height: 1.25;
  padding: 12px;
  overflow-wrap: break-word;
  width: 100%;
  color: ${Constants.system.darkGray};
  @media (max-width: ${Constants.sizes.tablet}px) {
    font-size: ${Constants.typescale.lvl4};
  }
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl3};
    padding: 0px 0px 8px 0px;
  }
`;
const STYLES_SLATE_CARD_EXPLAINER = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 12px;
  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 0px;
  }
`;
const STYLES_SLATE_CARD_PARAGRAPH = css`
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
const STYLES_SLATE_CARD_CTA_PARAGRAPH = css`
  font-size: ${Constants.typescale.lvl2};
  text-align: left;
  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: 1rem;
  }
`;
export default class Issue extends Component {
  render() {
    const { title, id, labels, userName, url } = this.props;
    return (
      <div css={STYLES_SLATE_CARD}>
        <a css={STYLES_SLATE_CARD_PARAGRAPH} href={url} target="_blank">
          <div css={STYLES_SLATE_CARD_TEXT}>
            <div css={STYLES_SLATE_CARD_TITLE}>{title}</div>
            <Label key={id} labels={labels} />
            <div css={STYLES_SLATE_CARD_EXPLAINER}>
              <div>View Issue</div>
              <div>-&gt;</div>
            </div>
          </div>
        </a>
      </div>
    );
  }
}
