import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MindmapNodeService } from './mindmap-node.service';
import { CreateMindmapNodeDto } from './dto/CreateMindmapNodeDto';
import { UpdateUserDto } from '../user/dto/UpdateUserDto';
import { UpdateMindmapNodeDto } from './dto/UpdateMindmapNodeDto';

@Controller('mindmap-node')
export class MindmapNodeController {
  constructor(private readonly mindmapNodeService: MindmapNodeService) {}

  @Post()
  creat(@Body() createMindmapNode: CreateMindmapNodeDto) {
    return this.mindmapNodeService.create(createMindmapNode);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.mindmapNodeService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMindmapNodeDto: UpdateMindmapNodeDto) {
    return this.mindmapNodeService.updateById(id, updateMindmapNodeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.mindmapNodeService.deleteById(id);
  }
}
