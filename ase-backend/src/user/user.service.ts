import { Injectable, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  async findById(@Param('id') id: string) {
    return id;
  }

  async updateById(@Param('id') id: string, @Param('name') name: string) {
    return id;
  }
}
