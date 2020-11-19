import * as React from "react";
import * as Constants from "~/common/constants";

import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";

import { css } from "@emotion/core";

const STYLES_LAYOUT = css`
  display: flex;
  flex-direction: column;
  margin-top: 48px;
`;

const STYLES_IMAGE_CONTAINER = css`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export class SlateLayoutMobile extends React.Component {
  render() {
    return (
      <div css={STYLES_LAYOUT}>
        {this.props.items.map((item, i) => (
          <div
            key={item.id}
            css={STYLES_IMAGE_CONTAINER}
            style={{
              width: `calc(100vw - 48px)`,
            }}
            onClick={() => this.props.onSelect(i)}
          >
            <SlateMediaObjectPreview
              blurhash={item.blurhash}
              iconOnly={this.props.fileNames}
              charCap={70}
              type={item.type}
              url={item.url}
              title={item.title || item.name}
              previewImage={item.previewImage}
              style={{
                height: `calc(100vw - 48px)`,
                width: `calc(100vw - 48px)`,
                background: Constants.system.white,
              }}
              imageStyle={{
                maxWidth: `calc(100vw - 48px)`,
                maxHeight: `calc(100vw - 48px)`,
              }}
            />
          </div>
        ))}
      </div>
    );
  }
}
