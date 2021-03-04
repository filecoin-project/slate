import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

const STYLES_INPUT_CONTAINER = css`
  width: 100%;
  box-sizing: border-box;
  position: relative;
  /* max-width: 480px; */
  /* min-width: 188px; */
`;

const INPUT_STYLES = `
  box-sizing: border-box;
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

const STYLES_LIST = css`
  display: inline-flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
  width: 100%;

  li + li {
    margin-left: 5px;
  }
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

  span {
    line-height: 0;
    font-size: 0.875rem;
  }

  &:hover button {
    opacity: 0.5;
  }
`;

const STYLES_INPUT = css`
  ${INPUT_STYLES}
  /* 
  margin: 8px 0 0;
  padding: 0 16px;
  text-overflow: ellipsis;
  white-space: nowrap; */
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
  appearance: none;
  background: ${Constants.system.black};
  border: none;
  border-radius: 50%;
  color: ${Constants.system.white};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  line-height: 0;
  margin-left: 8px;
  padding: 0;
  transform: rotate(45deg);
  width: 12px;
  height: 12px;
  opacity: 0;
`;

export const Tag = (props) => {
  const [tags, setTags] = React.useState([]);

  const removeTag = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);

    setTags(newTags);
  };

  const handleInputKeyDown = (e) => {
    const value = e.target.value;
    if (e.key === "Enter" && value) {
      if (tags.find((tag) => tag.toLowerCase() === value.toLowerCase())) {
        return;
      }

      setTags((tags) => [...tags, value]);
      e.target.value = null;
    } else if (e.key === "Backspace" && !value) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div css={STYLES_INPUT_CONTAINER} style={{ ...props.style }}>
      <ul css={STYLES_LIST}>
        {tags.map((tag, i) => (
          <li key={tag} css={STYLES_TAG}>
            <span>{tag}</span>
            <button
              type="button"
              css={STYLES_REMOVE_BUTTON}
              onClick={() => {
                removeTag(i);
              }}
            >
              +
            </button>
          </li>
        ))}

        <input type="text" css={STYLES_INPUT} onKeyDown={handleInputKeyDown} />
      </ul>
    </div>
  );
};
