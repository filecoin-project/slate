import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import { css } from "@emotion/react";
import { SearchModal } from "~/components/core/SearchModal";
import { dispatchCustomEvent } from "~/common/custom-events";

const STYLES_ICON_ELEMENT = css`
  height: 40px;
  width: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #565151;
  user-select: none;
  cursor: pointer;
  pointer-events: auto;

  :hover {
    color: ${Constants.system.brand};
  }

  svg {
    transform: rotate(0deg);
    transition: 200ms ease transform;
  }
`;

const STYLES_APPLICATION_HEADER = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 104px;
  padding: 12px 48px 0 36px;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 30%,
    rgba(255, 255, 255, 0) 100%
  );

  @media (max-width: ${Constants.sizes.mobile}px) {
    padding: 12px 24px 0 12px;
  }
`;

const STYLES_LEFT = css`
  flex-shrink: 0;
  width: 352px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const STYLES_MIDDLE = css`
  min-width: 10%;
  width: 100%;
  padding: 0 24px 0 48px;
`;

const STYLES_RIGHT = css`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 16px;
`;

export default class ApplicationHeader extends React.Component {
  _handleCreateSearch = (e) => {
    dispatchCustomEvent({
      name: "create-modal",
      detail: { modal: <SearchModal onAction={this.props.onAction} /> },
    });
  };

  render() {
    const isBackDisabled =
      this.props.currentIndex === 0 || this.props.history.length < 2;

    const isForwardDisabled =
      this.props.currentIndex === this.props.history.length - 1 ||
      this.props.history.length < 2;

    return (
      <header css={STYLES_APPLICATION_HEADER}>
        <div css={STYLES_LEFT}>
          <span
            css={STYLES_ICON_ELEMENT}
            style={
              isBackDisabled
                ? { cursor: "not-allowed", color: Constants.system.border }
                : null
            }
            onClick={isBackDisabled ? () => {} : this.props.onBack}
          >
            <SVG.NavigationArrow
              height="24px"
              style={{ transform: `rotate(180deg)` }}
            />
          </span>
          <span
            css={STYLES_ICON_ELEMENT}
            style={
              isForwardDisabled
                ? { cursor: "not-allowed", color: Constants.system.border }
                : null
            }
            onClick={isForwardDisabled ? () => {} : this.props.onForward}
          >
            <SVG.NavigationArrow height="24px" />
          </span>

          <span
            css={STYLES_ICON_ELEMENT}
            style={{ marginLeft: 24 }}
            onClick={this.props.onRehydrate}
          >
            <SVG.Refresh height="20px" />
          </span>

          <span
            css={STYLES_ICON_ELEMENT}
            style={{ marginLeft: 24 }}
            onClick={this._handleCreateSearch}
          >
            <SVG.Search height="20px" />
          </span>
        </div>
        <div css={STYLES_MIDDLE} />
        <div css={STYLES_RIGHT} />
      </header>
    );
  }
}
