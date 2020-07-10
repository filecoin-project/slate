import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

const STYLES_CONTAINER = css`
  font-family: ${Constants.font.text};
  box-sizing: border-box;
  padding: 24px;
  border-radius: 4px;
  background-color: ${Constants.system.white};
  border: 1px solid ${Constants.system.border};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  max-width: 320px;
  width: 100%;
`;

export class SendAddressFilecoin extends React.Component {
  static defaultProps = {
    onSubmit: () => {},
  };

  state = {
    source: "",
    target: "",
    amount: "",
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  _handleSubmit = () => {
    this.props.onSubmit({
      ...this.state,
    });
  };

  render() {
    return (
      <div css={STYLES_CONTAINER}>
        <System.Input
          label="From"
          name="source"
          value={this.state.source}
          onChange={this._handleChange}
        />

        <System.Input
          containerStyle={{ marginTop: 24 }}
          label="To"
          name="target"
          value={this.state.target}
          onChange={this._handleChange}
        />

        <System.Input
          containerStyle={{ marginTop: 24 }}
          label="Amount (Filecoin)"
          name="amount"
          type="number"
          value={this.state.amount}
          onChange={this._handleChange}
        />

        <System.ButtonPrimaryFull
          style={{ marginTop: 48 }}
          onClick={this._handleSubmit}
        >
          Send {this.state.amount} FIL
        </System.ButtonPrimaryFull>
      </div>
    );
  }
}
