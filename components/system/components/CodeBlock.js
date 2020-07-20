import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

// TODO:
// Refactor to https://github.com/FormidableLabs/prism-react-renderer
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

  * {
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
`;

const STYLES_LINE = css`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
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

// TODO:
// Refactor to https://github.com/FormidableLabs/prism-react-renderer
export class CodeBlock extends React.Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    const codeBlockContent = this.props.children + "";
    const codeBlockToken = codeBlockContent.split("\n");
    const textMap = codeBlockToken;

    return (
      <div css={STYLES_CODE_BLOCK} className="language-javascript">
        {textMap.map((element, index) => {
          return (
            <div css={STYLES_LINE} key={`${element}-${index}`}>
              <div css={STYLES_PRE}>{index}</div>
              <pre css={STYLES_CODE}>
                <code>{element}</code>
              </pre>
            </div>
          );
        })}
      </div>
    );
  }
}
