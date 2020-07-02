import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { css } from "@emotion/react";

import { DescriptionGroup } from "~/components/system/components/fragments/DescriptionGroup";

const INPUT_STYLES = `
  font-family: ${Constants.font.text};
  -webkit-appearance: none;
  width: 100%;
  height: 40px;
  background: ${Constants.system.white};
  color: ${Constants.system.black};
  border-radius: 4px;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: flex-start;
  outline: 0;
  border: 0;
  box-sizing: border-box;
  transition: 200ms ease all;
`;

const STYLES_SELECT_MENU = css`
  display: inline-flex;
  position: relative;
  height: 40px;
  max-width: 320px;
  width: 100%;
`;

const STYLES_SELECT_MENU_FULL = css`
  display: inline-flex;
  position: relative;
  height: 40px;
  width: 100%;
`;

const STYLES_SELECT_MENU_ANCHOR = css`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  width: 100%;
  height: 40px;
`;

const STYLES_SELECT_MENU_LABEL = css`
  ${INPUT_STYLES}
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15),
    inset 0 0 0 1px ${Constants.system.darkGray};
  padding: 0 48px 0 24px;
`;

const STYLES_SELECT_MENU_CATEGORY = css`
  color: ${Constants.system.darkGray};
  margin-left: 4px;
`;

const STYLES_SELECT_MENU_CHEVRON = css`
  position: absolute;
  right: 12px;
  margin-top: 1px;
`;

export const SelectMenu = (props) => {
  return (
    <React.Fragment>
      <DescriptionGroup
        label={props.label}
        description={props.description}
        tooltip={props.tooltip}
        style={props.containerStyle}
      />

      <div css={props.className ? props.className : STYLES_SELECT_MENU}>
        <label css={STYLES_SELECT_MENU_LABEL} htmlFor={`id-${props.name}`}>
          {props.children}{" "}
          {props.category ? (
            <span css={STYLES_SELECT_MENU_CATEGORY}>{props.category}</span>
          ) : null}
          <SVG.ChevronDown height="16px" css={STYLES_SELECT_MENU_CHEVRON} />
        </label>
        <select
          css={STYLES_SELECT_MENU_ANCHOR}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          id={`id-${props.name}`}
        >
          {props.options.map((each) => {
            return (
              <option value={each.value} key={each.value}>
                {each.name}
              </option>
            );
          })}
        </select>
      </div>
    </React.Fragment>
  );
};

export const SelectMenuFull = (props) => (
  <SelectMenu {...props} css={STYLES_SELECT_MENU_FULL} />
);
