import { GetCurrentUser } from "@/utils/storageWrapper.ts";
import { useQuery } from "react-query";
import useStore from "./Store.tsx";
import { Trash2, Check, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from "react-hot-toast"
import { queryClient } from "@/utils/queryClient.ts";

type Entry = {
    id: number;
    title: string;
}

type MindmapList = {
    own: Entry[];
    edit: Entry[];
    read_only: Entry[];
};

function MindmapList() {
    const dateTime = new Date();
    const loadMindMap = useStore(state => state.loadMindMap);
    const currentMindMapId = useStore(state => state.currentMindMapId);
    const hasLoadedInitialMap = useRef(false); // Verhindert mehrfaches Laden

    const { isLoading, error, data } = useQuery<MindmapList, Error>({
        queryKey: [`get_mindmap_list_${dateTime.getMonth()}`],
        queryFn: async () => {
            const user = GetCurrentUser();
            if (!user || !user.JWT) {
                throw new Error("User not authenticated.");
            }

            const response = await fetch("http://localhost:3000/mindmap", {
                method: "GET",
                headers: { 'Authorization': 'Bearer ' + user.JWT },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json();
        }
    });

    // Lädt automatisch die erste Mindmap aus "own", wenn vorhanden und noch nichts geladen wurde
    useEffect(() => {
        if (
            data &&
            data.own.length > 0 &&
            !currentMindMapId &&
            !hasLoadedInitialMap.current
        ) {
            hasLoadedInitialMap.current = true;
            loadMindMap(data.own[0].id);
        }
    }, [data, currentMindMapId, loadMindMap]);

    const user = GetCurrentUser();
    if (!user) {
        return <p><b>Login to see your mindmaps</b></p>;
    }

    const MindmapCard = ({
                             map,
                             onClick,
                             onConfirmDelete,
                         }: {
        map: Entry;
        onClick: () => void;
        onConfirmDelete?: (id: number) => void;
    }) => {
        const [hovered, setHovered] = useState(false);
        const [confirmingDelete, setConfirmingDelete] = useState(false);
        const isSelected = map.id === currentMindMapId;

        return (
            <div
                data-id={map.id}
                onClick={!confirmingDelete ? onClick : undefined}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => {
                    setHovered(false);
                    setConfirmingDelete(false);
                }}
                className={`relative flex items-center justify-between bg-white border rounded-md px-3 py-2 shadow-sm hover:shadow-md cursor-pointer transition duration-200 group
                ${isSelected ? 'border-2 border-gray-700 bg-gray-100' : 'border-gray-300'}`}
            >
                <span className="text-sm font-medium text-black truncate">
                    {map.title}
                </span>

                {hovered && onConfirmDelete && (
                    <div
                        className="flex items-center gap-2 ml-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {!confirmingDelete ? (
                            <button
                                onClick={() => setConfirmingDelete(true)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash2 size={14} />
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => onConfirmDelete(map.id)}
                                    className="text-green-600 hover:text-green-800"
                                >
                                    <Check size={14} />
                                </button>
                                <button
                                    onClick={() => setConfirmingDelete(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X size={14} />
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const handleClick = async (id: number) => {
        await loadMindMap(id);
    };

    const handleDeleteMindmap = async (id: number) => {
        const user = GetCurrentUser();

        if (!user?.JWT) {
            toast.error("User unauthorized.");
            return;
        }

        toast.loading("Deleting mindmap...");

        try {
            const response = await fetch(`http://localhost:3000/mindmap/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.JWT,
                },
            });

            if (!response.ok) {
                throw new Error(`An error occurred while trying to delete: ${response.status}`);
            }

            await queryClient.invalidateQueries({ queryKey: [`get_mindmap_list_${new Date().getMonth()}`] });
            toast.dismiss();
            toast.success("Mindmap deleted!");

        } catch (error: unknown) {
            toast.dismiss();
            console.error("Error:", error);

            if (error instanceof Error) {
                toast.error(`Deleting failed: ${error.message}`);
            } else {
                toast.error("Deleting failed.");
            }
        }
    };

    if (isLoading || !data) return <p>Loading mindmaps...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div className="space-y-4 p-4">
            <div>
                <p className="font-semibold text-lg mb-2">My Mindmaps</p>
                <div className="space-y-2">
                    {data.own.map((m) => (
                        <MindmapCard
                            key={m.id}
                            map={m}
                            onClick={() => handleClick(m.id)}
                            onConfirmDelete={() => handleDeleteMindmap(m.id)}
                        />
                    ))}
                </div>
            </div>

            <div>
                <p className="font-semibold text-lg mb-2">Shared With Me</p>
                <div className="space-y-2">
                    {data.edit.map((m) => (
                        <MindmapCard
                            key={m.id}
                            map={m}
                            onClick={() => handleClick(m.id)}
                        />
                    ))}
                </div>
            </div>

            <div>
                <p className="font-semibold text-lg mb-2">Read Only</p>
                <div className="space-y-2">
                    {data.read_only.map((m) => (
                        <MindmapCard
                            key={m.id}
                            map={m}
                            onClick={() => handleClick(m.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MindmapList;