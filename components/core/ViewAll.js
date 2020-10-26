import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { useState } from "react";

const STYLES_VIEW_BUTTON = css`
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: 14px;
  margin-top: 4px;
  color: ${Constants.system.grayBlack};
  text-decoration: underline;
  cursor: pointer;
  width: 64px;
`;

export const ViewAllButton = (props) => {
  const [isTruncated, setTruncated] = useState(true);
  const text = props.fullText;
  const maxCharacter = props.maxCharacter;
  const displayText = isTruncated ? text.slice(0, maxCharacter) : text;
  const textCount = text.length;

  return (
    <div>
      {displayText}
      {textCount > maxCharacter ? (
        <span>
          <span>{isTruncated ? "..." : ""}</span>
          <div css={STYLES_VIEW_BUTTON} onClick={() => setTruncated(!isTruncated)}>
            {isTruncated ? "view all" : "view less"}
          </div>
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default ViewAllButton;
