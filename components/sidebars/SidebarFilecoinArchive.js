import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as Actions from "~/common/actions";
import * as SVG from "~/common/svg";
import * as System from "~/components/system";

import { css } from "@emotion/react";

export default class SidebarFilecoinArchive extends React.Component {
  async componentDidMount() {}

  _handleMakeDeal = async () => {
    const response = await Actions.archive();
    console.log(response);
    alert("TODO: Still working on archiving issues.");
  };

  _handleSubmit = async (e) => {
    if (e) {
      e.persist();
    }

    this.props.onSidebarLoading(true);
    await this._handleMakeDeal();
    await this.props.onSubmit({});
  };

  _handleCancel = () => {
    this.props.onCancel();
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.props);

    return (
      <React.Fragment>
        <System.P style={{ fontFamily: Constants.font.semiBold }}>
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
      </React.Fragment>
    );
  }
}
