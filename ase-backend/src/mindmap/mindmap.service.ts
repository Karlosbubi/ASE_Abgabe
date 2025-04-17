import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from '../db/database.service';
import { CreateMindmapDto } from '../types/dto/CreateMindmapDto';
import { User } from '../types/db_entities/user';
import { Mindmap, MindmapRights } from '../types/db_entities/mindmap';

@Injectable()
export class MindmapService {
  constructor(private readonly db: DatabaseService) {}

  async create(user: number | User, createMindmapDto: CreateMindmapDto) {
    return this.db.create_mindmap(createMindmapDto, user);
  }

  async get(id: number, user: number | User) {
    if (typeof id !== 'number') {
      id = Number(id);
      console.log('ID Type-Violation detectd');
    }

    const mindmap = await this.db.get_mindmap_by_id(id);
    const user_id = typeof user === 'number' ? user : user.id;
    const owner_id =
      typeof mindmap.owner === 'number' ? mindmap.owner : mindmap.owner.id;

    if (owner_id === user_id) {
      return mindmap;
    }

    const rights: MindmapRights = await this.db.get_mindmap_access(id, user_id);
    if (rights === null) {
      throw new UnauthorizedException();
    }
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

    mindmap.id = Number(mindmap.id); // WTF TypeScript TYPES PLEASE
    // Prevent escalation by user substitution
    const mindmap_old = await this.db.get_mindmap_by_id(mindmap.id);
    if (mindmap.owner === null) {
      throw new NotFoundException();
    }
    if (mindmap_old.owner === user_id) {
      return this.db.update_mindmap(mindmap);
    }

    mindmap.owner = mindmap_old.owner;
    const rights = await this.db.get_mindmap_access(
      mindmap.id,
      user_id,
    );
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
