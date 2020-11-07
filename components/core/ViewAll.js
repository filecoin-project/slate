import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/core";
import { useState } from "react";

const STYLES_VIEW_BUTTON = css`
  font-family: ${Constants.font.medium};
  font-weight: 400;
  font-size: 14px;
  margin-top: 4px;
  color: ${Constants.system.grayBlack};
  cursor: pointer;
  width: 120px;
`;

export const ViewAllButton = (props) => {
  const [isTruncated, setTruncated] = useState(true);
  const text = props.fullText;
  const maxCharacter = props.maxCharacter;
  const displayText = isTruncated ? text.slice(0, maxCharacter) : text;
  const textCount = text.length;
  const noButton = props.noButton;

  return (
    <div>
      {displayText}
      {textCount > maxCharacter ? (
        <span>
          <span>{isTruncated ? "..." : ""}</span>
          {noButton ? null : (
            <div css={STYLES_VIEW_BUTTON} onClick={() => setTruncated(!isTruncated)}>
              {isTruncated ? "+ View all" : "- View less"}
            </div>
          )}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default ViewAllButton;
