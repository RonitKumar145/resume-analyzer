
import fs from "fs/promises"
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs"

const extractResumeText = async (filePath) => {

    const resumeBuffer = await fs.readFile(filePath)

    const pdfDocument = await getDocument({

        data : new Uint8Array(resumeBuffer)

    }).promise

    let extractedText = ""

    for(let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber++){

        const page = await pdfDocument.getPage(pageNumber)

        const textContent = await page.getTextContent()

        extractedText += textContent.items
            .map(item => item.str)
            .join(" ")

        extractedText += "\n"

    }

    return extractedText.trim()

}

export default extractResumeText