import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import useStore from './Store.tsx';

export type NodeData = {
    label: string;
};

function MindMapNode({ id, data }: NodeProps<Node<NodeData>>) {
    const updateNodeLabel = useStore((state) => state.updateNodeLabel);

    return (
        <>
            <input
                value={data.label}
                onChange={(evt) => updateNodeLabel(id, evt.target.value)}
            />

            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </>
    );
}

export default MindMapNode;