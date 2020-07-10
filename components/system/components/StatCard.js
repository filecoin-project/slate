import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";

import { css } from "@emotion/react";
import { LineChart } from "~/vendor/react-chartkick";
import "chart.js";

const STYLES_STAT_CARD = css`
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  width: 100%;
  box-shadow: 0 0 0 1px ${Constants.system.gray}, 0 1px 4px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  flex-shrink: 0;
`;

const STYLES_STAT_CARD_TOP = css`
  box-sizing: border-box;
  background-color: ${Constants.system.foreground};
  color: ${Constants.system.black};
  padding: 16px 16px 16px 16px;
  border-radius: 4px 4px 0 0;
`;

const STYLES_STAT_CARD_BOTTOM = css`
  box-sizing: border-box;
  border-top: 1px solid ${Constants.system.gray};
  padding: 12px 16px 12px 16px;
  border-radius: 0 0 4px 4px;
  font-size: 14px;
`;

const STYLES_STAT_CARD_NAME = css`
  box-sizing: border-box;
`;

const STYLES_STAT_CARD_VALUE_GROUP = css`
  box-sizing: border-box;
  color: ${Constants.system.black};
  border-radius: 4px 4px 0 0;
`;

const STYLES_STAT_CARD_VALUE = css`
  box-sizing: border-box;
  font-family: ${Constants.font.medium};
  font-size: ${Constants.typescale.lvl3};
  color: ${Constants.system.brand};
  display: block;
`;

const STYLES_STAT_CARD_DENOMINATION = css`
  box-sizing: border-box;
  display: block;
  font-family: ${Constants.font.semiBold};
  font-size: 10px;
  letter-spacing: 0.1px;
  margin: 4px 0 16px 0;
  padding-left: 2px;
  text-transform: uppercase;
`;

export const StatCard = (props) => {
  return (
    <div css={STYLES_STAT_CARD}>
      <div css={STYLES_STAT_CARD_TOP}>
        <div css={STYLES_STAT_CARD_VALUE_GROUP}>
          <span css={STYLES_STAT_CARD_VALUE}>
            {Strings.formatNumber(props.value)}
          </span>{" "}
          <span css={STYLES_STAT_CARD_DENOMINATION}>{props.denomination}</span>
          <LineChart
            data={props.data}
            library={{
              backgroundColor: "transparent",
              scales: {
                yAxes: [
                  {
                    display: false,
                  },
                ],
              },
            }}
            dataset={{ lineTension: 0, pointRadius: 0, borderWidth: 1 }}
            width="100%"
            colors={[Constants.system.brand]}
          />
        </div>
      </div>
      <div css={STYLES_STAT_CARD_BOTTOM}>
        <div css={STYLES_STAT_CARD_NAME}>{props.children}</div>
      </div>
    </div>
  );
};
