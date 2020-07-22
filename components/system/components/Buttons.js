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
`;

const STYLES_BUTTON_PRIMARY = css`
  ${STYLES_BUTTON}
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  background-color: ${Constants.system.brand};
  color: ${Constants.system.white};

  :hover {
    background-color: #003fe3;
  }

  :focus {
    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);
    background-color: ${Constants.system.brand};
    outline: 0;
    border: 0;
  }
`;

export const ButtonPrimary = (props) => {
  if (props.type === "label") {
    return <label css={STYLES_BUTTON_PRIMARY} {...props} />;
  }

  if (props.loading) {
    return (
      <button css={STYLES_BUTTON_PRIMARY} style={props.style}>
        <LoaderSpinner style={{ height: 16, width: 16 }} />
      </button>
    );
  }

  return (
    <button
      css={STYLES_BUTTON_PRIMARY}
      style={props.style}
      onClick={props.onClick}
      children={props.children}
    />
  );
};

const STYLES_BUTTON_PRIMARY_FULL = css`
  ${STYLES_BUTTON_FULL}
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  background-color: ${Constants.system.brand};
  color: ${Constants.system.white};

  :hover {
    background-color: #003fe3;
  }

  :focus {
    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.3);
    background-color: ${Constants.system.brand};
    outline: 0;
    border: 0;
  }
`;

export const ButtonPrimaryFull = (props) => {
  if (props.type === "label") {
    return <label css={STYLES_BUTTON_PRIMARY_FULL} {...props} />;
  }

  if (props.loading) {
    return (
      <button css={STYLES_BUTTON_PRIMARY_FULL} style={props.style}>
        <LoaderSpinner style={{ height: 16, width: 16 }} />
      </button>
    );
  }

  return (
    <button
      css={STYLES_BUTTON_PRIMARY_FULL}
      style={props.style}
      onClick={props.onClick}
      children={props.children}
    />
  );
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

export const ButtonSecondary = (props) => {
  if (props.type === "label") {
    return <label css={STYLES_BUTTON_SECONDARY} {...props} />;
  }

  return <button css={STYLES_BUTTON_SECONDARY} {...props} />;
};

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

export const ButtonSecondaryFull = (props) => {
  if (props.type === "label") {
    return <label css={STYLES_BUTTON_SECONDARY_FULL} {...props} />;
  }

  return <button css={STYLES_BUTTON_SECONDARY_FULL} {...props} />;
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

export const ButtonDisabled = (props) => {
  return <button css={STYLES_BUTTON_DISABLED} {...props} />;
};

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

export const ButtonDisabledFull = (props) => {
  return <button css={STYLES_BUTTON_DISABLED_FULL} {...props} />;
};
