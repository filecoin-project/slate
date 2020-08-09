import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";
import * as System from "~/components/system";
import * as SchemaTable from "~/common/schema-table";

import { css } from "@emotion/react";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";

import ChartParent from "~/components/stats/ChartParent";

const STYLES_ROW = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 6px 24px;
`;

const STYLES_TEXT = css`
  min-width: 5%;
  padding-top: 6px;
  width: 100%;
`;

const STYLES_SUBTEXT = css`
  margin-top: 8px;
  font-size: 12px;
`;

const STYLES_SUBTEXT_HIGHLIGHT = css`
  margin-top: 8px;
  font-size: 12px;
  color: ${Constants.system.brand};
`;

const STYLES_ITEM = css`
  margin-bottom: 12px;
  display: inline-flex;
  flex-direction: column;
  max-width: 220px;
  margin-right: 32px;
`;

const STYLES_ITEM_GROUP = css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export default class StatsPage extends React.Component {
  render() {
    const EXAMPLE_MINERS = {
      columns: [
        { key: "miner", id: "id", name: "Miner" },
        {
          key: "cid",
          name: "Raw Byte",
          width: "228px",
          type: "SLATE_LINK",
        },
        {
          key: "amount",
          name: "Adj. Power Growth",
          width: "268px",
          type: "NEW_WINDOW",
        },
        {
          key: "size",
          name: "24h Power Growth",
          type: "NEW_WINDOW",
          width: "188px",
        },
      ],
      rows: [
        {
          id: `file-1`,
          icon: "PNG",
          file: "test-image.jpg",
          miner: "Example Miner A",
          "deal-cid": "23Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          date: Strings.toDate("2014-06-06 00:00:00 UTC"),
          size: Strings.bytesToSize(66666, 3),
          amount: Strings.formatAsFilecoin(2),
          remaining: Strings.getRemainingTime(666666),
          cid: "QmY7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          "retrieval-status": 6,
          errors: 4,
        },
        {
          id: `file-2`,
          icon: "PNG",
          file: "test-image-2.jpg",
          miner: "Example Miner A",
          "deal-cid": "ABCDYh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          date: Strings.toDate("2014-06-07 00:00:00 UTC"),
          size: Strings.bytesToSize(77777, 3),
          amount: Strings.formatAsFilecoin(2.04),
          remaining: Strings.getRemainingTime(777777),
          cid: "w2w2Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          "retrieval-status": 6,
          errors: 0,
        },
        {
          id: `file-3`,
          icon: "PNG",
          file: "test-image-3.jpg",
          miner: "Example Miner B",
          "deal-cid": "FHJKYh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          date: Strings.toDate("2014-06-08 00:00:00 UTC"),
          size: Strings.bytesToSize(88888, 3),
          amount: Strings.formatAsFilecoin(2.08),
          remaining: Strings.getRemainingTime(888888),
          cid: "0707Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          "retrieval-status": 6,
          errors: 0,
        },
        {
          id: `file-4`,
          icon: "PNG",
          file: "test-image-4.jpg",
          miner: "Example Miner C",
          "deal-cid": "KKKKYh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          date: Strings.toDate("2014-06-09 00:00:00 UTC"),
          size: Strings.bytesToSize(9999999, 3),
          amount: Strings.formatAsFilecoin(4.08),
          remaining: Strings.getRemainingTime(999999),
          cid: "1010Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          "retrieval-status": 6,
          errors: 0,
        },
        {
          id: `file-5`,
          icon: "PNG",
          file: "test-image-5.jpg",
          miner: "Example Miner D",
          "deal-cid": "WWWWWWWUquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          date: Strings.toDate("2014-06-10 00:00:00 UTC"),
          size: Strings.bytesToSize(4444444, 3),
          amount: Strings.formatAsFilecoin(5.13),
          remaining: Strings.getRemainingTime(797979),
          cid: "1414Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          "retrieval-status": 6,
          errors: 0,
        },
        {
          id: `file-6`,
          icon: "PNG",
          file: "test-image-6.jpg",
          miner: "Example Miner D",
          "deal-cid": "XXXXUquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          date: Strings.toDate("2014-06-11 00:00:00 UTC"),
          size: Strings.bytesToSize(373737, 3),
          amount: Strings.formatAsFilecoin(12.13),
          remaining: Strings.getRemainingTime(828282),
          cid: "3030Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          "retrieval-status": 6,
          errors: 0,
        },
        {
          id: `file-7`,
          icon: "PNG",
          file: "test-image-7.jpg",
          miner: "Example Miner E",
          "deal-cid": "HGHGHGXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          date: Strings.toDate("2014-06-12 00:00:00 UTC"),
          size: Strings.bytesToSize(373737, 3),
          amount: Strings.formatAsFilecoin(12.13),
          remaining: Strings.getRemainingTime(828282),
          cid: "3030Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          "retrieval-status": 6,
          errors: 1,
        },
        {
          id: `file-8`,
          icon: "PNG",
          file: "example-painting-a-1.jpg",
          miner: "Example Miner F",
          "deal-cid": "12CCCCCLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          date: Strings.toDate("2014-06-12 00:00:00 UTC"),
          size: Strings.bytesToSize(444444, 3),
          amount: Strings.formatAsFilecoin(2.13),
          remaining: Strings.getRemainingTime(8282822),
          cid: "asdfadsfPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          "retrieval-status": 6,
          errors: 0,
        },
        {
          id: `file-9`,
          icon: "PNG",
          file: "example-painting-a-2.jpg",
          miner: "Example Miner F",
          "deal-cid": "CGFDFASXbhXkhBvFoPwmQUSa92pxnxjQuPU",
          date: Strings.toDate("2014-06-12 00:00:00 UTC"),
          size: Strings.bytesToSize(44432, 3),
          amount: Strings.formatAsFilecoin(20.13),
          remaining: Strings.getRemainingTime(182822822),
          cid: "asdfadsfPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          "retrieval-status": 6,
          errors: 0,
        },
        {
          id: `file-10`,
          icon: "PNG",
          file: "example-painting-a-3.jpg",
          miner: "Example Miner F",
          "deal-cid": "HHFGFDDFGvFoPwmQUSa92pxnxjQuPU",
          date: Strings.toDate("2014-07-20 00:00:00 UTC"),
          size: Strings.bytesToSize(44432, 3),
          amount: Strings.formatAsFilecoin(20.13),
          remaining: Strings.getRemainingTime(7432123),
          cid: "asdfadsfPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          "retrieval-status": 6,
          errors: 0,
        },
        {
          id: `file-11`,
          icon: "PNG",
          file: "example-painting-a-4.jpg",
          miner: "Example Miner F",
          "deal-cid": "HHFGFDDFGvFoPwmQUSa92pxnxjQuPU",
          date: Strings.toDate("2014-07-20 00:00:00 UTC"),
          size: Strings.bytesToSize(44432, 3),
          amount: Strings.formatAsFilecoin(20.13),
          remaining: Strings.getRemainingTime(742988),
          cid: "ppdmdfeFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          "retrieval-status": 6,
          errors: 0,
        },
        {
          id: `file-12`,
          icon: "PNG",
          file: "example-painting-a-5.jpg",
          miner: "Example Miner F",
          "deal-cid": "GHREREFGvFoPwmQUSa92pxnxjQuPU",
          date: Strings.toDate("2014-07-24 00:00:00 UTC"),
          size: Strings.bytesToSize(44432, 3),
          amount: Strings.formatAsFilecoin(20.13),
          remaining: Strings.getRemainingTime(320021),
          cid: "dfsffdbPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          "retrieval-status": 6,
          errors: 0,
        },
        {
          id: `file-13`,
          icon: "PNG",
          file: "pending-file-1.jpg",
          miner: "Example Miner G",
          "deal-cid": "13REREFGvFoPwmQUSa92pxnxjQuPU",
          date: Strings.toDate("2014-07-24 00:00:00 UTC"),
          size: Strings.bytesToSize(44432, 3),
          amount: Strings.formatAsFilecoin(20.13),
          remaining: null,
          cid: "13sffdbPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          "retrieval-status": 1,
        },
        {
          id: `file-14`,
          icon: "PNG",
          file: "pending-file-2.jpg",
          miner: "Example Miner G",
          "deal-cid": "14REREFGvFoPwmQUSa92pxnxjQuPU",
          date: Strings.toDate("2014-07-24 00:00:00 UTC"),
          size: Strings.bytesToSize(44432, 3),
          amount: Strings.formatAsFilecoin(20.13),
          remaining: null,
          cid: "14sffdbPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          "retrieval-status": 2,
        },
        {
          id: `file-15`,
          icon: "PNG",
          file: "pending-file-3.jpg",
          miner: "Example Miner H",
          "deal-cid": "15REREFGvFoPwmQUSa92pxnxjQuPU",
          date: Strings.toDate("2014-07-24 00:00:00 UTC"),
          size: Strings.bytesToSize(44432, 3),
          amount: Strings.formatAsFilecoin(20.13),
          remaining: null,
          cid: "15sffdbPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          "retrieval-status": 3,
        },
        {
          id: `file-16`,
          icon: "PNG",
          file: "pending-file-4.jpg",
          miner: "Example Miner I",
          "deal-cid": "16REREFGvFoPwmQUSa92pxnxjQuPU",
          date: Strings.toDate("2014-07-24 00:00:00 UTC"),
          size: Strings.bytesToSize(44432, 3),
          amount: Strings.formatAsFilecoin(20.13),
          remaining: null,
          cid: "16sffdbPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          "retrieval-status": 4,
        },
        {
          id: `file-17`,
          icon: "PNG",
          file: "pending-file-5.jpg",
          miner: "Example Miner J",
          "deal-cid": "17REREFGvFoPwmQUSa92pxnxjQuPU",
          date: Strings.toDate("2014-07-24 00:00:00 UTC"),
          size: Strings.bytesToSize(44432, 3),
          amount: Strings.formatAsFilecoin(20.13),
          remaining: null,
          cid: "17sffdbPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
          "retrieval-status": 5,
        },
      ],
    };
    const title = `Stats Page`;
    const description = "This is to experiment with analytics.";
    const url = "https://slate.host/analytics";

    return (
      <ScenePage>
        <System.H1>Stats</System.H1>

        <Section
          onAction={this.props.onAction}
          onNavigateTo={this.props.onNavigateTo}
          title="Wallet"
          buttons={[
            {
              name: "Export",
              type: "SIDEBAR",
              value: "SIDEBAR_CREATE_WALLET_ADDRESS",
            },
          ]}
        >
          <div css={STYLES_ROW}>
            <div css={STYLES_TEXT}>
              <div css={STYLES_ITEM_GROUP}>
                <div css={STYLES_ITEM}>
                  <div css={STYLES_SUBTEXT}>Total File Balance</div>
                </div>

                <div css={STYLES_ITEM}>
                  <div css={STYLES_SUBTEXT_HIGHLIGHT}>Value(FIL/ATTOLFIL)</div>
                </div>
              </div>
            </div>
          </div>
          <div css={STYLES_ROW}>
            <div css={STYLES_TEXT}>
              <div css={STYLES_ITEM_GROUP}>
                <div css={STYLES_ITEM}>
                  <div css={STYLES_SUBTEXT}>Lifetime File Balance</div>
                </div>

                <div css={STYLES_ITEM}>
                  <div css={STYLES_SUBTEXT_HIGHLIGHT}>Value(FIL/ATTOLFIL)</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section
          onAction={this.props.onAction}
          onNavigateTo={this.props.onNavigateTo}
          title="Network"
          buttons={[
            {
              name: "Export",
              type: "SIDEBAR",
              value: "SIDEBAR_CREATE_WALLET_ADDRESS",
            },
          ]}
        >
          <div css={STYLES_ROW}>
            <div css={STYLES_TEXT}>
              <div css={STYLES_ITEM_GROUP}>
                <div css={STYLES_ITEM}>
                  <div css={STYLES_SUBTEXT}>Total Power</div>
                </div>

                <div css={STYLES_ITEM}>
                  <div css={STYLES_SUBTEXT_HIGHLIGHT}>Value(FIL/ATTOLFIL)</div>
                </div>
              </div>
            </div>
          </div>
          <div css={STYLES_ROW}>
            <div css={STYLES_TEXT}>
              <div css={STYLES_ITEM_GROUP}>
                <div css={STYLES_ITEM}>
                  <div css={STYLES_SUBTEXT}>Tipset Height</div>
                </div>

                <div css={STYLES_ITEM}>
                  <div css={STYLES_SUBTEXT_HIGHLIGHT}>Value(FIL/ATTOLFIL)</div>
                </div>
              </div>
            </div>
          </div>
        </Section>
        <Section title="Miner List">
          <System.Table
            data={EXAMPLE_MINERS}
            name="data"
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
          />
        </Section>

        <Section title="Node">
          <ChartParent></ChartParent>
        </Section>
      </ScenePage>
    );
  }
}
