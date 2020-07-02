import * as React from "react";
import * as Constants from "~/common/constants";
import * as Strings from "~/common/strings";
import * as SubSystem from "~/components/system/components/fragments/TableComponents";

import { css } from "@emotion/react";
import { P } from "~/components/system/components/Typography";

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

const STYLES_TABLE_PLACEHOLDER = css`
  font-family: ${Constants.font.text};
  display: block;
  width: 100%;
  padding: 20px;
  font-size: 12px;
  color: ${Constants.system.black};
`;

const STYLES_TABLE_ROW = css`
  padding: 0 8px 0 8px;
  border-bottom: 1px solid ${Constants.system.gray};
  display: flex;
  align-items: flex-start;
  transition: 200ms ease all;

  :last-child {
    border: 0;
  }
`;

const STYLES_TABLE_SELECTED_ROW = css`
  display: block;
  border-bottom: 1px solid ${Constants.system.gray};
`;

const STYLES_TABLE_TOP_ROW = css`
  font-family: ${Constants.font.semiBold};
  width: 100%;
  padding: 0 8px 0 8px;
  border-bottom: 1px solid ${Constants.system.gray};
  display: flex;
  align-items: flex-start;
`;

export class Table extends React.Component {
  static defaultProps = {
    onNavigateTo: () => console.log("No navigation function set"),
    onAction: () => console.log("No action function set"),
  };

  _handleChange = (value) => {
    this.props.onChange({
      target: {
        name: this.props.name,
        value: value !== this.props.selectedRowId ? value : null,
      },
    });
  };

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
        color: x % 2 !== 0 ? "rgba(0, 0, 0, 0.01)" : null,
      };
    }

    const width = TABLE_COLUMN_WIDTH_DEFAULTS[data.columns.length];

    return (
      <React.Fragment>
        <div css={STYLES_TABLE_TOP_ROW}>
          {data.columns.map((c, cIndex) => {
            const text = c.hideLabel
              ? ""
              : Strings.isEmpty(c.name)
              ? c.key
              : c.name;
            let localWidth = c.width ? c.width : width;
            let flexShrink = c.width && c.width !== "100%" ? "0" : null;
            if (cIndex === 0 && !c.width) {
              localWidth = "100%";
            }

            return (
              <SubSystem.TableColumn
                top
                key={`table-top-${c.key}-${cIndex}`}
                style={{
                  width: localWidth,
                  backgroundColor: ac[c.key].color,
                  flexShrink,
                }}
                tooltip={c.tooltip}
              >
                {text}
              </SubSystem.TableColumn>
            );
          })}
        </div>

        {data.rows.map((r, i) => {
          const selected = r.id === this.props.selectedRowId;

          return (
            <React.Fragment key={r.id}>
              <div css={STYLES_TABLE_ROW}>
                {Object.keys(ac).map((each, cIndex) => {
                  const field = ac[each];
                  const text = r[each];

                  let localWidth = field.width ? field.width : width;
                  let flexShrink =
                    field.width && field.width !== "100%" ? "0" : null;
                  if (cIndex === 0 && !field.width) {
                    localWidth = "100%";
                  }

                  return (
                    <SubSystem.TableColumn
                      key={`${each}-${i}`}
                      style={{
                        width: localWidth,
                        backgroundColor: field.color,
                        flexShrink,
                      }}
                      copyable={field.copyable}
                    >
                      <SubSystem.TableContent
                        data={r}
                        text={text}
                        type={field.type}
                        action={field.action}
                        onNavigateTo={this.props.onNavigateTo}
                        onAction={this.props.onAction}
                      />
                    </SubSystem.TableColumn>
                  );
                })}
              </div>
              {selected ? (
                <div css={STYLES_TABLE_SELECTED_ROW}>
                  <span css={STYLES_TABLE_PLACEHOLDER}>{r.children}</span>
                </div>
              ) : null}
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
}
