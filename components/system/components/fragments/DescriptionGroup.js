import * as React from 'react';
import * as Constants from '~/common/constants';
import * as Strings from '~/common/strings';

import { css } from '@emotion/react';

import { TooltipAnchor } from '~/components/system/components/fragments/TooltipAnchor';

const STYLES_DESCRIPTION_GROUP_LABEL = css`
  font-family: 'inter-semi-bold';
  font-size: 14px;
  padding: 0 0 0 0;
  margin-bottom: 8px;
`;

const STYLES_DESCRIPTION_GROUP_DESCRIPTION = css`
  font-size: 14px;
  margin-bottom: 12px;
  line-height: 1.3;
`;

export const DescriptionGroup = (props) => {
  return (
    <div style={props.style}>
      {!Strings.isEmpty(props.label) ? (
        <div css={STYLES_DESCRIPTION_GROUP_LABEL}>
          {props.label}{' '}
          {props.tooltip ? <TooltipAnchor tooltip={props.tooltip} height="14px" style={{ paddingTop: 16 }} /> : null}
        </div>
      ) : null}
      {!Strings.isEmpty(props.description) ? (
        <div css={STYLES_DESCRIPTION_GROUP_DESCRIPTION}>{props.description}</div>
      ) : null}
    </div>
  );
};
