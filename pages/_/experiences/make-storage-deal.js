import * as React from "react";
import * as System from "~/components/system";

import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

import { dispatchCustomEvent } from "~/common/custom-events";

const EXAMPLE_CODE = `import * as React from "react";
import { CreateFilecoinStorageDeal } from "slate-react-system";
import { createPow } from "@textile/powergate-client";

const PowerGate = createPow({ host: "https://grpcweb.slate.textile.io" });

class Example extends React.Component {
  componentDidMount = async () => {
    const FFS = await PowerGate.ffs.create();
    const token = FFS.token ? FFS.token : null;
    PowerGate.setToken(token);
    this.setState({ token });
  };

  _handleSubmit = async (data) => {
    const file = data.file.files[0];

    var buffer = [];

    // NOTE(jim): A little hacky...
    const getByteArray = async () =>
      new Promise((resolve) => {
        const reader = new FileReader();

        reader.onloadend = function (e) {
          if (e.target.readyState == FileReader.DONE) {
            buffer = new Uint8Array(e.target.result);
          }

          resolve();
        };

        reader.readAsArrayBuffer(file);
      });

    await getByteArray();

    const { cid } = await PowerGate.ffs.stage(buffer);
    const { jobId } = await PowerGate.ffs.pushStorageConfig(cid);
    const cancel = PowerGate.ffs.watchJobs((job) => {
      console.log(job);
    }, jobId);
  };

  render() {
    return <CreateFilecoinStorageDeal onSubmit={this._handleSubmit} />;
  }
}
`;

export default class SystemPageMakeStorageDeal extends React.Component {
  _handleSubmit = async ({ file }) => {
    // TODO(jim): Send file data to server.
    dispatchCustomEvent({
      name: "create-alert",
      detail: {
        alert: { message: "Storage deals are still under development" },
      },
    });
  };

  render() {
    return (
      <SystemPage
        title="SDS: Make a Storage Deal"
        description="..."
        url="https://slate.host/_/experiences/make-storage-deal"
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
        <br />
        <System.H2>Code</System.H2>
        <hr />
        <br />
        <CodeBlock>{EXAMPLE_CODE}</CodeBlock>
      </SystemPage>
    );
  }
}
