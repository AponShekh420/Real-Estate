"use client";

import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import dynamic from "next/dynamic";
const Viewer = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Viewer),
  { ssr: false }
);
const PDFViewer = ({ pdfUrl }) => {
  return (
    <div style={{ height: "90vh" }}>
      <Worker
        workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`}
      >
        <Viewer fileUrl={pdfUrl} />
      </Worker>
    </div>
  );
};

export default PDFViewer;
