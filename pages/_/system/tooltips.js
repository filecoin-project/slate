import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

import { dispatchCustomEvent } from "~/common/custom-events";
import { css } from "@emotion/core";

const STYLES_DEMO_TOOLTIP = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const STYLES_TOOLTIP_BUBBLE = css`
  display: inline-flex;
  align-items: center;
  background-color: ${Constants.system.black};
  color: ${Constants.system.white};
  opacity: 70%;
  border-radius: 4px;
  padding: 4px 8px;
  height: 48px;
  width: 160px;
  font-size: 0.8em;
`;

export default class SystemPageTooltips extends React.Component {
  state = {
    horizontal: "center",
    vertical: "above",
    show: true,
  };

  _handleClick = (e, orientation, dir) => {
    this.setState({ show: false, [orientation]: dir }, () => {
      this.setState({ show: true }, () => {
        dispatchCustomEvent({
          name: "show-tooltip",
          detail: {
            id: "orientation-tester-tooltip",
            type: "body",
          },
        });
      });
    });
  };

  componentWillUnmount = () => {
    dispatchCustomEvent({
      name: "remove-tooltip",
      detail: {
        id: "orientation-tester-tooltip",
        type: "body",
      },
    });
  };

  render() {
    let content = (
      <div css={STYLES_TOOLTIP_BUBBLE}>
        horizontal: "{this.state.horizontal}", vertical: "{this.state.vertical}"
      </div>
    );
    return (
      <SystemPage
        title="SDS: Tooltips"
        description="..."
        url="https://slate.host/_/system/tooltips"
      >
        <System.GlobalTooltip />
        <System.H1>
          Tooltips <ViewSourceLink file="system/tooltips.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The Tooltip component is used to provide the user with more information in a message that
          appears when they interact with an element.
        </System.P>
        <System.GlobalTooltip />
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>
          Import the GlobalTooltip, TooltipWrapper, and optionally the TooltipAnchor Components.
        </System.P>
        <br />
        <br />
        <CodeBlock>
          {`import * as React from "react";
import { GlobalTooltip, TooltipWrapper, TooltipAnchor } from "slate-react-system";`}
        </CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Tooltip</System.H2>
        <hr />
        <br />
        <System.P>
          Declare the <System.CodeText>GlobalTooltip</System.CodeText> at the root level of your
          document (e.g. in index.js or App.js) so it is accessible throughout and will not get
          buried in the DOM tree.
        </System.P>
        <br />
        <CodeBlock>
          {`class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalTooltip />
      </React.Fragment>
    );
  }
}`}
        </CodeBlock>
        <br />
        <System.P>
          Then, wrap your desired anchor with a <System.CodeText>TooltipWrapper</System.CodeText>.
          The wrapper's id should match the id in the dispatchCustomEvent call. This id must be
          unique for each tooltip.
        </System.P>
        <br />
        <System.P>
          The tooltip component, passed in as <System.CodeText>content</System.CodeText> to{" "}
          <System.CodeText>TooltipWrapper</System.CodeText>, will be displayed when a
          dispatchCustomEvent is called with its id.
        </System.P>
        <br />
        <System.TooltipAnchor
          type="body"
          id="tooltip-hello-friends"
          tooltip="Hello friends!! This is a tooltip from the slate-react-system"
        />
        <br />
        <br />
        <CodeBlock>
          {`class ExampleOne extends React.Component {
  _handleMouseEnter = (e) => {
    dispatchCustomEvent({
      name: "show-tooltip",
      detail: {
        id: "unique-tooltip-id",
      },
    });
  };
  _handleMouseLeave = (e) => {
    dispatchCustomEvent({
      name: "hide-tooltip",
      detail: {
        id: "unique-tooltip-id",
      },
    });
  };
  render() {
    let content = (
      <div css={STYLES_TOOLTIP_BUBBLE}>
        {this.props.tooltip}
      </div>
    );
    return (
      <TooltipWrapper
        id="unique-tooltip-id"
        content={content}
      >
        <span
          onMouseEnter={this._handleMouseEnter}
          onMouseLeave={this._handleMouseLeave}
        >
          <SVG.Information height="24px" />
        </span>
      </TooltipWrapper>
    )
  }
}`}
        </CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Tooltip Anchor</System.H2>
        <hr />
        <br />
        <System.P>
          For a pre-styled tooltip that accepts a string and handles dispatchCustomEvent and styling
          for you, use the <System.CodeText>TooltipAnchor</System.CodeText> component. Be sure to
          give it a unique id.
        </System.P>
        <br />
        <System.TooltipAnchor type="body" id="another-unique-tooltip-id" tooltip="Hello friends!" />
        <br />
        <br />
        <CodeBlock>
          {`class ExampleTwo extends React.Component {
  render() {
    return <TooltipAnchor id="another-unique-tooltip-id" tooltip="Hello friends!" />;
  }
}`}
        </CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Setting an Orientation</System.H2>
        <hr />
        <br />
        <System.P>
          You can set a tooltip to appear in a set orientation using the{" "}
          <System.CodeText>horizontal</System.CodeText> and{" "}
          <System.CodeText>vertical</System.CodeText> props. These can be applied to both the{" "}
          <System.CodeText>TooltipWrapper</System.CodeText> and the{" "}
          <System.CodeText>TooltipAnchor</System.CodeText> components.
        </System.P>
        <br />
        <div>
          <System.P>Horizontal</System.P>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {["far-left", "left", "center", "right", "far-right"].map((dir) => (
              <System.ButtonPrimary
                style={{ width: "100px" }}
                onClick={(e) => {
                  this._handleClick(e, "horizontal", dir);
                }}
              >
                {dir}
              </System.ButtonPrimary>
            ))}
          </div>
          <br />
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto" }}>
            {this.state.show ? (
              <div style={STYLES_DEMO_TOOLTIP}>
                <System.TooltipWrapper
                  id="orientation-tester-tooltip"
                  content={content}
                  horizontal={this.state.horizontal}
                  vertical={this.state.vertical}
                  type="body"
                >
                  <System.SVG.Information height="24px" />
                </System.TooltipWrapper>
              </div>
            ) : null}
            <div>
              <System.P>Vertical</System.P>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "300px",
                }}
              >
                {["above", "up", "center", "down", "below"].map((dir) => (
                  <System.ButtonPrimary
                    style={{ width: "100px" }}
                    onClick={(e) => {
                      this._handleClick(e, "vertical", dir);
                    }}
                  >
                    {dir}
                  </System.ButtonPrimary>
                ))}
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <CodeBlock>{`class ExampleThree extends React.Component {
  render() {
    return (
      <TooltipAnchor
        id="yet-another-unique-tooltip-id"
        tooltip="Hello friends!"
        style={{ opacity: "70%" }}
        horizontal="${this.state.horizontal}"
        vertical="${this.state.vertical}"
      />
    );
  }
}`}</CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Accepted React Properties</System.H2>
        <hr />
        <br />
        <Group title="TooltipAnchor Properties">
          <System.Table
            data={{
              columns: [
                { key: "a", name: "Name", width: "128px" },
                { key: "b", name: "Type", width: "88px", type: "OBJECT_TYPE" },
                { key: "c", name: "Default", width: "88px" },
                { key: "d", name: "Description", width: "100%" },
              ],
              rows: [
                {
                  id: 1,
                  a: <span style={{ fontFamily: Constants.font.semiBold }}>id</span>,
                  b: "string",
                  c: "null",
                  d: "Unique id to identify the tooltip.",
                },
                {
                  id: 2,
                  a: "tooltip",
                  b: "string",
                  c: "null",
                  d: "Output text on the tooltip bubble.",
                },
                {
                  id: 3,
                  a: "height",
                  b: "number",
                  c: "24px",
                  d: "Height of the tooltip anchor icon.",
                },
                {
                  id: 4,
                  a: "style",
                  b: "Object",
                  c: "null",
                  d: "Style applied to the tooltip bubble.",
                },
                {
                  id: 5,
                  a: "anchorStyle",
                  b: "Object",
                  c: "null",
                  d: "Style applied to the tooltip anchor.",
                },
                {
                  id: 6,
                  a: "children",
                  b: "Object",
                  c: "null",
                  d:
                    "Will be rendered instead of the default question mark SVG as the tooltip anchor.",
                },
                {
                  id: 7,
                  a: "horizontal",
                  b: "string",
                  c: "center",
                  d:
                    "Horizontal positioning of the tooltip relative to the anchor (far-left, left, center, right, far-right)",
                },
                {
                  id: 8,
                  a: "vertical",
                  b: "string",
                  c: "above",
                  d:
                    "Vertical positioning of the tooltip relative to the anchor (above, up, center, down, below)",
                },
              ],
            }}
          />
        </Group>
        <br />
        <br />
        <Group title="TooltipWrapper Properties">
          <System.Table
            data={{
              columns: [
                { key: "a", name: "Name", width: "128px" },
                { key: "b", name: "Type", width: "88px", type: "OBJECT_TYPE" },
                { key: "c", name: "Default", width: "88px" },
                { key: "d", name: "Description", width: "100%" },
              ],
              rows: [
                {
                  id: 1,
                  a: <span style={{ fontFamily: Constants.font.semiBold }}>id</span>,
                  b: "string",
                  c: "null",
                  d: "Unique id to identify the tooltip.",
                },
                {
                  id: 2,
                  a: "content",
                  b: "Component",
                  c: "null",
                  d: "Component rendered as the tooltip bubble.",
                },
                {
                  id: 3,
                  a: "horizontal",
                  b: "string",
                  c: "center",
                  d:
                    "Horizontal positioning of the tooltip relative to the anchor (far-left, left, center, right, far-right)",
                },
                {
                  id: 4,
                  a: "vertical",
                  b: "string",
                  c: "above",
                  d:
                    "Vertical positioning of the tooltip relative to the anchor (above, up, center, down, below)",
                },
                {
                  id: 5,
                  a: "children",
                  b: "Component",
                  c: "null",
                  d: "The tooltip anchor",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
