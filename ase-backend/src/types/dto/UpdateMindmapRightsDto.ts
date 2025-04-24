import { Mindmap } from '@/types/db_entities/mindmap';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMindmapRightsDto {
  @ApiProperty({ description: 'Mindmap ID or the Mindmap object' })
  @ValidateIf((o) => typeof o.mindmap === 'number')
  @IsNumber()
  @ValidateIf((o) => typeof o.mindmap === 'object')
  @IsObject()
  @ValidateNested()
  @Type(() => Mindmap)
  @IsNotEmpty()
  mindmap: number | Mindmap;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  recipient_email: string;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  can_read: boolean = false;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  can_write: boolean = false;
}
