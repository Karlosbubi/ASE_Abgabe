import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  public name: string;
  @ApiProperty()
  @IsString()
  public email: string;
  @ApiProperty()
  @IsString()
  public password: string;
}
