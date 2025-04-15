import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public password: string;
}
