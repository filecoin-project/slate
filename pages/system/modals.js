import * as React from "react";
import * as System from "~/components/system";
import Group from "~/components/system/Group";
import * as Constants from "~/common/constants";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

export default class SystemPageNotifications extends React.Component {
  _handleCreate = (detail) => {
    System.dispatchCustomEvent({ name: "create-modal", detail: detail });
  };

  _handleDelete = () => {
    System.dispatchCustomEvent({ name: "delete-modal", detail: {} });
  };

  render() {
    return (
      <SystemPage
        title="SDS: Modals"
        description="..."
        url="https://fps.onrender.com/system/modals"
      >
        <System.H1>
          Modals <ViewSourceLink file="system/modals.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          The Modal component is used to get a user's focus and require an
          action.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>
          Import React and the Modal Component, as well as the
          dispatchCustomEvent function.
        </System.P>
        <br />
        <System.CodeBlock>
          {`import * as React from 'react';
import { GlobalModal, dispatchCustomEvent } from 'slate-react-system';`}
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
          Optionally, use <System.CodeText>backgroundStyle</System.CodeText> to
          style the background and <System.CodeText>style</System.CodeText> to
          style the modal itself.
        </System.P>
        <br />
        <System.CodeBlock>
          {`class App extends React.Component {
  render() {
    return(
      <React.Fragment>
        <GlobalModal style={{ padding: "40px 16px" }} />
        {this.props.children}     
      </React.Fragment>
    )
  }
}`}
        </System.CodeBlock>
        <System.GlobalModal style={{ padding: "40px 16px" }} />
        <br />
        <br />
        <br />
        <System.H2>Modal</System.H2>
        <hr />
        <br />
        <System.ButtonSecondaryFull
          onClick={() =>
            this._handleCreate({
              modal: (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <System.H2>Render whatever component you like here</System.H2>
                  <br />
                  <System.ButtonSecondary onClick={this._handleDelete}>
                    Cancel
                  </System.ButtonSecondary>
                </div>
              ),
            })
          }
        >
          Click for modal popup
        </System.ButtonSecondaryFull>
        <br />
        <System.P>
          While the Modal component is always present, a modal will only appear
          once you trigger it by creating a custom event with the title{" "}
          <System.CodeText>"create-modal"</System.CodeText>. It can be removed
          with a custom event entitled{" "}
          <System.CodeText>"delete-modal"</System.CodeText>.
        </System.P>
        <br />
        <System.CodeBlock>
          {`class ExampleOne extends React.Component {
  _handleCreate = (detail) => {
    dispatchCustomEvent({ name: "create-modal", detail: detail })
  };

  _handleDelete = () => {
    dispatchCustomEvent({ name: "delete-modal", detail: {} });
  };

  render() {
    let modalContent = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <H2>Render whatever component you like here</H2>
        <br />
        <ButtonSecondary onClick={this._handleDelete}>
          Cancel
        </ButtonSecondary>
      </div>
    )
    return(
      <ButtonSecondaryFull
        onClick={() =>
          this._handleCreate({ modal: modalContent })
        }
      >
        Click for modal popup
      </ButtonSecondaryFull>
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
                { key: "b", name: "Type", width: "88px", type: "OBJECT_TYPE" },
                { key: "c", name: "Default", width: "88px" },
                { key: "d", name: "Description", width: "100%" },
              ],
              rows: [
                {
                  id: 1,
                  a: "style",
                  b: "Object",
                  c: "{}",
                  d:
                    "Style object used to style the modal (height and width, positioning, padding etc.)",
                },
                {
                  id: 2,
                  a: "backgroundStyle",
                  b: "Object",
                  c: "{}",
                  d:
                    "Style object used to style the modal background (color, etc.)",
                },
              ],
            }}
          />
        </Group>
        <br />
        <br />
        <br />
        <System.H2>
          Accepted <i>Create</i> Modal Properties
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
                      modal
                    </span>
                  ),
                  b: "Component",
                  c: "null",
                  d: "Component to be rendered inside the modal",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
