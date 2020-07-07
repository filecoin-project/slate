import * as React from "react";
import * as System from "~/components/system";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

const EXAMPLE_CODE = `import * as React from 'react';
import { CreateFilecoinStorageDeal } from 'slate-react-system';

class Example extends React.Component {
  _handleSubmit = async ({ file }) => {
    let data = new FormData();
    data.append("image", file);

    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: data,
    };

    const response = await fetch('/your-storage-end-point', options);
    const json = await response.json();
  }

  render() {
    return (
      <CreateFilecoinStorageDeal onSubmit={this._handleSubmit} />
    );
  }
}
`;

export default class SystemPageMakeStorageDeal extends React.Component {
  _handleSubmit = async ({ file }) => {
    // TODO(jim): Send file data to server.
    alert(file);
  };

  render() {
    return (
      <SystemPage
        title="SDS: Make a Storage Deal"
        description="..."
        url="https://fps.onrender.com/experiences/make-storage-deal"
      >
        <System.H1>
          Make a Storage Deal{" "}
          <ViewSourceLink file="experiences/make-storage-deal.js" />
        </System.H1>
        <br />
        <br />
        <System.P>
          Here is a partial example of using{" "}
          <a target="_blank" href="https://github.com/textileio/powergate/">
            Textile's Powergate
          </a>{" "}
          to make a data storage deal. This example only provides an example for
          how to send your file to a server. <br />
          <br />
          There will be an example of how to make a storage deal coming soon.
        </System.P>
        <br />
        <br />
        <System.CreateFilecoinStorageDeal onSubmit={this._handleSubmit} />
        <br />
        <br />
        <System.H2>Code</System.H2>
        <br /> <br />
        <System.CodeBlock>{EXAMPLE_CODE}</System.CodeBlock>
      </SystemPage>
    );
  }
}
