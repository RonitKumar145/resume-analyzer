const ProgressBar = ({ label, value, max }) => {

    const percentage = Math.min((value / max) * 100, 100);

    return (

        <div>

            <div className="flex justify-between items-center mb-2">

                <span className="text-sm font-medium text-gray-700">
                    {label}
                </span>

                <span className="text-sm font-semibold text-gray-900">
                    {value} / {max}
                </span>

            </div>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

                <div
                    className="h-full bg-black rounded-full transition-all duration-700"
                    style={{
                        width: `${percentage}%`,
                    }}
                />

            </div>

        </div>

    );

};

export default ProgressBar;