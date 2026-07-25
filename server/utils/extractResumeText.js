import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import fs from "fs/promises";

const extractResumeText = async (fileInput) => {
    try {
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
            data: new Uint8Array(resumeBuffer),
            useSystemFonts: true,
            disableFontFace: true
        }).promise;

        // Limit parsing to max 3 pages
        const maxPages = Math.min(pdfDocument.numPages, 3);

        // Fetch page text in parallel for maximum speed
        const pagePromises = [];
        for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {
            pagePromises.push(
                pdfDocument.getPage(pageNumber).then(page => page.getTextContent())
            );
        }

        const pageContents = await Promise.all(pagePromises);

        const extractedText = pageContents
            .map(textContent =>
                textContent.items
                    .map(item => item.str)
                    .join(" ")
            )
            .join("\n");

        return extractedText.trim();
    } catch (error) {
        console.error("Error extracting PDF text:", error.message);
        throw new Error("Failed to parse PDF text. The file may be malformed or password protected.");
    }
};

export default extractResumeText;