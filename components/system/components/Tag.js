import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";

const STYLES_INPUT_CONTAINER = css`
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-wrap: wrap;
`;

const INPUT_STYLES = `
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  -webkit-appearance: none;
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

const STYLES_LIST = css`
  display: inline-flex;
  flex-wrap: wrap;
  margin: 0;
  border-radius: 4px;
`;

const STYLES_TAG = css`
  list-style-type: none;
  border-radius: 4px;
  background: ${Constants.system.bgGray};
  color: ${Constants.system.newBlack};
  font-family: ${Constants.font.text};
  padding: 2px 8px;
  margin: 8px 8px 0 0;

  span {
    line-height: 1.5;
    font-size: 14px;
  }

  &:hover {
    background: ${Constants.system.gray30};
  }
`;

const STYLES_INPUT = css`
  ${INPUT_STYLES};

  width: 100%;
  padding: 8px 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  box-shadow: 0 0 0 1px ${Constants.system.gray30} inset;

  :focus {
    outline: 0;
    border: 0;
  }

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${Constants.system.darkGray};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${Constants.system.darkGray};
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${Constants.system.darkGray};
  }
`;

const STYLES_REMOVE_BUTTON = css`
  cursor: pointer;
  margin-left: 8px;
  opacity: 0;
`;

export const Tag = (props) => {
  let inputEl = React.useRef();

  const removeTag = (i) => {
    const newTags = [...props.value];
    newTags.splice(i, 1);

    if (props.onChange) {
      props.onChange({ target: { name: "tags", value: newTags } });
    }
  };

  const handleInputKeyDown = (e) => {
    const value = e.target.value;
    const tags = props.value || [];

    if (e.key === "Enter" && value) {
      if (tags.find((tag) => tag.toLowerCase() === value.toLowerCase())) {
        return;
      }

      if (props.onChange) {
        props.onChange({ target: { name: "tags", value: [...tags, value] } });
      }

      e.target.value = null;
    } else if (e.key === "Backspace" && !value) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div css={STYLES_INPUT_CONTAINER} style={{ ...props.style }}>
      <input
        ref={inputEl}
        type="text"
        css={STYLES_INPUT}
        onKeyDown={handleInputKeyDown}
        placeholder={props.placeholder}
      />
      <ul css={STYLES_LIST}>
        {props.value &&
          props.value.map((tag, i) => (
            <li key={tag} css={STYLES_TAG}>
              <span>{tag}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};
