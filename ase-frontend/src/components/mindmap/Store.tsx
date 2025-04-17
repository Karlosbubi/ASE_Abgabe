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

export type RFState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    addChildNode: (parentNode: Node, position: XYPosition) => void;
    updateNodeLabel: (nodeId: string, label: string) => void;
    loadMindMap: (id: number) => void;
    saveMindMap: () => void;
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
                    // Create a completely new node object to ensure React Flow detects the change
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
    saveMindMap: async () => {
        toast.loading("Saving mindmap...");

        const { nodes, edges } = get();
        const data = {
            title: "Title TODO",
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
            await fetch("http://localhost:3000/mindmap", requestOptions);
            toast.dismiss()
            toast.success("Mindmap saved successfully!");
        } catch (error) {
            console.error(error);
            toast.dismiss()
            toast.error("En error occurred while saving your mindmap.");
        }
    },

    loadMindMap: async (id: number) => {
        toast.loading("Lade Mindmap...");

        try {
            const response = await fetch(`http://localhost:3000/mindmap/${id}`);
            if (!response.ok) {
                throw new Error(`Server response: ${response.status}`);
            }

            const data = await response.json();

            // Wir erwarten: data.graph = { nodes: [...], edges: [...] }
            const { nodes, edges } = data.graph || {};

            if (!nodes || !edges) {
                throw new Error("Mindmap data incomplete.");
            }

            set({
                nodes,
                edges,
            });

            toast.dismiss();
            toast.success(`Mindmap "${data.title}" loaded.`);
        } catch (error: unknown) {
            toast.dismiss();

            if (error instanceof Error) {
                toast.error(`Failed to load mind map: ${error.message}`);
                console.error("Error loading mind map:", error);
            } else {
                toast.error("An unknown error occurred while loading the mind map.");
                console.error("Unknown error:", error);
            }
        }
    }
}));

export default useStore;