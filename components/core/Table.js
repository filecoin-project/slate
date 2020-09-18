import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as SubSystem from "~/components/system/components/fragments/TableComponents";

import { css } from "@emotion/react";
import { P } from "~/components/system/components/Typography";
import * as SVG from "~/common/svg";

const TABLE_COLUMN_WIDTH_DEFAULTS = {
  1: "100%",
  2: "50%",
  3: "33.333%",
  4: "25%",
  5: "20%",
  6: "16.666%",
  7: "14.28%",
  8: "12.5%",
};

const STYLES_CONTAINER = css`
  border: 1px solid rgba(229, 229, 229, 0.75);
`;

const STYLES_TABLE_ROW = css`
  position: relative;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(229, 229, 229, 0.75);
  display: flex;
  align-items: center;
  width: 100%;
  transition: 200ms ease all;

  :last-child {
    border: 0;
  }
`;

const STYLES_TABLE_TOP_ROW = css`
  box-sizing: border-box;
  font-family: ${Constants.font.semiBold};
  border-bottom: 1px solid rgba(229, 229, 229, 0.75);
  display: flex;
  width: 100%;
  align-items: center;
  background-color: ${Constants.system.foreground};
`;

export class Table extends React.Component {
  render() {
    const { data } = this.props;

    const ac = {};

    if (!data || !data.rows || data.rows.length === 0) {
      return <P style={{ padding: 24 }}>No data.</P>;
    }

    for (let x = 0; x < data.columns.length; x++) {
      ac[data.columns[x].key] = {
        ...data.columns[x],
        index: x,
      };
    }

    const width = TABLE_COLUMN_WIDTH_DEFAULTS[data.columns.length];
    return (
      <div css={STYLES_CONTAINER} onMouseLeave={this.props.onMouseLeave}>
        {this.props.noLabel ? null : (
          <div css={STYLES_TABLE_TOP_ROW} style={this.props.topRowStyle}>
            {data.columns.map((c, cIndex) => {
              let localWidth = c.width ? c.width : width;
              let flexShrink = c.width && c.width !== "100%" ? "0" : null;
              if (cIndex === 0 && !c.width) {
                localWidth = "100%";
              }

              return (
                <div
                  key={`table-top-${c.key}-${cIndex}`}
                  style={{
                    width: localWidth,
                    flexShrink,
                  }}
                >
                  {c.name || ""}
                </div>
              );
            })}
          </div>
        )}

        {data.rows.map((r, i) => {
          return (
            <div
              key={`${r.id}-${i}`}
              css={STYLES_TABLE_ROW}
              style={this.props.rowStyle}
              onMouseEnter={() => this.props.onMouseEnter(i)}
            >
              {Object.keys(ac).map((each, cIndex) => {
                const field = ac[each];
                const content = r[each];

                let localWidth = field.width ? field.width : width;
                let flexShrink =
                  field.width && field.width !== "100%" ? "0" : null;
                if (cIndex === 0 && !field.width) {
                  localWidth = "100%";
                }

                return (
                  <div
                    key={`${each}-${i}-${cIndex}`}
                    style={{
                      width: localWidth,
                      flexShrink,
                      ...this.props.contentStyle,
                    }}
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
