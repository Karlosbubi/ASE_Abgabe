import { ApiProperty } from '@nestjs/swagger';
import { User } from './user';
import {
  IsNumber,
  IsObject,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Mindmap {
  @ApiProperty()
  @IsNumber()
  id: number;
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty({ description: 'Owner: User ID or User object' })
  @ValidateIf((o) => typeof o.owner === 'number')
  @IsNumber()
  @ValidateIf((o) => typeof o.owner === 'object')
  @IsObject()
  @ValidateNested()
  @Type(() => User)
  owner: number | User;
  @ApiProperty()
  @IsObject()
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
