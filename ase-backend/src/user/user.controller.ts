import {
  Body,
  Controller,
  Delete,
  Get,
  Param, Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.deleteById(id);
  }
}
