import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import { LineChart } from "~/vendor/react-chartkick";
import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";

const STYLES_ROW = css`
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const STYLES_LEFT = css`
  font-size: ${Constants.typescale.lvl2};
  padding-right: 24px;
  flex-shrink: 0;
`;

const STYLES_RIGHT = css`
  font-family: ${Constants.font.semiBold};
  font-size: ${Constants.typescale.lvl2};
  color: ${Constants.system.brand};
  min-width: 10%;
  width: 100%;
  padding-left: 24px;
`;

const STYLES_TEXT_CTA = css`
  text-decoration: underline;
  color: ${Constants.system.brand};
  font-weight: 400;
  cursor: pointer;
  transition: 200ms ease all;

  :hover {
    color: ${Constants.system.green};
  }
`;

const STYLES_GRAPH_OBJECT = css`
  border-radius: 4px;
  background: ${Constants.system.brand};
  padding: 8px;
`;

const STYLES_GRAPH_ROW = css`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 48px;
`;

const STYLES_GRAPH_ROW_LEFT = css`
  width: 50%;
  padding: 16px 8px 16px 24px;
`;

const STYLES_GRAPH_ROW_RIGHT = css`
  width: 50%;
  padding: 16px 24px 16px 8px;
`;

const STYLES_OPTION = css`
  color: ${Constants.system.white};
  margin-left: 24px;
  font-family: ${Constants.font.semiBold};
  font-size: 12px;
  line-height: 0.2px;
  text-transform: uppercase;
  border-radius: 4px;
  transition: 200ms ease all;

  :hover {
    cursor: pointer;
    color: ${Constants.system.green};
  }
`;

const STYLES_OPTIONS = css`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 24px 12px 24px 12px;
`;

const STYLES_ITEM_GROUP = css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 8px 0 8px;
`;

const STYLES_ITEM = css`
  margin-top: 24px;
  display: inline-flex;
  flex-direction: column;
  min-width: 144px;
  margin-right: 24px;
`;

const STYLES_FOCUS = css`
  font-size: ${Constants.typescale.lvl1};
  font-family: ${Constants.font.medium};
  overflow-wrap: break-word;
  width: 100%;

  strong {
    font-family: ${Constants.font.semiBold};
    font-weight: 400;
  }
`;

const STYLES_SUBTEXT = css`
  margin-top: 8px;
  font-size: 12px;
`;

export default class SceneStats extends React.Component {
  state = {};

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <ScenePage>
        <System.H1>Stats</System.H1>

        <Section
          onAction={this.props.onAction}
          onNavigateTo={this.props.onNavigateTo}
          title="Wallet"
          buttons={[
            {
              name: "Reset",
              type: "ACTION",
              value: "ACTION_RESET_STATS_WALLET",
            },
            {
              name: "Export",
              type: "DOWNLOAD",
              value: "CSV_STATS_WALLET",
            },
          ]}
        >
          <div css={STYLES_ROW}>
            <div css={STYLES_LEFT}>Total FIL Balance</div>
            <div css={STYLES_RIGHT}>Value (FIL/ATTOFIL)</div>
          </div>
          <div css={STYLES_ROW}>
            <div css={STYLES_LEFT}>Lifetime FIL Balance</div>
            <div css={STYLES_RIGHT}>Value (FIL/ATTOFIL)</div>
          </div>
          <div css={STYLES_ROW}>
            <div css={STYLES_LEFT}>FIL spent today</div>
            <div css={STYLES_RIGHT}>Value (FIL/ATTOFIL)</div>
          </div>
          <div css={STYLES_ROW}>
            <div css={STYLES_LEFT}>Total FIL spent</div>
            <div css={STYLES_RIGHT}>Value (FIL/ATTOFIL)</div>
          </div>
          <div css={STYLES_ROW}>
            <div css={STYLES_LEFT}>Total FIL received</div>
            <div css={STYLES_RIGHT}>Value (FIL/ATTOFIL)</div>
          </div>
          <div css={STYLES_ROW}>
            <div css={STYLES_LEFT}>
              Total wallet addresses{" "}
              <strong
                css={STYLES_TEXT_CTA}
                onClick={() =>
                  this.props.onNavigateTo({ id: "V1_NAVIGATION_SLATES" })
                }
              >
                (view)
              </strong>
            </div>
            <div css={STYLES_RIGHT}>Value (Number)</div>
          </div>
          <div css={STYLES_ROW}>
            <div css={STYLES_LEFT}>
              Total payment channels{" "}
              <strong
                css={STYLES_TEXT_CTA}
                onClick={() =>
                  this.props.onNavigateTo({ id: "V1_NAVIGATION_SLATES" })
                }
              >
                (view)
              </strong>
            </div>
            <div css={STYLES_RIGHT}>Value (Number)</div>
          </div>
          <div css={STYLES_ROW}>
            <div css={STYLES_LEFT}>
              Total FIL in payment channels{" "}
              <strong
                css={STYLES_TEXT_CTA}
                onClick={() =>
                  this.props.onNavigateTo({ id: "V1_NAVIGATION_SLATES" })
                }
              >
                (view)
              </strong>
            </div>
            <div css={STYLES_RIGHT}>Value (FIL/ATTOLFIL)</div>
          </div>
        </Section>

