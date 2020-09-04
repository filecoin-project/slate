import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { ProcessedText } from "~/components/system/components/Typography";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { PopoverNavigation } from "~/components/system/components/PopoverNavigation";
import { TooltipWrapper } from "~/components/system/components/fragments/GlobalTooltip";
import { dispatchCustomEvent } from "~/common/custom-events";

import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";

const STYLES_IMAGE_ROW = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 160px;
  overflow: hidden;
  margin: 0px -18px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    justify-content: center;
  }
`;

const STYLES_ITEM_BOX = css`
  width: 160px;
  height: 160px;
  margin: 0px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0px 1px rgba(229, 229, 229, 0.5) inset;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 0 auto;
  }
`;

const STYLES_IMAGE_ROW_SMALL = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 56px;
  overflow: hidden;
  margin: 0px -8px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    justify-content: center;
  }
`;

const STYLES_ITEM_BOX_SMALL = css`
  width: 56px;
  height: 56px;
  margin: 0px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0px 1px rgba(229, 229, 229, 0.5) inset;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 0 auto;
  }
`;

export function SlatePreviewRow(props) {
  let numItems = props.numItems || 5;
  let objects =
    props.slate.data.objects.length > numItems
      ? props.slate.data.objects.slice(0, numItems)
      : props.slate.data.objects;
  return (
    <div
      css={props.small ? STYLES_IMAGE_ROW_SMALL : STYLES_IMAGE_ROW}
      style={props.containerStyle}
    >
      {objects.map((each) => (
        <div
          key={each.id}
          css={props.small ? STYLES_ITEM_BOX_SMALL : STYLES_ITEM_BOX}
          style={props.style}
        >
          <SlateMediaObjectPreview
            type={each.type}
            url={each.url}
            style={{ border: "none", ...props.previewStyle }}
            title={each.title || each.name}
            small={props.small}
          />
        </div>
      ))}
    </div>
  );
}

const STYLES_BLOCK = css`
  border: 1px solid ${Constants.system.border};
  border-radius: 8px;
  padding: 32px 40px;
  font-size: 12px;
  text-align: left;
  margin: 24px auto 48px auto;
  max-width: 1026px;
  cursor: pointer;
`;

const STYLES_TITLE_LINE = css`
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  font-size: ${Constants.typescale.lvl1};
  margin-bottom: 16px;
`;

const STYLES_BUTTON = css`
  display: inline-block;
  margin-left: 12px;
  padding: 4px 8px;
  cursor: pointer;
  color: ${Constants.system.brand};
`;

const STYLES_COPY_INPUT = css`
  pointer-events: none;
  position: absolute;
  tabindex: -1;
  opacity: 0;
`;

const STYLES_TAG = css`
  margin-left: 16px;
  padding: 4px 8px;
  border-radius: 2px;
  border: 1px solid ${Constants.system.black};
  color: ${Constants.system.black};
  font-family: ${Constants.font.semiBold};
  font-size: 0.9rem;
`;

const STYLES_BODY = css`
  font-family: ${Constants.font.text};
  font-size: 0.9rem;
  margin-bottom: 24px;
  line-height: 20px;
  white-space: pre-wrap;
`;

const STYLES_CREATE_NEW = css`
  color: ${Constants.system.darkGray};
  box-shadow: 0px 0px 0px 1px rgba(229, 229, 229, 0.5) inset;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
`;

const STYLES_ICON_BOX = css`
  height: 24px;
  width: 24px;
  display: block;
  align-items: center;
  justify-content: center;
`;

export default class SlatePreviewBlock extends React.Component {
  _ref;
  _test;

  state = {
    isMenuOpen: false,
    copyValue: "",
  };

  _componentDidMount = () => {
    console.log(this._test.getBoundingClientRect());
  };

  _handleCopy = (e, value) => {
    e.stopPropagation();
    this.setState({ copyValue: value }, () => {
      this._ref.select();
      document.execCommand("copy");
    });
  };

