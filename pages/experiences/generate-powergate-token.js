import * as React from "react";
import * as System from "~/components/system";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

export default class GeneratePowergateToken extends React.Component {
  render() {
    return (
      <SystemPage
        title="SDS: Generate Powergate Token"
        description="..."
        url="https://fps.onrender.com/experiences/generate-powergate-token"
      >
        <System.H1>
          Generate Powergate token{" "}
          <ViewSourceLink file="experiences/generate-powergate-token.js" />
        </System.H1>
        <br />
        <br />
        <System.P>...</System.P>
      </SystemPage>
    );
  }
}
