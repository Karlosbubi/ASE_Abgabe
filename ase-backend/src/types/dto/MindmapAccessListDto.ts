import { ApiProperty } from '@nestjs/swagger';
import { Mindmap } from '../db_entities/mindmap';

export class MindmapAccessListDto {
  @ApiProperty()
  own: (number | Mindmap)[];
  @ApiProperty()
  edit: (number | Mindmap)[];
  @ApiProperty()
  read_only: (number | Mindmap)[];
}
