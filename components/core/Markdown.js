import * as React from "react";
import { css } from "@emotion/react";
import marked from "marked";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";
import "isomorphic-fetch";

const STYLES_ASSET = css`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const STYLES_BODY = css`
  width: 100%;
  max-width: 687px;
  margin: 0 auto;
`;

const STYLES_PADDINGS = css`
  padding: 120px 32px;
`;

const STYLES_METER = css`
  position: sticky;
  top: 0%;
  left: 0%;
  height: 4px;
  transition: opacity 0.3s;
`;

export default function Markdown({ url, darkMode }) {
  const [nodes, setNodes] = React.useState([]);
  const [percentage, setPercentage] = React.useState(0);
  const ref = React.useRef();
  console.log(darkMode);

  React.useEffect(() => {
    fetch(url).then(async (res) => {
      const content = await res.text();
      setNodes(render(parseMarkdown(marked.lexer(content))));
    });
  }, []);

  const handleScrollAnimation = () => {
    const percentage =
      (100 * ref.current.scrollTop) / (ref.current.scrollHeight - ref.current.clientHeight);
    setPercentage(percentage);
  };
  const meterOpacity = percentage < 15 || percentage === 100 ? 0 : 1;
  return (
    <div
      css={STYLES_ASSET}
      ref={ref}
      style={{
        color: darkMode ? Constants.system.white : Constants.system.black,
        backgroundColor: darkMode ? Constants.system.black : Constants.system.white,
      }}
      onScroll={handleScrollAnimation}
      onClick={(e) => {
        console.log();
        e.stopPropagation();
      }}
    >
      <div
        css={STYLES_METER}
        style={{
          backgroundColor: darkMode ? Constants.system.white : Constants.system.black,
          width: `${percentage}%`,
          opacity: meterOpacity,
        }}
      />
      <div css={STYLES_PADDINGS}>
        <div css={STYLES_BODY}>{nodes}</div>
      </div>
    </div>
  );
}

// Helpers
function smartypants(text) {
  return text.replace(/&#39;/g, "'");
}

const serializeBlock = (block) => {
  switch (block.type) {
    case "paragraph":
    case "heading":
      return {
        type: block.type,
        children: block.tokens.map((token) => serializeInline(token)),
      };
    default:
      return {};
  }
};

const serializeInline = (inline) => {
  switch (inline.type) {
    case "text":
      return { text: smartypants(inline.text) };
    case "link":
      return { type: "link", href: inline.href, text: inline.text };
    default:
      return {};
  }
};
const parseMarkdown = (tokens) => {
  const serializedTokens = tokens.map((token) => serializeBlock(token));
  return serializedTokens;
};

const renderInline = (inline) => {
  if (!inline.type) return inline.text;
  switch (inline.type) {
    case "link":
      return <a href={inline.href}>{inline.text}</a>;
    default:
      return "";
  }
};

const renderBlock = (node) => {
  switch (node.type) {
    case "heading":
      return (
        <System.H1 style={{ marginBottom: "3rem" }}>
          {node.children.map((child) => renderInline(child))}
        </System.H1>
      );
    case "paragraph":
      return (
        <System.P style={{ marginBottom: "24px" }}>
          {node.children.map((child) => renderInline(child))}
        </System.P>
      );
    default:
      return "";
  }
};

const render = (parsed) => {
  const nodes = parsed.map((par) => renderBlock(par));
  return nodes;
};
