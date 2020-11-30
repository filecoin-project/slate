import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as Filecoin from "~/common/filecoin";

import { Table } from "~/components/system/components/Table";
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
      <Table
        data={{
          columns: [
            {
              key: "address",
              name: "Address",
            },
            {
              key: "name",
              name: "Name",
            },
            {
              key: "type",
              name: "Type",
            },
            {
              key: "balance",
              name: "Address",
            },
          ],
          rows: props.data.map((each) => {
            return {
              id: each.addr.addr,
              balance: Filecoin.formatAsFilecoin(Strings.formatNumber(each.balance)),
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
