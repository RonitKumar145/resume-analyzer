import { useEffect, useState } from "react";
import api from "../services/api";
import ATSResult from "./ATSResult";
import LoadingScreen from "./LoadingScreen";

const FALLBACK_ROLES = [
    { id: "frontend-developer", title: "Frontend Developer (React / Next.js)" },
    { id: "backend-developer", title: "Backend Developer (Node.js / Express)" },
    { id: "fullstack-developer", title: "Full Stack Developer (MERN)" },
    { id: "software-engineer", title: "Software Engineer" },
    { id: "senior-software-engineer", title: "Senior Software Engineer" },
    { id: "python-developer", title: "Python / Django Developer" },
    { id: "java-developer", title: "Java / Spring Boot Developer" },
    { id: "devops-engineer", title: "DevOps Engineer" },
    { id: "data-engineer", title: "Data Engineer" },
    { id: "data-scientist", title: "Data Scientist" },
    { id: "ml-engineer", title: "Machine Learning Engineer" },
    { id: "cloud-architect", title: "Cloud Architect (AWS / Azure)" },
    { id: "cybersecurity-specialist", title: "Cybersecurity Specialist" },
    { id: "mobile-developer", title: "Mobile App Developer (React Native / Flutter)" },
    { id: "qa-automation-engineer", title: "QA / Automation Test Engineer" },
    { id: "product-manager", title: "Product Manager (Tech)" },
    { id: "system-administrator", title: "System Administrator" },
    { id: "database-administrator", title: "Database Administrator (SQL / MongoDB)" },
    { id: "ui-ux-engineer", title: "UI/UX Designer & Engineer" },
    { id: "tech-lead", title: "Technical Lead / Engineering Manager" },
];

