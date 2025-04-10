import NavBar from "./navigation/NavBar.tsx";
import MindMap from "./mindmap/MindMap.tsx";

const HomePage = () => {
    return (
        <>
            <NavBar />
            <main className="pt-16 h-screen">
                <div className="flex flex-col md:flex-row bg-gray-200 h-full p-2">
                    <div className="min-w-40 text-center bg-white rounded p-2 md:p-1">
                        <div className="md:flex-row p-2">
                        </div>
                    </div>
                    <div className="w-full p-2">
                        <MindMap />
                    </div>
                </div>
            </main>
        </>
    );
};

export default HomePage;