import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

const STYLES_CSS_LABEL = css`
  display: block;
  letter-spacing: 0.2px;
  font-size: 12px;
  color: ${Constants.system.darkGray};
  margin-bottom: 8px;
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
          Typography <ViewSourceLink file="system/typography.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The Filecoin Client uses the <a href="https://rsms.me/inter/" target="_blank">Inter typeface family</a>.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>
          Import React and the Typography Component.
        </System.P>
        <br />
        <System.CodeBlock>
          {`import { H1, H2, H3, H4, P, UL, OL, LI } from 'slate-react-system'; `}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Typescale</System.H2>
        <hr />
        <br />
        <span css={STYLES_CSS_LABEL}>1.953rem &nbsp; Semi Bold</span>
        <System.H1>
          This is heading level 1
        </System.H1>
        <br />
        <span css={STYLES_CSS_LABEL}>1.563rem &nbsp; Medium</span>
        <System.H2>
          This is heading level 2
        </System.H2>
        <br />
        <span css={STYLES_CSS_LABEL}>1.25rem &nbsp; Medium</span>
        <System.H3>
          This is heading level 3
        </System.H3>
        <br />
        <span css={STYLES_CSS_LABEL}>1rem &nbsp; Medium</span>
        <System.H4>
          This is heading level 4
        </System.H4>
        <br />
        <br />
        <System.CodeBlock>
          {`
<System.H1>
This is heading level 1
</System.H1>

<System.H2>
This is heading level 2
</System.H2>

<System.H3>
This is heading level 3
</System.H3>

<System.H4>
This is heading level 4
</System.H4>
          `}
        </System.CodeBlock>
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
        <System.CodeBlock>
          {`
<System.OL>
  <System.LI>Rainbow</System.LI>
  <System.LI>Cloud</System.LI>
  <System.LI>Cake</System.LI>
</System.OL>

<System.UL>
  <System.LI>Cloud</System.LI>
  <System.LI>Cake</System.LI>
  <System.LI>Rainbow</System.LI>
</System.UL>
          `}
        </System.CodeBlock>
        <br />
        <br />
        <br />
      </SystemPage>
    );
  }
}
