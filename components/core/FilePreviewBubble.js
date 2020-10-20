import * as React from "react";
import * as Constants from "~/common/constants";

import { css, keyframes } from "@emotion/react";
import { useState } from "react";
import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";
import SlateMediaObject from "~/components/core/SlateMediaObject";

const fadein = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

const STYLES_FILE_PREVIEW_BUBBLE = css`
  z-index: ${Constants.zindex.tooltip};
  padding: 8px;
  border-radius: 4px;
  background-color: ${Constants.system.black};
  animation: ${fadein} 200ms ease-out 1;
  width: 200px;
  position: absolute;
`;

const STYLES_FILE_PREVIEW = css`
  width: 100%;
  height: 100%;
`;

const STYLES_BUBBLE_ANCHOR = css`
  box-sizing: border-box;
  display: inline-flex;
  align-item: center;
  justify-content: center;
  cursor: pointer;
`;

export const FilePreviewBubble = (props) => {
  const [onHover, setHover] = useState(false);
  const type = props.type && props.type.startsWith("image/") && onHover;
  console.log(type);

  return (
    <React.Fragment>
      <div
        css={STYLES_BUBBLE_ANCHOR}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {props.children}
      </div>
      {type && (
        <div css={STYLES_FILE_PREVIEW_BUBBLE}>
          <img css={STYLES_FILE_PREVIEW} src={`${Constants.gateways.ipfs}/${props.url}`} />
        </div>
      )}
    </React.Fragment>
  );
};

export default FilePreviewBubble;
