import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import TextareaAutoSize from "~/vendor/react-textarea-autosize";

const STYLES_TEXTAREA = css`
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  -webkit-appearance: none;
  width: 100%;
  min-height: 160px;
  max-width: 480px;
  resize: none;
  background: ${Constants.system.white};
  color: ${Constants.system.black};
  border-radius: 4px;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: flex-start;
  outline: 0;
  border: 0;
  transition: 200ms ease all;
  padding: 16px 24px 16px 24px;
  box-shadow: 0 0 0 1px ${Constants.system.border} inset;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${Constants.system.darkGray};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${Constants.system.darkGray};
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${Constants.system.darkGray};
  }
`;

export class Textarea extends React.Component {
  render() {
    return (
      <TextareaAutoSize
        css={STYLES_TEXTAREA}
        style={this.props.style}
        onChange={this.props.onChange}
        placeholder={this.props.placeholder}
        name={this.props.name}
        value={this.props.value}
        readOnly={this.props.readOnly}
      />
    );
  }
}
