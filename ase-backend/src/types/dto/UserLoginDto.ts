import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public password: string;
}
