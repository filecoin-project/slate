import * as React from 'react';
import * as Constants from '~/common/constants';

import { css } from '@emotion/react';

const STYLES_H1 = css`
  font-size: ${Constants.typescale.lvl4};
  line-height: 1.1;
  font-family: 'inter-semi-bold';
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
    font-family: 'inter-semi-bold';
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
  font-size: ${Constants.typescale.lvl3};
  line-height: 1.1;
  font-family: 'inter-medium';
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
    font-family: 'inter-semi-bold';
    font-weight: 400;
  }
`;

export const H2 = (props) => {
  if (props.href) {
    return <a css={STYLES_H2} {...props} />;
  }

  return <h2 css={STYLES_H2} {...props} />;
};

const STYLES_P = css`
  font-size: ${Constants.typescale.lvl1};
  line-height: 1.5;

  strong {
    font-family: 'inter-semi-bold';
    font-weight: 400;
  }
`;

export const P = (props) => {
  return <p css={STYLES_P} {...props} />;
};
