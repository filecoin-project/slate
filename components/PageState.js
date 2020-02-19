import * as React from 'react';
import * as Constants from '~/common/constants';

import { css } from 'react-emotion';

const STYLES_PAGE_STATE = css`
  font-family: 'mono';
  width: 100%;
  background: ${Constants.colors.black};
  color: ${Constants.colors.white};
  font-size: 10px;
`;

const STYLES_SECTION = css`
  width: 100%;
  white-space: pre-wrap;
`;

const STYLES_TITLE_SECTION = css`
  padding: 8px 24px 8px 24px;
`;

export default props => {
  return (
    <div className={STYLES_PAGE_STATE}>
      <div className={STYLES_TITLE_SECTION}>{props.children}</div>
    </div>
  );
};
