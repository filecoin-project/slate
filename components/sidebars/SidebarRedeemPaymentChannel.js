import * as React from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

export default class SidebarRedeemPaymentChannel extends React.Component {
  state = {};

  _handleSubmit = () => {
    this.props.onSubmit({});
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
          Redeem payment channel
        </System.P>
      </React.Fragment>
    );
  }
}
