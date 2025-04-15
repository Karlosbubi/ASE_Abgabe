import {
  Param,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Patch,
  Body,
  Delete,
} from '@nestjs/common';
import { MindmapService } from './mindmap.service';
import { CreateMindmapDto } from '../types/dto/CreateMindmapDto';
import { AuthGuard } from '../auth/auth.guard';
import { Mindmap } from '../types/db_entities/mindmap';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('mindmap')
export class MindmapController {
  constructor(private readonly mindmapService: MindmapService) {}

  @Post()
  @ApiBody({ type: CreateMindmapDto })
  @UseGuards(AuthGuard)
  create(@Req() request, @Body() createMindmapDto: CreateMindmapDto) {
    return this.mindmapService.create(request['user'], createMindmapDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  get(@Param('id') id: number, @Req() request) {
    return this.mindmapService.get(id, request['user']);
  }

  @Get()
  @UseGuards(AuthGuard)
  list(@Req() request) {
    return this.mindmapService.list(request['user']);
  }

  @Patch()
  @UseGuards(AuthGuard)
  update(@Body() mindmap: Mindmap, @Req() request) {
    return this.mindmapService.update(mindmap, request['user']);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: number, @Req() request) {
    return this.mindmapService.delete(id, request['user']);
  }
}
