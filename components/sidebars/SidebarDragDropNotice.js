import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as System from "~/components/system";

import { css } from "@emotion/react";

export default class SidebarDragDropNotice extends React.Component {
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
        <System.P style={{ fontFamily: Constants.font.semiBold }}>Drag & Drop</System.P>
        <System.P style={{ marginTop: 24 }}>
          Drop your data anywhere on the screen to add it to your data bucket. <br />
          <br />
          If you drop your data onto your slate page you will add the data to your slate.
        </System.P>
      </React.Fragment>
    );
  }
}
