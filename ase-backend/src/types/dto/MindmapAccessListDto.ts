import { Mindmap } from '../db_entities/mindmap';

export type MindmapAccessListDto = {
  own: (number | Mindmap)[];
  edit: (number | Mindmap)[];
  read_only: (number | Mindmap)[];
};
