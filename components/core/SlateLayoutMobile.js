import * as React from "react";
import * as Constants from "~/common/constants";
import * as SVG from "~/common/svg";

import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";

import { css } from "@emotion/react";

const TAG_HEIGHT = 20;

const STYLES_LAYOUT = css`
  display: flex;
  flex-direction: column;
  margin-top: 48px;
`;

const STYLES_FILE_TAG = css`
  font-family: ${Constants.font.medium};
  display: flex;
  align-items: flex-end;
  width: 100%;
  background: ${Constants.system.white};
  font-size: ${Constants.typescale.lvl1};
`;

const STYLES_FILE_NAME = css`
  width: 100%;
  min-width: 10%;
  overflow: hidden;
  text-wrap: nowrap;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
`;

const STYLES_FILE_TYPE = css`
  color: ${Constants.system.grayBlack};
  text-transform: uppercase;
  flex-shrink: 0;
  margin-left: 16px;
  text-align: right;
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
            {/* {this.props.fileNames ? (
              <div
                css={STYLES_FILE_TAG}
                style={{
                  height: `${TAG_HEIGHT}px`,
                }}
              >
                <span css={STYLES_FILE_NAME}>{item.title || item.name}</span>
                <span css={STYLES_FILE_TYPE}>
                  {item.name.lastIndexOf(".") !== -1
                    ? item.name.slice(item.name.lastIndexOf("."))
                    : ""}
                </span>
              </div>
            ) : null} */}
          </div>
        ))}
      </div>
    );
  }
}
