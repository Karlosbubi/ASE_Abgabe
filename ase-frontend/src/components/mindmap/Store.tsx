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
    loadMindMap: () => void;
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

    loadMindMap: () => {
        toast.loading("Loading Mindmap...");

        const hardcodedNodes = [
            {
                id: 'root',
                type: 'mindmap',
                data: { label: 'Hauptthema' },
                position: { x: 0, y: 0 },
            },
            {
                id: 'node-1',
                type: 'mindmap',
                data: { label: 'Unterthema A' },
                position: { x: 150, y: 100 },
                parentId: 'root',
            },
            {
                id: 'node-2',
                type: 'mindmap',
                data: { label: 'Unterthema B' },
                position: { x: -150, y: 100 },
                parentId: 'root',
            },
        ];

        const hardcodedEdges = [
            {
                id: 'edge-1',
                source: 'root',
                target: 'node-1',
            },
            {
                id: 'edge-2',
                source: 'root',
                target: 'node-2',
            },
        ];

        set({
            nodes: hardcodedNodes,
            edges: hardcodedEdges,
        });

        toast.dismiss()
        toast.success("Mindmap geladen (Dummy-Daten)");
    },
}));

export default useStore;