  _handleClick = (e) => {
    e.stopPropagation();
    console.log("show tooltip");
    dispatchCustomEvent({
      name: "show-tooltip",
      detail: {
        id: `slate-tooltip-${this.props.slate.id}`,
      },
    });
  };

  _handleHide = (e) => {
    console.log("hide tooltip");
    dispatchCustomEvent({
      name: "hide-tooltip",
      detail: {
        id: `slate-tooltip-${this.props.slate.id}`,
      },
    });
  };

  render() {
    if (!this.props.editing && !this.props.slate.data.objects.length) {
      return null;
    }
    let contextMenu = (
      <React.Fragment>
        <Boundary
          captureResize={true}
          captureScroll={false}
          enabled
          onOutsideRectEvent={this._handleHide}
          style={this.props.style}
        >
          <PopoverNavigation
            style={{
              left: "0px",
              top: "16px",
            }}
            navigation={
              this.props.editing
                ? [
                    {
                      text: "Copy URL",
                      onClick: (e) =>
                        this._handleCopy(
                          e,
                          `https://slate.host/${this.props.slate.owner.username}/${this.props.slate.slatename}`
                        ),
                    },
                    {
                      text: "Copy slate ID",
                      onClick: (e) => this._handleCopy(e, this.props.slate.id),
                    },
                  ]
                : [
                    {
                      text: "Copy URL",
                      onClick: (e) =>
                        this._handleCopy(
                          e,
                          `https://slate.host/${this.props.slate.owner.username}/${this.props.slate.slatename}`
                        ),
                    },
                  ]
            }
          />
        </Boundary>
        <input
          readOnly
          ref={(c) => {
            this._ref = c;
          }}
          value={this.state.copyValue}
          css={STYLES_COPY_INPUT}
        />
      </React.Fragment>
    );

    return (
      <div
        css={STYLES_BLOCK}
        style={
          this.props.external
            ? { backgroundColor: Constants.system.white, border: "none" }
            : {}
        }
      >
        <div css={STYLES_TITLE_LINE}>
          <div
            style={{
              fontSize: Constants.typescale.lvl2,
              fontFamily: Constants.font.semiBold,
            }}
          >
            {this.props.slate.data.name}
          </div>
          {this.props.editing ? (
            this.props.slate.data.public ? (
              <div
                css={STYLES_TAG}
                style={{
                  borderColor: Constants.system.brand,
                  color: Constants.system.brand,
                }}
              >
                Public
              </div>
            ) : (
              <div
                css={STYLES_TAG}
                style={{
                  color: "rgba(0,0,0,0.25)",
                  borderColor: "rgba(0,0,0,0.25)",
                }}
              >
                Private
              </div>
            )
          ) : null}
          {this.props.external ? null : (
            <div
              style={{ justifySelf: "flex-end" }}
              ref={(c) => {
                this._test = c;
              }}
            >
              <TooltipWrapper
                id={`slate-tooltip-${this.props.slate.id}`}
                type="body"
                content={contextMenu}
                horizontal="left"
                vertical="below"
              >
                <div css={STYLES_ICON_BOX} onClick={this._handleClick}>
                  <SVG.MoreHorizontal height="16px" />
                </div>
              </TooltipWrapper>
            </div>
          )}
        </div>
        {this.props.slate.data.body ? (
          <div css={STYLES_BODY}>
            <ProcessedText text={this.props.slate.data.body} />
          </div>
        ) : (
          <div style={{ height: "8px" }} />
        )}
        {this.props.slate.data.objects.length ? (
          <SlatePreviewRow
            {...this.props}
            previewStyle={this.props.previewStyle}
          />
        ) : (
          <div css={STYLES_CREATE_NEW}>
            <SVG.Plus height="24px" />
            <div>Add Files</div>
          </div>
        )}
      </div>
    );
  }
}
