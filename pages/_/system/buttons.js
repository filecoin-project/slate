import * as React from "react";
import * as System from "~/components/system";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";
import Group from "~/components/system/Group";

export default class SystemPageButtons extends React.Component {
  render() {
    return (
      <SystemPage title="SDS: Buttons" description="..." url="https://slate.host/_/system/buttons">
        <System.H1>
          Buttons <ViewSourceLink file="system/buttons.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The Button component is used to trigger an action or event, such as submitting a form or
          saving users information.
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
  ButtonTertiary,
  ButtonDisabled,
  ButtonWarning,
} from "slate-react-system";`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Regular width</System.H2>
        <hr />
        <br />
        <System.P>
          There are five variations of the button component.
          <br />
          Primary, Secondary, Tertiary, Disabled, and Warning.
        </System.P>
        <br />
        <System.ButtonPrimary>Primary</System.ButtonPrimary> &nbsp;
        <System.ButtonSecondary>Secondary</System.ButtonSecondary> &nbsp;
        <System.ButtonTertiary>Tertiary</System.ButtonTertiary> &nbsp;
        <System.ButtonDisabled>Disabled</System.ButtonDisabled> &nbsp;
        <System.ButtonWarning>Warning</System.ButtonWarning>
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

class ExampleTertiary extends React.Component {
  render() {
    return <ButtonTertiary>Tertiary Button</ButtonTertiary>;
  }
}

class ExampleDisabled extends React.Component {
  render() {
    return <ButtonDisabled>Disabled Button</ButtonDisabled>;
  }
}

class ExampleWarning extends React.Component {
  render() {
    return <ButtonWarning>Warning Button</ButtonWarning>;
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
        <br />
        <System.ButtonSecondary full>Secondary button full</System.ButtonSecondary>
        <br />
        <br />
        <System.ButtonTertiary full>Tertiary button full</System.ButtonTertiary>
        <br />
        <br />
        <System.ButtonDisabled full>Disabled button full</System.ButtonDisabled>
        <br />
        <br />
        <System.ButtonWarning full>Warning button full</System.ButtonWarning>
        <br />
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

class ExampleTertiaryFull extends React.Component {
  render() {
    return <ButtonTertiary full>Tertiary button full</ButtonTertiary>;
  }
}

class ExampleDisabledFull extends React.Component {
  render() {
    return <ButtonDisabled full>Disabled button full</ButtonDisabled>;
  }
}

class ExampleWarningFull extends React.Component {
  render() {
    return <ButtonWarning full>Warning button full</ButtonWarning>;
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
          You can add the <i>type='label'</i> property to convert any of the above buttons into a
          label.
        </System.P>
        <br />
        <System.ButtonPrimary type="label">Primary label</System.ButtonPrimary> &nbsp;
        <System.ButtonSecondary type="label">Secondary label</System.ButtonSecondary> &nbsp;
        <System.ButtonTertiary type="label">Tertiary label</System.ButtonTertiary> &nbsp;
        <System.ButtonDisabled type="label">Disabled label</System.ButtonDisabled> &nbsp;
        <br />
        <br />
        <System.ButtonWarning type="label">Warning label</System.ButtonWarning>
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

class ExampleTertiaryLabel extends React.Component {
  render() {
    return (
      <ButtonTertiary type="label">Tertiary Button Label</ButtonTertiary>
    );
  }
}

class ExampleDisabledLabel extends React.Component {
  render() {
    return <ButtonDisabled type="label">Disabled Button Label</ButtonDisabled>;
  }
}

class ExampleWarningLabel extends React.Component {
  render() {
    return <ButtonWarning type="label">Warning Button Label</ButtonWarning>;
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