        <Section
          onAction={this.props.onAction}
          onNavigateTo={this.props.onNavigateTo}
          title="Node"
          buttons={[
            {
              name: "Reset",
              type: "ACTION",
              value: "ACTION_RESET_STATS_NODE",
            },
            {
              name: "Export",
              type: "DOWNLOAD",
              value: "CSV_STATS_NODE",
            },
          ]}
        >
          <div css={STYLES_GRAPH_ROW}>
            <div css={STYLES_GRAPH_ROW_LEFT}>
              <div css={STYLES_GRAPH_OBJECT}>
                <div css={STYLES_OPTIONS}>
                  <span css={STYLES_OPTION}>1 Day</span>
                  <span css={STYLES_OPTION}>1 Week</span>
                  <span css={STYLES_OPTION}>1 Month</span>
                  <span css={STYLES_OPTION}>6 Month</span>
                  <span css={STYLES_OPTION}>1 Year</span>
                </div>
                <LineChart
                  data={[
                    ["2017-01-01 00:00:00 UTC", 1],
                    ["2018-01-01 00:00:00 UTC", 5],
                    ["2019-01-01 00:00:00 UTC", 25],
                    ["2020-01-01 00:00:00 UTC", 200],
                    [new Date(), 400],
                  ]}
                  library={{
                    backgroundColor: Constants.system.brand,
                    scales: {
                      xAxes: [
                        {
                          gridLines: { color: Constants.system.white },
                          ticks: {
                            fontColor: Constants.system.white,
                          },
                        },
                      ],
                      yAxes: [
                        {
                          gridLines: { color: Constants.system.white },
                          display: false,
                        },
                      ],
                    },
                  }}
                  dataset={{ lineTension: 0, pointRadius: 0, borderWidth: 1 }}
                  width="100%"
                  height="640px"
                  colors={[Constants.system.white]}
                />
              </div>

              <div css={STYLES_ITEM_GROUP}>
                <div css={STYLES_ITEM}>
                  <div css={STYLES_FOCUS}>12 kb/s</div>
                  <div css={STYLES_SUBTEXT}>Current incoming</div>
                </div>
                <div css={STYLES_ITEM}>
                  <div css={STYLES_FOCUS}>14 kb/s</div>
                  <div css={STYLES_SUBTEXT}>Average incoming</div>
                </div>
              </div>
            </div>
            <div css={STYLES_GRAPH_ROW_RIGHT}>
              <div css={STYLES_GRAPH_OBJECT}>
                <div css={STYLES_OPTIONS}>
                  <span css={STYLES_OPTION}>1 Day</span>
                  <span css={STYLES_OPTION}>1 Week</span>
                  <span css={STYLES_OPTION}>1 Month</span>
                  <span css={STYLES_OPTION}>6 Month</span>
                  <span css={STYLES_OPTION}>1 Year</span>
                </div>
                <LineChart
                  data={[
                    ["2017-01-01 00:00:00 UTC", 1],
                    ["2018-01-01 00:00:00 UTC", 2],
                    ["2019-01-01 00:00:00 UTC", 4],
                    ["2020-01-01 00:00:00 UTC", 5],
                    [new Date(), 4],
                  ]}
                  library={{
                    backgroundColor: Constants.system.brand,
                    scales: {
                      xAxes: [
                        {
                          gridLines: { color: Constants.system.white },
                          ticks: {
                            fontColor: Constants.system.white,
                          },
                        },
                      ],
                      yAxes: [
                        {
                          display: false,
                        },
                      ],
                    },
                  }}
                  dataset={{ lineTension: 0, pointRadius: 0, borderWidth: 1 }}
                  width="100%"
                  height="640px"
                  colors={[Constants.system.white]}
                />
              </div>

              <div css={STYLES_ITEM_GROUP}>
                <div css={STYLES_ITEM}>
                  <div css={STYLES_FOCUS}>11 kb/s</div>
                  <div css={STYLES_SUBTEXT}>Current outgoing</div>
                </div>
                <div css={STYLES_ITEM}>
                  <div css={STYLES_FOCUS}>23 kb/s</div>
                  <div css={STYLES_SUBTEXT}>Average outgoing</div>
                </div>
              </div>
            </div>
          </div>

