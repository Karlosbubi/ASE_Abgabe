import { BaseEdge, getBezierPath, type EdgeProps } from '@xyflow/react';

function MindMapEdge(props: EdgeProps) {
    const { sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition } = props;

    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return <BaseEdge path={edgePath} {...props} />;
}

export default MindMapEdge;