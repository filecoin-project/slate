import * as React from "react";
import * as Styles from "~/common/styles";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";

const STYLES_BUTTON = (theme) => css`
  display: flex;
  background-color: ${theme.semantic.bgBlurWhite};
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 0 0 1px ${theme.system.grayLight5}, ${theme.shadow.lightLarge};
  transition: box-shadow 0.3s;
  :hover {
    box-shadow: 0 0 0 1px ${theme.system.blue}, ${theme.shadow.lightLarge};
  }

  svg {
    transition: fill 0.1s;
  }
  :hover svg {
    fill: ${theme.system.pink};
  }

  path {
    transition: stroke 0.3s;
  }
  :hover path {
    stroke: ${theme.system.blue};
  }
`;

export default function SlatesButton({ onClick, ...props }) {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClick) onClick();
  };

  return (
    <button css={[Styles.BUTTON_RESET, STYLES_BUTTON]} onClick={handleClick} {...props}>
      <SVG.Hash width={16} />
    </button>
  );
}
