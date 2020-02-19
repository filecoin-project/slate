import * as React from 'react';
import * as Constants from '~/common/constants';

import { css } from 'react-emotion';

const MAX_WIDTH = 768;

const STYLES_HEADING = css`
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 3.052rem;
  position: relative;
  max-width: ${MAX_WIDTH}px;
  width: 100%;
  padding: 0 24px 0 24px;
  margin: 0 auto 0 auto;
`;

export const H1 = props => {
  return <h1 {...props} className={STYLES_HEADING} />;
};

const STYLES_HEADING_TWO = css`
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 1.728rem;
  position: relative;
  max-width: ${MAX_WIDTH}px;
  width: 100%;
  padding: 0 24px 0 24px;
  margin: 0 auto 0 auto;
`;

export const H2 = props => {
  return <h2 {...props} className={STYLES_HEADING_TWO} />;
};

const STYLES_PARAGRAPH = css`
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 1.44rem;
  line-height: 1.5;
  position: relative;
  max-width: ${MAX_WIDTH}px;
  width: 100%;
  padding: 0 24px 0 24px;
  margin: 0 auto 0 auto;
`;

export const P = props => {
  return <p {...props} className={STYLES_PARAGRAPH} />;
};

const STYLES_BODY_TEXT = css`
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  position: relative;
`;

export const BODY = props => {
  return <div {...props} className={STYLES_BODY_TEXT} />;
};
