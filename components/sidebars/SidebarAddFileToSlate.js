import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Actions from "~/common/actions";
import * as UserBehaviors from "~/common/user-behaviors";

import { css } from "@emotion/react";
import { ButtonPrimary, ButtonDisabled } from "~/components/system/components/Buttons";
import { SlatePicker } from "~/components/core/SlatePicker";

const STYLES_HEADER = css`
  font-family: ${Constants.font.semiBold};
  margin-top: 32px;
  margin-bottom: 16px;
`;

export default class SidebarAddFileToSlate extends React.Component {
  state = {
    selected: {},
    loading: false,
    pickerLoading: false,
  };

  componentDidMount = () => {
    if (!this.props.sidebarData || !this.props.sidebarData.files) {
      this.props.onCancel();
    }
  };

  _handleCreateSlate = async () => {
    if (
      Object.values(this.state.selected).some((value) => {
        return !!value;
      })
    ) {
      await this._handleSubmit();
    }
    await this.props.onCancel();
    this.props.onAction({
      type: "SIDEBAR",
      value: "SIDEBAR_CREATE_SLATE",
      data: this.props.sidebarData,
    });
  };

  _handleAdd = (slate) => {
    if (this.state.selected[slate.id]) {
      this.setState({
        selected: { ...this.state.selected, [slate.id]: false },
      });
    } else {
      this.setState({
        selected: { ...this.state.selected, [slate.id]: slate },
      });
    }
  };

  _handleSubmit = async () => {
    await this.setState({ loading: true });
    for (let slate of Object.values(this.state.selected)) {
      if (!slate) continue;
      await UserBehaviors.addToSlate({
        slate,
        files: this.props.sidebarData.files,
        fromSlate: this.props.sidebarData.fromSlate,
      });
    }
    this.setState({ loading: false });
    this.props.onCancel();
  };

  render() {
    return (
      <div>
        <System.P
          style={{
            fontFamily: Constants.font.semiBold,
            fontSize: Constants.typescale.lvl3,
            marginBottom: "64px",
          }}
        >
          Add files to slate
        </System.P>

        <System.P css={STYLES_HEADER}>Slates</System.P>

        <SlatePicker
          slates={this.props.viewer.slates}
          selected={this.state.selected}
          onAdd={this._handleAdd}
          onCreateSlate={this._handleCreateSlate}
          loading={false}
        />

        {Object.keys(this.state.selected).length ? (
          <ButtonPrimary
            full
            onClick={this._handleSubmit}
            style={{ marginTop: 32 }}
            loading={this.state.loading}
          >
            Add to slates
          </ButtonPrimary>
        ) : (
          <ButtonDisabled full style={{ marginTop: 32 }}>
            Add to slates
          </ButtonDisabled>
        )}
      </div>
    );
  }
}
