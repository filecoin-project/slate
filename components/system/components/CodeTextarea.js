import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import TextareaAutoSize from "~/vendor/react-textarea-autosize";

const STYLES_CODE_TEXTAREA = css`
  font-family: ${Constants.font.mono};
  display: block;
  max-width: 480px;
  border-radius: 4px;
  width: 100%;
  background: ${Constants.system.pitchBlack};
  min-height: 288px;
  padding: 24px;
  color: ${Constants.system.white};
  resize: none;
  font-size: 14px;
  box-sizing: border-box;
  outline: 0;
  border: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  scrollbar-width: none;
  white-space: pre-wrap;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export class CodeTextarea extends React.Component {
  render() {
    return (
      <TextareaAutoSize
        value={this.props.value}
        name={this.props.name}
        onChange={this.props.onChange}
        css={STYLES_CODE_TEXTAREA}
      />
    );
  }
}
