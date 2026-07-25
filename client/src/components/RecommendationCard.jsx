const RecommendationCard = ({
    recommendations = [],
}) => {

    return (

        <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 h-full">

            <h3 className="text-2xl font-bold mb-6">
                Recommendations
            </h3>

            {recommendations.length === 0 ? (

                <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500">

                    Excellent work! No recommendations at this time.

                </div>

            ) : (

                <div className="space-y-4">

                    {recommendations.map((item, index) => (

                        <div
                            key={index}
                            className="flex items-start gap-4 border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors"
                        >

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white text-sm font-bold">

                                💡

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

export default RecommendationCard;