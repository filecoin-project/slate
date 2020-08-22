import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/components/system/svg";

import { Responsive, WidthProvider } from "react-grid-layout";
import { css } from "@emotion/react";
import { LoaderSpinner } from "~/components/system/components/Loaders";

import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";
import CircleButtonLight from "~/components/core/CircleButtonLight";

// NOTE(jim): I broke my own rules to do this. Sorry.
const STYLES_ITEM = css`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;

  :hover {
    figure {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const STYLES_CONTAINER = css`
  padding: 24px;
`;

const STYLES_ACTIONS = css`
  bottom: 16px;
  right: 8px;
  position: fixed;
  flex-direction: column;
  display: flex;
`;

const STYLES_BUTTON = css`
  opacity: 0;
  visibility: hidden;
  transition: 200ms ease all;
  margin: auto;
  position: absolute;
  top: 16px;
  left: 16px;
`;

const STYLES_ACTION_BUTTON = css`
  font-family: ${Constants.font.code};
  font-size: 10px;
  text-transform: uppercase;
  user-select: none;
  height: 32px;
  padding: 0 16px 0 16px;
  border-radius: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: ${Constants.zindex.modal};
  background: ${Constants.system.pitchBlack};
  transition: 200ms ease all;
  color: ${Constants.system.white};
  cursor: pointer;
  margin: auto;
  margin: 4px 16px 4px 16px;
  flex-shrink: 0;
  text-decoration: none;
  :hover {
    background-color: ${Constants.system.black};
  }
`;

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const COLUMN_MAP = { lg: 12, md: 8, sm: 6, xs: 4, xxs: 2 };

export const generateLayout = (items) => {
  return items.map((item, i) => {
    var y = Math.ceil(Math.random() * 4) + 1;

    return {
      x: (i * 2) % 10,
      y: 0,
      w: 2,
      h: 2,
      minW: 2,
      minH: 2,
      // NOTE(jim): Library quirk thats required.
      i: i.toString(),
    };
  });
};

export default class Slate extends React.Component {
  static defaultProps = {
    onLayoutChange: () => {},
  };

  state = {
    currentBreakpoint: "lg",
    compactType: "vertical",
    saving: "IDLE",
  };

  _handleResetLayout = () => {
    if (!this.props.editing) {
      return null;
    }

    if (!window.confirm("Are you sure you want to reset your layout?")) {
      return null;
    }

    const layouts = { lg: generateLayout(this.props.items) };
    this.props.onLayoutChange(null, layouts);
  };

  _handleSaveLayout = async () => {
    if (!this.props.editing) {
      return null;
    }

    this.setState({ saving: "SAVING" });
    await this.props.onLayoutSave();
    this.setState({ saving: "SAVED" });
  };

  generateDOM = () => {
    return this.props.layouts.lg.map((each, index) => {
      const data = this.props.items[each.i];

      return (
        <div key={index} css={STYLES_ITEM}>
          <SlateMediaObjectPreview type={data.type} url={data.url} />
          <figure css={STYLES_BUTTON} onClick={() => this.props.onSelect(index)}>
            <CircleButtonLight>
              <SVG.Eye height="16px" />
            </CircleButtonLight>
          </figure>
        </div>
      );
    });
  };

  onBreakpointChange = (breakpoint) => {
    this.setState({
      currentBreakpoint: breakpoint,
    });
  };

  onLayoutChange = (layout, layouts) => {
    this.props.onLayoutChange(layout, layouts);
  };

  render() {
    return (
      <div css={STYLES_CONTAINER}>
        <ResponsiveReactGridLayout
          className="layout"
          columns={COLUMN_MAP}
          layouts={this.props.layouts}
          isDraggable={!!this.props.editing}
          isResizable={!!this.props.editing}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          measureBeforeMount={false}
          useCSSTransforms={false}
          compactType={this.state.compactType}
          preventCollision={false}
          margin={[24, 24]}>
          {this.generateDOM()}
        </ResponsiveReactGridLayout>
        {this.props.editing ? (
          <div css={STYLES_ACTIONS}>
            <span css={STYLES_ACTION_BUTTON} onClick={this._handleResetLayout}>
              Reset Layout
            </span>
            <span css={STYLES_ACTION_BUTTON} onClick={this._handleSaveLayout}>
              {this.state.saving === "SAVING" ? (
                <LoaderSpinner style={{ height: 16, width: 16 }} />
              ) : this.state.saving === "IDLE" ? (
                "Save Layout"
              ) : (
                "Saved"
              )}
            </span>
          </div>
        ) : null}
      </div>
    );
  }
}
