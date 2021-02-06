export const values = {
  version: "1.0.0",
  sds: "0.2.0",
};

export const sizes = {
  mobile: 768,
  navigation: 288,
  sidebar: 416,
  header: 72,
  tablet: 960,
  desktop: 1024,
  topOffset: 0, //NOTE(martina): Pushes UI down. 16 when there is a persistent announcement banner, 0 otherwise
};

export const system = {
  foreground: "#f8f8f8",
  gray: "#e5e5e5",
  lightBorder: "#ececec",
  border: "#d8d8d8",
  darkGray: "#b2b2b2",
  grayBlack: "#666666",
  pitchBlack: "#0c0c0c",
  brand: "#0666bb",
  link: "#2935ff",
  slate: "#27292e",
  moonstone: "#807d78",
  wall: "#cfced3",
  wallLight: "#F1F0F2",
  newBlue: "#043D96",
  newGreen: "#377749",
  newYellow: "#F2B256",
  newRed: "#BE5234",
  shadow: "rgba(15, 14, 18, 0.03)",
  blue: "#0061BB",
  green: "#006837",
  yellow: "#FAB413",
  red: "#C71313",
  black: "#0F0E12",
  bgGrayLight: "#F8F8F8",
  bgGray: "#F2F2F2",
  bgBlue: "#C0D8EE",
  bgGreen: "#C0DACD",
  bgYellow: "#FEEDC4",
  bgRed: "#F1C4C4",
  textGray: "#878688",
  textGrayLight: "#C3C3C4",
  textGrayDark: "#4B4A4D",
  textBlack: "#0F0E12",
  gray80: "#4B4A4D",
  gray70: "#868688",
  gray50: "#C3C3C4",
  gray40: "#E5E5E5",
  gray30: "#EBEBEB",
  gray20: "#F2F2F2",
  gray10: "#F8F8F8",
  white: "#FFFFFF",
  bgBlurGrayBlack: "rgba(15, 14, 18, 0.8)",
  bgBlurBlack: "rgba(15, 14, 18, 0.9)",
};

export const shadow = {
  light: "0 3px 6px 0 rgba(178, 178, 178, 0.15)",
  medium: "0 8px 24px 0 rgba(178, 178, 178, 0.2)",
  large: "0 12px 48px 0 rgba(178, 178, 178, 0.3)",
  subtle: "0 1px 0 0 rgba(15, 14, 18, 0.04)",
};

export const zindex = {
  navigation: 1,
  body: 2,
  sidebar: 5,
  alert: 3,
  header: 4,
  modal: 6,
  tooltip: 7,
};

export const font = {
  text: `'inter-regular', -apple-system, BlinkMacSystemFont, arial, sans-serif`,
  semiBold: `'inter-semi-bold', -apple-system, BlinkMacSystemFont, arial, sans-serif`,
  medium: `'inter-medium', -apple-system, BlinkMacSystemFont, arial, sans-serif`,
  mono: `'mono', monaco, monospace`,
  monoBold: `'mono-bold', monaco, monospace`,
  monoCode: `'fira-code-regular', mono, monospace`,
  monoCodeBold: `'fira-code-bold', mono-bold, monospace`,
  code: `'jet-brains-regular', mono, monospace`,
  codeBold: `'jet-brains-bold', mono, monospace`,
};

export const typescale = {
  lvlN1: `0.75rem`,
  lvl0: `0.875rem`,
  lvl1: `1rem`,
  lvl2: `1.25rem`,
  lvl3: `1.563rem`,
  lvl4: `1.953rem`,
  lvl5: `2.441rem`,
  lvl6: `3.052rem`,
  lvl7: `3.815rem`,
  lvl8: `4.768rem`,
  lvl9: `5.96rem`,
  lvl10: `7.451rem`,
  lvl11: `9.313rem`,
};

export const theme = {
  foreground: system.white,
  ctaBackground: system.brand,
  pageBackground: system.foreground,
  pageText: system.black,
};

export const gateways = {
  ipfs: "https://slate.textile.io/ipfs",
};

export const filetypes = {
  pdf: { type: "application", subtype: "pdf" },
  aac: { type: "audio", subtype: "aac" },
  csv: { type: "text", subtype: "csv" },
  epub: { type: "application", subtype: "epub+zip" },
  jpg: { type: "image", subtype: "jpeg" },
  mp3: { type: "audio", subtype: "mpeg" },
  mp4: { type: "video", subtype: "mpeg" },
  otf: { type: "font", subtype: "otf" },
  png: { type: "image", subtype: "png" },
  ttf: { type: "font", subtype: "ttf" },
  webm: { type: "video", subtype: "webm" },
};
