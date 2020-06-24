import * as React from 'react';
import * as Constants from '~/common/constants';

import { css } from '@emotion/react';

const STYLES_CODE_BLOCK = css`
  background-color: ${Constants.system.pitchBlack};
  color: ${Constants.system.white};
  border-radius: 4px;
  padding: 24px 24px 24px 24px;
  word-wrap: break-word;
  white-space: pre-wrap;
  width: 100%;
`;

export const CodeBlock = (props) => {
  return (
    <div css={STYLES_CODE_BLOCK}>
      <code {...props} />
    </div>
  );
};
