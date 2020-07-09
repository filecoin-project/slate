import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_CODE_BLOCK = css`
  background-color: ${Constants.system.pitchBlack};
  color: ${Constants.system.white};
  font-size: 16px;
  border-color: ${Constants.system.yellow};
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
  border-radius: 7px;
  padding: 10px;
`;

const STYLES_PADDING = css`
  display:flex;
  border-radius: 7px;
  align-items: flex-start;
  justify-content: space-between;
  white-space: pre-wrap;
`;

const STYLES_PRE = css`
  color: ${Constants.system.darkGray};
  font-family: ${Constants.font.monoCode};
  min-width: 30px;
  padding: 3px ;
  flex: 0 ;
`;

const STYLES_CODE = css`
  background-color: ${Constants.system.pitchBlack};
  font-family: ${Constants.font.monoCode};

  color: ${Constants.system.gray};
  text-align: left;
  padding: 3px;
  flex: 10 ;
`;

export class CodeBlock extends React.Component {

  render() {
    const codeBlockContent = this.props.children + ''; 
    var  codeBlockToken = codeBlockContent.split("\n"); 
    const textMap = codeBlockToken;

    return (
      <>
      <div css={STYLES_CODE_BLOCK}>
        {textMap.map((element, index) => {
          return (
            <div css={STYLES_PADDING}>
              <div css={STYLES_PRE}>{index}.</div>
              <div css={STYLES_CODE}>{element}</div>
          </div>
          );
        })}
      </div>
      </>
    );
  }
}


