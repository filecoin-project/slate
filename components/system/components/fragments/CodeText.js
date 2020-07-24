import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";

const STYLES_NOWRAP = {
  wordWrap: "nowrap",
  whiteSpace: "nowrap",
  display: "inline-block",
};

const STYLES_WRAP = {
  wordWrap: "break-word",
  whiteSpace: "pre-wrap",
  display: "inline",
};

const STYLES_CODE = css`
  box-sizing: border-box;
  font-family: ${Constants.font.mono};
  font-size: 0.9em;
  background-color: ${Constants.system.white};
  border-radius: 4px;
  padding: 0.1em 0.2em;
  border: 1px solid ${Constants.system.border};
`;

const STYLES_CODE_COPYABLE = css`
  ${STYLES_CODE}
  cursor: copy;
  transition: 100ms ease in;

  :hover {
    box-shadow: 0 1px 4px 0px ${Constants.system.border};
  }

  :active {
    padding: 0.3em;
    margin: -0.1em;
  }
`;

const STYLES_HIDDEN = css`
  box-sizing: border-box;
  opacity: 0;
  position: absolute;
`;

export class CodeText extends React.Component {
  state = { copy: false };
  _text;

  _handleCopy = (e) => {
    if (this.props.copyable) {
      this.setState({ copy: true }, () => {
        this._text.select();
        document.execCommand("copy");
        this.setState({ copy: false });
      });
    }
  };

  render() {
    return (
      <span
        css={this.props.copyable ? STYLES_CODE_COPYABLE : STYLES_CODE}
        style={
          this.props.nowrap
            ? { ...STYLES_NOWRAP, ...this.props.style }
            : { ...STYLES_WRAP, ...this.props.style }
        }
        onClick={this._handleCopy}
      >
        {this.state.copy ? (
          <input
            ref={(c) => {
              this._text = c;
            }}
            css={STYLES_HIDDEN}
            value={this.props.children}
          />
        ) : null}
        {this.props.children ? this.props.children : null}
      </span>
    );
  }
}
