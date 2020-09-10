import React, { Component } from "react";

import { css } from "@emotion/react";

const STYLES_SLATE_CARD_EFFECTS = css`
  border-radius: 4px;
  padding: 8px;
  cursor: default;
  border: 1px solid gray;
  color: black;
  background-color: white;
  background-position: center;
  z-index: 2;
`;

export default class Issue extends Component {
  render() {
    const { title, id, labels, userName } = this.props;
    return (
      <>
        <div css={STYLES_SLATE_CARD_EFFECTS}>
          <div>
            <div>
              {title}, {userName}
            </div>
          </div>
        </div>
      </>
    );
  }
}
