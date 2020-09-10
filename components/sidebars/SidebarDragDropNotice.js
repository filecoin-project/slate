import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as System from "~/components/system";

import { css } from "@emotion/react";

const STYLES_ICONS = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 64px 0;
`;

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
        <System.P
          style={{
            fontFamily: Constants.font.semiBold,
            fontSize: Constants.typescale.lvl3,
          }}
        >
          Drag & Drop
        </System.P>
        <div css={STYLES_ICONS}>
          <SVG.Sound height="24px" style={{ margin: "0 16px" }} />
          <SVG.Document height="24px" style={{ margin: "0 16px" }} />
          <SVG.Image height="24px" style={{ margin: "0 16px" }} />
          <SVG.Book height="24px" style={{ margin: "0 16px" }} />
          <SVG.Video height="24px" style={{ margin: "0 16px" }} />
        </div>
        <System.P style={{ marginTop: 24 }}>
          Drag and drop a file anywhere on the screen to add it to your data.{" "}
          <br />
          <br />
          Dropping a file while on a slate page will add it to that slate.
        </System.P>
      </React.Fragment>
    );
  }
}
