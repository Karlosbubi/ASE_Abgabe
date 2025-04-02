import { useEffect, useCallback } from "react";
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    MiniMap,
    useEdgesState,
    useNodesState,
    Node,
    Edge,
    NodeChange,
    OnConnect,
} from "reactflow";
import "reactflow/dist/style.css";

interface MindMapProps {
    nodes: Node[];
    setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
    setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
}

const MindMap = ({ nodes, setNodes, setSelectedNodeId }: MindMapProps) => {
    const [nodesState, setNodesState] = useNodesState(nodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        setNodesState(nodes);
    }, [nodes]);

    const onConnect: OnConnect = useCallback(
        (params) => {
            const newEdge: Edge = {
                id: `${params.source}-${params.target}`,
                source: params.source ?? "",
                target: params.target ?? "",
                sourceHandle: params.sourceHandle,
                targetHandle: params.targetHandle,
                type: "default",
            };
            setEdges((eds) => addEdge(newEdge, eds));
        },
        []
    );

    const onNodeClick = (_event: React.MouseEvent, node: Node) => {
        setSelectedNodeId(node.id);
    };

    const handleNodeChange = (changes: NodeChange[]) => {
        setNodesState((prevNodes) =>
            prevNodes.map((node) => {
                const change = changes.find((c) => 'id' in c && c.id === node.id);
                return change ? { ...node, ...change } : node;
            })
        );
        setNodes(nodesState);
    };

    return (
        <div style={{ width: "100%", height: "500px", border: "1px solid gray" }}>
            <ReactFlow
                nodes={nodesState}
                edges={edges}
                onNodesChange={handleNodeChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                fitView
            >
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default MindMap;