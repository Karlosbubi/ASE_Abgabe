import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  public name: string | null;
  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  public email: string | null;
  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  public password: string | null;
}
