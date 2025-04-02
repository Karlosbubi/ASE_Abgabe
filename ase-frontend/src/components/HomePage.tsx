import { useState } from "react";
import NavBar from "./navigation/NavBar.tsx";
import MindMap from "./mindmap/MindMap.tsx";

const initialNodes = [
    { id: "1", data: { label: "Zentrale Idee" }, position: { x: 250, y: 5 } },
];

const HomePage = () => {
    const [nodes, setNodes] = useState(initialNodes);
    const [selectedNodeId, setSelectedNodeId] = useState(null);

    const addNode = () => {
        const newNode = {
            id: `${nodes.length + 1}`,
            data: { label: `Knoten ${nodes.length + 1}` },
            position: { x: Math.random() * 400, y: Math.random() * 400 },
        };
        setNodes((prevNodes) => [...prevNodes, newNode]);
    };

    const removeNode = () => {
        if (selectedNodeId) {
            // Knoten entfernen, wenn er ausgewählt ist
            setNodes((prevNodes) => prevNodes.filter((node) => node.id !== selectedNodeId));
            setSelectedNodeId(null); // Auswahl zurücksetzen
        }
    };

    return (
        <>
            <NavBar />
            <main className="pt-16 h-screen">
                <div className="flex flex-col md:flex-row bg-gray-200 h-full p-2">
                    <div className="min-w-40 text-center bg-white rounded p-2 md:p-1">
                        <div className="md:flex-row p-2">
                            <button
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2 lg:w-5/6"
                                onClick={addNode}
                            >
                                + Knoten hinzufügen
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2 lg:w-5/6"
                                onClick={removeNode}
                                disabled={!selectedNodeId} // Deaktiviert, wenn kein Knoten ausgewählt
                            >
                                - Ausgewählten Knoten entfernen
                            </button>
                        </div>
                    </div>
                    <div className="w-full p-2">
                        <h1>Mind Map</h1>
                        <MindMap nodes={nodes} setNodes={setNodes} setSelectedNodeId={setSelectedNodeId} />
                    </div>
                </div>
            </main>
        </>
    );
};

export default HomePage;