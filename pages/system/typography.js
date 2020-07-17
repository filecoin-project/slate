import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import Group from "~/components/system/Group";
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
        title="SDS: Typography"
        description="..."
        url="https://fps.onrender.com/system/typography"
      >
        <System.H1>
          Typography <ViewSourceLink file="system/typography.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          [NEED NEW COPY] The Modal component is used to get a user's focus and require an
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
          {`import { Constants } from 'slate-react-system'; `}
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
        <System.CodeBlock>
          {`
<System.H1>
  Typography 
</System.H1>

<System.H2>
  Typography 
</System.H2>

<System.H3>
  Typography 
</System.H3>

<System.H4>
  Typography 
</System.H4>

<System.OL>
  <System.LI>Typography </System.LI>
  <System.LI>Typography </System.LI>
  <System.LI>Typography </System.LI>
</System.OL>

<System.UL>
  <System.LI>Typography </System.LI>
  <System.LI>Typography </System.LI>
  <System.LI>Typography </System.LI>
</System.UL>
        `}
        </System.CodeBlock>
   

      <br />
      <br />
      <br />
      <System.H2>Output</System.H2>
      <hr />
      <br />
      <System.P>
        Declare the component at the root level of your document (e.g. in
        index.js or App.js) so it is accessible throughout and will not get
        buried in the DOM tree.
      </System.P>
      <System.H1>
          Typography 
        </System.H1>
        <br />
        <System.H2>
          Typography 
        </System.H2>
        <br />
        <System.H3>
          Typography 
        </System.H3>
        <br />
        <System.H4>
          Typography 
        </System.H4>
        <br />
      </SystemPage>
    );
  }
}
