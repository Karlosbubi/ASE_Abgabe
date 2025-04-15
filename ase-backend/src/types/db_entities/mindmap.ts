import { ApiProperty } from '@nestjs/swagger';
import { User } from './user';

export class Mindmap {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  owner: number;
  @ApiProperty()
  graph: object;
}

export type MindmapList = (number | Mindmap)[];

export class MindmapRights {
  @ApiProperty()
  user: number | User;
  @ApiProperty()
  mindmap: number | Mindmap;
  @ApiProperty()
  can_read: boolean;
  @ApiProperty()
  can_write: boolean;
}
