import {
    ReactFlow,
    Controls,
    Panel,
    useStoreApi,
    useReactFlow,
    ConnectionLineType,
    type NodeOrigin,
    type InternalNode,
    type OnConnectEnd,
    type OnConnectStart,
} from '@xyflow/react';
import { useShallow } from 'zustand/shallow';
import {useCallback, useRef} from "react";

import MindMapNode from './MindMapNode.tsx';
import MindMapEdge from './MindMapEdge.tsx';
import useStore, { type RFState } from './Store.tsx';
import ShareMindmapDialog from "./ShareMindmapDialog.tsx";
import HelpButton from './HelpButton.tsx';
import { GetCurrentUser } from "../../utils/storageWrapper.ts";

import '@xyflow/react/dist/style.css';

const selector = (state: RFState) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    addChildNode: state.addChildNode,
});

const nodeTypes = {
    mindmap: MindMapNode,
};

const edgeTypes = {
    mindmap: MindMapEdge,
};

const nodeOrigin: NodeOrigin = [0.5, 0.5];
const connectionLineStyle = { stroke: '#000000', strokeWidth: 1 };
const defaultEdgeOptions = { style: connectionLineStyle, type: 'mindmap' };

const MindMap = () => {
    const { nodes, edges, onNodesChange, onEdgesChange, addChildNode } = useStore(
        useShallow(selector),
    );
    const connectingNodeId = useRef<string | null>(null);
    const store = useStoreApi();
    const user = GetCurrentUser();
    const ownerId = useStore((state) => state.ownerId);
    const isOwner = user && ownerId === user.id;
    const { screenToFlowPosition } = useReactFlow();

    const getChildNodePosition = (
        event: MouseEvent | TouchEvent,
        parentNode?: InternalNode,
    ) => {
        const { domNode } = store.getState();

        if (
            !domNode ||
            // we need to check if these properties exist, because when a node is not initialized yet,
            // it doesn't have a positionAbsolute nor a width or height
            !parentNode?.internals.positionAbsolute ||
            !parentNode?.measured.width ||
            !parentNode?.measured.height
        ) {
            return;
        }

        const isTouchEvent = 'touches' in event;
        const x = isTouchEvent ? event.touches[0].clientX : event.clientX;
        const y = isTouchEvent ? event.touches[0].clientY : event.clientY;
        // we need to remove the wrapper bounds, in order to get the correct mouse position
        const panePosition = screenToFlowPosition({
            x,
            y,
        });

        // we are calculating with positionAbsolute here because child nodes are positioned relative to their parent
        return {
            x:
                panePosition.x -
                parentNode.internals.positionAbsolute.x +
                parentNode.measured.width / 2,
            y:
                panePosition.y -
                parentNode.internals.positionAbsolute.y +
                parentNode.measured.height / 2,
        };
    };


    const onConnectStart: OnConnectStart = useCallback((_, { nodeId }) => {
        connectingNodeId.current = nodeId;
    }, []);

    const onConnectEnd: OnConnectEnd = useCallback(
        (event) => {
            const { nodeLookup } = store.getState();
            const targetIsPane = (event.target as Element).classList.contains('react-flow__pane');

            if (targetIsPane && connectingNodeId.current) {
                const parentNode = nodeLookup.get(connectingNodeId.current);
                const childNodePosition = getChildNodePosition(event, parentNode);

                if (parentNode && childNodePosition) {
                    addChildNode(parentNode, childNodePosition);
                }
            }
        },
        [getChildNodePosition],
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            nodeOrigin={nodeOrigin}
            defaultEdgeOptions={defaultEdgeOptions}
            connectionLineStyle={connectionLineStyle}
            connectionLineType={ConnectionLineType.Bezier}
            fitView
        >
            <Controls showInteractive={false} />
            <Panel position="top-left">
                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => useStore.getState().createMindMap()}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-base font-medium shadow"
                    >
                        Create
                    </button>
                    <button
                        onClick={() => useStore.getState().saveMindMap()}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-base font-medium shadow"
                    >
                        Save
                    </button>
                    {isOwner && <ShareMindmapDialog />}
                </div>
            </Panel>
            <Panel position="top-right">
                <HelpButton />
            </Panel>
        </ReactFlow>
    );
};

export default MindMap;