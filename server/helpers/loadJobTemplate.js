import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadJobTemplate = (role) => {
    if (!role) {
        throw new Error("No job role was provided.");
    }

    // server/helpers -> server/config/jobTemplates
    const filePath = path.join(
        __dirname,
        "..",
        "config",
        "jobTemplates",
        `${role}.json`
    );

    if (!fs.existsSync(filePath)) {
        throw new Error(
            `Job template '${role}' not found.\nLooking for: ${filePath}`
        );
    }

    const template = JSON.parse(
        fs.readFileSync(filePath, "utf-8")
    );

    return template;
};

export default loadJobTemplate;