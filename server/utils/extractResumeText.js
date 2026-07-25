import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs"
import fs from "fs/promises"

const extractResumeText = async (fileInput) => {
    let resumeBuffer;

    if (Buffer.isBuffer(fileInput)) {
        resumeBuffer = fileInput;
    } else if (fileInput && fileInput.buffer) {
        resumeBuffer = fileInput.buffer;
    } else if (typeof fileInput === "string") {
        resumeBuffer = await fs.readFile(fileInput);
    } else {
        throw new Error("Invalid file input provided for PDF extraction.");
    }

    const pdfDocument = await getDocument({
        data: new Uint8Array(resumeBuffer)
    }).promise;

    let extractedText = "";

    for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++) {
        const page = await pdfDocument.getPage(pageNumber);
        const textContent = await page.getTextContent();

        extractedText += textContent.items
            .map(item => item.str)
            .join(" ") + "\n";
    }

    return extractedText.trim();
}

export default extractResumeText;