const getInitialRoles = () => {
    try {
        const cached = localStorage.getItem("cached_job_roles");
        if (cached) {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (err) {
        console.warn("Failed to load cached job roles from localStorage:", err);
    }
    return FALLBACK_ROLES;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ResumeForm = () => {
    const [resume, setResume] = useState(null);
    const [roles, setRoles] = useState(getInitialRoles);
    const [selectedRole, setSelectedRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const [isColdStart, setIsColdStart] = useState(false);
    const [noticeMessage, setNoticeMessage] = useState("");
    const [apiError, setApiError] = useState("");

    const [errors, setErrors] = useState({
        resume: "",
        jobDescription: "",
    });

    useEffect(() => {
        fetchRolesWithRetry();
    }, []);

    const fetchRolesWithRetry = async (isRetry = false) => {
        const coldStartTimer = setTimeout(() => setIsColdStart(true), 2000);

        try {
            const res = await api.get("/job-roles");
            clearTimeout(coldStartTimer);
            setIsColdStart(false);

            let rolesData = [];
            if (res.data && res.data.success && Array.isArray(res.data.roles)) {
                rolesData = res.data.roles;
            } else if (Array.isArray(res.data)) {
                rolesData = res.data;
            }

            if (rolesData.length > 0) {
                setRoles(rolesData);
                localStorage.setItem("cached_job_roles", JSON.stringify(rolesData));
            }
        } catch (error) {
            clearTimeout(coldStartTimer);

            if (!isRetry) {
                console.warn("First attempt to fetch job roles failed. Retrying in 5s...");
                await delay(5000);
                return fetchRolesWithRetry(true);
            }

            console.error("Failed to fetch job roles after retry. Retaining fallback roles.", error);
            setIsColdStart(false);
            setNoticeMessage("Couldn't reach the server. Using built-in job roles.");
        }
    };

    const postResumeUpload = async (formData, isRetry = false) => {
        const coldStartTimer = setTimeout(() => setIsColdStart(true), 4500);

        try {
            const response = await api.post("/resume/upload", formData);
            clearTimeout(coldStartTimer);
            setIsColdStart(false);
            setResult(response.data);
        } catch (error) {
            clearTimeout(coldStartTimer);

            if (!isRetry) {
                console.warn("First attempt to analyze resume failed. Retrying in 5s...");
                setIsColdStart(true);
                await delay(5000);
                return postResumeUpload(formData, true);
            }

            console.error("Analysis failed after retry:", error);
            setIsColdStart(false);
            setApiError(
                error.response?.data?.message ||
                "Failed to analyze your resume after retrying. Please try again."
            );
        } finally {
            clearTimeout(coldStartTimer);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        const newErrors = {
            resume: "",
            jobDescription: "",
        };

        if (!resume) {
            newErrors.resume = "Please upload a PDF resume.";
        }

        if (!selectedRole && !jobDescription.trim()) {
            newErrors.jobDescription =
                "Select a predefined role or enter a custom job description.";
        }

        setErrors(newErrors);

        if (newErrors.resume || newErrors.jobDescription) {
            return;
        }

        const formData = new FormData();
        formData.append("resume", resume);

        if (selectedRole) {
            formData.append("selectedRole", selectedRole);
        } else {
            formData.append("jobDescription", jobDescription);
        }

        try {
            setErrors({
                resume: "",
                jobDescription: "",
            });
            setApiError("");
            setNoticeMessage("");
            setResult(null);
            setLoading(true);

            await postResumeUpload(formData);
        } finally {
            setLoading(false);
            setIsColdStart(false);
        }
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            <aside className="xl:col-span-4">
                <form
                    onSubmit={handleSubmit}
                    className="
                        sticky
                        top-8
                        bg-white
                        border
                        border-gray-200
                        rounded-2xl
                        shadow-sm
                        p-6
                        space-y-6
                    "
                >
                    {/* Heading */}
                    <div>
                        <h2 className="text-2xl font-bold">
                            Resume Upload
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Upload your resume and compare it with a job description.
                        </p>
                    </div>

                    {/* Cold-Start UX Banner */}
                    {isColdStart && (
                        <div
                            className="
                                bg-amber-50
                                border
                                border-amber-200
                                text-amber-800
                                rounded-xl
                                px-4
                                py-3
                                text-sm
                                flex
                                items-center
                                gap-2
                            "
                        >
                            <span>⏳</span>
                            <span>
                                The server instance is starting up for the first request. This can take 30–60 seconds...
                            </span>
                        </div>
                    )}

                    {/* Fallback Notice Banner */}
                    {noticeMessage && (
                        <div
                            className="
                                bg-blue-50
                                border
                                border-blue-200
                                text-blue-800
                                rounded-xl
                                px-4
                                py-3
                                text-sm
                                flex
                                items-center
                                justify-between
                            "
                        >
                            <span>ℹ️ {noticeMessage}</span>
                            <button
                                type="button"
                                onClick={() => setNoticeMessage("")}
                                className="text-blue-600 hover:text-blue-800 font-bold text-xs ml-2"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    {/* API Error Banner */}
                    {apiError && (
                        <div
                            className="
                                bg-red-50
                                border
                                border-red-200
                                text-red-700
                                rounded-xl
                                px-4
                                py-3
                                text-sm
                            "
                        >
                            {apiError}
                        </div>
                    )}

                    {/* Resume Upload */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Resume (PDF)
                        </label>

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => {
                                setResume(e.target.files[0]);

                                setErrors((prev) => ({
                                    ...prev,
                                    resume: "",
                                }));
                            }}
                            className={`
                                w-full
                                border
                                rounded-xl
                                p-3
                                transition-colors
                                ${
                                    errors.resume
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }
                            `}
                        />

                        {errors.resume && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.resume}
                            </p>
                        )}
                    </div>

                    {/* Job Role */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Job Role
                        </label>

                        <select
                            value={selectedRole}
                            onChange={(e) => {
                                setSelectedRole(e.target.value);

                                if (e.target.value) {
                                    setJobDescription("");

                                    setErrors((prev) => ({
                                        ...prev,
                                        jobDescription: "",
                                    }));
                                }
                            }}
                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-xl
                                p-3
                            "
                        >
                            <option value="">
                                Custom Job Description
                            </option>

                            {roles.map((role) => (
                                <option
                                    key={role.id}
                                    value={role.id}
                                >
                                    {role.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Job Description */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Job Description
                        </label>

                        <textarea
                            rows={7}
                            value={jobDescription}
                            onChange={(e) => {
                                setJobDescription(e.target.value);

                                if (e.target.value.trim()) {
                                    setErrors((prev) => ({
                                        ...prev,
                                        jobDescription: "",
                                    }));
                                }
                            }}
                            placeholder="Paste the complete job description..."
                            disabled={selectedRole !== ""}
                            className={`
                                w-full
                                border
                                rounded-xl
                                p-4
                                resize-none
                                transition-colors
                                ${
                                    errors.jobDescription
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }
                                ${
                                    selectedRole
                                        ? "bg-gray-100 cursor-not-allowed"
                                        : ""
                                }
                            `}
                        />

                        {errors.jobDescription && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.jobDescription}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            bg-black
                            text-white
                            rounded-xl
                            py-3
                            font-semibold
                            transition
                            hover:bg-gray-900
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >
                        {loading
                            ? "Analyzing Resume..."
                            : "Analyze Resume"}
                    </button>
                </form>
            </aside>

            {/* Content */}
            <section className="xl:col-span-8">
                {loading ? (
                    <LoadingScreen />
                ) : result ? (
                    <ATSResult result={result} />
                ) : (
                    <div
                        className="
                            bg-white
                            border
                            border-gray-200
                            rounded-2xl
                            shadow-sm
                            min-h-[700px]
                            flex
                            items-center
                            justify-center
                            p-10
                        "
                    >
                        <div className="text-center max-w-lg">
                            <h2 className="text-4xl font-bold">
                                Ready to Analyze
                            </h2>

                            <p className="mt-6 text-gray-500 leading-8">
                                Upload your resume, choose one of the predefined
                                job roles or paste your own job description,
                                then click <strong>Analyze Resume</strong> to
                                receive a complete ATS report.
                            </p>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ResumeForm;