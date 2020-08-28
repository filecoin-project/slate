//doable with vw. calculate vw - sidebar (if mobile size), divided by numItems = max-width and max-height

import React from "react";

import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import SlateMediaObjectPreview from "~/components/core/SlateMediaObjectPreview";

const STYLES_IMAGE_ROW = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 186px;
  overflow: hidden;

  @media (max-width: ${Constants.sizes.mobile}px) {
    justify-content: center;
  }
`;

const STYLES_ITEM_BOX = css`
  width: 186px;
  height: 186px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function SlatePreviewRow(props) {
  let numItems = props.numItems || 5;
  let objects =
    props.slate.data.objects.length > numItems
      ? props.slate.data.objects.slice(0, numItems)
      : props.slate.data.objects;
  return (
    <div css={STYLES_IMAGE_ROW} style={props.containerStyle}>
      {objects.map((each) => (
        <div key={each.url} css={STYLES_ITEM_BOX} style={props.style}>
          <SlateMediaObjectPreview type={each.type} url={each.url} />
        </div>
      ))}
    </div>
  );
}

const STYLES_BLOCK = css`
  border: 1px solid ${Constants.system.border};
  border-radius: 16px;
  padding: 24px;
  font-size: 12px;
  text-align: left;
  margin: 24px auto;
  width: 95%;
  max-width: 980px;
  cursor: pointer;
`;

const STYLES_SLATE_NAME = css`
  font-size: ${Constants.typescale.lvl1};
`;

export default function SlatePreviewBlock(props) {
  return (
    <div css={STYLES_BLOCK}>
      <div css={STYLES_SLATE_NAME}>{props.slate.data.name}</div>
      <SlatePreviewRow {...props} />
    </div>
  );
}
