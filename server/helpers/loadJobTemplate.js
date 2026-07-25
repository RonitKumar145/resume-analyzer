import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const templateCache = new Map();

const loadJobTemplate = (role) => {
    if (!role) {
        throw new Error("No job role was provided.");
    }

    if (templateCache.has(role)) {
        return templateCache.get(role);
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

    templateCache.set(role, template);
    return template;
};

export default loadJobTemplate;