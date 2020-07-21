import * as React from "react";
import * as System from "~/components/system";

import SystemPage from "~/components/system/SystemPage";
import CodeBlock from "~/components/system/CodeBlock";

export default class SystemPageRoot extends React.Component {
  render() {
    return (
      <SystemPage
        title="SDS 0.0.5"
        description="This is an early preview of the Slate Design System SDS)."
        url="https://fps.onrender.com/system"
      >
        <img
          src="/public/static/social.jpg"
          style={{
            display: "inline-flex",
            width: "312px",
            height: "312px",
            borderRadius: "312px",
            marginBottom: 48,
          }}
        />
        <System.H1>SDS 0.0.5</System.H1>
        <br />
        <System.P>
          The <strong>Slate Design System</strong> is an open source resource
          with examples of components, constants, and experiences. Any code
          changes made to the components in the Design System will change the
          appearance and function of the{" "}
          <a href="https://github.com/filecoin-project/slate" target="_blank">
            Slate
          </a>{" "}
          in production. <br />
          <br />
          We wanted to build product out in the open, so other Filecoin & IPFS
          developers could freely use the code to make their own applications on
          top of the <a href="https://filecoin.io">Filecoin Network</a>. A lot
          of the functionality of Slate is made possible by{" "}
          <a
            href="https://github.com/textileio/js-powergate-client"
            target="_blank"
          >
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
          You can use these components, experiences, and constants in your own
          React projects. First, install the{" "}
          <a
            href="https://github.com/filecoin-project/slate-react-system"
            target="_blank"
          >
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
            {`import { ButtonPrimary } from 'slate-react-system'

const Component = () => <ButtonPrimary>Hello World</ButtonPrimary>`}
          </CodeBlock>
          <br />
          <br />
          And easily integrate Powergate <br />
          <br />
          <CodeBlock>
            {`import * as React from 'react';
import * as System from 'slate-react-system';
import { createPow } from "@textile/powergate-client";

class Example extends React.Component {
  _PG = null;

  state = {
    token: null
  }

  _handleCreateToken = () => {
    this._PG = createPow({ host: 'http://0.0.0.0:6002' });
    const FFS = await this._PG.ffs.create();
    const token = FFS.token ? FFS.token : null;
    PowerGate.setToken(token);
    this.setState({ token });
  }

  render() {
    return (
      <System.CreateToken
        token={this.state.token}
        onClick={this._handleCreateToken} />
    );
  }
}
`}
          </CodeBlock>
          <br />
          <br />
          Whats next?
        </System.P>
        <System.UL>
          <System.LI>
            Try using some components or experiences in your React projects.
          </System.LI>
          <System.LI>
            Start a new project using an{" "}
            <a
              href="https://github.com/filecoin-project/slate-react-system/tree/master/example"
              target="_blank"
            >
              example
            </a>
            .
          </System.LI>
          <System.LI>
            Try using slate-react-system in a{" "}
            <a
              href="https://github.com/jimmylee/next-express-emotion"
              target="_blank"
            >
              starter React boilerplate
            </a>
            .
          </System.LI>
        </System.UL>
        <br /> <br />
      </SystemPage>
    );
  }
}
