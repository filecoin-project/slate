import * as React from "react";
import { css } from "@emotion/react";

const STYLES_FRAME = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
  }
`;

const STYLES_LINK_CARD = css`
  max-width: 364px;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  color: #222;
  position: relative;
`;

const LinkFrame = ({ item }) => {
  const { link } = item;

  console.log({ link });

  return (
    <div css={STYLES_FRAME}>
      <LinkCard {...link} />
    </div>
  );
};

const STYLES_NFT = css`
  background-color: #fff;
  color: #222;
  font-style: italic;
  font-weight: bold;
`;

const NFTBadge = (props) => (
  <div className={STYLES_NFT} {...props}>
    NFT
  </div>
);

const LinkCard = ({ title, url, description, image, video }) => {
  return (
    <div css={STYLES_LINK_CARD}>
      {image && <img alt={title} src={image.url} />}
      <div
        css={css`
          padding: 2rem;
        `}
      >
        {title}
        {description}
      </div>
      <NFTBadge
        css={css`
          position: absolute;
          right: 0;
        `}
      />
    </div>
  );
};

export default LinkFrame;
