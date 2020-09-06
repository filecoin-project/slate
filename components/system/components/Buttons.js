import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import { LoaderSpinner } from "~/components/system/components/Loaders";

const STYLES_BUTTON = `
  box-sizing: border-box;
  border-radius: 4px;
  outline: 0;
  border: 0;
  min-height: 40px;
  padding: 6px 24px 6px 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  letter-spacing: 0.2px;
  font-family: ${Constants.font.semiBold};
  transition: 200ms ease all;
  overflow-wrap: break-word;
  user-select: none;
`;

const STYLES_BUTTON_FULL = `
  box-sizing: border-box;
  border-radius: 4px;
  outline: 0;
  border: 0;
  min-height: 40px;
  padding: 6px 24px 6px 24px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  letter-spacing: 0.2px;
  font-family: ${Constants.font.semiBold};
  transition: 200ms ease all;
  overflow-wrap: break-word;
  user-select: none;
`;

const STYLES_BUTTON_PRIMARY = css`
  ${STYLES_BUTTON}
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  background-color: ${Constants.system.slate};
  color: ${Constants.system.white};

  :hover {
    background-color: #313540;
  }

  :focus {
    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);
    background-color: #313540;
    outline: 0;
    border: 0;
  }
`;

const STYLES_BUTTON_PRIMARY_FULL = css`
  ${STYLES_BUTTON_FULL}
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  background-color: ${Constants.system.slate};
  color: ${Constants.system.white};

  :hover {
    background-color: #313540;
  }

  :focus {
    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);
    background-color: #313540;
    outline: 0;
    border: 0;
  }
`;

export const ButtonPrimary = (props) => {
  if (props.loading) {
    return (
      <button
        css={props.full ? STYLES_BUTTON_PRIMARY_FULL : STYLES_BUTTON_PRIMARY}
        style={props.style}>
        <LoaderSpinner style={{ height: 16, width: 16 }} />
      </button>
    );
  }

  if (props.type === "label") {
    return (
      <label
        css={props.full ? STYLES_BUTTON_PRIMARY_FULL : STYLES_BUTTON_PRIMARY}
        style={props.style}
        children={props.children}
        type={props.label}
        htmlFor={props.htmlFor}
        onMouseUp={props.onClick}
        onTouchEnd={props.onClick}
      />
    );
  }

  return (
    <button
      css={props.full ? STYLES_BUTTON_PRIMARY_FULL : STYLES_BUTTON_PRIMARY}
      style={props.style}
      onMouseUp={props.onClick}
      onTouchEnd={props.onClick}
      children={props.children}
    />
  );
};

export const ButtonPrimaryFull = (props) => {
  return <ButtonPrimary full {...props} />;
};

const STYLES_BUTTON_SECONDARY = css`
  ${STYLES_BUTTON}
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  background-color: ${Constants.system.black};
  color: ${Constants.system.white};

  :hover {
    background-color: ${Constants.system.pitchBlack};
  }

  :focus {
    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);
    background-color: ${Constants.system.black};
    outline: 0;
    border: 0;
  }
`;

const STYLES_BUTTON_SECONDARY_FULL = css`
  ${STYLES_BUTTON_FULL}
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  background-color: ${Constants.system.black};
  color: ${Constants.system.white};

  :hover {
    background-color: ${Constants.system.pitchBlack};
  }

  :focus {
    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);
    background-color: ${Constants.system.black};
    outline: 0;
    border: 0;
  }
`;

export const ButtonSecondary = (props) => {
  if (props.loading) {
    return (
      <button
        css={
          props.full ? STYLES_BUTTON_SECONDARY_FULL : STYLES_BUTTON_SECONDARY
        }
        style={props.style}>
        <LoaderSpinner style={{ height: 16, width: 16 }} />
      </button>
    );
  }

  if (props.type === "label") {
    return (
      <label
        css={
          props.full ? STYLES_BUTTON_SECONDARY_FULL : STYLES_BUTTON_SECONDARY
        }
        style={props.style}
        onMouseUp={props.onClick}
        onTouchEnd={props.onClick}
        children={props.children}
        type={props.label}
        htmlFor={props.htmlFor}
      />
    );
  }

  return (
    <button
      css={props.full ? STYLES_BUTTON_SECONDARY_FULL : STYLES_BUTTON_SECONDARY}
      {...props}
    />
  );
};

export const ButtonSecondaryFull = (props) => {
  return <ButtonSecondary full {...props} />;
};

const STYLES_BUTTON_DISABLED = css`
  ${STYLES_BUTTON}
  cursor: not-allowed;
  background-color: ${Constants.system.gray};
  color: ${Constants.system.darkGray};

  :focus {
    outline: 0;
    border: 0;
  }
`;

const STYLES_BUTTON_DISABLED_FULL = css`
  ${STYLES_BUTTON_FULL}
  cursor: not-allowed;
  background-color: ${Constants.system.gray};
  color: ${Constants.system.darkGray};

  :focus {
    outline: 0;
    border: 0;
  }
`;

export const ButtonDisabled = (props) => {
  return (
    <button
      css={props.full ? STYLES_BUTTON_DISABLED_FULL : STYLES_BUTTON_DISABLED}
      {...props}
    />
  );
};

export const ButtonDisabledFull = (props) => {
  return <ButtonDisabled full {...props} />;
};
