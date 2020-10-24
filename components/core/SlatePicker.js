import * as React from "react";
import * as Strings from "~/common/strings";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";

const STYLES_SLATE_NAME = css`
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: ${Constants.font.medium};
  color: ${Constants.system.black};
`;

const STYLES_SLATE_NAME_DARK = css`
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: ${Constants.font.medium};
  color: ${Constants.system.white};
`;

const STYLES_NO_VISIBLE_SCROLL = css`
  overflow-y: scroll;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  ::-webkit-scrollbar {
    width: 0px;
    display: none;
  }
  ::-webkit-scrollbar-track {
    background: ${Constants.system.foreground};
  }
  ::-webkit-scrollbar-thumb {
    background: ${Constants.system.darkGray};
  }
`;

const STYLES_SLATE_LIST = css`
  ${STYLES_NO_VISIBLE_SCROLL}
  max-height: 316px;
`;

const STYLES_SLATE_LINE = css`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background-color: ${Constants.system.white};
  margin-bottom: 1px;
  cursor: pointer;
  color: ${Constants.system.darkGray};

  :hover {
    color: ${Constants.system.grayBlack};
  }
`;

const STYLES_SLATE_LINE_DARK = css`
  ${STYLES_SLATE_LINE}
  background-color: transparent;
  border-bottom: 1px solid #3c3c3c;

  :hover {
    color: ${Constants.system.brand};
  }

  :last-child {
    border: none;
  }
`;

const STYLES_SLATE_CREATE = css`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  background-color: ${Constants.system.white};
  cursor: pointer;
  color: ${Constants.system.darkGray};

  :hover {
    color: ${Constants.system.grayBlack};
  }
`;

const STYLES_SLATE_CREATE_DARK = css`
  ${STYLES_SLATE_CREATE}
  background-color: transparent;
  border: 1px solid #3c3c3c;

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_ICON_BOX = css`
  display: flex;
  align-items: center;
`;

export class SlatePicker extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div
          css={this.props.dark ? STYLES_SLATE_CREATE_DARK : STYLES_SLATE_CREATE}
          onClick={this.props.onCreateSlate}
        >
          <SVG.Plus
            height="24px"
            style={{
              marginRight: 8,
              pointerEvents: "none",
            }}
          />
          <div>Create new slate</div>
        </div>
        <br />
        <div
          css={STYLES_SLATE_LIST}
          style={{ border: this.props.dark ? "1px solid #3c3c3c" : "none" }}
        >
          {this.props.slates.map((slate) => (
            <div
              key={slate.id}
              css={this.props.dark ? STYLES_SLATE_LINE_DARK : STYLES_SLATE_LINE}
              onClick={() => this.props.onAdd(slate)}
            >
              <div css={STYLES_ICON_BOX}>
                {this.props.loading &&
                this.props.loading.id &&
                this.props.loading.id === slate.id ? (
                  <LoaderSpinner style={{ height: 20, width: 20, margin: "2px 8px 2px 2px" }} />
                ) : this.props.selected[slate.id] ? (
                  <SVG.Slate
                    height="24px"
                    style={{
                      marginRight: 8,
                      pointerEvents: "none",
                      color: this.props.dark ? Constants.system.white : Constants.system.black,
                    }}
                  />
                ) : (
                  <SVG.PlusCircle
                    height="24px"
                    style={{
                      marginRight: 8,
                      pointerEvents: "none",
                    }}
                  />
                )}
              </div>
              <div
                css={this.props.dark ? STYLES_SLATE_NAME_DARK : STYLES_SLATE_NAME}
                style={{
                  color: this.props.selected[slate.id] ? this.props.selectedColor : "inherit",
                }}
              >
                {Strings.getPresentationSlateName(slate)}
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}
