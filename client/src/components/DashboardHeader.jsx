import CircularScore from "./CircularScore";

const DashboardHeader = ({
    atsResult,
    comparison,
    selectedRole,
}) => {

    const getPerformance = (score) => {

        if (score >= 90) return "Outstanding";
        if (score >= 80) return "Excellent";
        if (score >= 70) return "Very Good";
        if (score >= 60) return "Good";
        if (score >= 50) return "Average";

        return "Needs Improvement";
    };

    return (
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

            {/* Header */}

            <div className="border-b border-gray-200 px-6 py-5">

                <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
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

                    <CircularScore
                        score={atsResult.score}
                    />

                    <p className="mt-6 text-sm uppercase tracking-widest text-gray-500">
                        ATS Score
                    </p>

                    <h3 className="mt-2 text-2xl font-bold">
                        {atsResult.score}/100
                    </h3>

                    <p className="mt-1 text-gray-500">
                        {getPerformance(atsResult.score)}
                    </p>

                </div>

                {/* Grade */}

                <div className="p-8 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col justify-center">

                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                        Grade
                    </p>

                    <h3 className="text-5xl font-bold mt-4">
                        {atsResult.grade}
                    </h3>

                    <p className="mt-3 text-gray-500">
                        Based on resume completeness and ATS analysis.
                    </p>

                </div>

                {/* Match */}

                <div className="p-8 flex flex-col justify-center">

                    <div>

                        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                            Overall Job Match
                        </p>

                        <h3 className="text-5xl font-bold mt-4">
                            {comparison.overallMatch}%
                        </h3>

                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4">

                        <div className="rounded-xl bg-gray-100 p-4">

                            <p className="text-xs uppercase text-gray-500">
                                Skill Match
                            </p>

                            <p className="text-2xl font-bold mt-2">
                                {comparison.skillMatch}%
                            </p>

                        </div>

                        <div className="rounded-xl bg-gray-100 p-4">

                            <p className="text-xs uppercase text-gray-500">
                                Target Role
                            </p>

                            <p className="text-lg font-semibold mt-2">
                                {selectedRole}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default DashboardHeader;