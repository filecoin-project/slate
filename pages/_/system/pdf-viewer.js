import * as React from "react";
import * as System from "~/components/system";

import SystemPage from "~/components/system/SystemPage";
import CodeBlock from "~/components/system/CodeBlock";

export default class SystemPDFViewer extends React.Component {
  render() {
    return (
      <SystemPage
        title="SDS: Pdf Viewer"
        description="..."
        url="https://slate.host/_/system/pdf-viewer"
      >
        <System.H1>PDF Viewer</System.H1>
        <br />
        <br />
        <System.P>
          The PDFViewer component is a way to render PDF files consistently across browsers.
        </System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>Import React and the PDFViewer Component.</System.P>
        <br />
        <br />
        <CodeBlock>
          {`import * as React from "react"; 
import PDFViewer from "~/components/system/components/PDFViewer";`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>
          Declare the PDFViewer component and pass the url of the PDF file to the PDFViewer
          component as file prop.
        </System.P>
        <br />
        <CodeBlock>{`<PDFViewer file={url} />`}</CodeBlock>

        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        <System.PDFViewer file="https://slate.textile.io/ipfs/bafybeibyeaznm4iaungi6cfxpy75mnkpn64c3zw2kgq7qkpvecvqlrpw6u" />
      </SystemPage>
    );
  }
}
