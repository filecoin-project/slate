import "isomorphic-fetch";

import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { Markdown } from "~/components/system/components/Markdown";
import { H1, H2, H3, H4, P, UL, OL, LI, Link } from "~/components/system/components/Typography";

const STYLES_ASSET = (theme) => {
  console.log(theme.darkMode);
  return css`
    padding: 120px calc(32px + 16px + 8px);
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    will-change: transform;
    color: ${theme.darkmode ? Constants.system.white : "#000"};
    background-color: ${theme.darkmode ? "#000" : "#fff"};
  `;
};

const STYLES_BODY = css`
  width: 100%;
  // 687px to ensure we have maximum 70ch per line
  max-width: 687px;
  margin: 0 auto;

  & > *:first-child {
    margin-top: 0;
  }

  p,
  ul,
  ol,
  code,
  pre,
  div {
    margin-top: 24px;
  }

  h1,
  h2,
  h3,
  h4 {
    margin-top: 48px;
    margin-bottom: 24px;
  }
  img,
  video {
    padding: 16px 0px;
  }

  h1 + * {
    margin-top: 0px;
  }
  h2 + * {
    margin-top: 0px;
  }
  h3 + * {
    margin-top: 0px;
  }
  h4 + * {
    margin-top: 0px;
  }
`;

const STYLES_IMG = css`
  width: auto;
  max-width: 100%;
`;

export default function MarkdownFrame({ url }) {
  const [content, setContent] = React.useState("");

  React.useEffect(() => {
    fetch(url).then(async (res) => {
      const content = await res.text();
      setContent(content);
    });
  }, []);

  const remarkReactComponents = {
    p: (props) => <P {...props} />,
    h1: (props) => <H1 {...props} />,
    h2: (props) => <H2 {...props} />,
    h3: (props) => <H3 {...props} />,
    h4: (props) => <H4 {...props} />,
    h5: (props) => <H4 {...props} />,
    h6: (props) => <H4 {...props} />,
    ol: OL,
    ul: UL,
    li: LI,
    a: (props) => <Link {...props} dark={true} target="_blank" />,
    img: (props) => <img css={STYLES_IMG} {...props} />,
  };

  return (
    <div
      css={STYLES_ASSET}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <article css={STYLES_BODY}>
        <Markdown md={content} css={STYLES_BODY} options={{ remarkReactComponents }} />
      </article>
    </div>
  );
}
