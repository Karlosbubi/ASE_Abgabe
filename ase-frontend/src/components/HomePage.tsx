import { Toaster } from 'react-hot-toast';
import NavBar from "./navigation/NavBar.tsx";
import MindmapPage from "../components/mindmap/MindmapPage.tsx";

const HomePage = () => {
    return (
        <>
            <Toaster
                position="top-right"
                containerStyle={{ top: '4.5rem' }} // verschiebt Toasts unter die NavBar
            />
            <NavBar />
            <main className="pt-16 h-screen">
                <MindmapPage />
            </main>
        </>
    );
};

export default HomePage;