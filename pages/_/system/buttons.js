import * as React from "react";
import * as System from "~/components/system";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";
import Group from "~/components/system/Group";

export default class SystemPageButtons extends React.Component {
  render() {
    return (
      <SystemPage
        title="SDS: Buttons"
        description="..."
        url="https://slate.host/_/system/buttons"
      >
        <System.H1>
          Buttons <ViewSourceLink file="system/buttons.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The Button component is used to trigger an action or event, such as
          submitting a form or saving users information.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>Import React and the Button Components.</System.P>
        <br />
        <br />
        <CodeBlock>
          {`import * as React from "react";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonDisabled,
} from "slate-react-system";`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Regular width</System.H2>
        <hr />
        <br />
        <System.P>
          There are three variations of the button component.
          <br />
          Primary, Secondary and Disabled.
        </System.P>
        <br />
        <System.ButtonPrimary>Primary</System.ButtonPrimary> &nbsp;
        <System.ButtonSecondary>Secondary</System.ButtonSecondary> &nbsp;
        <System.ButtonDisabled>Disabled</System.ButtonDisabled>
        <br />
        <br />
        <CodeBlock>
          {`class ExamplePrimary extends React.Component {
  render() {
    return <ButtonPrimary>Primary Button</ButtonPrimary>;
  }
}

class ExampleSecondary extends React.Component {
  render() {
    return <ButtonSecondary>Secondary Button</ButtonSecondary>;
  }
}

class ExampleDisabled extends React.Component {
  render() {
    return <ButtonDisabled>Disabled Button</ButtonDisabled>;
  }
}`}
        </CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Full width</System.H2>
        <hr />
        <br />
        <System.P>Each of the button styles has a full width option.</System.P>
        <br />
        <System.ButtonPrimary full>Primary button full</System.ButtonPrimary>
        <br />
        <System.ButtonSecondary full>
          Secondary button full
        </System.ButtonSecondary>
        <br />
        <System.ButtonDisabled full>Disabled button full</System.ButtonDisabled>
        <br />
        <br />
        <CodeBlock>
          {`class ExamplePrimaryFull extends React.Component {
  render() {
    return <ButtonPrimary full>Primary button full</ButtonPrimary>;
  }
}

class ExampleSecondaryFull extends React.Component {
  render() {
    return <ButtonSecondary full>Secondary button full</ButtonSecondary>;
  }
}

class ExampleDisabledFull extends React.Component {
  render() {
    return <ButtonDisabled full>Disabled button full</ButtonDisabled>;
  }
}`}
        </CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Labels</System.H2>
        <hr />
        <br />
        <System.P>
          You can add the <i>type='label'</i> property to convert any of the
          above buttons into a label.
        </System.P>
        <br />
        <System.ButtonPrimary type="label">
          Primary label
        </System.ButtonPrimary>{" "}
        &nbsp;
        <System.ButtonSecondary type="label">
          Secondary label
        </System.ButtonSecondary>{" "}
        &nbsp;
        <System.ButtonDisabled type="label">
          Disabled label
        </System.ButtonDisabled>
        <br />
        <br />
        <CodeBlock>
          {`class ExamplePrimaryLabel extends React.Component {
  render() {
    return <ButtonPrimary type="label">Primary Button Label</ButtonPrimary>;
  }
}

class ExampleSecondaryLabel extends React.Component {
  render() {
    return (
      <ButtonSecondary type="label">Secondary Button Label</ButtonSecondary>
    );
  }
}

class ExampleDisabledLabel extends React.Component {
  render() {
    return <ButtonDisabled type="label">Disabled Button Label</ButtonDisabled>;
  }
}`}
        </CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Accepted React Properties</System.H2>
        <hr />
        <br />
        <Group title="Buttons">
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
                  a: "type",
                  b: "string",
                  c: "null",
                  d: "If set to 'label', button will be a label.",
                },
                {
                  id: 2,
                  a: "full",
                  b: "boolean",
                  c: "false",
                  d:
                    "If true, width is set to 100%. Otherwise, width is according to the content of the button.",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
