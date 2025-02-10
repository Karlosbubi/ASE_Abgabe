import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (
      createUserDto.name === '' ||
      createUserDto.email === '' ||
      createUserDto.password === ''
    ) {
      throw new Error('Name must not be empty string');
    }

    return this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        passwordHash: createUserDto.password,
      },
    });
  }

  //Argument `where` of type UserWhereUniqueInput needs at least one of `id` arguments. Available options are marked with ?.
  async findById(id: string) {
    console.log(id);
    return this.prisma.user.findFirst({ where: { id: Number(id) } });
  }

  async updateById(id: string, updateUserDto: UpdateUserDto) {
    await this.prisma.user.update({
      where: {
        id: Number(id),
      },

      data: {
        name: updateUserDto.name,
        email: updateUserDto.email,
        passwordHash: updateUserDto.password,
      },
    });

    return updateUserDto;
  }

  async deleteById(id: number) {
    await this.prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    return id;
  }
}
