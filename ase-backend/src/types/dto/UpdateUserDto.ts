import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  public name: string | null = null;
  @ApiProperty()
  @IsString()
  @IsOptional()
  public email: string | null = null;
  @ApiProperty()
  @IsString()
  @IsOptional()
  public password: string | null = null;
}
