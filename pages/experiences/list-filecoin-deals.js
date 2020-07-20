import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

import { createPow, ffsOptions } from "@textile/powergate-client";

const PowerGate = createPow({ host: "http://pow.slate.textile.io:6002" });

const EXAMPLE_CODE = `import * as React from 'react';
import { FilecoinStorageDealsList, FilecoinRetrievalDealsList } from 'slate-react-system';
import { createPow, ffsOptions } from "@textile/powergate-client";

const PowerGate = createPow({ host: "http://pow.slate.textile.io:6002" });
const includeFinal = ffsOptions.withIncludeFinal(true);
const includePending = ffsOptions.withIncludePending(true);
const fromAddresses = ffsOptions.withFromAddresses(
  "t3ual5q5qo5wolfxsui4ciujfucqwf6gqso4lettcjwl2tyismgol7c4tngvoono5rmytuqotye7oosfjv6g7a",
  "t3solnyrrblqlmvi6gmzewzvu62vs7uqvkl22yemzr63bcylbaaqsg44mnipepuafg7efzzx4zwcsi66jgze3q"
);

class Example extends React.Component {
  componentDidMount = async () => {
    const FFS = await PowerGate.ffs.create();
    const token = FFS.token ? FFS.token : null;
    PowerGate.setToken(token);
    const storageList = await PowerGate.ffs.listStorageDealRecords(
      includeFinal,
      includePending,
      fromAddresses
    );
    const retrievalList = await PowerGate.ffs.listRetrievalDealRecords();
    this.setState({ storageList, retrievalList, token });
  }

  render() {
    return (
      <FilecoinStorageDealsList data={this.state.storageList} />
      <FilecoinRetrievalDealsList data={this.state.retrievalList} />
    );
  }
}
`;

const storageList = [
  {
    addr:
      "t3solnyrrblqlmvi6gmzewzvu62vs7uqvkl22yemzr63bcylbaaqsg44mnipepuafg7efzzx4zwcsi66jgze3q",
    dealInfo: {
      activationEpoch: 0,
      dealId: 0,
      duration: 1000,
      miner: "t0101180",
      msg: "",
      pieceCid: "b",
      pricePerEpoch: 1220,
      proposalCid:
        "bafyreifvjnupitsw3zwykymlnuruqqpyxhmpm5xo6cf72e7hdxscqistea",
      size: 0,
      startEpoch: 0,
      stateId: 0,
      stateName: "",
    },
    pending: true,
    rootCid: "QmctRftYBfbWAtfz9svcprTnmah4eFJXdAUuBhAA6Z6c84",
    time: 1594960648,
  },
  {
    addr:
      "t3ual5q5qo5wolfxsui4ciujfucqwf6gqso4lettcjwl2tyismgol7c4tngvoono5rmytuqotye7oosfjv6g7a",
    dealInfo: {
      activationEpoch: 0,
      dealId: 0,
      duration: 1000,
      miner: "t0101180",
      msg: "",
      pieceCid: "b",
      pricePerEpoch: 4882,
      proposalCid:
        "bafyreihej2ejt32ackx5h6n5vfgdjulya6lqtvhim22scnxbnw2kf3f6bm",
      size: 0,
      startEpoch: 0,
      stateId: 0,
      stateName: "",
    },
    pending: false,
    rootCid: "QmUXsfqC1bHbZyD7T341rBXQCfDxA8UaiAmziHcwRRZHsQ",
    time: 1594960738,
  },
];

const retrievalList = [
  {
    addr:
      "t3solnyrrblqlmvi6gmzewzvu62vs7uqvkl22yemzr63bcylbaaqsg44mnipepuafg7efzzx4zwcsi66jgze3q",
    dealInfo: {
      activationEpoch: 0,
      dealId: 0,
      duration: 1000,
      miner: "t0101180",
      msg: "",
      pieceCid: "b",
      pricePerEpoch: 1220,
      proposalCid:
        "bafyreifvjnupitsw3zwykymlnuruqqpyxhmpm5xo6cf72e7hdxscqistea",
      rootCid: "QmctRftYBfbWAtfz9svcprTnmah4eFJXdAUuBhAA6Z6c84",
      size: 0,
      startEpoch: 0,
      stateId: 0,
      stateName: "",
    },
    time: 1594960648,
  },
  {
    addr:
      "t3solnyrrblqlmvi6gmzewzvu62vs7uqvkl22yemzr63bcylbaaqsg44mnipepuafg7efzzx4zwcsi66jgze3q",
    dealInfo: {
      activationEpoch: 0,
      dealId: 0,
      duration: 1000,
      miner: "t0101180",
      msg: "",
      pieceCid: "b",
      pricePerEpoch: 4882,
      proposalCid:
        "bafyreihej2ejt32ackx5h6n5vfgdjulya6lqtvhim22scnxbnw2kf3f6bm",
      rootCid: "QmUXsfqC1bHbZyD7T341rBXQCfDxA8UaiAmziHcwRRZHsQ",
      size: 0,
      startEpoch: 0,
      stateId: 0,
      stateName: "",
    },
    time: 1594960738,
  },
];

