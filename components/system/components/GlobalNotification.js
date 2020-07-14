import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";

import { DescriptionGroup } from "~/components/system/components/fragments/DescriptionGroup";

const STYLES_NOTIFICATION_LIST = css`
  position: fixed;
  display: flex;
  flex-direction: column;
`;

const STYLES_NOTIFICATION = css`
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  background-color: ${Constants.system.white};
  border-radius: 4px;
  padding: 16px;
  padding-bottom: 4px;
  position: relative;
  margin: 4px;
`;

const NOTIF_COLOR_MAP = {
  SUCCESS: Constants.system.green,
  ERROR: Constants.system.red,
  WARNING: Constants.system.yellow,
  INFO: Constants.system.brand,
  GENERIC: Constants.system.black,
};

export class GlobalNotification extends React.Component {
  state = {
    order: [],
    notifs: {},
  };

  componentDidMount = () => {
    window.addEventListener("create-notification", this._handleCreate);
    window.addEventListener("delete-notification", this._handleDelete);
  };

  componentWillUnmount = () => {
    window.removeEventListener("create-notification", this._handleCreate);
    window.removeEventListener("delete-notification", this._handleDelete);
  };

  _handleCreate = (e) => {
    let notifs = this.state.notifs;
    notifs[e.detail.id] = e.detail;
    if (e.detail.timeout) {
      setTimeout(() => this._dispatchDelete(e.detail.id), e.detail.timeout);
    }
    this.setState({
      order: [...this.state.order, e.detail.id],
      notifs,
    });
  };

  _handleDelete = (e) => {
    let notifs = this.state.notifs;
    let order = this.state.order;
    delete notifs[e.detail.id];
    order.splice(order.indexOf(e.detail.id), 1);
    this.setState({ order, notifs });
  };

  _dispatchDelete = (id) => {
    let event = new CustomEvent("delete-notification", { detail: { id: id } });
    window.dispatchEvent(event);
  };

  render() {
    return (
      <div css={STYLES_NOTIFICATION_LIST} style={this.props.style}>
        {this.state.order.map((id) => {
          let notif = this.state.notifs[id];
          return (
            <div
              css={STYLES_NOTIFICATION}
              style={
                notif.dark
                  ? {
                      backgroundColor: Constants.system.black,
                      color: Constants.system.white,
                      boxShadow: `0 1px 4px rgba(0, 0, 0, 0.07), inset 0 0 0 2px ${NOTIF_COLOR_MAP["GENERIC"]}`,
                    }
                  : {
                      boxShadow: `0 1px 4px rgba(0, 0, 0, 0.07), inset 0 0 0 2px ${
                        NOTIF_COLOR_MAP[notif.status || "GENERIC"]
                      }`,
                    }
              }
            >
              <DescriptionGroup
                label={notif.label}
                description={notif.description}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
