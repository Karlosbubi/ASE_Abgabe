import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class SuspendUserDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;
  @ApiProperty({
    description: 'Suspension Status (send false to lift suspension)',
  })
  @IsBoolean()
  @IsNotEmpty()
  suspension: boolean;
}
