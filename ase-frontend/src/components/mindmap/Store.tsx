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
import {GetCurrentUser} from "@/utils/storageWrapper.ts";
import toast from 'react-hot-toast';
import { queryClient } from '@/utils/queryClient.ts';

export type RFState = {
    nodes: Node[];
    edges: Edge[];
    currentMindMapId?: number;
    ownerId?: number;
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    addChildNode: (parentNode: Node, position: XYPosition) => void;
    updateNodeLabel: (nodeId: string, label: string) => void;
    loadMindMap: (id: number) => void;
    saveMindMap: () => void;
    createMindMap: () => void;
    shareMindMap: (emails: string[], readOnly: boolean) => void;
    centerMindmapForExport: () => Node[];
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
        if (!user?.JWT) {
            toast.dismiss();
            toast.error("You must be logged in to create a mindmap.");
            return;
        }
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
        if (!user?.JWT) {
            toast.dismiss();
            toast.error("You must be logged in to safe a mindmap.");
            return;
        }

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
            const res = await fetch("http://localhost:3000/mindmap", requestOptions);
            await queryClient.invalidateQueries({ queryKey: [`get_mindmap_list_${new Date().getMonth()}`] });
            toast.dismiss();

            if (res.ok) {
                toast.success("Mindmap saved successfully!");
            } else if (res.status === 401) {
                toast.error("You do not have permission to save this mindmap. It may be shared with you as read-only.");
            } else {
                toast.error("Saving mindmap failed.");
            }
        } catch (error) {
            console.error(error);
            toast.dismiss();
            toast.error("An error occurred while saving your mindmap.");
        }
    },

    loadMindMap: async (id: number) => {
        toast.loading("Loading Mindmap...");

        const user = GetCurrentUser();
        if (!user?.JWT) {
            toast.dismiss();
            toast.error("You must be logged in to load a mindmap.");
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
                ownerId: data.owner,
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
    },

    shareMindMap: async (emails: string[], readOnly: boolean) => {
        const user = GetCurrentUser();
        const { currentMindMapId } = get();

        if (!user?.JWT) {
            toast.error("You must be logged in to share a mindmap.");
            return;
        }

        if (!currentMindMapId) {
            toast.error("No mindmap is currently loaded.");
            return;
        }

        toast.loading("Sending invitation...");

        try {
            for (const email of emails) {
                const payload = {
                    mindmap: currentMindMapId,
                    recipient_email: email,
                    can_read: true,
                    can_write: !readOnly,
                };

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.JWT,
                    },
                    body: JSON.stringify(payload),
                };

                const response = await fetch("http://localhost:3000/mindmap/share", requestOptions);

                if (response.status === 200 || response.status === 201) {
                    toast.dismiss();
                    toast.success(`Successfully added ${email}`);
                    continue;
                }

                if (response.status === 401) {
                    toast.dismiss();
                    toast.error(`No rights to share this mindmap with ${email}.`);
                } else if (response.status === 403) {
                    toast.dismiss();
                    toast.error("Unauthorized request. Please log in again.");
                } else if (response.status === 404) {
                    toast.dismiss();
                    toast.error(`Mindmap or user not found for ${email}.`);
                } else if (response.status === 500) {
                    toast.dismiss();
                    toast.error("Server error occurred. Please try again later.");
                } else {
                    const errorText = await response.text();
                    console.error(`Unexpected error (${response.status}) for ${email}:`, errorText);
                    toast.dismiss();
                    toast.error(`Failed to invite ${email}`);
                }
            }
        } catch (error) {
            toast.dismiss();
            console.error("Error while sharing mindmap:", error);
            toast.error("An error occurred while sharing the mindmap.");
        }
    },

    centerMindmapForExport: () => {
        const nodes = get().nodes;

        const minX = Math.min(...nodes.map(n => n.position.x));
        const maxX = Math.max(...nodes.map(n => n.position.x));
        const minY = Math.min(...nodes.map(n => n.position.y));
        const maxY = Math.max(...nodes.map(n => n.position.y));

        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;

        const offsetX = -centerX;
        const offsetY = -centerY;

        return nodes.map(n => ({
            ...n,
            position: {
                x: n.position.x + offsetX,
                y: n.position.y + offsetY,
            }
        }));
    },
}));

export default useStore;