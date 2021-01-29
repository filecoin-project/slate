import * as React from "react";
import * as Constants from "~/common/constants";

import ReactMde from "react-mde";
import ProcessedText from "~/components/core/ProcessedText";

import "react-mde/lib/styles/css/react-mde-all.css";

import { css } from "@emotion/react";

function loadSuggestions(text) {
  return new Promise((accept, reject) => {
    setTimeout(() => {
      const suggestions = [
        {
          preview: "Chris",
          value: "@cw",
        },
        {
          preview: "Jim",
          value: "@jim",
        },
        {
          preview: "Tara",
          value: "@Tara",
        },
        {
          preview: "Martina",
          value: "@martina",
        },
      ].filter((i) => i.preview.toLowerCase().includes(text.toLowerCase()));
      accept(suggestions);
    }, 250);
  });
}

export function TextareaMde(props) {
  // debugger;
  const [value, setValue] = React.useState(props.value);
  const [selectedTab, setSelectedTab] = React.useState("write");

  const COLOR_BG = props.dark ? Constants.system.black : Constants.system.white;
  const COLOR_FG = props.dark ? Constants.system.white : Constants.system.black;

  const STYLES_MDE = css`
    box-sizing: border-box;
    font-family: ${Constants.font.text};
    -webkit-appearance: none;
    background: ${COLOR_BG};
    color: ${COLOR_FG};
    border-radius: 4px;
    display: flex;
    font-size: 14px;
    align-items: center;
    justify-content: flex-start;
    .mde-header {
      background: ${COLOR_BG};
      > ul.mde-header-group {
        transition: 200ms ease all;
        opacity: 1;
        &.hidden {
          opacity: 0;
        }
      }
      > div.mde-tabs button,
      > ul.mde-header-group li.mde-header-item button {
        color: ${COLOR_FG};
      }
    }
  `;

  const STYLES_TEXTAREA = css`
    ${STYLES_MDE};
    display: block;
    textarea {
      box-sizing: border-box;
      font-family: ${Constants.font.text};
      -webkit-appearance: none;
      width: 100%;
      min-height: 160px;
      max-width: 480px;
      resize: none;
      background: ${COLOR_BG};
      color: ${COLOR_FG};
      font-size: 14px;
      outline: 0;
      border: 0;
      transition: 200ms ease all;
      padding: 16px;
      box-shadow: 0 0 0 1px ${Constants.system.gray30} inset;
      margin-bottom: 0 !important;
      &::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: ${Constants.system.darkGray};
        opacity: 1; /* Firefox */
      }

      &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: ${Constants.system.darkGray};
      }

      &::-ms-input-placeholder {
        /* Microsoft Edge */
        color: ${Constants.system.darkGray};
      }
    }
  `;

  return (
    <div className={props.className} css={STYLES_TEXTAREA} style={props.style}>
      <ReactMde
        value={value}
        classes={props.classes}
        onChange={setValue}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(<ProcessedText dark={!!props.dark} text={markdown} />)
        }
        loadSuggestions={loadSuggestions}
        childProps={{
          writeButton: {
            tabIndex: 1,
          },
          ...props.childProps,
        }}
        readOnly={props.readOnly}
      />
    </div>
  );
}

export class TextareaMD extends React.Component {
  render() {
    return (
      <TextareaMde
        dark={this.props.dark}
        style={this.props.style}
        childProps={{
          textArea: {
            style: this.props.style,
            placeholder: this.props.placeholder,
            name: this.props.name,
            onChange: this.props.onChange,
            value: this.props.value,
          },
        }}
        value={this.props.value}
        readOnly={this.props.readOnly}
      />
    );
  }
}
