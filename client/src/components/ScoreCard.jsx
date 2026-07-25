const ScoreCard = ({ title, value }) => {
    return (
        <div
            className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                p-8
                shadow-sm
                hover:shadow-md
                transition-shadow
            "
        >
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                {title}
            </p>

            <h2 className="mt-5 text-5xl font-bold text-black break-words">
                {value}
            </h2>
        </div>
    );
};

export default ScoreCard;