export const getScoreMetadata = (score = 0) => {
    if (score >= 85) {
        return {
            label: "Excellent",
            color: "#22c55e", // Green
            description: "Excellent match! Your resume is strongly optimized for ATS filters.",
        };
    }
    if (score >= 70) {
        return {
            label: "Good",
            color: "#f59e0b", // Amber/Yellow
            description: "Solid resume! A few minor tweaks will make it stand out even more.",
        };
    }
    if (score >= 50) {
        return {
            label: "Average",
            color: "#f97316", // Orange
            description: "Fair match. Needs targeted keywords and better section structure.",
        };
    }
    return {
        label: "Needs Improvement",
        color: "#ef4444", // Red
        description: "Critical gaps found. Review missing skill keywords and formatting.",
    };
};
