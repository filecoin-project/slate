import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_H1 = css`
  box-sizing: border-box;
  font-size: ${Constants.typescale.lvl4};
  line-height: 1.1;
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
  color: inherit;
  text-decoration: none;
  display: block;

  :hover {
    color: inherit;
  }

  :visited {
    color: inherit;
  }

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }
`;

export const H1 = (props) => {
  if (props.href) {
    return <a css={STYLES_H1} {...props} />;
  }

  return <h1 css={STYLES_H1} {...props} />;
};

const STYLES_H2 = css`
  box-sizing: border-box;
  font-size: ${Constants.typescale.lvl3};
  line-height: 1.1;
  font-family: ${Constants.font.medium};
  font-weight: 400;

  color: inherit;
  text-decoration: none;
  display: block;

  :hover {
    color: inherit;
  }

  :visited {
    color: inherit;
  }

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }
`;

export const H2 = (props) => {
  if (props.href) {
    return <a css={STYLES_H2} {...props} />;
  }

  return <h2 css={STYLES_H2} {...props} />;
};

const STYLES_H3 = css`
  box-sizing: border-box;
  font-size: ${Constants.typescale.lvl2};
  line-height: 1.1;
  font-family: ${Constants.font.medium};
  font-weight: 400;
  color: inherit;
  text-decoration: none;
  display: block;

  :hover {
    color: inherit;
  }

  :visited {
    color: inherit;
  }

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }
`;

export const H3 = (props) => {
  if (props.href) {
    return <a css={STYLES_H3} {...props} />;
  }

  return <h3 css={STYLES_H3} {...props} />;
};

const STYLES_H4= css`
  box-sizing: border-box;
  font-size: ${Constants.typescale.lvl1};
  line-height: 1.1;
  font-family: ${Constants.font.medium};
  font-weight: 400;
  color: inherit;
  text-decoration: none;
  display: block;

  :hover {
    color: inherit;
  }

  :visited {
    color: inherit;
  }

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }
`;

export const H4 = (props) => {
  if (props.href) {
    return <a css={STYLES_H4} {...props} />;
  }

  return <h4 css={STYLES_H4} {...props} />;
};

const STYLES_P = css`
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  font-size: ${Constants.typescale.lvl1};
  line-height: 1.5;

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }

  a {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }
`;

export const P = (props) => {
  return <div css={STYLES_P} {...props} />;
};

const STYLES_UL = css`
  box-sizing: border-box;
  padding-left: 24px;
`;

export const UL = (props) => {
  return <ul css={STYLES_UL} {...props} />;
};

const STYLES_OL = css`
  box-sizing: border-box;
  padding-left: 24px;
`;

export const OL = (props) => {
  return <ol css={STYLES_OL} {...props} />;
};

const STYLES_LI = css`
  box-sizing: border-box;
  margin-top: 12px;

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }

  a {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }
`;

export const LI = (props) => {
  return <li css={STYLES_LI} {...props} />;
};
