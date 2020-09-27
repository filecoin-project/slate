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
  color: ${Constants.system.darkGray};

  :hover {
    color: ${Constants.system.grayBlack};
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
          css={STYLES_SLATE_LINE}
          style={{ marginBottom: 32 }}
          onClick={this.props.onCreateSlate}
        >
          <SVG.Plus
            height="24px"
            style={{
              marginRight: 8,
              pointerEvents: "none",
            }}
          />
          <div css={STYLES_SLATE_NAME}>Create new slate</div>
        </div>
        <div css={STYLES_SLATE_LIST} style={this.props.style}>
          {this.props.slates.map((slate) => (
            <div
              key={slate.id}
              css={STYLES_SLATE_LINE}
              onClick={() => this.props.onAdd(slate)}
            >
              <div css={STYLES_ICON_BOX}>
                {this.props.loading &&
                this.props.loading.id &&
                this.props.loading.id === slate.id ? (
                  <LoaderSpinner
                    style={{ height: 20, width: 20, margin: "2px 8px 2px 2px" }}
                  />
                ) : this.props.selected[slate.id] ? (
                  <SVG.Slate
                    height="24px"
                    style={{
                      marginRight: 8,
                      pointerEvents: "none",
                      color: Constants.system.black,
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
                css={STYLES_SLATE_NAME}
                style={{
                  color: this.props.selected[slate.id]
                    ? Constants.system.black
                    : "inherit",
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
