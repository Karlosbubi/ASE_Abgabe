import { ApiProperty } from '@nestjs/swagger';

export class SuspendUserDto {
  @ApiProperty()
  userId: number;
  @ApiProperty({
    description: 'Suspension Status (send false to lift suspension)',
  })
  suspension: boolean;
}
