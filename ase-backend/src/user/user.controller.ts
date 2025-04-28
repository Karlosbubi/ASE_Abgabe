import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '@/types/dto/CreateUserDto';
import { UserService } from './user.service';
import { UpdateUserDto } from '@/types/dto/UpdateUserDto';
import { AuthGuard } from '@/auth/auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { User } from '@/types/db_entities/user';
import { AdminGuard } from '@/auth/auth_admin.guard';
import { SuspendUserDto } from '@/types/dto/SuspendUserDto';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ description: 'User Registered', type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'Found User', type: User })
  @ApiNotFoundResponse({ description: 'No User with this id' })
  findById(@Req() request: Request) {
    return this.userService.findById(request['user'].id);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'Updated User', type: User })
  @ApiNotFoundResponse({ description: 'No User with this id' })
  update(@Req() request: Request, @Body() updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return this.userService.updateById(request['user'].id, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiNotFoundResponse({ description: 'No User with this id' })
  delete(@Req() request: Request) {
    return this.userService.deleteById(request['user'].id);
  }

  // ADMIN Tasks

  @Get('allUsers')
  @UseGuards(AdminGuard)
  @ApiOkResponse({ description: 'Found Users', type: User })
  @ApiNotFoundResponse({ description: 'Meh' })
  findAll() {
    return this.userService.findAll();
  }

  @Post('admin/suspend')
  @UseGuards(AdminGuard)
  suspendUser(@Body() suspendUserDto: SuspendUserDto) {
    return this.userService.suspend_by_id(suspendUserDto);
  }
}
