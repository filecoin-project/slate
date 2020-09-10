import React, { useState, useEffect } from "react";
import * as Constants from "~/common/constants";
import * as System from "~/components/system";

import { css, keyframes } from "@emotion/react";

const sleepDuration = 500;
const getTypingDuration = () => 80 + 80 * (Math.random() - 0.5);

const STYLES_ROOT = css`
  height: 300px;
  width: 500px;
  @media (max-width: 600px) {
    height: 230px;
    width: 345px;
  }
  @media (max-width: 320px) {
    height: 200px;
    width: 300px;
  }
`;

const STYLES_INNER = css`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 5px;
  border: 1px solid rgb(51, 51, 51);
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-mono);
  line-height: 1.5;
  font-size: 14px;
  white-space: pre-wrap;
  word-break: break-all;
`;

const STYLES_ICON = css`
  border-radius: 50%;
  display: inline-block;
  width: 12px;
  height: 12px;
`;

const STYLES_HEADER = css`
  height: 34px;
  display: flex;
  align-items: center;
  text-align: center;
  text-align: center @media (max-width: 600px) {
    height: 28px;
  }
  @media (max-width: 320px) {
    font-size: 11px;
  }
`;
const STYLES_BODY = css`
  padding: 12px 14px;
  flex: 1;
`;

const Line = ({ text, noPrompt = false, noCaret = false }) => (
  <>
    {!noPrompt && <span>▲ ~ </span>}
    {text}
    {!noCaret && <span />}
  </>
);

const CodeTerminal = () => {
  const [lineCount, setLineCount] = useState(0);

  const renderLine = text => {
    const frames = [];

    // starting frame
    {
      /*
    frames.push(
      <Frame duration={sleepDuration} key={`${text}-first`}>
        <Line />
      </Frame>
    );


    // typing out the line
    for (let i = 0; i < text.length; i++) {
      const isLastLetter = i === text.length - 1;
      const duration = isLastLetter ? sleepDuration : getTypingDuration();

      frames.push(
        <Frame duration={duration} key={`${text}-${i}`}>
          <Line text={text.slice(0, i + 1)} />
        </Frame>
      );
    }

    // ending frame
    frames.push(
      <Frame key={`${text}-last`}>
        <Line text={text} noCaret />
      </Frame>
    );

    return (
      <Keyframes component="p" onEnd={() => setLineCount(c => c + 1)}>
        {frames}
      </Keyframes>
    );
    */
    }
  };

  return (
    <div css={STYLES_ROOT}>
      <div>
        <div css={STYLES_HEADER}>
          <span css={STYLES_ICON} />
          <span css={STYLES_ICON} />
          <span css={STYLES_ICON} />
        </div>
        <div css={STYLES_BODY}>
          {renderLine("# Hyper is an Electron-based terminal")}
          {lineCount >= 1 && renderLine("# Built on HTML/CSS/JS")}
          {lineCount >= 2 && renderLine("# Fully extensible")}
          {lineCount >= 3 &&
            renderLine("# Install themes and plugins from the command line")}
          {lineCount >= 4 && renderLine("hyper i hyper-rose-pine")}
          {lineCount >= 5 && (
            <>
              <p className={styles.green}>
                <Line
                  text="hyper-rose-pine installed successfully!"
                  noPrompt
                  noCaret
                />
              </p>
              <p>
                <Line />
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeTerminal;
