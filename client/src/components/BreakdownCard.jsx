import ProgressBar from "./ProgressBar";

const BreakdownCard = ({ breakdown }) => {

    const scoreItems = [
        {
            label: "Contact",
            value: breakdown.contact,
            max: 5,
        },
        {
            label: "Education",
            value: breakdown.education,
            max: 10,
        },
        {
            label: "Skills",
            value: breakdown.skills,
            max: 35,
        },
        {
            label: "Experience",
            value: breakdown.experience,
            max: 25,
        },
        {
            label: "Projects",
            value: breakdown.projects,
            max: 15,
        },
        {
            label: "Resume Quality",
            value: breakdown.quality,
            max: 10,
        },
    ];

    return (
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 h-full">

            <h3 className="text-xl font-bold mb-8">
                Score Breakdown
            </h3>

            <div className="space-y-5">

                {scoreItems.map((item) => (
                    <ProgressBar
                        key={item.label}
                        label={item.label}
                        value={item.value}
                        max={item.max}
                    />
                ))}

            </div>

        </section>
    );
};

export default BreakdownCard;