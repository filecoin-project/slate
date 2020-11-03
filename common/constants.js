export const values = {
  version: "1.0.0",
  sds: "0.1.0",
};

export const sizes = {
  mobile: 768,
  navigation: 288,
  sidebar: 416,
  header: 72,
  tablet: 960,
  desktop: 1024,
  topOffset: 16, //NOTE(martina): Pushes UI down. 16 when there is a persistent announcement banner, 0 otherwise
};

export const system = {
  white: "#ffffff",
  foreground: "#f8f8f8",
  gray: "#e5e5e5",
  lightBorder: "#ececec",
  border: "#d8d8d8",
  darkGray: "#b2b2b2",
  grayBlack: "#666666",
  black: "#1b1f23",
  pitchBlack: "#0c0c0c",
  brand: "#0666bb",
  blue: "#0061BB",
  link: "#2935ff",
  green: "#28a745",
  yellow: "#FFC940",
  red: "#E05435",
  slate: "#27292e",
  moonstone: "#807d78",
  wall: "#cfced3",
  wallLight: "#F1F0F2",
  newBlue: "#043D96",
  newGreen: "#377749",
  newYellow: "#F2B256",
  newRed: "#BE5234",
  shadow: "rgba(15, 14, 18, 0.03)",
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
