import { useEffect, useState } from "react";
import api from "../services/api";
import ATSResult from "./ATSResult";
import LoadingScreen from "./LoadingScreen";
console.log(import.meta.env.VITE_API_URL);

const ResumeForm = () => {
    const [resume, setResume] = useState(null);
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const [errors, setErrors] = useState({
        resume: "",
        jobDescription: "",
    });

    const [apiError, setApiError] = useState("");

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const res = await api.get("/job-roles");

            console.log("Response:", res.data);

          if (res.data.success) {
            console.log("Roles:", res.data.roles);
            setRoles(res.data.roles);
          }
        } catch (error) {
            console.error("Fetch Roles Error:", error);
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
            // Clear validation errors
            setErrors({
                resume: "",
                jobDescription: "",
            });

            // Clear previous API error and result, then set loading
            setApiError("");
            setResult(null);
            setLoading(true);

            const response = await api.post(
                "/resume/upload",
                formData
            );

            setResult(response.data);

        } catch (error) {

            console.error(error);

            setApiError(
                error.response?.data?.message ||
                "Failed to analyze your resume. Please try again."
            );

        } finally {

            setLoading(false);

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

                                // Remove resume error immediately
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