          <div css={STYLES_ROW}>
            <div css={STYLES_LEFT}>Node start date</div>
            <div css={STYLES_RIGHT}>March, 20th, 2020</div>
          </div>
          <div css={STYLES_ROW}>
            <div css={STYLES_LEFT}>
              Favorite peers <strong css={STYLES_TEXT_CTA}>(view)</strong>
            </div>
            <div css={STYLES_RIGHT}>42 peers</div>
          </div>
          <div css={STYLES_ROW}>
            <div css={STYLES_LEFT}>Your location</div>
            <div css={STYLES_RIGHT}>Norway</div>
          </div>
        </Section>

        <Section
          onAction={this.props.onAction}
          onNavigateTo={this.props.onNavigateTo}
          title="Data"
          buttons={[
            {
              name: "Reset",
              type: "ACTION",
              value: "ACTION_RESET_STATS_DATA",
            },
            {
              name: "Export",
              type: "DOWNLOAD",
              value: "CSV_STATS_DATA",
            },
          ]}
        >
          <div css={STYLES_GRAPH_ROW}>
            <div css={STYLES_GRAPH_ROW_LEFT}>
              <div css={STYLES_GRAPH_OBJECT}>
                <div css={STYLES_OPTIONS}>
                  <span css={STYLES_OPTION}>1 Day</span>
                  <span css={STYLES_OPTION}>1 Week</span>
                  <span css={STYLES_OPTION}>1 Month</span>
                  <span css={STYLES_OPTION}>6 Month</span>
                  <span css={STYLES_OPTION}>1 Year</span>
                </div>
                <LineChart
                  data={[
                    ["2017-01-01 00:00:00 UTC", 1],
                    ["2018-01-01 00:00:00 UTC", 5],
                    ["2019-01-01 00:00:00 UTC", 25],
                    ["2020-01-01 00:00:00 UTC", 200],
                    [new Date(), 400],
                  ]}
                  library={{
                    backgroundColor: Constants.system.brand,
                    scales: {
                      xAxes: [
                        {
                          gridLines: { color: Constants.system.white },
                          ticks: {
                            fontColor: Constants.system.white,
                          },
                        },
                      ],
                      yAxes: [
                        {
                          display: false,
                        },
                      ],
                    },
                  }}
                  dataset={{ lineTension: 0, pointRadius: 0, borderWidth: 1 }}
                  width="100%"
                  height="640px"
                  colors={[Constants.system.white]}
                />
              </div>

              <div css={STYLES_ITEM_GROUP}>
                <div css={STYLES_ITEM}>
                  <div css={STYLES_FOCUS}>55 items</div>
                  <div css={STYLES_SUBTEXT}>Currently stored</div>
                </div>
                <div css={STYLES_ITEM}>
                  <div css={STYLES_FOCUS}>5 items</div>
                  <div css={STYLES_SUBTEXT}>Stored per day</div>
                </div>
                <div css={STYLES_ITEM}>
                  <div css={STYLES_FOCUS}>200 items</div>
                  <div css={STYLES_SUBTEXT}>Total</div>
                </div>
              </div>
            </div>
            <div css={STYLES_GRAPH_ROW_RIGHT}>
              <div css={STYLES_GRAPH_OBJECT}>
                <div css={STYLES_OPTIONS}>
                  <span css={STYLES_OPTION}>1 Day</span>
                  <span css={STYLES_OPTION}>1 Week</span>
                  <span css={STYLES_OPTION}>1 Month</span>
                  <span css={STYLES_OPTION}>6 Month</span>
                  <span css={STYLES_OPTION}>1 Year</span>
                </div>
                <LineChart
                  data={[
                    ["2017-01-01 00:00:00 UTC", 1],
                    ["2018-01-01 00:00:00 UTC", 5],
                    ["2019-01-01 00:00:00 UTC", 25],
                    ["2020-01-01 00:00:00 UTC", 200],
                    [new Date(), 400],
                  ]}
                  library={{
                    backgroundColor: Constants.system.brand,
                    scales: {
                      xAxes: [
                        {
                          gridLines: { color: Constants.system.white },
                          ticks: {
                            fontColor: Constants.system.white,
                          },
                        },
                      ],
                      yAxes: [
                        {
                          display: false,
                        },
                      ],
                    },
                  }}
                  dataset={{ lineTension: 0, pointRadius: 0, borderWidth: 1 }}
                  width="100%"
                  height="640px"
                  colors={[Constants.system.white]}
                />
              </div>
              <div css={STYLES_ITEM_GROUP}>
                <div css={STYLES_ITEM}>
                  <div css={STYLES_FOCUS}>7 items</div>
                  <div css={STYLES_SUBTEXT}>Currently retrieved</div>
                </div>
                <div css={STYLES_ITEM}>
                  <div css={STYLES_FOCUS}>20 items</div>
                  <div css={STYLES_SUBTEXT}>Retrieved per day</div>
                </div>
                <div css={STYLES_ITEM}>
                  <div css={STYLES_FOCUS}>300 items</div>
                  <div css={STYLES_SUBTEXT}>Total</div>
                </div>
              </div>
            </div>
          </div>

