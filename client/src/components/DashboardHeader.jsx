import CircularScore from "./CircularScore";
import { getScoreMetadata } from "../utils/scoreUtils";

const DashboardHeader = ({
    atsResult,
    comparison,
    selectedRole,
}) => {
    const meta = getScoreMetadata(atsResult.score);

    return (
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-5">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500 font-semibold">
                    ATS Resume Analysis
                </p>
                <h2 className="text-2xl font-bold mt-2">
                    {selectedRole || "General Resume"}
                </h2>
            </div>

            {/* Content */}
            <div className="grid lg:grid-cols-3">
                {/* ATS Score */}
                <div className="p-8 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col items-center justify-center">
                    <CircularScore score={atsResult.score} />
                    <p className="mt-6 text-xs uppercase tracking-widest text-gray-500 font-semibold">
                        ATS Score
                    </p>
                    <h3 className="mt-2 text-2xl font-bold">
                        {atsResult.score}/100
                    </h3>
                    <p className="mt-1 text-sm font-semibold" style={{ color: meta.color }}>
                        {meta.label}
                    </p>
                </div>

                {/* Grade */}
                <div className="p-8 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col justify-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">
                        Grade
                    </p>
                    <h3 className="text-4xl font-bold mt-4" style={{ color: meta.color }}>
                        {meta.label}
                    </h3>
                    <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                        {meta.description}
                    </p>
                </div>

                {/* Match */}
                <div className="p-8 flex flex-col justify-center">
                    <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">
                            Overall Job Match
                        </p>
                        <h3 className="text-5xl font-bold mt-4">
                            {comparison.overallMatch}%
                        </h3>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="rounded-xl bg-gray-100 p-4">
                            <p className="text-xs uppercase text-gray-500 font-semibold">
                                Skill Match
                            </p>
                            <p className="text-2xl font-bold mt-2">
                                {comparison.skillMatch}%
                            </p>
                        </div>

                        <div className="rounded-xl bg-gray-100 p-4">
                            <p className="text-xs uppercase text-gray-500 font-semibold">
                                Target Role
                            </p>
                            <p className="text-lg font-semibold mt-2 truncate" title={selectedRole || "General"}>
                                {selectedRole || "General"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardHeader;