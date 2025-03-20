import NavBar from "./navigation/NavBar.tsx";

const HomePage = () => {
    return (
        <>
            <NavBar />
            <main className="pt-16 h-screen"> {/* Höhe der Navbar berücksichtigen */}
                <div className="flex flex-col md:flex-row bg-gray-200 h-full p-2">
                    <div className="min-w-40 text-center bg-white rounded p-2 md:p-1">
                        <div className="md:flex-row p-2">
                                <button
                                    className="
                                    bg-blue-500 hover:bg-blue-700
                                    text-white font-bold py-2 px-4
                                    rounded focus:outline-none
                                    focus:shadow-outline
                                    m-2
                                    lg:w-5/6
                                "
                                    onClick={() => alert("Demo")}
                                >
                                    Demo
                                </button>
                                <button
                                    className="
                                    bg-blue-500 hover:bg-blue-700
                                    text-white font-bold py-2 px-4
                                    rounded focus:outline-none
                                    focus:shadow-outline
                                    m-2
                                    lg:w-5/6
                                "
                                    onClick={() => alert("Demo")}
                                >
                                    Demooooo
                                </button>
                        </div>
                    </div>

                    <div className="w-full p-2">
                        <h1> Mind Board Placeholder</h1>
                    </div>
                </div>
            </main>
        </>
    );
};

export default HomePage;