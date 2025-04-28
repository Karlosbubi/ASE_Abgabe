import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from '@/auth/auth_admin.guard';
import { User } from '@/types/db_entities/user';
import { SuspendUserDto } from '@/types/dto/SuspendUserDto';
import { UserService } from '@/user/user.service';

@ApiBearerAuth()
@Controller('admin')
@UseGuards(AdminGuard)
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @Get('allUsers')
  @ApiOkResponse({ description: 'Found Users', type: User })
  @ApiNotFoundResponse({ description: 'Meh' })
  findAll() {
    return this.userService.findAll();
  }

  @Post('/suspendUser')
  suspendUser(@Body() suspendUserDto: SuspendUserDto) {
    return this.userService.suspend_by_id(suspendUserDto);
  }

  @Post('/deleteUser/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteById(id);
  }
}
