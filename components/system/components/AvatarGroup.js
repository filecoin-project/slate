import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_UL = css`
  list-style-type: none;

  :hover li:nth-child(n + 2) {
    margin-left: 0px;
  }
`;

const STYLES_LI = css`
  border-radius: 50%;
  border: 2px solid white;
  display: inline-block;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2);
  transition: 0.5s ease;
  background-size: cover;
  background-color: #FFF;

  :nth-child { background-size: cover }
  :nth-child(n+2) { margin-left: -20px; }
  }
`;

const STYLES_REMAINING = css`
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  padding-left: 8px;
`;

export const AvatarGroup = ({ limit = 3, avatars = [], size = 32, border = "#FFF" }) => {
  const containerWidth = size * avatars.length;
  const padding = size / 2 - 8;
  const remaining = avatars.length - limit;

  return (
    <ul
      css={STYLES_UL}
      style={{
        width: `${containerWidth}px`,
        height: `${size}px`,
      }}
    >
      {avatars.slice(0, limit).map((src, i) => {
        return (
          <li
            key={`${src}-${i}`}
            css={STYLES_LI}
            style={{
              backgroundImage: `url('${src}')`,
              width: `${size}px`,
              height: `${size}px`,
              borderColor: `${border}`,
            }}
          />
        );
      })}
      <span
        css={STYLES_REMAINING}
        style={{
          paddingTop: `${padding}px`,
        }}
      >
        +{remaining}
      </span>
    </ul>
  );
};
