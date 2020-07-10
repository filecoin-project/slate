import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as System from "~/components/system";

import { css } from "@emotion/react";

const STYLES_CONTAINER = css`
  font-family: ${Constants.font.text};
  box-sizing: border-box;
  border-radius: 4px;
  background-color: ${Constants.system.white};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  border: 1px solid ${Constants.system.border};
  width: 100%;
`;

export const FilecoinBalancesList = (props) => {
  return (
    <div css={STYLES_CONTAINER}>
      <System.Table
        data={{
          columns: [
            {
              key: "address",
            },
            {
              key: "name",
            },
            {
              key: "type",
            },
            {
              key: "balance",
            },
          ],
          rows: props.data.map((each) => {
            return {
              id: each.addr.addr,
              balance: Strings.formatAsFilecoin(each.balance),
              address: each.addr.addr,
              name: each.addr.name,
              type: each.addr.type,
            };
          }),
        }}
        selectedRowId={props.selectedRowId}
        onChange={props.onChange}
        name={props.name}
      />
    </div>
  );
};
