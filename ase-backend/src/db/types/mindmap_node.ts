import { Mindmap } from './mindmap';

export type MindmapNode = {
  id: number;
  title: string;
  content: string;
  parent: number | null | MindmapNode; // Foreign key to MindmapNode
  mindmap: number | Mindmap; // Foreign key to Mindmap
};
