import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../db/database.service';
import { CreateMindmapDto } from '../types/dto/CreateMindmapDto';
import { User } from '../types/db_entities/user';
import { Mindmap } from '../types/db_entities/mindmap';

@Injectable()
export class MindmapService {
  constructor(private readonly db: DatabaseService) {}

  async create(user: number | User, createMindmapDto: CreateMindmapDto) {
    return this.db.create_mindmap(createMindmapDto, user);
  }

  async get(id: number, user: number | User) {
    const mindmap = await this.db.get_mindmap_by_id(id);
    const user_id = typeof user === 'number' ? user : user.id;

    if (mindmap.owner === user_id) {
      return mindmap;
    }

    const rights = await this.db.get_mindmap_access(id, user_id);
    if (rights.can_read) {
      return mindmap;
    }

    throw new UnauthorizedException();
  }

  async list(user: number | User) {
    return this.db.list_mindmaps_for_user(user);
  }

  async update(mindmap: Mindmap, user: number | User) {
    const user_id = typeof user === 'number' ? user : user.id;

    // Prevent escalation by user substitution
    const mindmap_old = await this.db.get_mindmap_by_id(mindmap.id);
    if (mindmap_old.owner === user_id) {
      return this.db.update_mindmap(mindmap);
    }

    const rights = await this.db.get_mindmap_access(mindmap, mindmap_old.owner);
    if (rights.can_write) {
      return this.db.update_mindmap(mindmap);
    }

    throw new UnauthorizedException();
  }

  async delete(id: number, user: number | User) {
    const user_id = typeof user === 'number' ? user : user.id;
    const mindmap = await this.db.get_mindmap_by_id(id);

    if (mindmap.owner === user_id) {
      return this.db.delete_mindmap_by_id(id);
    }

    throw new UnauthorizedException();
  }
}
