import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import SystemPage from "~/components/system/SystemPage";
import CodeBlock from "~/components/system/CodeBlock";

const STYLES_CSS_LABEL = css`
  display: block;
  letter-spacing: 0.2px;
  font-size: 12px;
  color: ${Constants.system.darkGray};
  margin-bottom: 8px;
`;

const STYLES_TYPE_JETBRAINS = css`
  font-family: ${Constants.font.code};
`;

const STYLES_BOLD = css`
  font-family: ${Constants.font.text};
  font-weight: bold;
`;

const STYLES_ITALIC = css`
  font-style: italic;
`;

const STYLES_UNDERLINE = css`
  text-decoration: underline;
`;

export default class SystemPageTypography extends React.Component {
  render() {
    return (
      <SystemPage
        title="SDS: Typography"
        description="..."
        url="https://fps.onrender.com/system/typography"
      >
        <System.H1>
          Typography <System.ViewSourceLink file="system/typography.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The Filecoin Client uses{" "}
          <a href="https://rsms.me/inter/" target="_blank">
            Inter
          </a>{" "}
          and{" "}
          <a href="https://www.jetbrains.com/lp/mono/" target="_blank">
            Jet Brains
          </a>
          .
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>
          Import React and the typography components. If needed, import the ViewSourceLink
          component.
        </System.P>
        <br />
        <CodeBlock>
          {`import { H1, H2, H3, H4, P, UL, OL, LI, ViewSourceLink } from "slate-react-system";`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Typescale</System.H2>
        <hr />
        <br />
        <span css={STYLES_CSS_LABEL}>1.953rem &nbsp; Semi Bold</span>
        <System.H1>This is heading level 1</System.H1>
        <br />
        <span css={STYLES_CSS_LABEL}>1.563rem &nbsp; Medium</span>
        <System.H2>This is heading level 2</System.H2>
        <br />
        <span css={STYLES_CSS_LABEL}>1.25rem &nbsp; Medium</span>
        <System.H3>This is heading level 3</System.H3>
        <br />
        <span css={STYLES_CSS_LABEL}>1rem &nbsp; Medium</span>
        <System.H4>This is heading level 4</System.H4>
        <br />
        <br />
        <CodeBlock>
          {`<H1>This is heading level 1</H1>

<H2>This is heading level 2</H2>

<H3>This is heading level 3</H3>

<H4>This is heading level 4</H4>`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Type Styles</System.H2>
        <hr />
        <br />
        <System.P css={STYLES_BOLD}>This text is bold</System.P>
        <System.P css={STYLES_ITALIC}>This text is italic</System.P>
        <System.P css={STYLES_UNDERLINE}>This text is underlined</System.P>
        <br />
        <br />
        <CodeBlock>
          {`<P css={STYLES_BOLD}>This text is bold</P>

<P css={STYLES_ITALIC}>This text is italic</P>

<P css={STYLES_UNDERLINE}>This text is underlined</P>`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Typefaces</System.H2>
        <hr />
        <br />
        <System.H3>Inter</System.H3>
        <System.P>a b c d e f g h i j k l m n o p q r s t u v w x y z</System.P>
        <System.P>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</System.P>
        <System.P>0 1 2 3 4 5 6 7 8 9</System.P>
        <br />
        <br />
        <System.H3>Jet Brains</System.H3>
        <System.P css={STYLES_TYPE_JETBRAINS}>
          a b c d e f g h i j k l m n o p q r s t u v w x y z
        </System.P>
        <System.P css={STYLES_TYPE_JETBRAINS}>
          A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
        </System.P>
        <System.P css={STYLES_TYPE_JETBRAINS}>0 1 2 3 4 5 6 7 8 9</System.P>
        <br />
        <br />
        <System.H2>Ordered and Unordered Lists</System.H2>
        <hr />
        <br />
        <System.OL>
          <System.LI>Rainbow</System.LI>
          <System.LI>Cloud</System.LI>
          <System.LI>Cake</System.LI>
        </System.OL>
        <br />
        <System.UL>
          <System.LI>Cloud</System.LI>
          <System.LI>Cake</System.LI>
          <System.LI>Rainbow</System.LI>
        </System.UL>
        <br />
        <br />
        <CodeBlock>
          {`<OL>
  <LI>Rainbow</LI>
  <LI>Cloud</LI>
  <LI>Cake</LI>
</OL>

<UL>
  <LI>Cloud</LI>
  <LI>Cake</LI>
  <LI>Rainbow</LI>
</UL>`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Hyperlinks</System.H2>
        <hr />
        <br />
        <System.P>
          Internal References{" "}
          <a href="https://slate.host" target="_blank">
            Link to a page
          </a>
        </System.P>
        <System.P>
          External References <System.ViewSourceLink file="system/typography.js" />
        </System.P>
        <br />
        <br />
        <CodeBlock>
          {`<P>
  <a href="https://slate.host"
  target="_blank">
    Link to a page
  </a>
</P>

<P>
  <ViewSourceLink file="system/typography.js" />
</P>`}
        </CodeBlock>
        <br />
        <br />
      </SystemPage>
    );
  }
}
