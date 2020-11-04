import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { ProcessedText } from "~/components/system/components/Typography";
import { ViewAllButton } from "~/components/core/ViewAll";

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

const STYLES_IMAGE_ROW = css`
  overflow: hidden;

  @media (max-width: ${Constants.sizes.mobile}px) {
    justify-content: center;
    margin: 0 -8px;
  }
`;

const STYLES_ITEM_BOX = css`
  height: calc(33.33% - 4px);
  overflow: hidden;
  margin: 0px 0px 4px 4px;
  box-shadow: 0px 0px 0px 1px ${Constants.system.lightBorder} inset;
  cursor: pointer;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 0 8px;
  }
`;

export class SlatePreviewRow extends React.Component {
  render() {
    let numItems = this.props.numItems || 4;
    let objects;
    let length = this.props.slate.data.objects.length;

    let trimmed =
      length > numItems
        ? this.props.slate.data.objects.slice(1, numItems)
        : this.props.slate.data.objects.slice(1, length);
    objects = trimmed.map((each) => (
      <div key={each.id} css={STYLES_ITEM_BOX}>
        <SlateMediaObjectPreview
          blurhash={each.blurhash}
          charCap={30}
          type={each.type}
          url={each.url}
          title={each.title || each.name}
          iconOnly={this.props.small}
        />
      </div>
    ));
    return (
      <div css={STYLES_IMAGE_ROW} style={{ height: `100%`, ...this.props.containerStyle }}>
        {objects}
      </div>
    );
  }
}

const STYLES_BLOCK = css`
  box-shadow: 0 0 0 0.5px ${Constants.system.lightBorder} inset,
    0 0 40px 0 ${Constants.system.shadow};
  padding: 16px;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
  height: 480px;
  width: 100%;

  @media (max-width: ${Constants.sizes.mobile}px) {
    margin: 24px auto;
    height: auto;
  }
`;

const STYLES_TITLE_LINE = css`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: ${Constants.typescale.lvl1};
  margin-bottom: 8px;
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
  font-size: ${Constants.typescale.lvl1};
  margin-bottom: 24px;
  white-space: pre-wrap;
  word-wrap: break-word;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
  }
`;

const STYLES_TITLE = css`
  font-size: ${Constants.typescale.lvl2};
  font-family: ${Constants.font.semiBold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 16px 0 0 0;
`;

const STYLES_PREVIEW = css`
  display: flex;
`;

const STYLES_INFO = css`
  display: flex;
`;

const STYLES_OBJECT_COUNT = css`
  margin-top: 18px;
  width: 15%;
  font-size: ${Constants.typescale.lvl0};
  color: ${Constants.system.darkGray};
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
    console.log(first);

    return (
      <div css={STYLES_BLOCK}>
        <span css={STYLES_MOBILE_HIDDEN}>
          {this.props.slate.data.objects.length === 1 ? (
            <div
              style={{
                width: "100%",
                height: 320,
              }}
            >
              <SlateMediaObjectPreview
                blurhash={first.blurhash}
                centeredImage
                charCap={30}
                type={first.type}
                url={first.url}
                title={first.title || first.name}
              />
            </div>
          ) : (
            <div css={STYLES_PREVIEW}>
              <div
                style={{
                  width: "75%",
                  height: 320,
                }}
              >
                <SlateMediaObjectPreview
                  blurhash={first.blurhash}
                  centeredImage
                  charCap={30}
                  type={first.type}
                  url={first.url}
                  title={first.title || first.name}
                />
              </div>
              <div
                style={{
                  width: `25%`,
                  height: 324,
                }}
              >
                <SlatePreviewRow
                  {...this.props}
                  imageSize={this.props.imageSize}
                  previewStyle={this.props.previewStyle}
                />
              </div>
            </div>
          )}
          <div css={STYLES_INFO}>
            <div css={STYLES_OBJECT_COUNT}>{this.props.slate.data.objects.length}</div>
            <div style={{ width: `85%` }}>
              <div css={STYLES_TITLE_LINE}>
                <div css={STYLES_TITLE}>{this.props.slate.data.name}</div>
              </div>
              {this.props.slate.data.body ? (
                <div css={STYLES_BODY}>
                  <ViewAllButton noButton fullText={this.props.slate.data.body} maxCharacter={100}>
                    <ProcessedText text={this.props.slate.data.body} />
                  </ViewAllButton>
                </div>
              ) : (
                <div style={{ height: "8px" }} />
              )}
            </div>
          </div>
        </span>

        <span css={STYLES_MOBILE_ONLY}>
          <div
            style={{
              width: "100%",
              height: `${this.state.windowWidth - 80}px`,
            }}
          >
            <SlateMediaObjectPreview
              blurhash={first.blurhash}
              centeredImage
              charCap={30}
              type={first.type}
              url={first.url}
              title={first.title || first.name}
            />
          </div>
          <div css={STYLES_TITLE} style={{ marginBottom: 8, fontSize: Constants.typescale.lvl1 }}>
            {this.props.slate.data.name}
          </div>
          <div style={{ marginBottom: 16, fontSize: 12 }}>
            {this.props.slate.data.objects.length} Object
            {this.props.slate.data.objects.length === 1 ? "" : "s"}
          </div>
        </span>
      </div>
    );
  }
}

const STYLES_LINK = css`
  color: ${Constants.system.black};
  text-decoration: none;
  width: 33.33%;

  @media (max-width: ${Constants.sizes.tablet}px) {
    width: 50%;
  }

  @media (max-width: ${Constants.sizes.mobile}px) {
    width: 100%;
  }
`;

const STYLES_SLATES = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  margin-bottom: 48px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    display: block;
  }
`;

export default class SlatePreviewBlocksExternal extends React.Component {
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
        windowWidth -= Constants.sizes.navigation + 96;
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
    return (
      <div css={STYLES_SLATES}>
        {this.props.slates.map((slate) => (
          <a key={slate.id} href={`/${this.props.username}/${slate.slatename}`} css={STYLES_LINK}>
            <SlatePreviewBlock
              imageSize={this.state.imageSize}
              username={this.props.username}
              slate={slate}
            />
          </a>
        ))}
      </div>
    );
  }
}
