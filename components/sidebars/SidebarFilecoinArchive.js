import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as SVG from "~/common/svg";
import * as System from "~/components/system";

import { css } from "@emotion/react";
import { dispatchCustomEvent } from "~/common/custom-events";

export default class SidebarFilecoinArchive extends React.Component {
  state = { response: null };

  async componentDidMount() {}

  _handleMakeDeal = async () => {
    const response = await Actions.archive();

    alert("A new Filecoin deal is being processed.");
  };

  _handleSubmit = async (e) => {
    if (e) {
      e.persist();
    }

    this.props.onSidebarLoading(true);
    await this._handleMakeDeal();
    await this.props.onRehydrate();
    this.props.onSidebarLoading(false);
  };

  _handleCancel = () => {
    this.props.onCancel();
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <System.P
          style={{
            fontFamily: Constants.font.semiBold,
            fontSize: Constants.typescale.lvl3,
          }}
        >
          Make Filecoin storage deal
        </System.P>

        <System.P style={{ marginTop: 24 }}>
          This will archive all of your data onto the Filecoin Network.
        </System.P>

        <System.ButtonPrimary
          full
          style={{ marginTop: 48 }}
          onClick={this._handleSubmit}
          loading={this.props.sidebarLoading}
        >
          Make storage deal
        </System.ButtonPrimary>

        {this.state.response ? (
          <div style={{ whiteSpace: "pre-wrap", marginTop: 48 }}>
            {JSON.stringify(this.state.response, null, 2)}
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}
