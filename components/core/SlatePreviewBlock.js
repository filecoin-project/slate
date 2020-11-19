import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";
import * as Strings from "~/common/strings";

import { css } from "@emotion/core";
import { ProcessedText } from "~/components/system/components/Typography";
import { Boundary } from "~/components/system/components/fragments/Boundary";
import { PopoverNavigation } from "~/components/system/components/PopoverNavigation";

import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";

const MARGIN = 12;
const MIN_WIDTH = 144;

const STYLES_MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_MOBILE_ONLY = css`
  @media (min-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
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
  margin: 0px ${MARGIN}px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 0;
    border-radius: 8;
    width: 100%;
    height: 100%;
  }
`;

const STYLES_IMAGE_ROW = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 160px;
  overflow: hidden;
  margin: 0 -${MARGIN}px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    justify-content: center;
    margin: 0 -8px;
  }
`;

const STYLES_ITEM_BOX = css`
  width: 160px;
  height: 160px;
  margin: 0px ${MARGIN}px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0px 1px ${Constants.system.lightBorder} inset;
  cursor: pointer;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 0 8px;
  }

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_IMAGE_ROW_SMALL = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 56px;
  overflow: hidden;
  margin: 0 -8px;
`;

const STYLES_ITEM_BOX_SMALL = css`
  width: 56px;
  height: 56px;
  margin: 0px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0px 1px ${Constants.system.lightBorder} inset;
`;

export class SlatePreviewRow extends React.Component {
  render() {
    let numItems = this.props.numItems || 5;
    let objects;
    if (this.props.slate.data.objects.length === 0) {
      objects = [
        <div css={STYLES_CREATE_NEW} key="add-files">
          <SVG.Plus height="24px" />
          <div>Add Files</div>
        </div>,
      ];
    } else {
      let trimmed =
        this.props.slate.data.objects.length > numItems
          ? this.props.slate.data.objects.slice(0, numItems)
          : this.props.slate.data.objects;
      objects = trimmed.map((each) => (
        <div
          key={each.id}
          css={this.props.small ? STYLES_ITEM_BOX_SMALL : STYLES_ITEM_BOX}
          style={{
            height: this.props.imageSize,
            width: this.props.imageSize,
            ...this.props.style,
          }}
        >
          <SlateMediaObjectPreview
            blurhash={each.blurhash}
            charCap={30}
            type={each.type}
            url={each.url}
            style={this.props.previewStyle}
            title={each.title || each.name}
            iconOnly={this.props.small}
            previewImage={each.previewImage}
          />
        </div>
      ));
    }
    // let numExtra = this.props.numItems
    //   ? this.props.numItems - objects.length
    //   : 5 - objects.length;
    // let extra = [];
    // for (let i = 0; i < numExtra; i++) {
    //   extra.push(
    //     <div
    //       key={`extra-${i}`}
    //       css={this.props.small ? STYLES_EMPTY_BOX_SMALL : STYLES_EMPTY_BOX}
    //     />
    //   );
    // }
    return (
      <div
        css={this.props.small ? STYLES_IMAGE_ROW_SMALL : STYLES_IMAGE_ROW}
        style={{ height: this.props.imageSize, ...this.props.containerStyle }}
      >
        {objects}
        {/* {extra} */}
      </div>
    );
  }
}

const STYLES_BLOCK = css`
  box-shadow: 0 0 0 1px ${Constants.system.lightBorder} inset, 0 0 40px 0 ${Constants.system.shadow};
  border-radius: 8px;
  padding: 32px 40px;
  font-size: 12px;
  text-align: left;
  margin: 24px auto 48px auto;
  max-width: ${Constants.sizes.desktop}px;
  cursor: pointer;

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 16px;
    margin: 24px auto;
  }
`;

const STYLES_TITLE_LINE = css`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: ${Constants.typescale.lvl1};
  margin-bottom: 16px;
  overflow-wrap: break-word;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_COPY_INPUT = css`
  pointer-events: none;
  position: absolute;
  opacity: 0;
`;

const STYLES_TAG = css`
  margin-right: 16px;
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
  word-wrap: break-word;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_ICON_BOX = css`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: ${Constants.system.darkGray};

  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_CONTEXT_MENU = css`
  position: absolute;
`;

const STYLES_TITLE = css`
  font-size: ${Constants.typescale.lvl2};
  font-family: ${Constants.font.semiBold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 16px;
`;

export class SlatePreviewBlock extends React.Component {
  _ref;
  _test;

  state = {
    showMenu: false,
    copyValue: "",
    windowWidth: 360,
  };

