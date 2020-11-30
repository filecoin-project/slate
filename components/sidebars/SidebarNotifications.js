import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css } from "@emotion/react";

const STYLES_NOTIFICATION = css`
  margin-top: 24px;
  font-size: 14px;
`;

const STYLES_NOTIFICATION_DATE = css`
  color: ${Constants.system.darkGray};
`;

const STYLES_NOTIFICATION_BODY = css`
  margin-top: 4px;
`;

export default class SidebarNotifications extends React.Component {
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
          Notifications
        </System.P>
        {this.props.viewer.notifications.map((n) => {
          return (
            <div css={STYLES_NOTIFICATION} key={n.id}>
              <div css={STYLES_NOTIFICATION_DATE}>{Strings.toDate(n.createdAt)}</div>
              <div css={STYLES_NOTIFICATION_BODY}>{n.text}</div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
