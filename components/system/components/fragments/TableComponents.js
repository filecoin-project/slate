import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";
import * as OldSVG from "~/common/svg";
import * as Strings from "~/common/strings";

import { LoaderSpinner } from "~/components/system/components/Loaders";
import { CodeText } from "~/components/system/components/fragments/CodeText";
import { css } from "@emotion/react";
import { Tooltip } from "react-tippy";

import Avatar from "~/components/core/Avatar";

const STORAGE_DEAL_STATES = {
  "0": "Local file only.",
  "1": "Searching for miners.",
  "2": "Proposing storage deal.",
  "3": "Accepted by miners.",
  "4": "Data transfer in progress.",
  "5": "Data transfer complete.",
  "6": "Stored on network.",
};

const RETRIEVAL_DEAL_STATES = {
  "0": "Local file",
  "1": "Available on network",
  "2": "Retrieval deal proposed.",
  "3": "Retrieval deal accepted.",
  "4": "Data transfer in progress.",
  "5": "Data transfer completed.",
  "6": "Retrieved from network.",
};

const COMPONENTS_ICON = {
  PNG: <SVG.FileImage height="24px" />,
  ["image/png"]: <SVG.FileImage height="24px" />,
  ["image/jpeg"]: <SVG.FileImage height="24px" />,
  FOLDER: <OldSVG.Folder height="24px" />,
};

const STYLES_TABLE_TAG = css`
  box-sizing: border-box;
  display: inline-block;
  font-weight: 400;
  font-family: ${Constants.font.semiBold};
  letter-spacing: 0.2px;
  padding: 4px 6px 4px 6px;
  font-size: 10px;
  text-transform: uppercase;
  background: ${Constants.system.black};
  color: ${Constants.system.white};
  border-radius: 4px;
  margin: 0 4px 4px 0;
  white-space: nowrap;
`;

const COMPONENTS_DEAL_DIRECTION = {
  "1": (
    <span css={STYLES_TABLE_TAG} style={{ background: Constants.system.green }}>
      storage
    </span>
  ),
  "2": <span css={STYLES_TABLE_TAG}>retrieval</span>,
};

const COMPONENTS_TRANSACTION_DIRECTION = {
  "1": (
    <span css={STYLES_TABLE_TAG} style={{ background: Constants.system.green }}>
      + incoming
    </span>
  ),
  "2": <span css={STYLES_TABLE_TAG}>- outgoing</span>,
};

const COMPONENTS_TRANSACTION_STATUS = {
  "0": <span css={STYLES_TABLE_TAG}>Qualified</span>,
  "1": <span css={STYLES_TABLE_TAG}>Sealed On Filecoin</span>,
  "2": <LoaderSpinner style={{ width: 20, height: 20 }} />,
};

const COMPONENTS_OBJECT_TYPE = (text) => {
  if (Array.isArray(text)) {
    text = text.map((item) => (
      <CodeText nowrap style={{ margin: "0 4px 4px 0" }}>
        {item}
      </CodeText>
    ));
    return text;
  }
  return (
    <CodeText nowrap style={{ margin: "0 4px 4px 0" }}>
      {text}
    </CodeText>
  );
};

const STYLES_COLUMN = css`
  box-sizing: border-box;
  display: inline-flex;
  align-items: flex-start;
  justify-content: space-between;
  align-self: stretch;
  min-width: 10%;
`;

const STYLES_TOP_COLUMN = css`
  box-sizing: border-box;
  display: inline-flex;
  align-items: flex-start;
  justify-content: space-between;
  align-self: stretch;
  min-width: 10%;
  transition: 200ms ease all;
`;

const STYLES_CONTENT = css`
  box-sizing: border-box;
  padding: 12px 12px 12px 12px;
  min-width: 10%;
  width: 100%;
  align-self: stretch;
  flex-direction: column;
  word-break: break-word;
  overflow-wrap: anywhere;
  font-size: 12px;
`;

const STYLES_CONTENT_BUTTON = css`
  box-sizing: border-box;
  flex-shrink: 0;
  height: 40px;
  width: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 200ms ease all;

  :hover {
    color: ${Constants.system.green};
  }
`;

const STYLES_TABLE_CONTENT_LINK = css`
  box-sizing: border-box;
  font-family: ${Constants.font.medium};
  text-decoration: underline;
  cursor: pointer;

  :hover {
    color: ${Constants.system.green};
  }
`;

export const TableColumn = (props) => {
  const tooltipElement = props.tooltip ? (
    <Tooltip animation="fade" animateFill={false} title={props.tooltip}>
      <span css={STYLES_CONTENT_BUTTON}>
        <SVG.Information height="14px" />
      </span>
    </Tooltip>
  ) : null;

  const copyableElement = props.copyable ? (
    <span css={STYLES_CONTENT_BUTTON}>
      <SVG.CopyAndPaste height="16px" />
    </span>
  ) : null;

  return (
    <span
      css={props.top ? STYLES_TOP_COLUMN : STYLES_COLUMN}
      style={props.style}
    >
      <span css={STYLES_CONTENT}>{props.children}</span>
      {tooltipElement}
      {copyableElement}
    </span>
  );
};

