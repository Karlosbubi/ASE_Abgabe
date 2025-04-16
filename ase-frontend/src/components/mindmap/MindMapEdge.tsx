import {
    BaseEdge,
    getBezierPath,
    type EdgeProps,
    Position,
} from '@xyflow/react';

function MindMapEdge(props: EdgeProps) {
    const {
        sourceX,
        sourceY,
        targetX,
        targetY
    } = props;

    // Dynamisch berechnen, ob target über oder unter source ist
    const isTargetAbove = targetY < sourceY;

    const dynamicSourcePosition = isTargetAbove ? Position.Top : Position.Bottom;
    const dynamicTargetPosition = isTargetAbove ? Position.Bottom : Position.Top;

    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition: dynamicSourcePosition,
        targetX,
        targetY,
        targetPosition: dynamicTargetPosition,
    });

    return <BaseEdge path={edgePath} {...props} />;
}

export default MindMapEdge;