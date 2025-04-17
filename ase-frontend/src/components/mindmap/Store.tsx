import {
    applyNodeChanges,
    applyEdgeChanges,
    type Edge,
    type EdgeChange,
    type Node,
    type NodeChange,
    type OnNodesChange,
    type OnEdgesChange,
    type XYPosition,
} from '@xyflow/react';
import { create } from 'zustand';
import { nanoid } from 'nanoid/non-secure';
import {GetCurrentUser} from "../../utils/storageWrapper.ts";
import toast from 'react-hot-toast';
import { queryClient } from '../../utils/queryClient.ts';

export type RFState = {
    nodes: Node[];
    edges: Edge[];
    currentMindMapId?: number;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    addChildNode: (parentNode: Node, position: XYPosition) => void;
    updateNodeLabel: (nodeId: string, label: string) => void;
    loadMindMap: (id: number) => void;
    saveMindMap: () => void;
    createMindMap: () => void;
};

const useStore = create<RFState>((set, get) => ({
    nodes: [
        {
            id: 'root',
            type: 'mindmap',
            data: { label: 'My topic' },
            position: { x: 0, y: 0 },
        },
    ],
    edges: [],
    onNodesChange: (changes: NodeChange[]) => {
        const filteredChanges = changes.filter((change) => {
            if (change.type === 'remove' && change.id === 'root') {
                return false;
            }
            return true;
        });

        set({
            nodes: applyNodeChanges(filteredChanges, get().nodes),
        });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },
    addChildNode: (parentNode: Node, position: XYPosition) => {
        const newNode = {
            id: nanoid(),
            type: 'mindmap',
            data: { label: 'New Node' },
            position,
            parentId: parentNode.id,
        };

        const newEdge = {
            id: nanoid(),
            source: parentNode.id,
            target: newNode.id,
        };

        set({
            nodes: [...get().nodes, newNode],
            edges: [...get().edges, newEdge],
        });
    },
    updateNodeLabel: (nodeId: string, label: string) => {
        set({
            nodes: get().nodes.map((node) => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            label,
                        },
                    };
                }

                return node;
            }),
        });
    },
    createMindMap: async () => {
        toast.loading("Creating mindmap...");

        const rootNodeId = "root";

        const rootNode: Node = {
            id: rootNodeId,
            type: 'mindmap',
            data: { label: 'New mindmap topic' },
            position: { x: 0, y: 0 },
            selected: true,
            dragging: false,
        };

        const nodes: Node[] = [rootNode];
        const edges: Edge[] = [];

        const data = {
            title: "New mindmap topic",
            graph: {
                nodes,
                edges
            }
        };

        console.log('📦 Mindmap JSON:', JSON.stringify(data, null, 2));

        const user = GetCurrentUser();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user!.JWT
            },
            body: JSON.stringify(data),
        };

        try {
            const response = await fetch("http://localhost:3000/mindmap", requestOptions);

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const result = await response.json();
            const newMindMapId = result?.id;

            if (typeof newMindMapId === 'number') {
                get().loadMindMap(newMindMapId);
                await queryClient.invalidateQueries({queryKey: [`get_mindmap_list_${new Date().getMonth()}`]});
                toast.dismiss();
                toast.success("Mindmap created successfully!");
            } else {
                toast.error("Created mindmap response was invalid.");
                console.error("Invalid response format:", result);
            }

        } catch (error) {
            console.error("Mindmap creation failed:", error);
            toast.dismiss();
            toast.error("An error occurred while creating your mindmap.");
        }
    },

    saveMindMap: async () => {
        toast.loading("Saving mindmap...");

        const { nodes, edges, currentMindMapId } = get();
        const rootNode = nodes.find((node) => node.id === 'root');
        const title = rootNode?.data?.label || "Untitled Mindmap";
        const user = GetCurrentUser();

        const data = {
            id: currentMindMapId,
            title: title,
            graph: {
                nodes,
                edges
            },
            owner: user?.id
        };
        console.log(JSON.stringify(data, null, 2));

        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user!.JWT
            },
            body: JSON.stringify(data),
        };

        try {
            await fetch("http://localhost:3000/mindmap", requestOptions);
            await queryClient.invalidateQueries({queryKey: [`get_mindmap_list_${new Date().getMonth()}`]});
            toast.dismiss()
            toast.success("Mindmap saved successfully!");
        } catch (error) {
            console.error(error);
            toast.dismiss()
            toast.error("En error occurred while saving your mindmap.");
        }
    },

    loadMindMap: async (id: number) => {
        toast.loading("Loading Mindmap...");

        const user = GetCurrentUser();
        if (!user?.JWT) {
            toast.dismiss();
            toast.error("User unauthorized.");
            return;
        }

        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.JWT
                },
            };

            const response = await fetch(`http://localhost:3000/mindmap/${id}`, requestOptions);

            if (!response.ok) {
                throw new Error(`Server response: ${response.status}`);
            }

            const data = await response.json();

            const { nodes, edges } = data.graph || {};

            if (!nodes || !edges) {
                throw new Error("Mindmap data incomplete.");
            }

            set({
                nodes,
                edges,
                currentMindMapId: id,
            });

            toast.dismiss();
            toast("Don't forget to save your changes!", { duration: 5000 });
            toast.success(`Mindmap "${data.title}" loaded.`);
        } catch (error: unknown) {
            toast.dismiss();

            if (error instanceof Error) {
                toast.error(`An error occurred while loading your mindmap: ${error.message}`);
                console.error("An error occurred while loading your mindmap:", error);
            } else {
                toast.error("An unknown error occurred while loading your mindmap.");
                console.error("Error:", error);
            }
        }
    }
}));

export default useStore;