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
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthGuard } from '@/auth/auth.guard';
import { MindmapService } from './mindmap.service';

import { CreateMindmapDto } from '@/types/dto/CreateMindmapDto';
import { UpdateMindmapRightsDto } from '@/types/dto/UpdateMindmapRightsDto';
import { MindmapUserListDto } from '@/types/dto/MindmapUserListDto';
import { Mindmap } from '@/types/db_entities/mindmap';
import { MindmapAccessListDto } from '@/types/dto/MindmapAccessListDto';

@ApiBearerAuth()
@Controller('mindmap')
export class MindmapController {
  constructor(private readonly mindmapService: MindmapService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateMindmapDto })
  @ApiCreatedResponse({ description: 'Mindmap Created', type: Mindmap })
  create(@Req() request, @Body() createMindmapDto: CreateMindmapDto) {
    return this.mindmapService.create(request['user'], createMindmapDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'Mindmap Found', type: Mindmap })
  @ApiNotFoundResponse({ description: 'No mindmap with this id' })
  @ApiUnauthorizedResponse({
    description: "You don't have rights to access this mindmap",
  })
  get(@Param('id') id: number, @Req() request) {
    return this.mindmapService.get(id, request['user']);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'Your Mindmaps', type: MindmapAccessListDto })
  list(@Req() request) {
    return this.mindmapService.list(request['user']);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'Updated Mindmap', type: Mindmap })
  @ApiNotFoundResponse({ description: 'No mindmap with this id' })
  @ApiUnauthorizedResponse({
    description: "You don't have rights to change this mindmap",
  })
  update(@Body() mindmap: Mindmap, @Req() request) {
    return this.mindmapService.update(mindmap, request['user']);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'Mindmap Deleted' })
  @ApiNotFoundResponse({ description: 'No mindmap with this id' })
  @ApiUnauthorizedResponse({
    description: "You don't have rights to delete this mindmap",
  })
  delete(@Param('id') id: number, @Req() request) {
    return this.mindmapService.delete(id, request['user']);
  }

  @Post('share')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'Permission Set' })
  @ApiNotFoundResponse({ description: 'Mindmap or User not found' })
  @ApiUnauthorizedResponse({
    description: "You don't have rights to share this mindmap",
  })
  share(@Body() rights: UpdateMindmapRightsDto, @Req() request) {
    return this.mindmapService.update_rights(
      request['user'],
      rights.recipient_email,
      rights.mindmap,
      rights.can_read,
      rights.can_write,
    );
  }

  @Get(':id/share')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: 'The Following users have access.',
    type: MindmapUserListDto,
  })
  @ApiNotFoundResponse({ description: 'You Mindmap or User not found.' })
  @ApiUnauthorizedResponse({ description: 'Only the Owner can query this.' })
  get_share_list(@Req() request, @Param('id') id: number) {
    return this.mindmapService.get_mindmap_user_list(request['user'], id);
  }
}
