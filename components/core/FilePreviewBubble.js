import * as React from "react";
import * as Constants from "~/common/constants";
import * as Validations from "~/common/validations";
import * as Strings from "~/common/strings";

import { css, keyframes } from "@emotion/react";
import { useState } from "react";

const fadeIn = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

const STYLES_FILE_PREVIEW_BUBBLE = css`
  z-index: ${Constants.zindex.tooltip};
  border-radius: 4px;
  background-color: ${Constants.system.black};
  animation: ${fadeIn} 200ms ease-out 1;
  width: 200px;
  position: absolute;
  border: 1px solid black;
  overflow: hidden;
`;

const STYLES_FILE_PREVIEW = css`
  display: block;
  width: 100%;
  height: 100%;
`;

const STYLES_BUBBLE_ANCHOR = css`
  display: inline-flex;
  align-item: center;
  justify-content: center;
  cursor: pointer;
`;

//Jim: the parent of this element needs to be position: relative or this bubble will fly off its position
export const FilePreviewBubble = (props) => {
  const [onHover, setHover] = useState(false);
  const showPreview = props.type && Validations.isPreviewableImage(props.type) && onHover;

  return (
    <React.Fragment>
      <div
        css={STYLES_BUBBLE_ANCHOR}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {props.children}
      </div>
      {showPreview && (
        <div css={STYLES_FILE_PREVIEW_BUBBLE}>
          <img css={STYLES_FILE_PREVIEW} src={Strings.getCIDGatewayURL(props.url)} />
        </div>
      )}
    </React.Fragment>
  );
};

export default FilePreviewBubble;
