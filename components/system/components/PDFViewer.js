import * as React from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { css } from "@emotion/react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const STYLES_PAGE = css`
  margin-bottom: 30px;
`;
export default class PDFViewer extends React.Component {
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
      <Document
        file={this.props.file}
        onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} css={STYLES_PAGE} />
        ))}
      </Document>
    );
  }
}
