import fs from "fs";
import path from "path";

const getJobRoles = (req, res) => {
    try {
        const folderPath = path.join(
            process.cwd(),
            "server",
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