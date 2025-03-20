import NavBar from "./navigation/NavBar.tsx";

const HomePage = () => {
    return (
        <>
            <NavBar />
            <main className="pt-16"> {/* Höhe der Navbar berücksichtigen */}
                <div className="grid grid-cols-6 gap-4 p-2 h-[90vh]">
                    <div
                        className="
                        col-span-1
                        text-center
                        outline outline-gray-500 p-2
                        "
                    >
                        <h1 className="p-2 font-bold"> Side Bar </h1>
                        <div className="p-2 w-full">
                            <button
                                className="
                                    bg-blue-500 hover:bg-blue-700
                                    text-white font-bold py-2 px-4
                                    rounded focus:outline-none
                                    focus:shadow-outline
                                    w-full
                                    "
                                onClick={() => alert("Demo 1")}
                            > Demo 1
                            </button>
                        </div>
                        <div className="p-2 w-full">
                            <button
                                className="
                                    bg-blue-500 hover:bg-blue-700
                                    text-white font-bold py-2 px-4
                                    rounded focus:outline-none
                                    focus:shadow-outline
                                    w-full
                                    "
                                onClick={() => alert("Demo 2")}
                            > Demo 2
                            </button>
                        </div>

                        <div className="p-2 w-full">
                            <button
                                className="
                                    bg-blue-500 hover:bg-blue-700
                                    text-white font-bold py-2 px-4
                                    rounded focus:outline-none
                                    focus:shadow-outline
                                    w-full
                                    "
                                onClick={() => alert("Demo 3")}
                            > Demo 3
                            </button>
                        </div>

                    </div>

                    <div className="col-span-5 bg-gray-200 p-4">
                        <h1> Mind Board Placeholder</h1>
                    </div>
                </div>
            </main>
        </>
    );
};

export default HomePage;