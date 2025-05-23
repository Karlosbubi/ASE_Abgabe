import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@/types/dto/CreateUserDto';
import { UpdateUserDto } from '@/types/dto/UpdateUserDto';
import { DatabaseService } from '@/db/database.service';
import { with_ } from '@/utils/with';
import * as bcrypt from 'bcrypt';
import { SuspendUserDto } from '@/types/dto/SuspendUserDto';

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
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.db.create_user(createUserDto);
    if (user) {
      return with_(user, { password: '*****' });
    }
    throw new BadRequestException();
  }

  //Argument `where` of type UserWhereUniqueInput needs at least one of `id` arguments. Available options are marked with ?.
  async findById(id: number) {
    console.log(id);
    const user = await this.db.get_user_by_id(id);
    if (user) {
      return with_(user, { password: '*****' });
    }
    throw new BadRequestException();
  }

  async findAll() {
    return await this.db.findAll();
  }

  async updateById(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto === undefined || updateUserDto === null) {
      throw new BadRequestException("Provide valid 'UpdateUserDTO'");
    }

    let user = await this.db.get_user_by_id(id);

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      user = await this.db.update_user_password_by_id(
        id,
        updateUserDto.password,
      );
    }

    if (updateUserDto.name) {
      user = await this.db.update_user_name_by_id(id, updateUserDto.name);
    }

    if (updateUserDto.email) {
      user = await this.db.update_user_email_by_id(id, updateUserDto.email);
    }

    return with_(user, { password: '*****' });
  }

  async deleteById(id: number) {
    console.log(id);
    await this.db.delete_user_by_id(id);
  }

  async suspend_by_id(suspendUser: SuspendUserDto) {
    console.log(suspendUser);
    const user_id = Number(suspendUser.userId);
    return this.db.update_user_suspension_by_id(
      user_id,
      suspendUser.suspension,
    );
  }
}
