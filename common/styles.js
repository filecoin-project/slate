import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

/* TYPOGRAPHY */

export const LINK = css`
  text-decoration: none;
  color: ${Constants.system.blue};
  cursor: pointer;
  transition: 200ms ease color;

  :visited {
    color: ${Constants.system.blue};
  }
`;

const TEXT = css`
  box-sizing: border-box;
  overflow-wrap: break-word;
  text-align: left;
  font-weight: normal;

  a {
    ${LINK}
  }
`;

export const H1 = css`
  font-family: ${Constants.font.medium};
  font-size: 2rem;
  line-height: 1.5;
  letter-spacing: -0.021px;

  ${TEXT}
`;

export const H2 = css`
  font-family: ${Constants.font.medium};
  font-size: 1.5rem;
  line-height: 1.5;
  letter-spacing: -0.019px;

  ${TEXT}
`;

export const H3 = css`
  font-family: ${Constants.font.medium};
  font-size: 1.25rem;
  line-height: 1.5;
  letter-spacing: -0.017px;

  ${TEXT}
`;

export const H4 = css`
  font-family: ${Constants.font.medium};
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: -0.011px;

  ${TEXT}
`;

export const H5 = css`
  font-family: ${Constants.font.medium};
  font-size: 0.875rem;
  line-height: 1.5;
  letter-spacing: -0.006px;

  ${TEXT}
`;

export const H6 = css`
  font-family: ${Constants.font.medium};
  font-size: 0.75rem;
  line-height: 1.666;
  letter-spacing: -0.01px;

  ${TEXT}
`;

export const P1 = css`
  font-family: ${Constants.font.text};
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: -0.011px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-family: ${Constants.font.text};
    font-size: 0.875rem;
    line-height: 1.5;
    letter-spacing: -0.006px;
  }

  ${TEXT}
`;

export const P2 = css`
  font-family: ${Constants.font.text};
  font-size: 0.875rem;
  line-height: 1.5;
  letter-spacing: -0.006px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    font-family: ${Constants.font.text};
    font-size: 0.75rem;
    line-height: 1.3;
    letter-spacing: 0px;
  }

  ${TEXT}
`;

export const P3 = css`
  font-family: ${Constants.font.text};
  font-size: 0.75rem;
  line-height: 1.334;
  letter-spacing: 0px;

  ${TEXT}
`;

export const C1 = css`
  font-family: ${Constants.font.code};
  font-size: 0.75rem;
  line-height: 1.3;

  ${TEXT}
`;

export const C2 = css`
  font-family: ${Constants.font.code};
  font-size: 0.875rem;
  line-height: 1.5;

  ${TEXT}
`;

export const C3 = css`
  font-family: ${Constants.font.code};
  font-size: 0.875rem;
  line-height: 1.5;

  ${TEXT}
`;

export const B1 = css`
  font-family: ${Constants.font.medium};
  font-size: 0.875rem;
  line-height: 1;
  letter-spacing: -0.006px;

  ${TEXT}
`;

/* FREQUENTLY USED */

export const HORIZONTAL_CONTAINER = css`
  display: flex;
  flex-direction: row;
`;

export const VERTICAL_CONTAINER = css`
  display: flex;
  flex-direction: column;
`;

export const HORIZONTAL_CONTAINER_CENTERED = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const VERTICAL_CONTAINER_CENTERED = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CONTAINER_CENTERED = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ICON_CONTAINER = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  margin: -4px;
  cursor: pointer;
  color: ${Constants.system.black};

  :hover {
    color: ${Constants.system.blue};
  }
`;

export const HOVERABLE = css`
  cursor: pointer;

  :hover {
    color: ${Constants.system.blue};
  }
`;

export const MOBILE_HIDDEN = css`
  @media (max-width: ${Constants.sizes.mobile}px) {
    display: none;
    pointer-events: none;
  }
`;

export const MOBILE_ONLY = css`
  @media (min-width: ${Constants.sizes.mobile}px) {
    display: none;
    pointer-events: none;
  }
`;

//NOTE(martina): resize so the image is fills its container from edge to edge, while maintaining aspect ratio. Any overflow is clipped
export const IMAGE_FILL = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

//NOTE(martina): resize so the image is contained within the bounds of its container, while maintaining aspect ratio. There is no overflow
export const IMAGE_FIT = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

/* COMMON GRIDS */
export const OBJECTS_PREVIEW_GRID = (theme) => css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${theme.grids.object.desktop.width}px, 1fr));
  grid-gap: 24px ${theme.grids.object.desktop.rowGap}px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    grid-gap: 20px ${theme.grids.object.mobile.rowGap}px;
    grid-template-columns: repeat(auto-fill, minmax(${theme.grids.object.mobile.width}px, 1fr));
  }
`;

export const BUTTON_RESET = css`
  padding: 0;
  margin: 0;
  background-color: unset;
  border: none;
  cursor: pointer;
  ${HOVERABLE}
`;

export const COLLECTIONS_PREVIEW_GRID = (theme) => css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${theme.grids.collection.desktop.width}px, 1fr));
  grid-gap: 24px ${theme.grids.collection.desktop.rowGap}px;

  @media (max-width: ${Constants.sizes.desktop}px) {
    grid-gap: 20px ${theme.grids.collection.mobile.rowGap}px;
    grid-template-columns: repeat(auto-fill, minmax(${theme.grids.collection.mobile.width}px, 1fr));
  }
`;

export const PROFILE_PREVIEW_GRID = (theme) => css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${theme.grids.profile.desktop.width}px, 1fr));
  grid-gap: 24px ${theme.grids.profile.desktop.rowGap}px;

  @media (max-width: ${Constants.sizes.mobile}px) {
    grid-gap: 20px ${theme.grids.profile.mobile.rowGap}px;
    grid-template-columns: repeat(auto-fill, minmax(${theme.grids.profile.mobile.width}px, 1fr));
  }
`;