  componentDidMount = () => {
    this.calculateWidth();
    window.addEventListener("resize", this.calculateWidth);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.calculateWidth);
  };

  calculateWidth = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  _handleCopy = (e, value) => {
    e.stopPropagation();
    this.setState({ copyValue: value }, () => {
      this._ref.select();
      document.execCommand("copy");
      this._handleHide();
    });
  };

  _handleClick = (e) => {
    e.stopPropagation();
    if (this.state.showMenu) {
      this._handleHide();
      return;
    }
    this.setState({ showMenu: true });
    // dispatchCustomEvent({
    //   name: "show-tooltip",
    //   detail: {
    //     id: `slate-tooltip-${this.props.slate.id}`,
    //   },
    // });
  };

  _handleHide = (e) => {
    this.setState({ showMenu: false });
    // dispatchCustomEvent({
    //   name: "hide-tooltip",
    //   detail: {
    //     id: `slate-tooltip-${this.props.slate.id}`,
    //   },
    // });
  };

  render() {
    if (!this.props.isOwner && !this.props.slate.data.objects.length) {
      return null;
    }
    let first = this.props.slate.data.objects ? this.props.slate.data.objects[0] : null;
    let contextMenu = (
      <React.Fragment>
        <Boundary
          captureResize={true}
          captureScroll={false}
          enabled
          onOutsideRectEvent={this._handleHide}
        >
          <PopoverNavigation
            style={{
              top: "16px",
              right: "-12px",
            }}
            navigation={
              this.props.isOwner
                ? [
                    {
                      text: "Copy URL",
                      onClick: (e) =>
                        this._handleCopy(
                          e,
                          Strings.getURLFromPath(
                            `/${this.props.username}/${this.props.slate.slatename}`
                          )
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
                          Strings.getURLFromPath(
                            `/${this.props.username}/${this.props.slate.slatename}`
                          )
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
      <div css={STYLES_BLOCK}>
        <div css={STYLES_TITLE_LINE}>
          <div css={STYLES_TITLE}>{this.props.slate.data.name}</div>
          {this.props.isOwner ? (
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
                  color: Constants.system.darkGray,
                  borderColor: Constants.system.darkGray,
                }}
              >
                Private
              </div>
            )
          ) : (
            <div />
          )}
          {this.props.external ? null : this.props.username ? (
            <div
              style={{ marginLeft: "auto" }}
              ref={(c) => {
                this._test = c;
              }}
            >
              {/* <TooltipWrapper
                id={`slate-tooltip-${this.props.slate.id}`}
                type="body"
                content={contextMenu}
                horizontal="left"
                vertical="below"
              > */}
              <div css={STYLES_ICON_BOX} onClick={this._handleClick}>
                <SVG.MoreHorizontal height="24px" />
                {this.state.showMenu ? <div css={STYLES_CONTEXT_MENU}>{contextMenu}</div> : null}
              </div>
              {/* </TooltipWrapper> */}
            </div>
          ) : null}
        </div>
        {this.props.slate.data.body ? (
          <div css={STYLES_BODY}>
            <ProcessedText text={this.props.slate.data.body} />
          </div>
        ) : (
          <div style={{ height: "8px" }} />
        )}
        <span css={STYLES_MOBILE_ONLY}>
          <div css={STYLES_TITLE} style={{ marginBottom: 8, fontSize: Constants.typescale.lvl1 }}>
            {this.props.slate.data.name}
          </div>
          <div style={{ marginBottom: 16, fontSize: 12 }}>
            {this.props.slate.data.objects.length} Object
            {this.props.slate.data.objects.length === 1 ? "" : "s"}
          </div>
          <div
            style={{
              width: "100%",
              height: `${this.state.windowWidth - 80}px`,
            }}
          >
            {first ? (
              <SlateMediaObjectPreview
                blurhash={first.blurhash}
                centeredImage
                charCap={30}
                type={first.type}
                url={first.url}
                style={{ borderRadius: 8 }}
                imageStyle={{ borderRadius: 8 }}
                title={first.title || first.name}
                previewImage={first.previewImage}
              />
            ) : (
              <div css={STYLES_CREATE_NEW} key="add-files">
                <SVG.Plus height="24px" />
                <div>Add Files</div>
              </div>
            )}
          </div>
        </span>
        <span css={STYLES_MOBILE_HIDDEN}>
          <SlatePreviewRow
            {...this.props}
            imageSize={this.props.imageSize}
            previewStyle={this.props.previewStyle}
          />
        </span>
      </div>
    );
  }
}

const STYLES_LINK = css`
  color: ${Constants.system.black};
  text-decoration: none;
`;

export default class SlatePreviewBlocks extends React.Component {
  state = {
    imageSize: 56,
  };

  componentDidMount = () => {
    this.calculateWidth();
    this.debounceInstance = this.debounce(this.calculateWidth, 350);
    window.addEventListener("resize", this.debounceInstance);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.debounceInstance);
  };

  debounce = (fn, time) => {
    let timer;

    return () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(fn, time);
    };
  };

  calculateWidth = () => {
    let windowWidth = window.innerWidth;
    if (windowWidth > Constants.sizes.mobile) {
      if (this.props.external) {
        windowWidth -= 48;
      } else {
        windowWidth -= 96;
      }
      windowWidth = Math.min(windowWidth, Constants.sizes.desktop);
      windowWidth -= 80; //NOTE(martina): 48px padding on scene page, 40px padding on block
      for (let i = this.props.numItems || 5; i > 0; i--) {
        let width = (windowWidth - MARGIN * 2 * (i - 1)) / i;
        if (width < MIN_WIDTH) {
          continue;
        }
        this.setState({ imageSize: width });
        return;
      }
    }
    this.setState({ imageSize: windowWidth - 48 - 32 }); //NOTE(martina): 24px padding on scene page, 16px padding on block on mobile
  };

  render() {
    if (this.props.external) {
      return this.props.slates.map((slate) => (
        <a key={slate.id} href={`/${this.props.username}/${slate.slatename}`} css={STYLES_LINK}>
          <SlatePreviewBlock
            external
            imageSize={this.state.imageSize}
            username={this.props.username}
            slate={slate}
          />
        </a>
      ));
    }
    return this.props.slates.map((slate) => (
      <div
        key={slate.id}
        onClick={() =>
          this.props.onAction({
            type: "NAVIGATE",
            value: "V1_NAVIGATION_SLATE",
            data: { decorator: "SLATE", ...slate },
          })
        }
      >
        <SlatePreviewBlock
          isOwner={this.props.isOwner}
          username={this.props.username}
          imageSize={this.state.imageSize}
          slate={slate}
        />
      </div>
    ));
  }
}
