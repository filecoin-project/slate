import * as React from "react";
import * as System from "~/components/system";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

const addrsList = [
  {
    addr:
      "t3qwsglg755cwfaehqmsuzj2efebyyrqzlnhjogj2uwj44ce3anpowsdmaxdfnndukihmzrohqnpzakoq3tujq",
    name: "Initial Address",
    type: "bls",
  },
  {
    addr:
      "t3ual5q5qo5wolfxsui4ciujfucqwf6gqso4lettcjwl2tyismgol7c4tngvoono5rmytuqotye7oosfjv6g7a",
    name: "Secondary Address",
    type: "bls",
  },
];

const defaultStorageConfig = {
  cold: {
    enabled: true,
    filecoin: {
      addr:
        "t3qwsglg755cwfaehqmsuzj2efebyyrqzlnhjogj2uwj44ce3anpowsdmaxdfnndukihmzrohqnpzakoq3tujq",
      countryCodesList: [],
      dealMinDuration: 1000,
      excludedMinersList: [],
      maxPrice: 0,
      renew: {
        enabled: false,
        threshold: 0,
      },
      repFactor: 1,
      trustedMinersList: [],
    },
  },
  hot: {
    allowUnfreeze: false,
    enabled: true,
    ipfs: {
      addTimeout: 30,
    },
  },
  repairable: false,
};

const EXAMPLE_CODE = `import * as React from 'react';
import { FilecoinSettings } from 'slate-react-system';
import { createPow } from "@textile/powergate-client";

const PowerGate = createPow({ host: "http://pow.slate.textile.io:6002" });

class Example extends React.Component {
  state = {
    autoApprove: false
  }

  componentDidMount = async () => {
    const FFS = await PowerGate.ffs.create();
    const token = FFS.token ? FFS.token : null;
    PowerGate.setToken(token);
    const { addrsList } = await PowerGate.ffs.addrs();
    const { defaultStorageConfig } = await PowerGate.ffs.defaultStorageConfig();
    this.setState({ token, defaultStorageConfig, addrsList });
  }

  _handleSave = async ({ data, storageConfig }) => {
    const response = await PowerGate.ffs.setDefaultStorageConfig(storageConfig);
    this.setState({ data });
  }

  render() {
    return (
      <FilecoinSettings 
        autoApprove={this.state.autoApprove}
        defaultStorageConfig={this.state.defaultStorageConfig} 
        addrsList={this.state.addrsList} 
        onSave={this._handleSave} 
      />
    );
  }
}
`;

export default class SystemPageFilecoinWalletBalances extends React.Component {
  state = {
    autoApprove: true,
  };

  render() {
    return (
      <SystemPage
        title="SDS: Filecoin Settings"
        description="..."
        url="https://slate.host/experiences/filecoin-settings"
      >
        <System.H1>
          Filecoin Settings{" "}
          <ViewSourceLink file="experiences/filecoin-settings.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          Here is an example of an experience for getting and setting Filecoin
          Settings from{" "}
          <a target="_blank" href="https://github.com/textileio/powergate/">
            Textile's Powergate
          </a>
          .
        </System.P>
        <br />
        <br />
        <System.FilecoinSettings
          autoApprove={this.state.autoApprove}
          addrsList={addrsList}
          defaultStorageConfig={defaultStorageConfig}
          onSave={this._handleSave}
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
