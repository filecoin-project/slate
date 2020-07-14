import * as React from "react";
import * as System from "~/components/system";
import Group from "~/components/system/Group";
import * as Constants from "~/common/constants";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

export default class SystemPageNotifications extends React.Component {
  state = {
    count: 0,
  };

  _handleCreate = (detail) => {
    let event = new CustomEvent("create-notification", { detail });
    window.dispatchEvent(event);
    this.setState({ count: this.state.count + 1 });
  };

  _handleDelete = () => {
    let event = new CustomEvent("delete-notification", {});
    window.dispatchEvent(event);
  };

  render() {
    return (
      <SystemPage
        title="SDS: Notifications"
        description="..."
        url="https://fps.onrender.com/system/notifications"
      >
        <System.H1>
          Notifications <ViewSourceLink file="system/notification.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The Notification component is used to alert a user of new information.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>Import React and the Notification Component.</System.P>
        <br />
        <System.CodeBlock>
          {`import * as React from 'react';
import { GlobalNotification } from 'slate-react-system';`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>
          Declare the component at the root level of your document (e.g. in
          index.js or App.js) so it is accessible throughout and will not get
          buried in the DOM tree.
        </System.P>
        <br />
        <System.P>
          Use <System.CodeText>style</System.CodeText> to specify placement of
          the fixed positioning notification list. Default is bottom right.
        </System.P>
        <br />
        <System.CodeBlock>
          {`class App extends React.Component {
  render() {
    return(
      <React.Fragment>
        <GlobalNotification style={{ bottom: 0, right: 0 }} />
        {this.props.children}     
      </React.Fragment>
    )
  }
}`}
        </System.CodeBlock>
        <System.GlobalNotification style={{ bottom: 0, right: 0 }} />
        <br />
        <br />
        <br />
        <System.H2>Notification</System.H2>
        <hr />
        <br />
        <System.ButtonSecondaryFull
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is a regular notification",
            })
          }
        >
          Click for notification
        </System.ButtonSecondaryFull>
        <br />
        <System.ButtonSecondaryFull
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is a dark notification",
              dark: true,
            })
          }
        >
          Click for dark style notification
        </System.ButtonSecondaryFull>
        <br />
        <System.ButtonPrimaryFull onClick={this._handleDelete}>
          Click to clear notifications
        </System.ButtonPrimaryFull>
        <br />
        <System.P>
          A notification will only appear once you trigger it by creating a
          custom event with the title{" "}
          <System.CodeText>"create-notification"</System.CodeText>. It can be
          removed with a custom event entitled{" "}
          <System.CodeText>"delete-notification"</System.CodeText>.
        </System.P>
        <br />
        <System.P>
          Multiple stacked notifications can be created using a single
          Notification component.{" "}
          <strong>Each co-existing notification must have a unique id.</strong>
        </System.P>
        <br />
        <System.CodeBlock>
          {`class ExampleOne extends React.Component {
  state = {
    count: 0,
  };

  _handleCreate = (detail) => {
    let event = new CustomEvent("create-notification", { detail });
    window.dispatchEvent(event);
    this.setState({ count: this.state.count + 1 });
  };

  _handleDelete = (detail) => {
    let event = new CustomEvent("delete-notification", { detail });
    window.dispatchEvent(event);
  };

  render() {
    return(
      <ButtonSecondaryFull
        onClick={() =>
          this._handleCreate({
            id: this.state.count,
            description: "This is notification number " + this.state.count,
          })
        }
       >
         Click for notification
       </ButtonSecondaryFull>
       <br />
       <ButtonSecondaryFull
        onClick={() =>
          this._handleCreate({
            id: this.state.count,
            description: "This is a dark notification",
            dark: true,
          })
        }
      >
        Click for dark style notification
      </ButtonSecondaryFull>

      <ButtonPrimaryFull onClick={this._handleDelete}>
        Click to clear notifications
      </ButtonPrimaryFull>
    )
  }
}`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Notification with timeout</System.H2>
        <hr />
        <br />
        <System.ButtonSecondaryFull
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This disappears after 5 seconds",
              timeout: 5000,
            })
          }
        >
          Click for disappearing notification
        </System.ButtonSecondaryFull>
        <br />
        <System.ButtonPrimaryFull onClick={this._handleDelete}>
          Click to clear notifications
        </System.ButtonPrimaryFull>
        <br />
        <System.P>
          You can declare the Notification component with a{" "}
          <System.CodeText>timeout</System.CodeText> (in milliseconds) after
          which it will automatically disappear.
        </System.P>
        <br />
        <System.CodeBlock>
          {`class ExampleTwo extends React.Component {
  state = {
    count: 0,
  };

  _handleCreate = (detail) => {
    let event = new CustomEvent("create-notification", { detail });
    window.dispatchEvent(event);
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return(
      <ButtonSecondaryFull
        onClick={() =>
          this._handleCreate({
            id: this.state.count,
            description: "This disappears after 5 seconds",
            timeout: 5000,
          })
        }
      >
        Click for disappearing notification
      </System.ButtonSecondaryFull>

      <ButtonPrimaryFull onClick={this._handleDelete}>
        Click to clear notifications
      </ButtonPrimaryFull>
    )
  }
}`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Notification with status</System.H2>
        <hr />
        <br />
        <System.ButtonSecondaryFull
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is an info notification",
              status: "INFO",
            })
          }
        >
          Click for info style notification
        </System.ButtonSecondaryFull>
        <br />
        <System.ButtonSecondaryFull
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is a success notification",
              status: "SUCCESS",
            })
          }
        >
          Click for success style notification
        </System.ButtonSecondaryFull>
        <br />
        <System.ButtonSecondaryFull
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is a warning notification",
              status: "WARNING",
            })
          }
        >
          Click for warning style notification
        </System.ButtonSecondaryFull>
        <br />
        <System.ButtonSecondaryFull
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is an error notification",
              status: "ERROR",
            })
          }
        >
          Click for error style notification
        </System.ButtonSecondaryFull>
        <br />
        <System.ButtonPrimaryFull onClick={this._handleDelete}>
          Click to clear notifications
        </System.ButtonPrimaryFull>
        <br />
        <br />
        <System.P>
          Declare the Notification component with a{" "}
          <System.CodeText>status</System.CodeText> to style it accordingly.
          This is overridden if <System.CodeText>dark</System.CodeText> is set
          to true.
        </System.P>
        <br />
        <System.CodeBlock>
          {`class ExampleThree extends React.Component {
  state = {
    count: 0,
  };

  _handleCreate = (detail) => {
    let event = new CustomEvent("create-notification", { detail });
    window.dispatchEvent(event);
    this.setState({ count: this.state.count + 1 });
  };

  _handleDelete = (detail) => {
    let event = new CustomEvent("delete-notification", { detail });
    window.dispatchEvent(event);
  };

  render() {
    return(
      <ButtonSecondaryFull
        onClick={() =>
          this._handleCreate({
            id: this.state.count,
            description: "This is an info notification",
            status: "INFO",
          })
        }
      >
        Click for info style notification
      </ButtonSecondaryFull>

      <ButtonSecondaryFull
        onClick={() =>
          this._handleCreate({
            id: this.state.count,
            description: "This is a success notification",
            status: "SUCCESS",
          })
        }
      >
        Click for success style notification
      </ButtonSecondaryFull>

      <ButtonSecondaryFull
        onClick={() =>
          this._handleCreate({
            id: this.state.count,
            description: "This is a warning notification",
            status: "WARNING",
          })
        }
      >
        Click for warning style notification
      </ButtonSecondaryFull>

      <ButtonSecondaryFull
        onClick={() =>
          this._handleCreate({
            id: this.state.count,
            description: "This is an error notification",
            status: "ERROR",
          })
        }
      >
        Click for error style notification
      </ButtonSecondaryFull>

      <ButtonPrimaryFull onClick={this._handleDelete}>
        Click to clear notifications
      </ButtonPrimaryFull>
    )
  }
}`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Accepted React Properties</System.H2>
        <hr />
        <br />
        <Group title="Notifications">
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
                  a: "style",
                  b: "Object",
                  c: "{ bottom: 0, right: 0 }",
                  d:
                    "Style object used to style the notification list positioning on the page",
                },
              ],
            }}
          />
        </Group>
        <br />
        <br />
        <br />
        <System.H2>
          Accepted <i>Create</i> Notification Properties
        </System.H2>
        <hr />
        <br />
        <System.P>
          Note that these properties are passed through a custom event rather
          than as react properties.
        </System.P>
        <br />
        <Group title="Notifications">
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
                  a: (
                    <span style={{ fontFamily: Constants.font.semiBold }}>
                      id
                    </span>
                  ),
                  b: ["string", "number"],
                  c: "null",
                  d:
                    "Notification id, must be unique for simultaneously existing notifications",
                },
                {
                  id: 2,
                  a: "status",
                  b: "string",
                  c: "null",
                  d:
                    "Status which determines the styling and color of the notification. Use INFO, SUCCESS, WARNING, or ERROR",
                },
                {
                  id: 3,
                  a: "timeout",
                  b: "int",
                  c: "null",
                  d:
                    "Number of milliseconds before the notification automatically disappears",
                },
                {
                  id: 4,
                  a: "label",
                  b: "string",
                  c: "null",
                  d: "Label text",
                },
                {
                  id: 5,
                  a: "description",
                  b: "string",
                  c: "null",
                  d: "Description text",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
