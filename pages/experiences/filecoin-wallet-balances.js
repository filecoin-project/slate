import * as React from "react";
import * as System from "~/components/system";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

const EXAMPLE_CODE = `import * as React from "react";
import { FilecoinBalancesList } from "slate-react-system";
import { createPow } from "@textile/powergate-client";

const PowerGate = createPow({ host: "https://grpcweb.slate.textile.io" });

class Example extends React.Component {
  componentDidMount = async () => {
    const FFS = await PowerGate.ffs.create();
    const token = FFS.token ? FFS.token : null;
    PowerGate.setToken(token);
    const { info } = await PowerGate.ffs.info();
    this.setState({ token, balancesList: info.balancesList });
  };

  render() {
    return <FilecoinBalancesList data={this.state.balancesList} />;
  }
}
`;

export default class SystemPageFilecoinWalletBalances extends React.Component {
  render() {
    const balancesList = [
      {
        addr: {
          addr:
            "t3ual5q5qo5wolfxsui4ciujfucqwf6gqso4lettcjwl2tyismgol7c4tngvoono5rmytuqotye7oosfjv6g7a",
          name: "Wallet A",
          type: "bls",
        },
        balance: 40,
      },
      {
        addr: {
          addr: "t1n7sjmxtxkhwkmk25ly6hk6xfmvi6sjx5v27wliq",
          name: "Wallet B",
          type: "secp256k1",
        },
        balance: 5000,
      },
    ];

    return (
      <SystemPage
        title="SDS: Filecoin Wallet Balances"
        description="..."
        url="https://slate.host/experiences/filecoin-wallet-balances"
      >
        <System.H1>
          Filecoin Wallet Balances{" "}
          <ViewSourceLink file="experiences/filecoin-wallet-balances.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          Here is an example of an experience for getting Filecoin Wallet
          Balances from{" "}
          <a target="_blank" href="https://github.com/textileio/powergate/">
            Textile's Powergate
          </a>
          .
        </System.P>
        <br />
        <br />
        <System.FilecoinBalancesList data={balancesList} />
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
