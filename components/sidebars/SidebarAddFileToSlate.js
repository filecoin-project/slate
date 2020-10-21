import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Validations from "~/common/validations";
import * as SVG from "~/common/svg";
import * as Actions from "~/common/actions";

import { dispatchCustomEvent } from "~/common/custom-events";
import { css } from "@emotion/react";
import {
  ButtonPrimary,
  ButtonDisabled,
} from "~/components/system/components/Buttons";
import { SlatePicker } from "~/components/core/SlatePicker";

const STYLES_SLATE_NAME = css`
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: ${Constants.font.medium};
`;

const STYLES_HEADER = css`
  font-family: ${Constants.font.semiBold};
  margin-top: 32px;
  margin-bottom: 16px;
`;

const STYLES_SLATE_LIST = css`
  max-height: 400px;
  overflow-y: scroll;
`;

const STYLES_SLATE_LINE = css`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background-color: ${Constants.system.white};
  margin-bottom: 1px;
  cursor: pointer;
`;

const STYLES_ICON_BOX = css`
  display: flex;
  align-items: center;
`;

export default class SidebarAddFileToSlate extends React.Component {
  state = {
    selected: {},
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
    let data = this.props.sidebarData.files.map((file) => {
      return { title: file.name, ...file };
    });
    for (let slate of Object.values(this.state.selected)) {
      if (!slate) continue;
      const addResponse = await Actions.addFileToSlate({
        slate,
        data,
        fromSlate: this.props.sidebarData.fromSlate,
      });

      if (!addResponse) {
        dispatchCustomEvent({
          name: "create-alert",
          detail: {
            alert: {
              message:
                "We're having trouble connecting right now. Please try again later",
            },
          },
        });
        return;
      }

      if (addResponse.error) {
        dispatchCustomEvent({
          name: "create-alert",
          detail: { alert: { decorator: addResponse.decorator } },
        });
        return;
      }

      const { added, skipped } = addResponse;
      let message = `${added || 0} file${added !== 1 ? "s" : ""} uploaded. `;
      if (skipped) {
        message += `${skipped || 0} duplicate / existing file${
          added !== 1 ? "s were" : " was"
        } skipped.`;
      }
      dispatchCustomEvent({
        name: "create-alert",
        detail: {
          alert: { message, status: !added ? null : "INFO" },
        },
      });
    }
    await this.props.onRehydrate();
    dispatchCustomEvent({
      name: "remote-update-carousel",
      detail: null,
    });
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
        />

        {Object.keys(this.state.selected).length ? (
          <ButtonPrimary
            full
            onClick={this._handleSubmit}
            style={{ marginTop: 32 }}
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
