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
import { CreateUserDto } from '../types/dto/CreateUserDto';
import { UserService } from './user.service';
import { UpdateUserDto } from '../types/dto/UpdateUserDto';
import { AuthGuard } from '../auth/auth.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { User } from 'src/types/db_entities/user';

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
  findById(@Req() request) {
    return this.userService.findById(request['user'].id);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'Updated User', type: User })
  @ApiNotFoundResponse({ description: 'No User with this id' })
  update(@Req() request, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateById(request['user'].id, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiNotFoundResponse({ description: 'No User with this id' })
  delete(@Req() request) {
    return this.userService.deleteById(request['user'].id);
  }
}
