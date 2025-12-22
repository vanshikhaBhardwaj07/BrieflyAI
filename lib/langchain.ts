import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(fileUrl: string) {
  try {
    // Fetch PDF from UploadThing URL
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error("Failed to fetch PDF");

    const blob = await response.blob();

    // Correct Loader Usage
    const loader = new PDFLoader(blob, { splitPages: false });
    const docs = await loader.load();

    const text = docs.map(doc => doc.pageContent).join("\n");
    return text.length ? text : "⚠ No readable text found in PDF";

  } catch (error) {
    console.error("PDF Extraction Error →", error);
    return null;
  }
}
