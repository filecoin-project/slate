import * as React from "react";
import * as System from "~/components/system";
import Group from "~/components/system/Group";
import * as Constants from "~/common/constants";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

export default class SystemPageNotifications extends React.Component {
  state = {
    exampleOne: true,
    exampleTwo: true,
    exampleThree: true,
  };

  _handleChange = (name) => {
    this.setState({ [name]: false });
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
        <br />
        <System.CodeBlock>
          {`import * as React from 'react';
import { Notification } from 'slate-react-system';`}
        </System.CodeBlock>
        <br />
        <br />
        <System.H2>Notification with status</System.H2>
        <hr />
        <br />
        <System.Notification
          label="Info Notification"
          description="Here is the description"
          status="INFO"
        />
        <br />
        <System.Notification
          label="Success Notification"
          description="Here is the description"
          status="SUCCESS"
        />
        <br />
        <System.Notification
          label="Warning Notification"
          description="Here is the description"
          status="WARNING"
        />
        <br />
        <System.Notification
          label="Error Notification"
          description="Whoops that doesn't look good"
          status="ERROR"
        />
        <br />
        <br />
        <System.P>Declare the Notification component with a status.</System.P>
        <br />
        <System.CodeBlock>
          {`class ExampleOne extends React.Component {
   render() {
       return(
          <Notification
            label="Info Notification"
            description="Here is the description"
            status="INFO"
          />
          <br />
          <Notification
            label="Success Notification"
            description="Here is the description"
            status="SUCCESS"
          />
          <br />
          <Notification
            label="Warning Notification"
            description="Here is the description"
            status="WARNING"
          />
          <br />
          <Notification
            label="Error Notification"
            description="Whoops that doesn't look good"
            status="ERROR"
          />
       )
   }
}`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Notification with content</System.H2>
        <hr />
        <br />
        <System.Notification
          label="Doge demands your attention"
          description={
            <div style={{ display: "grid", gridTemplateColumns: "1fr 5fr" }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg"
                alt="doge"
                style={{ height: "50px", display: "inline-block" }}
              />
              You can style the description how you like and even add photos or
              other components.
            </div>
          }
        />
        <br />
        <br />
        <System.P>
          Declare the Notification component with components in the description
        </System.P>
        <br />
        <System.CodeBlock>
          {`let imgLink= "https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg"
          
class ExampleTwo extends React.Component {
   render() {
       return(
          <Notification
            label="Doge demands your attention"
            description={
              <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 5fr" 
                }}
              >
                <img src={imgLink}
                  alt="doge"
                  style={{ height: "50px", display: "inline-block" }}
                />
                You can style the description how you like and 
                even add photos or other components.
              </div>
            }
        />
       )
   }
}`}
        </System.CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Notification with onClose function and timer</System.H2>
        <hr />
        <br />
        {this.state.exampleOne ? (
          <System.Notification
            label="Notification with a timer and a close function"
            description="This notification disappears after 1 minute"
            interval={60000}
            onClose={() => this._handleChange("exampleOne")}
          />
        ) : (
          <System.P>
            This notification disappeared after 1 minute. Refresh the page to
            see it.
          </System.P>
        )}
        <br />
        <br />
        <System.P>
          Declare the Notification component with an onClose function which is
          triggered when the x is clicked.
        </System.P>
        <br />
        <System.P>
          You can include an interval in milliseconds, after which onClose is
          automatically called. If the user mouses over the notification, the
          timer restarts.
        </System.P>
        <br />
        <System.CodeBlock>
          {`class exampleOne extends React.Component {
   state = { exampleOne: true }

   render() {
     return(
        {this.state.exampleOne ? (
          <Notification
            label="Notification with a timer and a close function"
            description="This notification disappears after 5 minutes"
            interval={180000}
            onClose={() => this._handleChange("exampleOne")}
          />
        ) : (
            <div>This notification disappeared after 5 minutes</div>
        )}
     )
   }
}`}
        </System.CodeBlock>
        <br />
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
                { key: "b", name: "Type", width: "88px" },
                { key: "c", name: "Default", width: "88px" },
                { key: "d", name: "Description", width: "100%" },
              ],
              rows: [
                {
                  id: 1,
                  a: "onClose",
                  b: <System.CodeText nowrap>function</System.CodeText>,
                  c: "null",
                  d:
                    "Function called when the 'x' is clicked or the interval (if specified) runs out",
                },
                {
                  id: 2,
                  a: "status",
                  b: <System.CodeText nowrap>string</System.CodeText>,
                  c: "INFO",
                  d:
                    "Status which determines the styling and color of the notification. Use INFO, SUCCESS, WARNING, or ERROR",
                },
                {
                  id: 3,
                  a: "interval",
                  b: <System.CodeText nowrap>int</System.CodeText>,
                  c: "null",
                  d:
                    "Number of milliseconds before onClose is automatically called. Interval resets if user mouses over the notification",
                },
                {
                  id: 4,
                  a: "label",
                  b: <System.CodeText nowrap>string</System.CodeText>,
                  c: "null",
                  d: "Label text",
                },
                {
                  id: 5,
                  a: "description",
                  b: (
                    <div>
                      <System.CodeText nowrap>string</System.CodeText>
                      <System.CodeText nowrap>Component</System.CodeText>
                    </div>
                  ),
                  c: "null",
                  d: "Description text",
                },
                {
                  id: 6,
                  a: "tooltip",
                  b: <System.CodeText nowrap>string</System.CodeText>,
                  c: "null",
                  d: "Tooltip text",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
