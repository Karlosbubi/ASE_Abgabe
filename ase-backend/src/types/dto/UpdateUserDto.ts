import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  public name: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  public email: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  public password: string;
}