export default class SystemPageDeals extends React.Component {
  render() {
    return (
      <SystemPage
        title="SDS: Filecoin Deals"
        description="..."
        url="https://fps.onrender.com/experiences/list-filecoin-deals"
      >
        <System.H1>
          View Storage and Retrieval Deals{" "}
          <ViewSourceLink file="experiences/list-filecoin-deals.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          Here is an example of an experience for getting Filecoin Storage and
          Retrieval deals from{" "}
          <a target="_blank" href="https://github.com/textileio/powergate/">
            Textile's Powergate
          </a>
          .
        </System.P>
        <br />
        <br />
        <System.FilecoinStorageDealsList data={storageList} />
        <br />
        <br />
        <System.FilecoinRetrievalDealsList data={retrievalList} />
        <br />
        <br />
        <br />
        <System.H2>Code</System.H2>
        <hr />
        <br />
        <System.P>
          You must include at least one of{" "}
          <System.CodeText>withIncludeFinal(true)</System.CodeText> or{" "}
          <System.CodeText>withIncludePending(true)</System.CodeText>
          to ensure you get a response for{" "}
          <System.CodeText>listStorageDealRecords</System.CodeText>. Other
          optional <System.CodeText>ffsOptions</System.CodeText> that can be
          used to specify what data you get back are noted in the table below.
        </System.P>
        <br />
        <br />
        <System.CodeBlock>{EXAMPLE_CODE}</System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Accepted Options Properties</System.H2>
        <hr />
        <br />
        <System.P>
          To define what type of data you get back from{" "}
          <System.CodeText>listStorageDealRecords</System.CodeText> and{" "}
          <System.CodeText>listRetrievalDealRecords</System.CodeText>, pass in a
          destructured list of the below{" "}
          <System.CodeText>ffsOption</System.CodeText> functions.
        </System.P>
        <br />
        <System.P>
          Each of the <System.CodeText>ffsOption</System.CodeText> functions
          take a parameter of their own, whose type is detailed in the table
          below.
        </System.P>
        <br />
        <br />
        <Group title="Storage Deals">
          <System.Table
            data={{
              columns: [
                { key: "a", name: "Name", width: "144px" },
                {
                  key: "b",
                  name: "Input Type",
                  width: "104px",
                  type: "OBJECT_TYPE",
                },
                { key: "c", name: "Default", width: "88px" },
                { key: "d", name: "Description", width: "100%" },
              ],
              rows: [
                {
                  id: 1,
                  a: (
                    <span style={{ fontFamily: Constants.font.semiBold }}>
                      withIncludeFinal
                    </span>
                  ),
                  b: "boolean",
                  c: "false",
                  d:
                    "Specifies whether or not to include final deals in the results. Ignored for listRetrievalDealRecords",
                },
                {
                  id: 2,
                  a: (
                    <span style={{ fontFamily: Constants.font.semiBold }}>
                      withIncludePending
                    </span>
                  ),
                  b: "boolean",
                  c: "false",
                  d:
                    "Specifies whether or not to include pending deals in the results. Ignored for listRetrievalDealRecords",
                },
                {
                  id: 3,
                  a: "withDataCids",
                  b: "...string[]",
                  c: "null",
                  d: "Limits the results to deals for the provided data cids",
                },
                {
                  id: 4,
                  a: "withFromAddresses",
                  b: "...string[]",
                  c: "null",
                  d:
                    "Limits the results to deals initiated from the provided wallet addresses",
                },
                {
                  id: 5,
                  a: "withAscending",
                  b: "boolean",
                  c: "false",
                  d: "Specifies to sort the results in ascending order",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
