import * as React from "react";
import * as System from "~/components/system";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";

const EXAMPLE_CODE = `import * as React from 'react';
import { CreateFilecoinStorageDeal } from 'slate-react-system';

// NOTE(jim)
// Requires token and authentication
class Example extends React.Component {
  _handleSubmit = async (data) => {
    const file = data.file.files[0];

    var buffer = [];

    // NOTE(jim): A little hacky...
    const getByteArray = async () =>
      new Promise((resolve) => {
        const reader = new FileReader();

        reader.onloadend = function(e) {
          if (e.target.readyState == FileReader.DONE) {
            buffer = new Uint8Array(e.target.result);
          }

          resolve();
        };

        reader.readAsArrayBuffer(file);
      });

    await getByteArray();

    // NOTE(jim):
    // For this example, my PG instance happens to be this.PG
    const { cid } = await this.PG.ffs.addToHot(buffer);
    const { jobId } = await this.PG.ffs.pushConfig(cid);
    const cancel = this.PG.ffs.watchJobs((job) => {
      console.log(job);
    }, jobId);
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
