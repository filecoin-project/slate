import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_SECTION = css`
  flex-shrink: 0;
  width: 100%;
  min-width: 960px;
  box-shadow: 0 0 0 1px ${Constants.system.gray}, 0 1px 4px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  font-weight: 400;
  margin-top: 24px;

  :first-child {
    margin-top: 0px;
  }
`;

const STYLES_HEADER = css`
  background: ${Constants.system.foreground};
  border-bottom: 1px solid ${Constants.system.border};
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvl1};
  border-radius: 4px 4px 0 0;
  padding: 24px 24px 24px 20px;
  overflow: hidden;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const STYLES_LEFT = css`
  min-width: 5%;
  width: 100%;
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
`;

const STYLES_CHILDREN = css`
  background: ${Constants.system.white};
  border-radius: 0 0 4px 4px;
  width: 100%;
`;

const STYLES_BUTTON = css`
  border-radius: 4px;
  outline: 0;
  border: 0;
  min-height: 32px;
  padding: 6px 16px 6px 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  letter-spacing: 0.2px;
  font-family: ${Constants.font.semiBold};
  transition: 200ms ease all;
  box-shadow: 0 0 0 1px ${Constants.system.border},
    0 1px 4px rgba(0, 0, 0, 0.07);
  cursor: pointer;
  background-color: ${Constants.system.white};
  color: ${Constants.system.black};
  margin-left: 16px;

  :hover {
    background-color: #f2f4f8;
  }

  :focus {
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3) inset;
    outline: 0;
    border: 0;
  }
`;

export const Section = (props) => {
  return (
    <div css={STYLES_SECTION} style={props.style}>
      <header css={STYLES_HEADER}>
        <div css={STYLES_LEFT}>{props.title}</div>
        {props.buttons ? (
          <div css={STYLES_RIGHT}>
            {props.buttons.map((b) => {
              return (
                <span
                  key={b.name}
                  css={STYLES_BUTTON}
                  onClick={() => props.onAction(b)}
                >
                  {b.name}
                </span>
              );
            })}
          </div>
        ) : null}
      </header>
      <div css={STYLES_CHILDREN}>{props.children}</div>
    </div>
  );
};

export default Section;
