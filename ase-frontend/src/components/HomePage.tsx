import NavBar from "./navigation/NavBar.tsx";
import MindmapPage from "../components/mindmap/MindmapPage.tsx";

const HomePage = () => {
    return (
        <>
            <NavBar />
            <main className="pt-16 h-screen">
                <MindmapPage />
            </main>
        </>
    );
};

export default HomePage;