import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import Prism from "prismjs";

const STYLES_CODE_BLOCK = css`
  box-sizing: border-box;
  font-family: ${Constants.font.code};
  background-color: ${Constants.system.pitchBlack};
  color: ${Constants.system.white};
  border-color: ${Constants.system.yellow};
  font-size: 12px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 24px;
`;

const STYLES_PADDING = css`
  box-sizing: border-box;
  display: flex;
  border-radius: 7px;
  align-items: flex-start;
  justify-content: space-between;
  white-space: pre-wrap;
`;

const STYLES_PRE = css`
  box-sizing: border-box;
  color: #666;
  font-family: ${Constants.font.code};
  flex-shrink: 0;
  min-width: 32px;
  user-select: none;
`;

const STYLES_CODE = css`
  box-sizing: border-box;
  background-color: ${Constants.system.pitchBlack};
  font-family: ${Constants.font.code};
  color: ${Constants.system.gray};
  width: 100%;
  padding-left: 16px;
`;

export class CodeBlock extends React.Component {

  componentDidMount() {
    Prism.highlightAll();
  }
  
  render() {
    const codeBlockContent = this.props.children + "";
    const codeBlockToken = codeBlockContent.split("\n");
    const textMap = codeBlockToken;

    return (
      <div css={STYLES_CODE_BLOCK}>
        {textMap.map((element, index) => {
          return (
            <div css={STYLES_PADDING}>
              <div css={STYLES_PRE}>{index}</div>
              <pre css={STYLES_CODE} className="language-javascript">
                <code>{element}</code>
              </pre>
            </div>
          );
        })}
      </div>
    );
  }
}
