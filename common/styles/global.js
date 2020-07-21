import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

/* prettier-ignore */
export const injectTooltipStyles = () =>
  css`
    .tippy-touch {
      cursor: pointer !important;
    }

    .tippy-notransition {
      transition: none !important;
    }

    .tippy-popper {
      z-index: ${Constants.zindex.tooltip};
      max-width: 400px;
      perspective: 800px;
      outline: 0;
      transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
      pointer-events: none;
    }

    .tippy-popper.html-template {
      max-width: 96%;
      max-width: calc(100% - 20px);
    }

    .tippy-popper[x-placement^="top"] [x-arrow] {
      border-top: 7px solid ${Constants.system.white};
      border-right: 7px solid transparent;
      border-left: 7px solid transparent;
      bottom: -7px;
      margin: 0 9px;
    }

    .tippy-popper[x-placement^="top"] [data-animation="fade"].enter {
      opacity: 1;
      transform: translateY(-10px);
    }

    .tippy-popper[x-placement^="top"] [data-animation="fade"].leave {
      opacity: 0;
      transform: translateY(-10px);
    }

    .tippy-popper[x-placement^="bottom"] [x-arrow] {
      border-bottom: 7px solid ${Constants.system.white};
      border-right: 7px solid transparent;
      border-left: 7px solid transparent;
      top: -7px;
      margin: 0 9px;
    }

    .tippy-popper[x-placement^="bottom"] [data-animation="fade"].enter {
      opacity: 1;
      transform: translateY(10px);
    }

    .tippy-popper[x-placement^="bottom"] [data-animation="fade"].leave {
      opacity: 0;
      transform: translateY(10px);
    }

    .tippy-popper[x-placement^="left"] [x-arrow] {
      border-left: 7px solid ${Constants.system.white};
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
      right: -7px;
      margin: 6px 0;
    }

    .tippy-popper[x-placement^="left"] [data-animation="fade"].enter {
      opacity: 1;
      transform: translateX(-10px);
    }

    .tippy-popper[x-placement^="left"] [data-animation="fade"].leave {
      opacity: 0;
      transform: translateX(-10px);
    }

    .tippy-popper[x-placement^="right"] [x-arrow] {
      border-right: 7px solid ${Constants.system.white};
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
      left: -7px;
      margin: 6px 0;
    }

    .tippy-popper[x-placement^="right"] [data-animation="fade"].enter {
      opacity: 1;
      transform: translateX(10px);
    }

    .tippy-popper[x-placement^="right"] [data-animation="fade"].leave {
      opacity: 0;
      transform: translateX(10px);
    }

    .tippy-tooltip {
      font-family: ${Constants.font.text};
      color: ${Constants.system.white};
      background-color: ${Constants.system.pitchBlack};
      position: relative;
      border-radius: 4px;
      font-size: 1rem;
      padding: 12px;
      text-align: center;
      will-change: transform;
      border: 1px solid transparent;
    }

    .tippy-tooltip[data-animatefill] {
      overflow: hidden;
      background-color: transparent;
    }

    .tippy-tooltip[data-interactive] {
      pointer-events: auto;
    }

    .tippy-tooltip[data-inertia] {
      transition-timing-function: cubic-bezier(0.53, 2, 0.36, 0.85);
    }

    .tippy-tooltip [x-arrow] {
      position: absolute;
      width: 0;
      height: 0;
    }
    
    @media (max-width: 450px) {
      .tippy-popper {
        max-width: 96%;
        max-width: calc(100% - 20px);
      }
    }
  `;

/* prettier-ignore */
export const injectGlobalStyles = () => css`
  @font-face {
    font-family: 'mono';
    src: url('/static/SFMono-Medium.woff');
  }

  @font-face {
    font-family: 'mono-bold';
    src: url('/static/SFMono-Bold.woff');
  }

  @font-face {
    font-family: 'inter-regular';
    src: url('/static/Inter-Regular.woff');
  }

  @font-face {
    font-family: 'inter-semi-bold';
    src: url('/static/Inter-SemiBold.woff');
  }

  @font-face {
    font-family: 'inter-medium';
    src: url('/static/Inter-Medium.woff');
  }

  @font-face {
    font-family: 'fira-code-regular';
    src: url('/static/FiraCode-Regular.woff');
  }

  @font-face {
    font-family: 'fira-code-bold';
    src: url('/static/FiraCode-Bold.woff');
  }

  @font-face {
    font-family: 'jet-brains-regular';
    src: url('/static/JetBrainsMono-Regular.woff');
  }

  @font-face {
    font-family: 'jet-brains-bold';
    src: url('/static/JetBrainsMono-Bold.woff');
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

/* prettier-ignore */
export const injectCodeBlockStyles = () => css`
  .language-javascript {
    code,
    pre {
      color:"#e5e5e5";
      font-family: 'jet-brains-regular', Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
      font-size: 12px;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      word-wrap: normal;
      
      -moz-tab-size: 4;
      -o-tab-size: 4;
      tab-size: 4;

      -webkit-hyphens: none;
      -moz-hyphens: none;
      -ms-hyphens: none;
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
      background:none;
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
      color: #999;
    }

    .token.punctuation {
      color: #ccc;
    }

    .token.tag,
    .token.attr-name,
    .token.namespace,
    .token.deleted {
      color: #e2777a;
    }

    .token.function-name {
      color: #6196cc;
    }

    .token.boolean,
    .token.number,
    .token.function {
      color: #f08d49;
    }

    .token.property,
    .token.class-name,
    .token.constant,
    .token.symbol {
      color: #f8c555;
    }

    .token.selector,
    .token.important,
    .token.atrule,
    .token.keyword,
    .token.builtin {
      color: #cc99cd;
    }

    .token.string,
    .token.char,
    .token.attr-value,
    .token.regex,
    .token.variable {
      color: #7ec699;
    }

    .token.operator,
    .token.entity,
    .token.url {
      color: #67cdcc;
    }

    .token.important,
    .token.bold {
      font-weight: bold;
    }

    .token.italic {
      font-style: italic;
    }

    .token.entity {
      cursor: help;
    }

    .token.inserted {
      color: green;
    }
  }
`;
