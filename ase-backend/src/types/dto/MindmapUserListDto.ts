import { ApiProperty } from '@nestjs/swagger';
import { User } from '@/types/db_entities/user';

export class MindmapUserListDto {
  @ApiProperty()
  own: number | User;
  @ApiProperty()
  edit: (number | User)[];
  @ApiProperty()
  read_only: (number | User)[];
}
