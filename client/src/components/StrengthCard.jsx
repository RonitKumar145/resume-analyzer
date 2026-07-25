const StrengthCard = ({
    title,
    items = [],
}) => {

    const getIcon = () => {
        const heading = title.toLowerCase();

        if (heading.includes("strength")) return "✓";
        if (heading.includes("weak")) return "⚠";
        if (heading.includes("improvement")) return "↗";

        return "•";
    };

    return (
        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 h-full">

            <h3 className="text-2xl font-bold mb-6">
                {title}
            </h3>

            {items.length === 0 ? (

                <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500">
                    No {title.toLowerCase()} available.
                </div>

            ) : (

                <div className="space-y-4">

                    {items.map((item, index) => (

                        <div
                            key={index}
                            className="flex items-start gap-4 border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors"
                        >

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white text-sm font-bold">
                                {getIcon()}
                            </div>

                            <p className="text-gray-700 leading-relaxed">
                                {item}
                            </p>

                        </div>

                    ))}

                </div>

            )}

        </section>
    );
};

export default StrengthCard;