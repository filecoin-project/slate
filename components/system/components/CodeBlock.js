import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLE_CODE_BLOCK = css`
  background-color: ${Constants.system.pitchBlack};
  color: ${Constants.system.white}:
  font-size: 16px;
  border-color: ${Constants.system.yellow};
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
  border-radius: 7px;
  padding: 10px 10px;
`;

const STYLE_PADDING = css`
  display:flex;
  border-radius: 7px;
  align-items: flex-start;
  justify-content: space-between;
`;
const STYLE_PRE = css`
  color: ${Constants.system.darkGray};
  font-family: ${Constants.font.monoCode};
  min-width:25px;
  padding: 3px 3px ;
  flex: 0 ;
`;

const STYLE_CODE = css`
  background-color: ${Constants.system.pitchBlack};
  font-family: ${Constants.font.monoCode};

  color: ${Constants.system.gray};
  text-align: left;
  padding: 3px 3px;
  flex: 10 ;
`;


export class CodeBlock extends React.Component {

  render() {
    console.log(this.props.children);
    const codeBlockContent = this.props.children; 
    var  codeBlockToken = codeBlockContent.split("\n", 3); 
    const textMap = codeBlockToken;

    return (
      <>
      <div css={STYLE_CODE_BLOCK}>
        {textMap.map((element, index) => {
          return (
            <div css={STYLE_PADDING}>
              <div css={STYLE_PRE}>{index}.</div>
              <div css={STYLE_CODE}>{element}</div>
          </div>
          );
        })}
      </div>
      </>
    );
  }
}


