import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { useState } from "react";

const STYLES_VIEW_BUTTON = css`
  color: ${Constants.system.grayBlack};
  text-decoration: underline;
  cursor: pointer;
`;

export const ViewAllButton = (props) => {
  const [isTruncated, setTruncated] = useState(true);
  const text = props.fullText;
  const maxCharacter = props.maxCharacter;
  const displayText = isTruncated ? text.slice(0, maxCharacter) : text;
  const textCount = text.length;
  console.log(textCount);

  return (
    <div>
      {displayText}
      <br />
      {textCount > 100 ? (
        <span css={STYLES_VIEW_BUTTON} onClick={() => setTruncated(!isTruncated)}>
          {isTruncated ? "View All" : "View Less"}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default ViewAllButton;
