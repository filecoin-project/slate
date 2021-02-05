import * as React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import * as System from "~/components/system";

import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default class SystemPageToggles extends React.Component {
  state = {
    numPages: 0,
  };

  onDocumentLoadSuccess({ numPages }) {
    this.setState({
      numPages,
    });
  }

  render() {
    const { numPages } = this.state;
    return (
      <SystemPage
        title="SDS: Pdf Viewer"
        description="..."
        url="https://slate.host/_/system/pdf-viewer"
      >
        <System.H1>Pdf Viewer</System.H1>
        <br />
        <br />
        <System.P>Render pdf file in browser</System.P>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P>Import React and the Document Component.</System.P>
        <br />
        <br />
        <CodeBlock>
          {`import * as React from "react";
import { Document, Page, pdfjs } from "react-pdf";

// only do this if your builder cannot find worker.js
pdfjs.GlobalWorkerOptions.workerSrc = \`//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js\`;
`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P>Declare the Document component.</System.P>
        <br />
        <CodeBlock>
          {`class ExampleOne extends React.Component {
  state = {
    numPages: 0,
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({
      numPages,
    });
  }

  render() {
    return (
        <Document
        file={url}
        onLoadSuccess={this.onDocumentLoadSuccess}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={\`page_\${index + 1}\`} pageNumber={index + 1} />
        ))}
      </Document>
    );
  }
}


`}
        </CodeBlock>

        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        <Document
          file="https://slate.textile.io/ipfs/bafybeibyeaznm4iaungi6cfxpy75mnkpn64c3zw2kgq7qkpvecvqlrpw6u"
          onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </SystemPage>
    );
  }
}
