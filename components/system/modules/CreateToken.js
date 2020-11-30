import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { ButtonPrimary } from "~/components/system/components/Buttons";

import Odometer from "~/vendor/odometer";

const STYLES_CREATE_TOKEN = css`
  font-family: ${Constants.font.text};
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  display: block;
  max-width: 480px;
  width: 100%;
`;

const STYLES_CREATE_TOKEN_TOP = css`
  font-family: ${Constants.font.medium};
  background: ${Constants.system.black};
  color: ${Constants.system.white};
  box-sizing: border-box;
  font-size: 12px;
  border-radius: 4px 4px 0 0;
  min-height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .odometer:hover + span {
    opacity: 1;
  }
`;

const STYLES_CREATE_TOKEN_BOTTOM = css`
  box-sizing: border-box;
  background: ${Constants.system.white};
  border-radius: 0 0 4px 4px;
  padding: 16px;
`;

const STYLES_CREATE_TOKEN_COPY_INFO = css`
  position: absolute;
  top: 10px;
  right: 20px;
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
`;

export const CreateToken = (props) => {
  const odometerNode = React.useRef(null);
  const [odometer, setOdometer] = React.useState(null);
  const [isCopied, setCopyStatus] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(props.token);
    setCopyStatus(true);
  };

  // (NOTE: daniel) Reset copy status
  setInterval(() => setCopyStatus(false), 50000);

  if (props.token) {
    let hash = props.token.replace(/-/g, "");
    odometer.start({ to: hash });
  }

  React.useEffect(() => {
    const newOdometer = new Odometer({ node: odometerNode.current });

    setOdometer(newOdometer);
  }, []);

  return (
    <div css={STYLES_CREATE_TOKEN}>
      <div css={STYLES_CREATE_TOKEN_TOP}>
        <div ref={odometerNode} onClick={handleCopy} />
        <span css={STYLES_CREATE_TOKEN_COPY_INFO}>{isCopied ? "Copied" : "Copy"}</span>
      </div>
      <div css={STYLES_CREATE_TOKEN_BOTTOM}>
        <ButtonPrimary full onClick={props.onClick}>
          Generate new Powergate token
        </ButtonPrimary>
      </div>
    </div>
  );
};
