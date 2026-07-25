const SkillBadge = ({ skill, type }) => {

    const styles =
        type === "matched"
            ? "bg-black text-white border-black"
            : "bg-white text-black border-gray-300";

    return (
        <span
            className={`
                px-4
                py-2
                rounded-full
                border
                text-sm
                font-medium
                ${styles}
            `}
        >
            {skill}
        </span>
    );
};

export default SkillBadge;