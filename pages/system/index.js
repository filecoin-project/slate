import * as React from "react";
import * as System from "~/components/system";

import SystemPage from "~/components/system/SystemPage";

export default class SystemPageRoot extends React.Component {
  render() {
    return (
      <SystemPage
        title="SDS 1.2"
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
        <System.H1>SDS 1.2</System.H1>
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
          <System.CodeBlock>
            {`npm install --save slate-react-system`}
          </System.CodeBlock>
          <br />
          <br />
          Now you can import React components: <br />
          <br />
          <System.CodeBlock>
            {`import { ButtonPrimary } from 'slate-react-system'

const Component = () => <ButtonPrimary>Hello World</ButtonPrimary>`}
          </System.CodeBlock>
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
        <br /> <br /> <br />
        <System.H2>How do I use Slate?</System.H2>
        <br />
        <System.P>
          If you are running this{" "}
          <a href="https://github.com/filecoin-project/slate" target="_blank">
            repository locally
          </a>
          , visit https://localhost:1337 in your browser. If you are redirected
          here, that means you have not followed all of the instructions or
          something went wrong on our end.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>License</System.H2>
        <br />
        <System.P>
          Copyright &copy; 2020 Protocol Labs
          <br />
          <br />
          Permission is hereby granted, free of charge, to any person obtaining
          a copy of this software and associated documentation files (the
          "Software"), to deal in the Software without restriction, including
          without limitation the rights to use, copy, modify, merge, publish,
          distribute, sublicense, and/or sell copies of the Software, and to
          permit persons to whom the Software is furnished to do so, subject to
          the following conditions:
          <br />
          <br />
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
          <br />
          <br />
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
          IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
          CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
          TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
          SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </System.P>
      </SystemPage>
    );
  }
}
