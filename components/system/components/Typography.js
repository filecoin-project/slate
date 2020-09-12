import * as React from "react";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as StringReplace from "~/vendor/react-string-replace";

import { css } from "@emotion/react";
import { dispatchCustomEvent } from "~/common/custom-events";

const LINK_STYLES = `
  font-family: ${Constants.font.text};
  font-weight: 400;
  text-decoration: none;
  color: ${Constants.system.moonstone};
  cursor: pointer;
  transition: 200ms ease color;

  :visited {
    color: ${Constants.system.moonstone};
  }

  :hover {
    color: ${Constants.system.slate};
  }
`;

const STYLES_LINK = css`
  ${LINK_STYLES}
`;

const ANCHOR = `
  a {
    ${LINK_STYLES}
  }
`;

const onDeepLink = async (object) => {
  const response = await Actions.getSlateBySlatename({
    query: object.deeplink,
    deeplink: true,
  });

  if (!response) {
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: {
          message:
            "We're having trouble connecting right now. Please try again later",
        },
      },
    });
    return;
  }

  if (response.error) {
    dispatchCustomEvent({
      name: "create-alert",
      detail: { alert: { decorator: response.decorator } },
    });
    return;
  }

  if (!response.data || !response.data.slate) {
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: {
          message:
            "We encountered issues while locating that deeplink. Please try again later",
        },
      },
    });
    return;
  }

  return window.open(
    `/${response.data.slate.user.username}/${response.data.slate.slatename}`
  );
};

export const ProcessedText = ({ text }) => {
  let replacedText;

  replacedText = StringReplace(text, /(https?:\/\/\S+)/g, (match, i) => (
    <a css={STYLES_LINK} key={match + i} href={match} target="_blank">
      {match}
    </a>
  ));

  replacedText = StringReplace(
    replacedText,
    /@(\w*[0-9a-zA-Z-_]+\w*[0-9a-zA-Z-_])/g,
    (match, i) => (
      <a
        css={STYLES_LINK}
        key={match + i}
        target="_blank"
        href={`/${match}`.toLowerCase()}
      >
        @{match}
      </a>
    )
  );

  replacedText = StringReplace(
    replacedText,
    /#(\w*[0-9a-zA-Z-_]+\w*[0-9a-zA-Z-_])/g,
    (match, i) => (
      <span
        css={STYLES_LINK}
        key={match + i}
        onClick={() => onDeepLink({ deeplink: match.toLowerCase() })}
      >
        #{match}
      </span>
    )
  );

  return <React.Fragment>{replacedText}</React.Fragment>;
};

const STYLES_H1 = css`
  box-sizing: border-box;
  font-size: ${Constants.typescale.lvl4};
  line-height: 1.1;
  font-family: ${Constants.font.semiBold};
  font-weight: 400;
  color: inherit;
  text-decoration: none;
  display: block;
  overflow-wrap: break-word;

  :hover {
    color: inherit;
  }

  :visited {
    color: inherit;
  }

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }

  ${ANCHOR}
`;

export const H1 = (props) => {
  return <h1 css={STYLES_H1} {...props} />;
};

const STYLES_H2 = css`
  box-sizing: border-box;
  font-size: ${Constants.typescale.lvl3};
  line-height: 1.1;
  font-family: ${Constants.font.medium};
  font-weight: 400;
  overflow-wrap: break-word;
  color: inherit;
  text-decoration: none;
  display: block;

  :hover {
    color: inherit;
  }

  :visited {
    color: inherit;
  }

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }

  ${ANCHOR}
`;

export const H2 = (props) => {
  return <h2 css={STYLES_H2} {...props} />;
};

const STYLES_H3 = css`
  box-sizing: border-box;
  font-size: ${Constants.typescale.lvl2};
  line-height: 1.1;
  font-family: ${Constants.font.medium};
  font-weight: 400;
  overflow-wrap: break-word;
  color: inherit;
  text-decoration: none;
  display: block;

  :hover {
    color: inherit;
  }

  :visited {
    color: inherit;
  }

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }

  ${ANCHOR}
`;

export const H3 = (props) => {
  return <h3 css={STYLES_H3} {...props} />;
};

const STYLES_H4 = css`
  box-sizing: border-box;
  font-size: ${Constants.typescale.lvl1};
  line-height: 1.1;
  font-family: ${Constants.font.medium};
  font-weight: 400;
  overflow-wrap: break-word;
  color: inherit;
  text-decoration: none;
  display: block;

  :hover {
    color: inherit;
  }

  :visited {
    color: inherit;
  }

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }

  ${ANCHOR}
`;

export const H4 = (props) => {
  return <h4 css={STYLES_H4} {...props} />;
};

const STYLES_P = css`
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  font-size: ${Constants.typescale.lvl1};
  line-height: 1.5;
  overflow-wrap: break-word;

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }

  ${ANCHOR}
`;

export const P = (props) => {
  return <div css={STYLES_P} {...props} />;
};

const STYLES_UL = css`
  box-sizing: border-box;
  padding-left: 24px;
`;

export const UL = (props) => {
  return <ul css={STYLES_UL} {...props} />;
};

const STYLES_OL = css`
  box-sizing: border-box;
  padding-left: 24px;
`;

export const OL = (props) => {
  return <ol css={STYLES_OL} {...props} />;
};

const STYLES_LI = css`
  box-sizing: border-box;
  margin-top: 12px;

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }

  ${ANCHOR}
`;

export const LI = (props) => {
  return <li css={STYLES_LI} {...props} />;
};
