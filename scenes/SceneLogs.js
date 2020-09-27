import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

import Pill from "~/components/core/Pill";
import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";

const TAB_GROUP = [
  {
    value: "1",
    label: (
      <React.Fragment>
        All logs{" "}
        <Pill
          style={{
            backgroundColor: Constants.system.black,
            color: Constants.system.white,
            position: "relative",
            marginLeft: 8,
          }}
        >
          14
        </Pill>
      </React.Fragment>
    ),
  },
  {
    value: "2",
    label: (
      <React.Fragment>
        Node logs{" "}
        <Pill
          style={{
            backgroundColor: Constants.system.black,
            color: Constants.system.white,
            position: "relative",
            marginLeft: 8,
          }}
        >
          14
        </Pill>
      </React.Fragment>
    ),
  },
  {
    value: "3",
    label: (
      <React.Fragment>
        Sealing logs{" "}
        <Pill
          style={{
            backgroundColor: Constants.system.black,
            color: Constants.system.white,
            position: "relative",
            marginLeft: 8,
          }}
        >
          56
        </Pill>
      </React.Fragment>
    ),
  },
  {
    value: "4",
    label: (
      <React.Fragment>
        Miner logs{" "}
        <Pill
          style={{
            backgroundColor: Constants.system.black,
            color: Constants.system.white,
            position: "relative",
            marginLeft: 8,
          }}
        >
          56
        </Pill>
      </React.Fragment>
    ),
  },
];

const STYLES_SCENE = css`
  max-width: ${Constants.sizes.desktop}px;
  width: 100%;
  padding: 24px 0 128px 0;
`;

const STYLES_LOGS = css`
  color: ${Constants.system.white};
  background-color: ${Constants.system.black};
  font-family: "mono";
  font-size: 14px;
  white-space: pre-wrap;
  padding: 24px;
  border-radius: 0 0 4px 4px;
`;

export default class SceneLogs extends React.Component {
  state = { sub_navigation: "1" };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <ScenePage>
        <System.H1>Logs</System.H1>

        <System.CardTabGroup
          style={{ marginTop: 48 }}
          name="sub_navigation"
          options={TAB_GROUP}
          value={this.state.sub_navigation}
          onChange={this._handleChange}
        />

        {this.state.sub_navigation === "1" ? (
          <Section
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
            title={
              <React.Fragment>
                All logs{" "}
                <Pill
                  style={{
                    backgroundColor: Constants.system.black,
                    color: Constants.system.white,
                    position: "relative",
                    marginLeft: 8,
                  }}
                >
                  14
                </Pill>
              </React.Fragment>
            }
            buttons={[
              {
                name: "Clear",
                type: "ACTION",
                value: "CLEAR_LOGS_ALL",
              },
              {
                name: "Export",
                type: "DOWNLOAD",
                value: "CSV_LOGS_ALL",
              },
            ]}
          >
            <div css={STYLES_LOGS}>
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
            </div>
          </Section>
        ) : null}

        {this.state.sub_navigation === "2" ? (
          <Section
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
            title={
              <React.Fragment>
                Node logs{" "}
                <Pill
                  style={{
                    backgroundColor: Constants.system.black,
                    color: Constants.system.white,
                    position: "relative",
                    marginLeft: 8,
                  }}
                >
                  14
                </Pill>
              </React.Fragment>
            }
            buttons={[
              {
                name: "Clear",
                type: "ACTION",
                value: "CLEAR_LOGS_NODE",
              },
              {
                name: "Export",
                type: "DOWNLOAD",
                value: "CSV_LOGS_NODE",
              },
            ]}
          >
            <div css={STYLES_LOGS}>
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
            </div>
          </Section>
        ) : null}

        {this.state.sub_navigation === "3" ? (
          <Section
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
            title={
              <React.Fragment>
                Sealing logs{" "}
                <Pill
                  style={{
                    backgroundColor: Constants.system.black,
                    color: Constants.system.white,
                    position: "relative",
                    marginLeft: 8,
                  }}
                >
                  56
                </Pill>
              </React.Fragment>
            }
            buttons={[
              {
                name: "Clear",
                type: "ACTION",
                value: "CLEAR_LOGS_SEALING",
              },
              {
                name: "Export",
                type: "DOWNLOAD",
                value: "CSV_LOGS_SEALING",
              },
            ]}
          >
            <div css={STYLES_LOGS}>
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
            </div>
          </Section>
        ) : null}

        {this.state.sub_navigation === "4" ? (
          <Section
            onAction={this.props.onAction}
            onNavigateTo={this.props.onNavigateTo}
            title={
              <React.Fragment>
                Mining logs{" "}
                <Pill
                  style={{
                    backgroundColor: Constants.system.black,
                    color: Constants.system.white,
                    position: "relative",
                    marginLeft: 8,
                  }}
                >
                  56
                </Pill>
              </React.Fragment>
            }
            buttons={[
              {
                name: "Clear",
                type: "ACTION",
                value: "CLEAR_LOGS_MINING",
              },
              {
                name: "Export",
                type: "DOWNLOAD",
                value: "CSV_LOGS_MINING",
              },
            ]}
          >
            <div css={STYLES_LOGS}>
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
              message in mempool has too high of a nonce (5000 > 4686) <br />
            </div>
          </Section>
        ) : null}
      </ScenePage>
    );
  }
}
