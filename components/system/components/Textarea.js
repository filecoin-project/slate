import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import TextareaAutoSize from "~/vendor/react-textarea-autosize";

const STYLES_TEXTAREA = (theme) => css`
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  -webkit-appearance: none;
  width: 100%;
  min-height: 160px;
  max-width: 480px;
  resize: none;
  background: ${Constants.system.white};
  color: ${Constants.system.black};
  border-radius: 12px;
  display: flex;
  font-size: ${theme.typescale.lvl1};
  align-items: center;
  justify-content: flex-start;
  border: 0;
  padding: 10px 12px;
  box-shadow: 0 0 0 1px ${Constants.semantic.borderGrayLight} inset;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${Constants.system.grayLight2};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${Constants.system.grayLight2};
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${Constants.system.grayLight2};
  }
`;

export class Textarea extends React.Component {
  render() {
    const { css, ...props } = this.props;
    return <TextareaAutoSize css={[STYLES_TEXTAREA, css]} {...props} />;
  }
}