// TODO(jim): We probably won't use this Table component for long.
// Once we have components for all the necessary flows. We will probably
// make bespoke components for each experience.
export const TableContent = ({
  type,
  text,
  action,
  data = {},
  onNavigateTo,
  onAction,
}) => {
  const { status, online } = data;

  if (text === null || text === undefined) {
    return null;
  }

  switch (type) {
    case "DEAL_CATEGORY":
      return (
        <React.Fragment>{text == 1 ? "Storage" : "Retrieval"}</React.Fragment>
      );
    case "BUTTON":
      return (
        <span
          css={STYLES_TABLE_CONTENT_LINK}
          onClick={() => onAction({ type: "SIDEBAR", value: action, data })}
        >
          {text}
        </span>
      );
    case "TRANSACTION_DIRECTION":
      return COMPONENTS_TRANSACTION_DIRECTION[text];
    case "TRANSACTION_STATUS":
      return COMPONENTS_TRANSACTION_STATUS[text];
    case "OBJECT_TYPE":
      return COMPONENTS_OBJECT_TYPE(text);
    case "ICON":
      const icon = COMPONENTS_ICON[text.toLowerCase()];
      return icon ? icon : COMPONENTS_ICON["PNG"];
    case "AVATAR":
      return <Avatar url={text} size={40} online={online} />;
    case "DEAL_DIRECTION":
      return COMPONENTS_DEAL_DIRECTION[text];
    case "DEAL_STATUS_RETRIEVAL":
      return RETRIEVAL_DEAL_STATES[`${text}`];
    case "DEAL_STATUS":
      return data["deal_category"] === 1
        ? STORAGE_DEAL_STATES[`${text}`]
        : RETRIEVAL_DEAL_STATES[`${text}`];
    case "STORAGE_DEAL_STATUS":
      return COMPONENTS_TRANSACTION_STATUS[`${text}`];
    case "BANDWIDTH_UPLOAD":
      return (
        <React.Fragment>
          <SVG.BandwidthUp height="16px" style={{ marginRight: 8 }} />
          {Strings.bytesToSize(text)}
        </React.Fragment>
      );
    case "BANDWIDTH_DOWNLOAD":
      return (
        <React.Fragment>
          <SVG.BandwidthDown height="16px" style={{ marginRight: 8 }} />
          {Strings.bytesToSize(text)}
        </React.Fragment>
      );
    case "MINER_AVAILABILITY":
      return text == 1 ? (
        <span
          css={STYLES_TABLE_TAG}
          style={{ background: Constants.system.green }}
        >
          Online
        </span>
      ) : null;
    case "DEAL_AUTO_RENEW":
      return text == 1 ? (
        <span
          css={STYLES_TABLE_TAG}
          style={{ background: Constants.system.brand }}
        >
          true
        </span>
      ) : (
        <span css={STYLES_TABLE_TAG}>false</span>
      );
    case "NOTIFICATION_ERROR":
      return (
        <span
          css={STYLES_TABLE_TAG}
          style={{ background: Constants.system.red }}
        >
          {text} {Strings.pluralize("error", text)}
        </span>
      );
    case "NETWORK_TYPE":
      // TODO(jim): DELETE_THIS_GUARD_CODE
      if (!text || !text.length || typeof text === "string") {
        return (
          <span
            css={STYLES_TABLE_TAG}
            style={{ background: Constants.system.brand }}
          >
            IPFS
          </span>
        );
      }

      return text.map((each) => {
        return (
          <span
            css={STYLES_TABLE_TAG}
            key={each}
            style={{ background: Constants.system.brand }}
          >
            {each}
          </span>
        );
      });
    case "SLATE_PUBLIC_TEXT_TAG":
      console.log(text);
      return !text ? (
        <span css={STYLES_TABLE_TAG}>Private</span>
      ) : (
        <span
          css={STYLES_TABLE_TAG}
          style={{ background: Constants.system.green }}
        >
          Public
        </span>
      );
    case "TEXT_TAG":
      return <span css={STYLES_TABLE_TAG}>{text}</span>;

    case "FILE_DATE":
      return Strings.toDate(text);
    case "FILE_SIZE":
      return Strings.bytesToSize(text, 2);
    case "NEW_WINDOW":
      // NOTE(jim): Special case to prevent navigation.
      if (!data) {
        return text;
      }

      // NOTE(jim): Navigates to file.
      return (
        <span css={STYLES_TABLE_CONTENT_LINK} onClick={() => window.open(text)}>
          {text}
        </span>
      );
    case "SLATE_LINK":
      // NOTE(jim): Special case to prevent navigation.
      if (!data) {
        return text;
      }

      // NOTE(jim): Navigates to file.
      return (
        <span
          css={STYLES_TABLE_CONTENT_LINK}
          onClick={() => onNavigateTo({ id: `slate-${data.slatename}` }, data)}
        >
          {text}
        </span>
      );
    case "FILE_LINK":
      // NOTE(jim): Special case to prevent navigation.
      if (!data) {
        return text;
      }

      // NOTE(jim): Navigates to file.
      return (
        <span
          css={STYLES_TABLE_CONTENT_LINK}
          onClick={() => onNavigateTo({ id: 15 }, data)}
        >
          {text}
        </span>
      );
    default:
      return text;
  }
};
