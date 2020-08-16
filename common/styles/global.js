import * as Constants from "~/common/constants";

import { css } from "@emotion/react";

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
      color: #fff5b1;
      text-shadow: 0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3;
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
      color: cyan;
    }

    .token.property,
    .token.selector {
      color: #ffdf5d;
      text-shadow: 0 0 2px #100c0f, 0 0 10px #257c5575, 0 0 35px #21272475;
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
      color: #c8e1ff;
      text-shadow: 0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975;
    }

    .token.important,
    .token.atrule,
    .token.keyword,
    .token.selector .token.class,
    .token.builtin {
      color: #f9c513;
      text-shadow: 0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575;
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
      color: #f9c513;
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
