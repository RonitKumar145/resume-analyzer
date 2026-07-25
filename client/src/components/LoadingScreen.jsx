const LoadingScreen = () => {
    return (
        <div
            className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                shadow-sm
                min-h-[700px]
                flex
                items-center
                justify-center
                p-10
            "
        >
            <div className="w-full max-w-md">

                <h2 className="text-3xl font-bold text-center">
                    Analyzing Resume
                </h2>

                <p className="text-gray-500 text-center mt-3">
                    Please wait while we process your resume.
                </p>

                <div className="mt-10">

                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

                        <div
                            className="
                                h-full
                                bg-black
                                rounded-full
                                animate-pulse
                                w-2/3
                            "
                        />

                    </div>

                </div>

                <div className="mt-10 space-y-5">

                    <div className="border border-gray-200 rounded-xl p-4">
                        Reading PDF Resume
                    </div>

                    <div className="border border-gray-200 rounded-xl p-4">
                        Extracting Skills & Experience
                    </div>

                    <div className="border border-gray-200 rounded-xl p-4">
                        Calculating ATS Score
                    </div>

                    <div className="border border-gray-200 rounded-xl p-4">
                        Comparing with Job Description
                    </div>

                    <div className="border border-gray-200 rounded-xl p-4">
                        Preparing Report
                    </div>

                </div>

            </div>
        </div>
    );
};

export default LoadingScreen;