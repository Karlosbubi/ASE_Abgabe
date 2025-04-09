import { MindmapNode } from './mindmap_node';

export type Mindmap = {
  id: number;
  owner: number;
  start_node: number | MindmapNode;
};
