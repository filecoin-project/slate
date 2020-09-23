import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";
import * as Validations from "~/common/validations";
import * as SVG from "~/common/svg";
import * as Actions from "~/common/actions";

import { dispatchCustomEvent } from "~/common/custom-events";
import { css } from "@emotion/react";
import { ButtonPrimary } from "~/components/system/components/Buttons";

const STYLES_SLATE_NAME = css`
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: ${Constants.font.medium};
`;

const STYLES_HEADER = css`
  font-family: ${Constants.font.semiBold};
  font-size: 18px;
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
      const addResponse = await Actions.addFileToSlate({ slate, data });

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
      } else if (addResponse.error) {
        dispatchCustomEvent({
          name: "create-alert",
          detail: { alert: { decorator: addResponse.decorator } },
        });
        return;
      }
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
        <div
          css={STYLES_SLATE_LINE}
          style={{ marginBottom: 32 }}
          onClick={this._handleCreateSlate}
        >
          <SVG.Plus
            height="24px"
            style={{ color: Constants.system.brand, marginRight: 8 }}
          />
          <div
            css={STYLES_SLATE_NAME}
            style={{ color: Constants.system.brand }}
          >
            Create new slate
          </div>
        </div>
        <div css={STYLES_SLATE_LIST}>
          {this.props.viewer.slates.map((slate) => (
            <div css={STYLES_SLATE_LINE} onClick={() => this._handleAdd(slate)}>
              <div css={STYLES_ICON_BOX}>
                {this.state.selected[slate.id] ? (
                  <SVG.Slate height="24px" style={{ marginRight: 8 }} />
                ) : (
                  <SVG.PlusCircle
                    height="24px"
                    style={{ color: Constants.system.darkGray, marginRight: 8 }}
                  />
                )}
              </div>
              <div
                css={STYLES_SLATE_NAME}
                style={
                  this.state.selected[slate.id]
                    ? null
                    : { color: Constants.system.darkGray }
                }
              >
                {slate.data.name || slate.slatename}
              </div>
            </div>
          ))}
        </div>
        <ButtonPrimary
          full
          onClick={this._handleSubmit}
          style={{ marginTop: 32 }}
        >
          Add to slates
        </ButtonPrimary>
      </div>
    );
  }
}
