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
  render() {
    return (
      <div css={STYLES_SLATE}>
        {this.props.items.map((each, index) => {
          return (
            <SlateMediaObjectPreview
              key={each.id}
              type={each.type}
              onClick={() => this.props.onSelect(index)}
              url={each.url}
            />
          );
        })}
      </div>
    );
  }
}
