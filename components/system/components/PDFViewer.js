import * as React from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { css } from "@emotion/react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const STYLES_DOCUMENT = css`
  display: grid;
  place-items: center;
  margin: 0;
  padding: 20px 0 0;
  width: 100%;
  min-height: 10%;
  height: 100%;
  user-select: none;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const STYLES_PAGE = css`
  margin-bottom: 20px;
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
        {...this.props}
        css={STYLES_DOCUMENT}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} css={STYLES_PAGE} />
        ))}
      </Document>
    );
  }
}
