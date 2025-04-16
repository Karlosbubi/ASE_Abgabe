import MindMap from "../../components/mindmap/MindMap.tsx";
import MindmapList from "../../components/mindmap/MindmapList.tsx";

function MindmapPage() {
    return (
        <div className="flex h-screen bg-gray-200 p-2">
            <div
                className="
          flex-none
          w-64
          bg-white
          rounded
          p-2
          shadow-md
          overflow-y-auto
        "
            >
                <p className="text-center font-semibold mb-2">Mindmap List</p>
                <MindmapList />
            </div>

            {/* Main Content */}
            <div className="flex-grow p-2">
                <MindMap/>
            </div>
        </div>
    );
}


export default MindmapPage;