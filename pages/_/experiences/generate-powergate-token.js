import * as React from "react";
import * as System from "~/components/system";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

// import { createPow } from "@textile/powergate-client";

const EXAMPLE_CODE = `import * as React from "react";
import { CreateToken } from "slate-react-system";
import { createPow } from "@textile/powergate-client";

const PowerGate = createPow({ host: "https://grpcweb.slate.textile.io" });

class Example extends React.Component {
  state = {
    token: null,
  };

  _handleCreateToken = async () => {
    const FFS = await PowerGate.ffs.create();
    const token = FFS.token ? FFS.token : null;
    PowerGate.setToken(token);
    this.setState({ token });
  };

  render() {
    return (
      <CreateToken token={this.state.token} onClick={this._handleCreateToken} />
    );
  }
}
`;

export default class GeneratePowergateToken extends React.Component {
  state = {
    token: null,
  };

  _handleCreateToken = () => {
    let token;

    /* TODO(jim): Stub hosted Powergate.
      const PowerGate = createPow({ host: 'http://0.0.0.0:6002' });
      const FFS = await PowerGate.ffs.create();
      token = FFS.token ? FFS.token : null;
    */

    // NOTE(jim): Demo purposes.
    token = "82324ce3-3fb4-4eea-ac75-f7797d96a403";
    this.setState({ token });
  };

  render() {
    return (
      <SystemPage
        title="SDS: Generate Powergate Token"
        description="..."
        url="https://slate.host/_/experiences/generate-powergate-token"
      >
        <System.H1>
          Generate Powergate token{" "}
          <ViewSourceLink file="experiences/generate-powergate-token.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          Here is an example of an experience for generating a{" "}
          <a target="_blank" href="https://github.com/textileio/powergate/">
            powergate token
          </a>{" "}
          in the client.
        </System.P>
        <br />
        <br />
        <System.CreateToken
          onClick={this._handleCreateToken}
          token={this.state.token}
        />
        <br />
        <br />
        <br />
        <System.H2>Code</System.H2>
        <hr />
        <br />
        <CodeBlock>{EXAMPLE_CODE}</CodeBlock>
      </SystemPage>
    );
  }
}
