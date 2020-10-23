import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { useState } from "react";

const STYLES_VIEW_BUTTON = css`
  color: ${Constants.system.grayBlack};
  text-decoration: underline;
  cursor: pointer;
`;

export const ViewAll = (props) => {
  const [isTruncated, setTruncated] = useState(true);
  const text = props.children;
  const maxCharacter = props.maxCharacter;
  const displayText = isTruncated ? text.slice(0, maxCharacter) : text;

  return (
    <React.Fragment>
      <div>
        {displayText}
        <span>{isTruncated ? "... " : ""}</span>
        <span css={STYLES_VIEW_BUTTON} onClick={() => setTruncated(!isTruncated)}>
          {isTruncated ? "View All" : "View Less"}
        </span>
      </div>
    </React.Fragment>
  );
};

export default ViewAll;
