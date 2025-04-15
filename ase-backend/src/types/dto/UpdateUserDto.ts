import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public email: string;
  @ApiProperty()
  public password: string;
}
