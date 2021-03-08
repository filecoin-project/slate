import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import ProcessedText from "~/components/core/ProcessedText";

const STYLES_ROOT = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    flex-wrap: wrap;
  }
`;

const STYLES_LEFT = css`
  min-width: 10%;
  width: 100%;

  @media (min-width: ${Constants.sizes.mobile}px) {
    padding-right: 24px;
  }
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
  justify-self: end;
`;

const STYLES_HEADER = css`
  box-sizing: border-box;
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvl4};
  padding: 0;
  margin-bottom: 8px;
  display: block;
  width: 100%;
  max-width: 800px;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-size: ${Constants.typescale.lvl3};
  }
`;

const STYLES_ACCESS = css`
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  font-size: ${Constants.typescale.lvl1};
  color: ${Constants.system.black};
  margin: 12px 0;
  line-height: 1.5;
  display: block;
  width: 100%;
  max-width: 800px;
`;

const STYLES_DESCRIPTION = css`
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  font-size: ${Constants.typescale.lvl1};
  color: ${Constants.system.darkGray};
  margin-bottom: 12px;
  line-height: 1.5;
  display: block;
  width: 100%;
  max-width: 800px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  ul,
  ol {
    white-space: normal;
  }
`;

const STYLES_TAGS_WRAPPER = css`
  box-sizing: border-box;
  display: block;
  width: 100%;
  max-width: 800px;
`;

const STYLES_LIST = css`
  display: inline-flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  width: 100%;
`;

const STYLES_TAG = css`
  list-style-type: none;
  border-radius: 4px;
  background: ${Constants.system.white};
  color: ${Constants.system.black};
  display: flex;
  align-items: center;
  font-family: ${Constants.font.text};
  padding: 10px;
  box-shadow: 0 0 0 1px ${Constants.system.gray30} inset;
  margin: 8px 8px 0 0;

  span {
    line-height: 1;
    font-size: 0.875rem;
  }
`;

export const ScenePageHeader = (props) => {
  return (
    <header css={STYLES_ROOT} style={props.style}>
      <div css={STYLES_LEFT}>
        <div css={STYLES_HEADER}>{props.title}</div>
        <div css={STYLES_DESCRIPTION}>
          <ProcessedText text={props.children} />
        </div>
        {props.tags && (
          <div css={STYLES_TAGS_WRAPPER}>
            <ul css={STYLES_LIST}>
              {props.tags.map((tag, i) => (
                <li key={tag} css={STYLES_TAG}>
                  <span>{tag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {props.actions ? <div css={STYLES_RIGHT}>{props.actions}</div> : null}
    </header>
  );
};

export default ScenePageHeader;
