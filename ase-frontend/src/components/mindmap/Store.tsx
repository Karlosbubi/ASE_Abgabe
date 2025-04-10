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
        set({
            nodes: applyNodeChanges(changes, get().nodes),
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
    saveMindMap: () => {
        const { nodes, edges } = get();
        const data = {
            nodes,
            edges,
        };
        console.log('📦 Mindmap JSON:', JSON.stringify(data, null, 2));
    },

    loadMindMap: () => {
        const nodesJSON = localStorage.getItem('mindmap-nodes');
        const edgesJSON = localStorage.getItem('mindmap-edges');

        if (nodesJSON && edgesJSON) {
            set({
                nodes: JSON.parse(nodesJSON),
                edges: JSON.parse(edgesJSON),
            });
        }
    },
}));

export default useStore;