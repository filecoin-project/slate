import * as React from "react";
import * as System from "~/components/system";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

const EXAMPLE_CODE = `import * as React from 'react';
import { CreateFilecoinAddress } from 'slate-react-system';
import { createPow } from "@textile/powergate-client";

const PowerGate = createPow({ host: 'http://pow.slate.textile.io:6002' });

class Example extends React.Component {
  componentDidMount = async () => {
    const FFS = await PowerGate.ffs.create();
    const token = FFS.token ? FFS.token : null;
    PowerGate.setToken(token);
  }

  _handleCreateAddress = async ({ name, type, makeDefault }) => {
    const response = await PowerGate.ffs.newAddr(
      name, 
      type, 
      makeDefault
    );
    console.log(response);
  }

  render() {
    return (
      <CreateFilecoinAddress onSubmit={this._handleCreateAddress} />
    );
  }
}
`;

export default class SystemPageCreateAddress extends React.Component {
  _handleSubmit = ({ name, type, makeDefault }) => {
    alert(JSON.stringify({ name, type, makeDefault }));
  };

  render() {
    return (
      <SystemPage
        title="SDS: Create Address"
        description="..."
        url="https://fps.onrender.com/experiences/create-address"
      >
        <System.H1>
          Create a Filecoin Address{" "}
          <ViewSourceLink file="experiences/create-address.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          Here is an example of an experience for generating a filecoin address
          using{" "}
          <a target="_blank" href="https://github.com/textileio/powergate/">
            Textile's Powergate
          </a>
        </System.P>
        <br />
        <br />
        <System.CreateFilecoinAddress onSubmit={this._handleSubmit} />
        <br />
        <br />
        <System.H2>Code</System.H2>
        <br /> <br />
        <System.CodeBlock>{EXAMPLE_CODE}</System.CodeBlock>
      </SystemPage>
    );
  }
}
