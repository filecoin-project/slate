import * as React from "react";
import * as System from "~/components/system";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

const EXAMPLE_CODE = `import * as React from 'react';
import { FilecoinBalancesList } from 'slate-react-system';
import { createPow } from "@textile/powergate-client";

const PowerGate = createPow({ host: 'http://0.0.0.0:6002' });
const { info } = await PowerGate.ffs.info();

class Example extends React.Component {
  render() {
    return (
      <FilecoinBalancesList data={info.balancesList} />
    );
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
        balance: 500,
      },
    ];

    return (
      <SystemPage
        title="SDS: Filecoin Wallet Balances"
        description="..."
        url="https://fps.onrender.com/experiences/filecoin-wallet-balances"
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
        <System.H2>Code</System.H2>
        <br /> <br />
        <System.CodeBlock>{EXAMPLE_CODE}</System.CodeBlock>
      </SystemPage>
    );
  }
}
