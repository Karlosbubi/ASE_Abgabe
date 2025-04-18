import { Mindmap } from '../db_entities/mindmap';

export class UpdateMindmapRights
{
  mindmap: number | Mindmap;
  recipient_email: string;
  can_read: boolean = false;
  can_write: boolean = false;
}