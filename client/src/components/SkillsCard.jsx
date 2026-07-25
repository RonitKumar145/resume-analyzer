import SkillBadge from "./SkillBadge";

const SkillsCard = ({
    title,
    skills = [],
    type,
}) => {

    const isMatched = type === "matched";

    return (

        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 h-full">

            <div className="flex items-center justify-between mb-6">

                <h3 className="text-2xl font-bold">
                    {title}
                </h3>

                <span className="text-sm font-medium text-gray-500">
                    {skills.length} {skills.length === 1 ? "Skill" : "Skills"}
                </span>

            </div>

            {skills.length === 0 ? (

                <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500">

                    {isMatched
                        ? "No matched skills found."
                        : "No missing skills found."}

                </div>

            ) : (

                <div className="flex flex-wrap gap-3">

                    {skills.map((skill, index) => (

                        <SkillBadge
                            key={index}
                            skill={skill}
                            type={type}
                        />

                    ))}

                </div>

            )}

        </section>

    );

};

export default SkillsCard;