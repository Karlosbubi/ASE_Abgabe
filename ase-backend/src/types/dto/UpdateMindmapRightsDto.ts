import { Mindmap } from '../db_entities/mindmap';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMindmapRightsDto {
  @ApiProperty()
  mindmap: number | Mindmap;
  @ApiProperty()
  recipient_email: string;
  @ApiProperty()
  can_read: boolean = false;
  @ApiProperty()
  can_write: boolean = false;
}
