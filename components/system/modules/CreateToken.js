import * as React from "react";
import * as Constants from "~/common/constants";

import { css } from "@emotion/react";
import { ButtonPrimaryFull } from "~/components/system/components/Buttons";

const STYLES_CREATE_TOKEN = css`
  font-family: ${Constants.font.text};
  box-sizing: border-box;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.07);
  display: block;
  max-width: 480px;
  width: 100%;
`;

const STYLES_CREATE_TOKEN_TOP = css`
  box-sizing: border-box;
  background: ${Constants.system.black};
  color: ${Constants.system.white};
  font-family: "mono";
  font-size: 12px;
  border-radius: 4px 4px 0 0;
  min-height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const STYLES_CREATE_TOKEN_BOTTOM = css`
  box-sizing: border-box;
  background: ${Constants.system.white};
  border-radius: 0 0 4px 4px;
  padding: 16px;
`;

// TODO(jim): Lets do a cool odometer effect instead.
export const CreateToken = (props) => {
  return (
    <div css={STYLES_CREATE_TOKEN}>
      <div css={STYLES_CREATE_TOKEN_TOP}>
        {props.token ? (
          props.token
        ) : (
          <marquee
            style={{
              color: Constants.system.pitchBlack,
              width: "100%",
              display: "block",
            }}
          >
            XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX{" "}
          </marquee>
        )}
      </div>
      <div css={STYLES_CREATE_TOKEN_BOTTOM}>
        <ButtonPrimaryFull onClick={props.onClick}>
          Generate new Powergate token
        </ButtonPrimaryFull>
      </div>
    </div>
  );
};
