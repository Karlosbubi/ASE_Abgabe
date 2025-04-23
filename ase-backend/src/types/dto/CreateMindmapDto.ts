import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString, ValidateIf } from 'class-validator';

export class CreateMindmapDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
  @ApiProperty({ description: 'Graph data: JSON object or string form' })
  @ValidateIf((o) => typeof o.graph === 'string')
  @IsString()
  @ValidateIf((o) => typeof o.graph === 'object')
  @IsObject()
  graph: string | object;
}
