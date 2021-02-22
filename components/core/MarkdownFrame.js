import "isomorphic-fetch";

import * as React from "react";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";
import { Markdown } from "~/components/system/components/Markdown";
import { H1, H2, H3, H4, P, UL, OL, LI, Link } from "~/components/system/components/Typography";

const STYLES_ASSET = (theme) => css`
  padding: 120px calc(32px + 16px + 8px);
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  will-change: transform;
  color: ${theme.darkmode ? theme.system.wallLight : theme.system.pitchBlack};
  background-color: ${theme.darkmode ? theme.system.pitchBlack : theme.system.wallLight};
`;

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

const STYLES_META = (theme) => css`
  max-width: 687px;
  margin: 0 auto;
  font-size: 12px;
  color: ${theme.darkmode ? theme.system.textGray : theme.system.gray70};
  letter-spacing: 0.2px;
  align-items: center;
  margin-bottom: 12px;
`;

const STYLES_DEVIDER = (theme) => css`
  position: sticky;
  // Note(Amine): asset padding
  top: -120px;
  left: 0;
  width: 100%;
  height: 1px;
  max-width: 687px;
  margin: 0 auto;
  margin-bottom: 58px;
  background-color: ${theme.system.gray50};
  transition: height 0.3s;
`;

const STYLE_PROGRESS = (theme) => css`
  width: 80%;
  height: 100%;
  background-color: ${theme.darkmode ? "#fff" : "#000"};
  transition: opacity 0.3s;
`;

const STYLES_INTENT = (theme) => css`
  width: 100%;
  height: 8px;
  background: linear-gradient(
    180deg,
    ${theme.darkmode ? theme.system.pitchBlack : theme.system.wallLight} 0%,
    ${theme.darkmode ? "rgba(12, 12, 12, 0)" : "rgba(241, 240, 242, 0)"} 100%
  );
`;

export default function MarkdownFrame({ url, date }) {
  const [content, setContent] = React.useState("");

  React.useEffect(() => {
    fetch(url).then(async (res) => {
      const content = await res.text();
      setContent(content);
    });
  }, []);

  const ref = React.useRef();
  const meterRef = React.useRef();
  const { handleScrollAnimation, opacity, extendScroll } = useScrollPosition({
    ref,
    childRef: meterRef,
  });

  const readTime = Math.round(content.split(" ").length / 150);

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
      onScroll={handleScrollAnimation}
      ref={ref}
    >
      <div>
        <div css={STYLES_META}>
          <span>{Strings.toDate(date)}</span> / <span>{readTime} min read</span>
        </div>
        <div css={STYLES_DEVIDER} style={{ height: extendScroll ? "4px" : "1px" }}>
          <div css={STYLE_PROGRESS} ref={meterRef} style={{ opacity: opacity }} />
          <div css={STYLES_INTENT} />
        </div>
        <article css={STYLES_BODY}>
          <Markdown md={content} css={STYLES_BODY} options={{ remarkReactComponents }} />
        </article>
      </div>
    </div>
  );
}

const useScrollPosition = ({ ref, childRef }) => {
  const [extendScroll, setExtendScroll] = React.useState(false);
  const [opacity, setOpacity] = React.useState(0);
  const handleScrollAnimation = () => {
    const percentage =
      (100 * ref.current.scrollTop) / (ref.current.scrollHeight - ref.current.clientHeight);

    // Updating width without updating state to improve performance
    childRef.current.style.width = `${percentage}%`;

    if (percentage > 15 && !extendScroll) setExtendScroll(true);
    if (percentage < 15 && extendScroll) setExtendScroll(false);

    if (percentage < 15 && opacity === 1) setOpacity(0);
    if (percentage > 15 && opacity === 0) setOpacity(1);
  };
  return { opacity, extendScroll, handleScrollAnimation };
};
