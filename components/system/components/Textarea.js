import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import TextareaAutoSize from "~/vendor/react-textarea-autosize";

const STYLES_TEXTAREA = css`
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
  box-sizing: border-box;
  transition: 200ms ease all;
  padding: 16px 24px 16px 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15),
    inset 0 0 0 1px ${Constants.system.darkGray};
`;

export class Textarea extends React.Component {
  render() {
    return (
      <TextareaAutoSize
        css={STYLES_TEXTAREA}
        onChange={this.props.onChange}
        name={this.props.name}
        value={this.props.value}
      />
    );
  }
}
