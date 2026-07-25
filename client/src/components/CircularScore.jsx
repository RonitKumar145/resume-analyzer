const CircularScore = ({ score = 0 }) => {

    const radius = 70;
    const stroke = 10;
    const normalizedRadius = radius - stroke / 2;

    const circumference = normalizedRadius * 2 * Math.PI;

    const strokeDashoffset =
        circumference - (score / 100) * circumference;

    const getColor = () => {

        if (score >= 90) return "#16a34a"; // Green
        if (score >= 75) return "#2563eb"; // Blue
        if (score >= 60) return "#ca8a04"; // Yellow
        return "#dc2626"; // Red

    };

    const getStatus = () => {

        if (score >= 90) return "Outstanding";
        if (score >= 75) return "Excellent";
        if (score >= 60) return "Good";
        return "Needs Work";

    };

    return (

        <div className="relative flex items-center justify-center">

            <svg
                width="170"
                height="170"
                className="-rotate-90"
            >

                {/* Background */}

                <circle
                    cx="85"
                    cy="85"
                    r={normalizedRadius}
                    stroke="#e5e7eb"
                    strokeWidth={stroke}
                    fill="transparent"
                />

                {/* Progress */}

                <circle
                    cx="85"
                    cy="85"
                    r={normalizedRadius}
                    stroke={getColor()}
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    style={{
                        transition:
                            "stroke-dashoffset 1s ease, stroke 0.5s ease",
                    }}
                />

            </svg>

            <div className="absolute text-center">

                <h2 className="text-4xl font-bold">
                    {score}
                </h2>

                <p className="text-gray-500 text-sm">
                    /100
                </p>

                <p
                    className="mt-2 text-sm font-semibold"
                    style={{
                        color: getColor(),
                    }}
                >
                    {getStatus()}
                </p>

            </div>

        </div>

    );

};

export default CircularScore;