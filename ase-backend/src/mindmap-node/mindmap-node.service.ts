import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMindmapNodeDto } from './dto/CreateMindmapNodeDto';
import { UpdateMindmapNodeDto } from './dto/UpdateMindmapNodeDto';

@Injectable()
export class MindmapNodeService {
  constructor(private prisma: PrismaService) {}

  async create(createMindmapNodeDto: CreateMindmapNodeDto) {
    if (
      createMindmapNodeDto.title === '' ||
      createMindmapNodeDto.contentText === ''
    ) {
      throw new Error('Wronk');
    }

    return this.prisma.mindmapNode.create({
      data: {
        title: createMindmapNodeDto.title,
        contentText: createMindmapNodeDto.contentText,
        parentNodeId: createMindmapNodeDto.parentNodeId,
      },
    });
  }

  async findById(id: string) {
    console.log(id);
    return this.prisma.mindmapNode.findFirst({ where: { id: Number(id) } });
  }

  async updateById(id: string, updateMindmapNodeDto: UpdateMindmapNodeDto) {
    await this.prisma.mindmapNode.update({
      where: {
        id: Number(id),
      },

      data: {
        title: updateMindmapNodeDto.title,
        contentText: updateMindmapNodeDto.contentText,
        parentNodeId: updateMindmapNodeDto.parentNodeId,
      },
    });

    return updateMindmapNodeDto;
  }

  async deleteById(id: number) {
    await this.prisma.mindmapNode.delete({
      where: {
        id: Number(id),
      },
    });
    return id;
  }
}
