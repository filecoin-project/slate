import * as React from "react";
import * as Constants from "~/common/constants";

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

export const PeersList = (props) => {
  return (
    <div css={STYLES_CONTAINER}>
      <Table
        data={{
          columns: [
            {
              key: "id",
              width: "144px",
            },
            {
              key: "name",
            },
          ],
          rows: props.data,
        }}
        selectedRowId={props.selectedRowId}
        onChange={props.onChange}
        name={props.name}
      />
    </div>
  );
};
