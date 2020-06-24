import * as React from 'react';
import * as Constants from '~/common/constants';

import { css } from '@emotion/react';

const STYLES_TAB_GROUP = css`
  width: 100%;
  display: flex;
  align-items: flex-start;
`;

const STYLES_TAB_GROUP_TAB = css`
  background: ${Constants.system.gray};
  color: ${Constants.system.black};
  border-bottom: 1px solid ${Constants.system.white};
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-family: 'inter-semi-bold';
  transition: 200ms ease all;
  user-select: none;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const TAB_GROUP_SIZE_MAP = {
  1: '100%',
  2: '50%',
  3: '33.33%',
  4: '25%',
};

export class TabGroup extends React.Component {
  _handleChange = (value) => {
    this.props.onChange({
      target: { name: this.props.name, value },
    });
  };

  render() {
    return (
      <div css={STYLES_TAB_GROUP}>
        {this.props.options.map((tab) => {
          const selected = tab.value === this.props.value;

          return (
            <div
              css={STYLES_TAB_GROUP_TAB}
              key={tab.value}
              style={{
                backgroundColor: selected ? Constants.system.white : null,
                width: TAB_GROUP_SIZE_MAP[this.props.options.length],
                cursor: !selected ? 'pointer' : null,
                borderBottom: !selected ? `1px solid #D7D7D7` : null,
              }}
              onClick={() => this._handleChange(tab.value)}>
              {tab.label}
            </div>
          );
        })}
      </div>
    );
  }
}
