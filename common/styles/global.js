import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

/* prettier-ignore */
export const injectGlobalStyles = () => css`
  @font-face {
    font-family: 'mono';
    src: url('https://slate.textile.io/ipfs/bafkreialkhtjtpwocdadbmra3o7mii47bzgl3k2v2ossrpvhk3qqsbqtza');
  }

  @font-face {
    font-family: 'mono-bold';
    src: url('https://slate.textile.io/ipfs/bafkreigaktonxehwl5bzah5ze4iruw272qybj22wpy32pgrcka3y4jvhc4');
  }

  @font-face {
    font-family: 'inter-regular';
    src: url('https://slate.textile.io/ipfs/bafkreic3hkcuwvrmf6trweqcjp62valsfjh3zvwacikoreynakgw67wrvy');
  }

  @font-face {
    font-family: 'inter-semi-bold';
    src: url('https://slate.textile.io/ipfs/bafkreiaezvuz6wawoqyntfl4gbprol3e7majovgof3uxvhilvd2pgk4w54');
  }

  @font-face {
    font-family: 'inter-medium';
    src: url('https://slate.textile.io/ipfs/bafkreiapyxmqjwoowqpek2cjocouzxoalwlzwwbv3dscug3e5l2ok7xmqe');
  }

  @font-face {
    font-family: 'fira-code-regular';
    src: url('https://slate.textile.io/ipfs/bafkreibtxh3xdwh6rp2k2uhtjssialbm25girhsck7qks2psycnzwvmtke');
  }

  @font-face {
    font-family: 'fira-code-bold';
    src: url('https://slate.textile.io/ipfs/bafkreidyich64vyb4nqzvn6uvfcgsbegafe7dqd2ks4wjtcg5jwte6aetm');
  }

  @font-face {
    font-family: 'jet-brains-regular';
    src: url('https://slate.textile.io/ipfs/bafkreiabqv4534pnjhohcc2aclsgbp2twugldrlzg6wqdehajerrcwgu7e');
  }

  @font-face {
    font-family: 'jet-brains-bold';
    src: url('https://slate.textile.io/ipfs/bafkreiejfxvbejf4a56x5tdo6w3n2kkrynwniv65rkkmrozxujroq6v4am');
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  html, body {
    background: ${Constants.system.foreground};
    color: ${Constants.system.black};
    font-size: 16px;
    font-family: ${Constants.font.text};
    scrollbar-width: none;
    -ms-overflow-style: -ms-autohiding-scrollbar;

    ::-webkit-scrollbar {
      display: none;
    }
    -webkit-font-feature-settings: "liga"1, "ss01"1, "zero"1, "cv11"1, 'frac'1, 'calt'1, 'tnum'1;
    -moz-font-feature-settings: "liga"1, "ss01"1, "zero"1, "cv11"1, 'frac'1, 'calt'1, 'tnum'1;
    -ms-font-feature-settings: "liga"1, "ss01"1, "zero"1, "cv11"1, 'frac'1, 'calt'1, 'tnum'1;
    font-feature-settings: "liga"1, "ss01"1, "zero"1, "cv11"1, 'frac'1, 'calt'1, 'tnum'1;
  }
`;

export const injectGlobalGridStyles = () => css`
  .react-grid-layout {
    position: relative;
    transition: height 200ms ease;
  }

  .react-grid-item {
    transition: all 200ms ease;
    transition-property: left, top;
  }

  .react-grid-item.cssTransforms {
    transition-property: transform;
  }

  .react-grid-item.resizing {
    z-index: 1;
    will-change: width, height;
  }

  .react-grid-item.react-draggable-dragging {
    transition: none;
    z-index: 3;
    will-change: transform;
  }

  .react-grid-item.dropping {
    visibility: hidden;
  }

  .react-grid-item.react-grid-placeholder {
    background: rgba(0, 0, 0, 0.7);
    z-index: 2;
    transition-duration: 100ms;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  .react-grid-item > .react-resizable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: 0;
    cursor: se-resize;
  }

  .react-grid-item > .react-resizable-handle::after {
    content: "";
    position: absolute;
    right: 3px;
    bottom: 3px;
    width: 5px;
    height: 5px;
    border-right: 2px solid rgba(0, 0, 0, 0.4);
    border-bottom: 2px solid rgba(0, 0, 0, 0.4);
  }

  .react-resizable-hide > .react-resizable-handle {
    display: none;
  }

  .react-resizable {
    position: relative;
  }
  .react-resizable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+");
    background-position: bottom right;
    padding: 0 3px 3px 0;
  }
  .react-resizable-handle-sw {
    bottom: 0;
    left: 0;
    cursor: sw-resize;
    transform: rotate(90deg);
  }
  .react-resizable-handle-se {
    bottom: 0;
    right: 0;
    cursor: se-resize;
  }
  .react-resizable-handle-nw {
    top: 0;
    left: 0;
    cursor: nw-resize;
    transform: rotate(180deg);
  }
  .react-resizable-handle-ne {
    top: 0;
    right: 0;
    cursor: ne-resize;
    transform: rotate(270deg);
  }
  .react-resizable-handle-w,
  .react-resizable-handle-e {
    top: 50%;
    margin-top: -10px;
    cursor: ew-resize;
  }
  .react-resizable-handle-w {
    left: 0;
    transform: rotate(135deg);
  }
  .react-resizable-handle-e {
    right: 0;
    transform: rotate(315deg);
  }
  .react-resizable-handle-n,
  .react-resizable-handle-s {
    left: 50%;
    margin-left: -10px;
    cursor: ns-resize;
  }
  .react-resizable-handle-n {
    top: 0;
    transform: rotate(225deg);
  }
  .react-resizable-handle-s {
    bottom: 0;
    transform: rotate(45deg);
  }
`;

/* prettier-ignore */
export const injectCodeBlockStyles = () => css`
  .language-javascript {
    code,
    pre {
      color: #fff5b1;
      font-family: ${Constants.font.code};
      font-size: 12px;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      word-wrap: normal;
      tab-size: 2;
      hyphens: none;
    }

    /* Code blocks */
    pre {
      padding: none;
      margin: none;
      overflow: auto;
    }

    :not(pre) > code,
    pre {
      background: none;
    }

    /* Inline code */
    :not(pre) > code {
      padding: .1em;
      border-radius: .3em;
      white-space: normal;
    }

    .token.comment,
    .token.block-comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: #FF00FF;
    }

    .token.punctuation {
      color: #ffd33d;
    }

    .token.tag,
    .token.attr-name,
    .token.namespace,
    .token.number,
    .token.unit,
    .token.hexcode,
    .token.deleted {
      color: ${Constants.system.moonstone};
    }

    .token.property,
    .token.selector {
      color: #ffdf5d;
    }

    .token.function-name {
      color: #ffd33d;
    }

    .token.boolean,
    .token.selector .token.id,
    .token.class-name,
    .token.function, 
    .token.constant,
    .token.symbol {
      color: ${Constants.system.gray};
    }

    .token.important,
    .token.atrule,
    .token.keyword,
    .token.selector .token.class,
    .token.builtin {
      color: #FFFFFF;
    }

    .token.string,
    .token.char,
    .token.attr-value,
    .token.regex,
    .token.variable {
      color: #fff;
    }

    .token.operator,
    .token.entity,
    .token.url {
      color: ${Constants.system.moonstone};
    }

    .token.important,
    .token.bold {
      font-weight: 400;
      font-family: ${Constants.font.codeBold};
    }

    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }

    .token.inserted {
      color: ${Constants.system.brand};
    }
  }
`;
