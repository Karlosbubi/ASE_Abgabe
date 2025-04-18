import { Mindmap } from '../db_entities/mindmap';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMindmapRights
{
  @ApiProperty()
  mindmap: number | Mindmap;
  @ApiProperty()
  recipient_email: string;
  @ApiProperty()
  can_read: boolean = false;
  @ApiProperty()s
  can_write: boolean = false;
}