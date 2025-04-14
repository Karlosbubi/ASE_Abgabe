import { User } from './user';

export type Mindmap = {
  id: number;
  owner: number;
  graph: object;
};

export type MindmapList = (number | Mindmap)[];

export type MindmapRights = {
  user: number | User;
  mindmap: number | Mindmap;
  can_read: boolean;
  can_write: boolean;
};
