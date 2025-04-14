import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post, Req, UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../types/dto/CreateUserDto';
import { UserService } from './user.service';
import { UpdateUserDto } from '../types/dto/UpdateUserDto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findById(@Req() request) {
    return this.userService.findById(request['user'].id);
  }

  @Patch()
  @UseGuards(AuthGuard)
  update(@Req() request, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateById(request['user'].id, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard)
  delete(@Req() request) {
    return this.userService.deleteById(request['user'].id);
  }
}
