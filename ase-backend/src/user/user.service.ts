import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../types/dto/CreateUserDto';
import { UpdateUserDto } from '../types/dto/UpdateUserDto';
import { PrismaService } from '../prisma/prisma.service';
import { DatabaseService } from '../db/DatabaseService';
import { with_ } from '../utils/with';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    if (
      createUserDto.name === '' ||
      createUserDto.email === '' ||
      createUserDto.password === ''
    ) {
      throw new Error('Data must must be complete');
    }

    const user = this.db.create_user(createUserDto);
    return with_(user, { password: '*****' });
  }

  //Argument `where` of type UserWhereUniqueInput needs at least one of `id` arguments. Available options are marked with ?.
  async findById(id: number) {
    console.log(id);
    const user = this.db.get_user_by_id(id);
    return with_(user, { password: '*****' });
  }

  async updateById(id: number, updateUserDto: UpdateUserDto) {
    console.log(id);
    if (
      updateUserDto.name === '' ||
      updateUserDto.email === '' ||
      updateUserDto.password === ''
    ) {
      throw new Error('Data must be complete');
    }

    const user = this.db.update_user_by_id(id, updateUserDto);
    return with_(user, { password: '*****' });
  }

  async deleteById(id: number) {
    await this.db.delete_user_by_id(id);
  }
}
