import * as React from "react";
import * as System from "~/components/system";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

const EXAMPLE_CODE = `import * as React from 'react';
import { PeersList } from 'slate-react-system';
import { createPow } from "@textile/powergate-client";

const PowerGate = createPow({ host: "http://pow.slate.textile.io:6002" });

class Example extends React.Component {
  componentDidMount = async () => {
    const FFS = await PowerGate.ffs.create();
    const token = FFS.token ? FFS.token : null;
    PowerGate.setToken(token);
    const { peersList } = await PowerGate.net.peers();
    this.peersList = peersList;
  }

  render() {
    return (
      <PeersList data={this.peersList} />
    );
  }
}
`;

export default class SystemPagePeersList extends React.Component {
  render() {
    const peersList = [
      {
        id: "example-peer-id-1",
        name: "node-de23500d-5d37-438e-9868-f0c100906128",
      },
    ];

    return (
      <SystemPage
        title="SDS: Peers List"
        description="..."
        url="https://fps.onrender.com/experiences/peers-list"
      >
        <System.H1>
          Peers List <ViewSourceLink file="experiences/peers-list.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          Here is an example of an experience for getting peers from{" "}
          <a target="_blank" href="https://github.com/textileio/powergate/">
            Textile's Powergate
          </a>
          . This component will be expanded upon when there is more data from
          the endpoint.
        </System.P>
        <br />
        <br />
        <System.PeersList data={peersList} />
        <br />
        <br />
        <br />
        <System.H2>Code</System.H2>
        <hr />
        <br />
        <System.CodeBlock>{EXAMPLE_CODE}</System.CodeBlock>
      </SystemPage>
    );
  }
}
