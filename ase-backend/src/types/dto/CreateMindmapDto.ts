import { ApiProperty } from '@nestjs/swagger';

export class CreateMindmapDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  graph: string | object;
}
