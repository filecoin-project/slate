import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";

const STYLES_TAG_CONTAINER = css`
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-wrap: wrap;
`;

const STYLES_INPUT_CONTAINER = css`
  width: 100%;
  position: relative;
`;

const STYLES_DROPDOWN = css`
  display: flex;
  flex-direction: column;
  margin: 0;
  position: absolute;
  top: 33px;
  left: 0;
  width: 100%;
  z-index: 30;
  box-shadow: 0px 12px 24px rgba(178, 178, 178, 0.3);
`;

const STYLES_DROPDOWN_ITEM = css`
  list-style-type: none;
  padding: 8px 12px;
  background: ${Constants.system.white};
  border: 0.5px solid ${Constants.system.gray20};
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background: ${Constants.system.gray10};

    span,
    div:not(.dismiss) {
      color: ${Constants.system.newBlack};
    }

    div.dismiss {
      opacity: 1;
    }
  }

  span {
    font-size: 14px;
    line-height: 1.5;
    color: ${Constants.system.textGray};
    font-family: ${Constants.font.text};
    margin: 0 0 0 8px;
  }

  div.dismiss {
    opacity: 0;

    &:hover {
      color: ${Constants.system.newBlack};
    }
  }
`;

const STYLES_DROPDOWN_ITEM_ICON = css`
  line-height: 0;
  color: ${Constants.system.gray70};
`;

const STYLES_DROPDOWN_ADD_ITEM = css`
  list-style-type: none;
  padding: 8px 12px;
  background: ${Constants.system.white};
  border: 0.5px solid ${Constants.system.gray20};
  cursor: pointer;
  display: flex;
  align-items: center;

  span {
    font-size: 14px;
    line-height: 1.5;
    color: ${Constants.system.newBlack};
    font-family: ${Constants.font.text};
  }

  span.value {
    background: ${Constants.system.bgGray};
  }

  &:hover {
    background: ${Constants.system.gray10};

    span.value {
      background: ${Constants.system.gray30};
    }
  }
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
    box-shadow: 0 0 0 1px ${Constants.system.bgBlue} inset;
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

const STYLES_REMOVE_BUTTON = css`
  cursor: pointer;
  margin-left: 8px;
  opacity: 0;
`;

export const Tag = (props) => {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const inputEl = React.useRef();
  const dropdownEl = React.useRef();

  const removeTag = (i) => {
    const newTags = [...props.value];
    newTags.splice(i, 1);

    if (props.onChange) {
      props.onChange({ target: { name: "tags", value: newTags } });
    }
  };

  const _handleAdd = () => {
    const tags = props.value || [];

    if (value && tags.find((tag) => tag.toLowerCase() === value.toLowerCase())) {
      return;
    }

    if (props.onChange) {
      props.onChange({ target: { name: "tags", value: [...tags, value] } });

      setValue("");
      setOpen(false);
    }
  };

  const _handleChange = (e) => {
    const value = e.target.value;

    setValue(value);
  };

  const _handleFocus = () => setOpen(true);

  const _handleClickOutside = (e) => {
    if (dropdownEl.current.contains(e.target)) {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", _handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", _handleClickOutside);
    };
  }, []);

  return (
    <div css={STYLES_TAG_CONTAINER} style={{ ...props.style }}>
      <div css={STYLES_INPUT_CONTAINER} ref={dropdownEl}>
        <input
          ref={inputEl}
          type="text"
          css={STYLES_INPUT}
          placeholder={props.placeholder}
          value={value}
          onChange={_handleChange}
          onFocus={_handleFocus}
        />
        <div>
          <ul css={STYLES_DROPDOWN} style={{ display: open ? "block" : "none" }}>
            {(props.value || []).map((tag, index) => (
              <li key={tag} css={STYLES_DROPDOWN_ITEM}>
                <div css={STYLES_DROPDOWN_ITEM_ICON}>
                  <SVG.Check height="16px" />
                </div>
                <span>{tag}</span>
                <div
                  css={STYLES_DROPDOWN_ITEM_ICON}
                  style={{ marginLeft: "auto" }}
                  className="dismiss"
                  onClick={() => removeTag(index)}
                >
                  <SVG.Dismiss height="16px" />
                </div>
              </li>
            ))}
            <li css={STYLES_DROPDOWN_ADD_ITEM} onClick={_handleAdd}>
              <SVG.Plus height="16px" />
              <span style={{ margin: "0 8px" }}>create new tag</span>
              {value && (
                <span css={STYLES_TAG} className="value" style={{ margin: 0 }}>
                  {value}
                </span>
              )}
            </li>
          </ul>
        </div>
      </div>

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
