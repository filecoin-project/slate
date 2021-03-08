import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import SystemPage from "~/components/system/SystemPage";
import CodeBlock from "~/components/system/CodeBlock";

export default class SystemPageRoot extends React.Component {
  render() {
    return (
      <SystemPage
        title={`Slate Design System ${Constants.values.sds}`}
        description="We built a design system you can use while we are building Slate, a Filecoin client."
        url="https://slate.host/_/system"
      >
        <img
          src="https://slate.textile.io/ipfs/bafybeidu5v3ytcy3ynghrmu7zftfinpt3s5pghqmpytrohmpk57ba4suye"
          style={{
            display: "inline-flex",
            width: "100%",
            borderRadius: "4px",
            marginBottom: 48,
            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.09)",
          }}
        />
        <System.H1>SDS {Constants.values.sds}</System.H1>
        <br />
        <System.P>
          The <strong>Slate Design System</strong> is an open source resource with examples of
          components, constants, and experiences. Any code changes made to the components in the
          Design System will change the appearance and function of{" "}
          <a href="https://slate.host" target="_blank">
            Slate
          </a>{" "}
          in production. <br />
          <br />
          We wanted to build product out in the open, so other Filecoin & IPFS developers could
          freely use the code to make their own applications on top of the{" "}
          <a href="https://filecoin.io">Filecoin Network</a>. A lot of the functionality of Slate is
          made possible by{" "}
          <a href="https://github.com/textileio/js-powergate-client" target="_blank">
            Textile's Powergate
          </a>{" "}
          and{" "}
          <a href="https://github.com/textileio/js-hub" target="_blank">
            Textile's Hub
          </a>
          .
        </System.P>
        <br /> <br />
        <br />
        <System.H2>slate-react-system</System.H2>
        <br />
        <System.P>
          You can use these components, experiences, and constants in your own React projects.
          First, install the{" "}
          <a href="https://www.npmjs.com/package/slate-react-system" target="_blank">
            npm module
          </a>
          :
          <br />
          <br />
          <CodeBlock>{`npm install --save slate-react-system`}</CodeBlock>
          <br />
          <br />
          Now you can import React components: <br />
          <br />
          <CodeBlock>
            {`import { ButtonPrimary } from "slate-react-system";

const Component = () => <ButtonPrimary>Hello world</ButtonPrimary>;`}
          </CodeBlock>
          <br />
          <br />
        </System.P>
        <br />
        <br />
      </SystemPage>
    );
  }
}
