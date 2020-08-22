import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";

const STYLES_SLATE = css`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (max-width: ${Constants.sizes.mobile}px) {
    justify-content: center;
  }
`;

export default class Slate extends React.Component {
  state = { index: null, hiddenIndex: null };

  _handleSetHoveringIndex = ({ index }) => {
    if (!this.props.editing) {
      return;
    }

    if (this.state.index !== index) {
      this.setState({ index });
    }
  };

  _handleSetHiddenIndex = ({ index }) => {
    if (!this.props.editing) {
      return;
    }

    if (this.state.index !== index) {
      this.setState({ hiddenIndex: index });
    }
  };

  render() {
    return (
      <div css={STYLES_SLATE}>
        {this.props.items.map((each, index) => {
          return (
            <SlateMediaObjectPreview
              editing={this.props.editing}
              index={index}
              hovering={index === this.state.index}
              lastIndex={this.props.items.length - 1 === index}
              hiddenIndex={this.state.hiddenIndex}
              key={each.id}
              type={each.type}
              onClick={() => this.props.onSelect(index)}
              onSetHoveringIndex={this._handleSetHoveringIndex}
              onSetHiddenIndex={this._handleSetHiddenIndex}
              onMoveIndex={this.props.onMoveIndex}
              url={each.url}
            />
          );
        })}
      </div>
    );
  }
}
