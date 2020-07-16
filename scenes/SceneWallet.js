import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";
import * as System from "~/components/system";
import * as SchemaTable from "~/common/schema-table";

import { css } from "@emotion/react";

import Section from "~/components/core/Section";
import ScenePage from "~/components/core/ScenePage";

const STYLES_GROUP = css`
  padding: 24px;
`;

const STYLES_TARGET = css`
  position: fixed;
  top: -1;
  left: -1;
  height: 1px;
  width: 1px;
  overflow: hidden;
  visibility: hidden;
`;

const STYLES_QR_CODE = css`
  background: ${Constants.system.white};
  border-radius: 4px;
  max-width: 188px;
  width: 100%;
  padding: 4px;
  border: 1px solid ${Constants.system.border};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
`;

const STYLES_QR_CODE_IMAGE = css`
  display: block;
  margin: 0;
  padding: 0;
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

const STYLES_ROW = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px;
`;

const STYLES_TEXT = css`
  min-width: 5%;
  padding-top: 6px;
  width: 100%;
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

const STYLES_ITEM_CLICKABLE = css`
  margin-top: 24px;
  display: inline-flex;
  flex-direction: column;
  max-width: 180px;
  margin-right: 32px;
  transition: 200ms ease color;

  :hover {
    cursor: pointer;
    color: ${Constants.system.brand};
  }
`;

const STYLES_ITEM_GROUP = css`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export default class SceneWallet extends React.Component {
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
    alert(`${text} Added to clipboard.`);
  };

  render() {
    let addresses = {};
    let lastAddress;

    this.props.viewer.addresses.forEach((a) => {
      addresses[a.address] = a;
      lastAddress = a.address;
    });

    const currentAddress = this.props.selected.address
      ? addresses[this.props.selected.address]
      : addresses[lastAddress];

    // TODO(jim):
    // Capture this state.
    if (!currentAddress) {
      return null;
    }

    let transactions = [];
    if (currentAddress.transactions) {
      transactions = [...currentAddress.transactions];
    }

    return (
      <ScenePage>
        <System.H1>Wallet</System.H1>

        <Section
          onAction={this.props.onAction}
          onNavigateTo={this.props.onNavigateTo}
          title="Addresses"
          buttons={[
            {
              name: "Create a new address",
              type: "SIDEBAR",
              value: "SIDEBAR_CREATE_WALLET_ADDRESS",
            },
          ]}
        >
          <div css={STYLES_GROUP}>
            <System.SelectMenu
              label="Select your address"
              name="address"
              value={this.props.selected.address}
              category="address"
              onChange={this._handleWalletChange}
              options={this.props.viewer.addresses}
            />
          </div>

          <div css={STYLES_ROW} style={{ marginTop: 24 }}>
            <div css={STYLES_TEXT}>
              <div>
                <div css={STYLES_FOCUS}>
                  {this.state.visible ? (
                    currentAddress.address
                  ) : (
                    <span css={STYLES_FOCUS_EMPAHSIS}>Hidden</span>
                  )}
                </div>
                <div css={STYLES_SUBTEXT}>Filecoin address</div>
              </div>

              <div style={{ marginTop: 24 }}>
                <div css={STYLES_FOCUS}>
                  {currentAddress.name}{" "}
                  {this.props.viewer.settings_cold_default_address ===
                  currentAddress.address ? (
                    <strong css={STYLES_FOCUS_EMPAHSIS}>(Primary)</strong>
                  ) : null}
                </div>
                <div css={STYLES_SUBTEXT}>Filecoin address alias</div>
              </div>

              <div css={STYLES_ITEM_GROUP}>
                <div css={STYLES_ITEM}>
                  <div css={STYLES_FOCUS}>
                    {Strings.formatNumber(currentAddress.balance)}
                  </div>
                  <div css={STYLES_SUBTEXT}>Filecoin</div>
                </div>

                <div css={STYLES_ITEM}>
                  <div css={STYLES_FOCUS}>{currentAddress.type}</div>
                  <div css={STYLES_SUBTEXT}>Address type</div>
                </div>
              </div>

              <div style={{ marginTop: 24 }}>
                <System.ButtonPrimary
                  onClick={() =>
                    this.props.onAction({
                      name: "Send Filecoin",
                      type: "SIDEBAR",
                      value: "SIDEBAR_WALLET_SEND_FUNDS",
                    })
                  }
                >
                  Send Filecoin
                </System.ButtonPrimary>
              </div>
            </div>
            <div css={STYLES_ACTIONS}>
              <span
                css={STYLES_CIRCLE_BUTTON}
                onClick={this._handleMakeAddressVisible}
                style={{
                  marginRight: 16,
                  backgroundColor: this.state.visible
                    ? null
                    : Constants.system.brand,
                }}
              >
                <SVG.Privacy height="16px" />
              </span>
              <span
                css={STYLES_CIRCLE_BUTTON}
                onClick={() => this._handleCopy(currentAddress.address)}
              >
                <SVG.CopyAndPaste height="16px" />
              </span>
            </div>
          </div>
        </Section>
      </ScenePage>
    );
  }
}
