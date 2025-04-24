import { ApiProperty } from '@nestjs/swagger';
import { MindmapList } from '@/types/db_entities/mindmap';

export class MindmapAccessListDto {
  @ApiProperty()
  own: MindmapList;
  @ApiProperty()
  edit: MindmapList;
  @ApiProperty()
  read_only: MindmapList;
}
