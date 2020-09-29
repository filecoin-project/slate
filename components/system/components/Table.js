// TODO(jim):
// Deprecate the Table component.

// NOTE(jim):
// Only use the Table component for prototyping.
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

const STYLES_TABLE_EXPAND_SECTION = css`
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 200ms ease all;

  svg {
    transition: 200ms ease all;
  }
  :hover {
    color: ${Constants.system.brand};
  }
`;

const STYLES_TABLE_PLACEHOLDER = css`
  box-sizing: border-box;
  font-family: ${Constants.font.text};
  display: block;
  width: 100%;
  padding: 20px;
  font-size: 12px;
  color: ${Constants.system.black};
`;

const STYLES_TABLE_ROW = css`
  position: relative;
  box-sizing: border-box;
  padding: 0 8px 0 8px;
  border-bottom: 1px solid ${Constants.system.lightBorder};
  display: flex;
  align-items: flex-start;
  width: 100%;
  transition: 200ms ease all;

  :last-child {
    border: 0;
  }
`;

const STYLES_TABLE_SELECTED_ROW = css`
  background-color: ${Constants.system.foreground};
  box-sizing: border-box;
  display: block;
  border-bottom: 1px solid ${Constants.system.lightBorder};
`;

const STYLES_TABLE_TOP_ROW = css`
  box-sizing: border-box;
  font-family: ${Constants.font.semiBold};
  padding: 0 8px 0 8px;
  border-bottom: 1px solid ${Constants.system.lightBorder};
  display: flex;
  width: 100%;
  align-items: flex-start;
`;

export class Table extends React.Component {
  static defaultProps = {
    onAction: () => console.log("No action function set"),
    onChange: () => {},
  };

  _handleClick = (value) => {
    if (this.props.onClick) {
      this.props.onClick({
        target: {
          name: this.props.name,
          value: value !== this.props.selectedRowId ? value : null,
        },
      });
    }
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
        {this.props.noLabel ? null : (
          <div css={STYLES_TABLE_TOP_ROW} style={this.props.topRowStyle}>
            {data.columns.map((c, cIndex) => {
              const text = c.hideLabel ? "" : c.name ? c.name : c.key;
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
                    backgroundColor: this.props.noColor
                      ? null
                      : ac[c.key].color,
                    flexShrink,
                  }}
                  tooltip={c.tooltip}
                >
                  {text}
                </SubSystem.TableColumn>
              );
            })}
            {this.props.onClick ? (
              <div css={STYLES_TABLE_EXPAND_SECTION} />
            ) : null}
          </div>
        )}

        {data.rows.map((r, i) => {
          const selected = r.id === this.props.selectedRowId;

          return (
            <React.Fragment key={`${r.id}-${i}`}>
              <div css={STYLES_TABLE_ROW} style={this.props.rowStyle}>
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
                      key={`${each}-${i}-${cIndex}`}
                      style={{
                        width: localWidth,
                        backgroundColor: this.props.noColor
                          ? null
                          : field.color,
                        flexShrink,
                      }}
                      contentstyle={field.contentstyle}
                      copyable={field.copyable}
                    >
                      <div style={field.style}>
                        <SubSystem.TableContent
                          data={r}
                          text={text}
                          type={field.type}
                          action={field.action}
                          onAction={this.props.onAction}
                        />
                      </div>
                    </SubSystem.TableColumn>
                  );
                })}
                {this.props.onClick ? (
                  <div
                    style={{
                      width: "40px",
                      display: "flex",
                      alignItems: "center",
                      alignSelf: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <div
                      css={STYLES_TABLE_EXPAND_SECTION}
                      onClick={() => this._handleClick(r.id)}
                      style={{
                        cursor: r.children ? "pointer" : "default",
                        display: "inline-flex",
                      }}
                    >
                      {r.children ? (
                        <SVG.Plus
                          height="16px"
                          style={{
                            transform: selected ? `rotate(45deg)` : null,
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
              {selected && r.children ? (
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
