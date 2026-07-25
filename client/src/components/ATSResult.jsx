import DashboardHeader from "./DashboardHeader";
import StrengthCard from "./StrengthCard";
import SkillsCard from "./SkillsCard";
import BreakdownCard from "./BreakdownCard";
import RecommendationCard from "./RecommendationCard";

const ATSResult = ({ result }) => {

    if (!result) return null;

    const {
        atsResult,
        comparison,
        selectedRole,
    } = result;

    return (

        <div className="mt-6 space-y-6">

            {/* Dashboard Header */}

            <DashboardHeader
                atsResult={atsResult}
                comparison={comparison}
                selectedRole={selectedRole}
            />

            {/* ATS Breakdown */}

            <BreakdownCard
                breakdown={atsResult.breakdown}
            />

            {/* Strengths & Weaknesses */}

            <div className="grid lg:grid-cols-2 gap-6">

                <StrengthCard
                    title="Strengths"
                    items={comparison.strengths?.length
                        ? comparison.strengths
                        : atsResult.strengths || []}
                />

                <StrengthCard
                    title="Weaknesses"
                    items={comparison.weaknesses?.length
                        ? comparison.weaknesses
                        : atsResult.improvements || []}
                />

            </div>

            {/* Skills */}

            <div className="grid lg:grid-cols-2 gap-6">

                <SkillsCard
                    title="Matched Skills"
                    skills={comparison.matchedSkills || []}
                    type="matched"
                />

                <SkillsCard
                    title="Missing Skills"
                    skills={comparison.missingSkills || []}
                    type="missing"
                />

            </div>

            {/* Recommendations */}

            <RecommendationCard
                recommendations={[
                    ...(comparison.recommendations || []),
                    ...(atsResult.improvements || [])
                ]}
            />

        </div>

    );

};

export default ATSResult;