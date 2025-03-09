"use client";

import { useState } from "react";
// Ensure correct PDF worker version

import { Document, Page } from "react-pdf";

import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PdfViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Document file={pdfUrl}>
      <Page pageNumber={1} />
      {numPages &&
        Array.from({ length: numPages }, (_, i) => (
          <Page key={i} pageNumber={i + 1} height={200} />
        ))}
    </Document>
  );
}
