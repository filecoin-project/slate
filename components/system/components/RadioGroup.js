import * as React from 'react';
import * as Constants from '~/common/constants';

import { css } from '@emotion/react';

const STYLES_RADIO = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  position: relative;
  margin-bottom: 16px;
`;

const STYLES_RADIO_INPUT = css`
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  height: 1px;
  width: 1px;
  position: absolute;
  top: 0;
  left: 0;
`;

const STYLES_RADIO_GROUP = css`
  display: block;
  width: 100%;
`;

const STYLES_RADIO_CUSTOM = css`
  box-shadow: 0 0 0 1px ${Constants.system.darkGray};
  background-color: ${Constants.system.white};
  cursor: pointer;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  margin-right: 16px;
  flex-shrink: 0;
`;

const STYLES_RADIO_CUSTOM_SELECTED = css`
  background-color: ${Constants.system.brand};
  height: 24px;
  width: 24px;
  border-radius: 24px;
  pointer-events: none;
  opacity: 0;
  transition: 200ms ease opacity;
  z-index: 1;
`;

const STYLES_RADIO_LABEL = css`
  font-size: 14px;
  cursor: pointer;
  min-width: 10%;
  width: 100%;
  line-height: 1.5;
  padding-top: 4px;
  overflow-wrap: break-word;

  strong {
    font-family: 'inter-semi-bold';
    font-weight: 400;
  }
`;

export class RadioGroup extends React.Component {
  _handleChange = (value) => {
    this.props.onChange({
      target: { name: this.props.name, value },
    });
  };

  render() {
    return (
      <form css={STYLES_RADIO_GROUP}>
        {this.props.options.map((radio) => {
          const checked = this.props.selected === radio.value;

          return (
            <label css={STYLES_RADIO} key={`radio-${radio.value}`}>
              <span css={STYLES_RADIO_CUSTOM}>
                <span css={STYLES_RADIO_CUSTOM_SELECTED} style={{ opacity: checked ? 1 : 0 }} />
              </span>
              <input
                css={STYLES_RADIO_INPUT}
                type="radio"
                value={radio.value}
                checked={checked}
                onChange={() => this._handleChange(radio.value)}
              />{' '}
              <span css={STYLES_RADIO_LABEL}>{radio.label}</span>
            </label>
          );
        })}
      </form>
    );
  }
}
