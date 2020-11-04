import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as System from "~/components/system";

import { css } from "@emotion/core";
import { dispatchCustomEvent } from "~/common/custom-events";
import { LoaderSpinner } from "~/components/system/components/Loaders";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";
import ScenePageHeader from "~/components/core/ScenePageHeader";

const STYLES_GROUP = css`
  padding: 24px;
`;

const STYLES_ROW = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px;
  width: 100%;
`;

const STYLES_CIRCLE_BUTTON = css`
  height: 48px;
  width: 48px;
  border-radius: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${Constants.system.black};
  color: ${Constants.system.white};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  cursor: pointer;
`;

const STYLES_TEXT = css`
  min-width: 5%;
  padding-top: 6px;
  width: 100%;
  overflow-wrap: break-word;
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

const STYLES_FOCUS_EMPAHSIS = css`
  color: ${Constants.system.brand};
`;

const STYLES_SUBTEXT = css`
  margin-top: 8px;
  font-size: 12px;
  overflow-wrap: break-word;
`;

const STYLES_ACTIONS = css`
  flex-shrink: 0;
  padding-left: 24px;
`;

const STYLES_ITEM = css`
  margin-top: 24px;
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

let mounted = false;

export default class SceneWallet extends React.Component {
  state = {};

  async componentDidMount() {
    if (mounted) {
      return null;
    }

    mounted = true;
    let networkViewer;
    try {
      const response = await fetch("/api/network");
      const json = await response.json();
      networkViewer = json.data;
    } catch (e) {}

    this.setState({
      networkViewer,
    });
  }

  componentWillUnmount() {
    mounted = false;
  }

  state = { table_transaction: null, visible: false };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _handleWalletChange = (e) => {
    this.setState({ visible: false });
    this.props.onSelectedChange(e);
  };

  _handleMakeAddressVisible = () => {
    this.setState({ visible: !this.state.visible });
  };

  _handleCopy = (text) => {
    Strings.copyText(text);
    dispatchCustomEvent({
      name: "create-alert",
      detail: { alert: { message: "Copied to clipboard!", status: "INFO" } },
    });
  };

  render() {
    // TODO(jim): Temporary because of read only Filecoin Addresses
    const { networkViewer } = this.state;

    const addressMap = {};
    const addresses = [];
    let selected = null;

    if (networkViewer) {
      networkViewer.powerInfo.balancesList.forEach((a) => {
        addressMap[a.addr.addr] = { ...a.addr, balance: a.balance };
        addresses.push({ ...a.addr, balance: a.balance });
      });

      if (addresses.length) {
        selected = addresses[0];
      }

      let transactions = [];
      if (selected.transactions) {
        transactions = [...selected.transactions];
      }
    }

    return (
      <ScenePage>
        <ScenePageHeader title="Wallet">
          This is your receive only wallet address. You can deposit Filecoin to your address here.
          You can not send Filecoin from this wallet to other people. <br />
          <br />
          Please read our{" "}
          <a href="/terms" target="_blank">
            terms of service
          </a>{" "}
          for more details.
        </ScenePageHeader>

        {networkViewer ? (
          <Section
            onAction={this.props.onAction}
            title="Your Filecoin address"
            style={{ maxWidth: `688px`, minWidth: "auto" }}
            buttons={
              [
                /*
            {
              name: "Create a new address",
              type: "SIDEBAR",
              value: "SIDEBAR_CREATE_WALLET_ADDRESS",
            },
            */
              ]
            }
          >
            {/* <div css={STYLES_GROUP}>
            <System.SelectMenu
              label="Select your address"
              name="address"
              value={selected.addr}
              category="address"
              onChange={this._handleWalletChange}
              options={addresses}
            />
          </div> */}

            <div css={STYLES_ROW} style={{ marginTop: 24 }}>
              <div css={STYLES_TEXT}>
                <div>
                  <div css={STYLES_FOCUS}>
                    {this.state.visible ? (
                      selected.addr
                    ) : (
                      <span css={STYLES_FOCUS_EMPAHSIS}>Hidden</span>
                    )}
                  </div>
                  <div css={STYLES_SUBTEXT}>Filecoin address</div>
                </div>

                <div style={{ marginTop: 24 }}>
                  <div css={STYLES_FOCUS}>
                    {selected.name}{" "}
                    {networkViewer.settings_cold_default_address === selected.addr ? (
                      <strong css={STYLES_FOCUS_EMPAHSIS}>(Primary)</strong>
                    ) : null}
                  </div>
                  <div css={STYLES_SUBTEXT}>Filecoin address alias</div>
                </div>

                <div css={STYLES_ITEM_GROUP}>
                  <div css={STYLES_ITEM}>
                    <div css={STYLES_FOCUS}>
                      {Strings.formatAsFilecoinConversion(selected.balance)}
                    </div>
                    <div css={STYLES_SUBTEXT}>Filecoin</div>
                  </div>

                  <div css={STYLES_ITEM}>
                    <div css={STYLES_FOCUS}>{selected.type}</div>
                    <div css={STYLES_SUBTEXT}>Address type</div>
                  </div>
                </div>
              </div>
              <div css={STYLES_ACTIONS}>
                <span
                  css={STYLES_CIRCLE_BUTTON}
                  onClick={this._handleMakeAddressVisible}
                  style={{
                    marginRight: 16,
                    backgroundColor: this.state.visible ? null : Constants.system.brand,
                  }}
                >
                  <SVG.Privacy height="16px" />
                </span>
                <span css={STYLES_CIRCLE_BUTTON} onClick={() => this._handleCopy(selected.address)}>
                  <SVG.CopyAndPaste height="16px" />
                </span>
              </div>
            </div>
          </Section>
        ) : (
          <LoaderSpinner style={{ marginTop: 48, height: 32, width: 32 }} />
        )}
      </ScenePage>
    );
  }
}
