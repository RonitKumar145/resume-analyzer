import ResumeForm from "../components/ResumeForm";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}

            <header className="bg-white border-b border-gray-200">

                <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

                    <h1 className="text-2xl font-bold">
                        AI Resume Analyzer
                    </h1>

                    <p className="text-sm text-gray-500">
                        Dashboard
                    </p>

                </div>

            </header>

            {/* Body */}

            <main className="max-w-7xl mx-auto px-8 py-10">

                <ResumeForm />

            </main>

        </div>
    );
};

export default Home;