          <div css={STYLES_ROW}>
            <div css={STYLES_LEFT}>Data shared today</div>
            <div css={STYLES_RIGHT}>Value (GB)</div>
          </div>
          <div css={STYLES_ROW}>
            <div css={STYLES_LEFT}>Total amount of data stored</div>
            <div css={STYLES_RIGHT}>Value (GB)</div>
          </div>
          <div css={STYLES_ROW}>
            <div css={STYLES_LEFT}>Data retrieved today</div>
            <div css={STYLES_RIGHT}>Value (GB)</div>
          </div>
          <div css={STYLES_ROW}>
            <div css={STYLES_LEFT}>Total amount of data retrieved</div>
            <div css={STYLES_RIGHT}>Value (GB)</div>
          </div>
        </Section>

        <Section
          onAction={this.props.onAction}
          onNavigateTo={this.props.onNavigateTo}
          title="Most commonly retrieved CIDs"
          buttons={[
            {
              name: "Export",
              type: "DOWNLOAD",
              value: "CSV_MOST_COMMON_CIDS",
            },
          ]}
        >
          <System.Table
            data={{
              columns: [
                {
                  key: "deal-cid",
                  name: "Deal CID",
                  copyable: true,
                  tooltip: "Deal CID explainer",
                  width: "100%",
                },
                {
                  key: "data-cid",
                  name: "Data CID",
                  copyable: true,
                  tooltip: "Data CID explainer",
                  width: "296px",
                },
                { key: "miner", name: "Miner", width: "228px" },
              ],
              rows: [
                {
                  id: 1,
                  "data-cid": "44Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
                  "deal-cid": "55Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
                  miner: "Example Miner A",
                },
                {
                  id: 2,
                  "data-cid": "14Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
                  "deal-cid": "23Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
                  miner: "Example Miner B",
                },
                {
                  id: 3,
                  "data-cid": "88Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
                  "deal-cid": "89Y7Yh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
                  miner: "Example Miner C",
                },
                {
                  id: 4,
                  "data-cid": "AAAAYh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
                  "deal-cid": "BBBBYh4UquoXHLPFo2XbhXkhBvFoPwmQUSa92pxnxjQuPU",
                  miner: "Example Miner D",
                },
              ],
            }}
            selectedRowId={this.state.table_stats_common}
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
            onChange={this._handleChange}
            name="table_stats_common"
          />
        </Section>
        <Section
          onAction={this.props.onAction}
          onNavigateTo={this.props.onNavigateTo}
          title="Top storage deals by GB"
          buttons={[
            {
              name: "Export",
              type: "DOWNLOAD",
              value: "CSV_TOP_STORAGE_DEALS_GB",
            },
          ]}
        >
          <System.Table
            data={{
              columns: [
                { key: "file", name: "File", type: "FILE_LINK" },
                { key: "miner", name: "Miner", width: "228px" },
                { key: "size", name: "Size" },
                {
                  key: "date",
                  name: "Date uploaded",
                  width: "168px",
                  tooltip:
                    "This date represents when the file was first uploaded to the network.",
                },
              ],
              rows: [],
            }}
            selectedRowId={this.state.table_storage_deals_gb}
            onChange={this._handleChange}
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
            name="table_storage_deals_db"
          />
        </Section>
        <Section
          onAction={this.props.onAction}
          onNavigateTo={this.props.onNavigateTo}
          title="Top storage deals by FIL"
          buttons={[
            {
              name: "Export",
              type: "DOWNLOAD",
              value: "CSV_TOP_STORAGE_DEALS_FIL",
            },
          ]}
        >
          <System.Table
            data={{
              columns: [
                { key: "file", name: "File", type: "FILE_LINK" },
                { key: "miner", name: "Miner", width: "228px" },
                { key: "amount", name: "Amount" },
                {
                  key: "date",
                  name: "Date uploaded",
                  width: "168px",
                  tooltip:
                    "This date represents when the file was first uploaded to the network.",
                },
              ],
              rows: [],
            }}
            selectedRowId={this.state.table_storage_deals_fil}
            onChange={this._handleChange}
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
            name="table_storage_deals_fil"
          />
        </Section>
      </ScenePage>
    );
  }
}
