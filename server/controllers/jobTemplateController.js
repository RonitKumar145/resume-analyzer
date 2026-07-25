import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cachedRolesList = null;

const getJobRoles = (req, res) => {
    try {
        if (cachedRolesList) {
            return res.status(200).json({
                success: true,
                roles: cachedRolesList
            });
        }

        const folderPath = path.join(
            __dirname,
            "..",
            "config",
            "jobTemplates"
        );

        const files = fs.readdirSync(folderPath);

        const roles = files.map((file) => {
            const data = JSON.parse(
                fs.readFileSync(path.join(folderPath, file), "utf-8")
            );

            return {
                id: file.replace(".json", ""),
                title: data.title
            };
        });

        cachedRolesList = roles;

        res.status(200).json({
            success: true,
            roles
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to load job roles."
        });
    }
};

export default getJobRoles;