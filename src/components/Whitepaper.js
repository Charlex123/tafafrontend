// components/PdfViewer.jsx
"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
const Whitepaper = ({ url }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className="h-screen w-screen">
      {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={url}
          plugins={[defaultLayoutPluginInstance]}
        />
      </Worker> */}
      {/* <iframe
      src="https://drive.google.com/file/d/11h3WlhD221wMuXyXWPsdmXb4UNM-qaot/preview"
      title="Async & Performance"
      width="800"
      height="600"
    /> */}
    </div>
  );
};
export default Whitepaper;