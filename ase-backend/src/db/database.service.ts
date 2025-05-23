import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { User } from '@/types/db_entities/user';
import { CreateUserDto } from '@/types/dto/CreateUserDto';
import { UpdateUserDto } from '@/types/dto/UpdateUserDto';
import { Mindmap, MindmapRights } from '@/types/db_entities/mindmap';
import { CreateMindmapDto } from '@/types/dto/CreateMindmapDto';
import { MindmapAccessListDto } from '@/types/dto/MindmapAccessListDto';
import { MindmapUserListDto } from '@/types/dto/MindmapUserListDto';

@Injectable()
export class DatabaseService {
  connection_string: string =
    process.env.DB_STRING ?? 'postgres://root:secret@localhost:5555/postgres';

  constructor() {}

  // USER
  async create_user(user: CreateUserDto): Promise<User> {
    const client = new Client({ connectionString: this.connection_string });
    await client.connect();
    const query_text = `insert into mindmap_user(name, email, password, isadmin, issuspended) values ($1, $2, $3, $4, $5) returning *;`;
    const query_values: (string | boolean)[] = [
      user.name,
      user.email,
      user.password,
      false,
      false,
    ];
    try {
      const res = await client.query<User>(query_text, query_values);
      return res.rows[0];
    } catch (error: any) {
      console.log(error);
    } finally {
      await client.end();
    }
  }

  async findAll() {
    const client = new Client({ connectionString: this.connection_string });
    await client.connect();
    const query_text = `select id, name, email, isadmin, issuspended from mindmap_user;`;
    try {
      const res = await client.query<User>(query_text);
      return res.rows;
    } catch (error: any) {
      console.log(error);
    } finally {
      await client.end();
    }
  }

  async get_user_by_id(user_id: number): Promise<User> {
    const client = new Client({ connectionString: this.connection_string });
    await client.connect();
    const query_text = `select id, name, email, password, isAdmin from mindmap_user where id = $1;`;
    try {
      const res = await client.query<User>(query_text, [user_id]);
      return res.rows[0];
    } catch (error: any) {
      console.log(error);
    } finally {
      await client.end();
    }
  }

  async get_user_by_email(email: string): Promise<User> {
    const client = new Client({ connectionString: this.connection_string });
    await client.connect();
    const query_text = `select id, name, email, password, isAdmin from mindmap_user where email = $1;`;
    try {
      const res = await client.query<User>(query_text, [email]);
      return res.rows[0];
    } catch (error: any) {
      console.log(error);
    } finally {
      await client.end();
    }
  }

  async update_user_by_id(
    user_id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const client = new Client({ connectionString: this.connection_string });
    await client.connect();

    const query_text =
      'update mindmap_user set name = $2, email = $3, password = $4 where id = $1 returning *;';
    const query_values = [
      user_id,
      updateUserDto.name,
      updateUserDto.email,
      updateUserDto.password,
    ];

    try {
      const result = await client.query<User>(query_text, query_values);
      return result.rows[0];
    } catch (error: any) {
      console.log(error);
    } finally {
      await client.end();
    }
  }

  async update_user_password_by_id(
    id: number,
    password: string,
  ): Promise<User> {
    const client = new Client({ connectionString: this.connection_string });
    await client.connect();

    const query_text =
      'update mindmap_user set password = $2 where id = $1 returning *;';
    const query_values = [id, password];

    try {
      const result = await client.query<User>(query_text, query_values);
      return result.rows[0];
    } catch (error: any) {
      console.log(error);
    } finally {
      await client.end();
    }
  }

  async update_user_name_by_id(id: number, name: string): Promise<User> {
    const client = new Client({ connectionString: this.connection_string });
    await client.connect();

    const query_text =
      'update mindmap_user set name = $2 where id = $1 returning *;';
    const query_values = [id, name];

    try {
      const result = await client.query<User>(query_text, query_values);
      return result.rows[0];
    } catch (error: any) {
      console.log(error);
    } finally {
      await client.end();
    }
  }

  async update_user_email_by_id(id: number, email: string): Promise<User> {
    const client = new Client({ connectionString: this.connection_string });
    await client.connect();

    const query_text =
      'update mindmap_user set email = $2 where id = $1 returning *;';
    const query_values = [id, email];

    try {
      const result = await client.query<User>(query_text, query_values);
      return result.rows[0];
    } catch (error: any) {
      console.log(error);
    } finally {
      await client.end();
    }
  }

  async update_user_suspension_by_id(
    id: number,
    suspend: boolean,
  ): Promise<User> {
    const client = new Client({ connectionString: this.connection_string });
    await client.connect();

    const query_text =
      'update mindmap_user set issuspended = $2 where id = $1 returning *;';
    const query_values = [id, suspend];

    try {
      const result = await client.query<User>(query_text, query_values);
      return result.rows[0];
    } catch (error: any) {
      console.log(error);
    } finally {
      await client.end();
    }
  }

  async delete_user_by_id(user_id: number): Promise<void> {
    const client = new Client({ connectionString: this.connection_string });
    await client.connect();
    try {
      await client.query(`delete from mindmap_user where id = $1`, [user_id]);
    } catch (error: any) {
      console.log(error);
    } finally {
      await client.end();
    }
  }

  // MIND MAP

  async create_mindmap(
    mindmap: CreateMindmapDto,
    owner: number | User,
  ): Promise<Mindmap> {
    const json_text =
      typeof mindmap.graph === 'string'
        ? mindmap.graph
        : JSON.stringify(mindmap.graph);
    const user_id = typeof owner === 'number' ? owner : owner.id;

    const client = new Client({ connectionString: this.connection_string });
    await client.connect();

    const query_text =
      'insert into mindmap(owner, title, graph) values($1, $2, $3) returning *;';
    const query_values = [user_id, mindmap.title, json_text];

    try {
      const result = await client.query<Mindmap>(query_text, query_values);
      return result.rows[0];
    } catch (error: any) {
      console.log(error);
    } finally {
      await client.end();
    }
  }

  async get_mindmap_by_id(mindmap_id: number): Promise<Mindmap | null> {
    const client = new Client({ connectionString: this.connection_string });
    await client.connect();

    const query_text =
      'select id, title, owner, graph from mindmap where id = $1;';
    const query_values = [mindmap_id];

    try {
      const result = await client.query<Mindmap>(query_text, query_values);
      return result.rows[0];
    } catch (error: any) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
  }

  async list_mindmaps_for_user(
    user: number | User,
  ): Promise<MindmapAccessListDto> {
    const user_id = typeof user === 'number' ? user : user.id;

    const client = new Client({ connectionString: this.connection_string });
    await client.connect();

    try {
      const result_own = await client.query<Mindmap>(
        'select id, title from mindmap where owner = $1;',
        [user_id],
      );
      const result_edit = await client.query<Mindmap>(
        'select m.id, title from mindmap as m join mindmap_rights as r on r.mindmap = m.id ' +
          'where r.mindmap_user = $1 and r.can_write = true;',
        [user_id],
      );
      const result_read = await client.query<Mindmap>(
        'select m.id, title from mindmap as m join mindmap_rights as r on r.mindmap = m.id ' +
          'where r.mindmap_user = $1 and r.can_write = false and r.can_read = true;',
        [user_id],
      );
      return {
        own: result_own.rows,
        edit: result_edit.rows,
        read_only: result_read.rows,
      };
    } catch (error: any) {
      console.log(error);
    } finally {
      await client.end();
    }
  }

  async update_mindmap(mindmap: Mindmap): Promise<Mindmap> {
    const client = new Client({ connectionString: this.connection_string });
    await client.connect();

    const query_text =
      'update mindmap set title = $2, owner = $3, graph = $4 where id = $1;';
    const query_values = [
      mindmap.id,
      mindmap.title,
      mindmap.owner,
      mindmap.graph,
    ];

    try {
      const result = await client.query<Mindmap>(query_text, query_values);
      return result.rows[0];
    } catch (error: any) {
      console.log(error);
    } finally {
      await client.end();
    }
  }

  async delete_mindmap_by_id(mindmap_id: number): Promise<void> {
    const client = new Client({ connectionString: this.connection_string });
    await client.connect();
    try {
      await client.query(`delete from mindmap where id = $1`, [mindmap_id]);
    } catch (error: any) {
      console.log(error);
    } finally {
      await client.end();
    }
  }

  // MINDMAP RIGHTS

  async get_mindmap_access(
    mindmap: number | Mindmap,
    user: number | User,
  ): Promise<MindmapRights | null> {
    const user_id = typeof user === 'number' ? user : user.id;
    const mindmap_id = typeof mindmap === 'number' ? mindmap : mindmap.id;

    const client = new Client({ connectionString: this.connection_string });
    await client.connect();

    const query_text =
      'select mindmap_user, mindmap, can_read, can_write from mindmap_rights where mindmap_user = $1 and mindmap = $2;';
    const query_values = [user_id, mindmap_id];

    try {
      const result = await client.query<MindmapRights>(
        query_text,
        query_values,
      );
      return result.rows[0];
    } catch (error: any) {
      console.log(error);
      return null;
    } finally {
      await client.end();
    }
  }

  async set_mindmap_access(
    mindmap: number | Mindmap,
    user: number | User,
    read: boolean,
    write: boolean,
  ): Promise<MindmapRights> {
    const user_id = typeof user === 'number' ? user : user.id;
    const mindmap_id = typeof mindmap === 'number' ? mindmap : mindmap.id;

    const client = new Client({ connectionString: this.connection_string });
    await client.connect();

    const query_text =
      'insert into mindmap_rights(mindmap_user, mindmap, can_read, can_write) values ($1, $2, $3, $4) on conflict (mindmap, mindmap_user) do update set can_read = $3, can_write = $4;';
    const query_values = [user_id, mindmap_id, read || write, write];

    try {
      const result = await client.query<MindmapRights>(
        query_text,
        query_values,
      );
      return result.rows[0];
    } catch (error: any) {
      console.log(error);
    } finally {
      await client.end();
    }
  }

  async list_users_for_mindmap(
    mindmap: number | Mindmap,
  ): Promise<MindmapUserListDto> {
    const mindmap_id =
      typeof mindmap === 'number'
        ? mindmap
        : typeof mindmap === 'object'
          ? mindmap.id
          : Number(mindmap);

    const mindmap_db = await this.get_mindmap_by_id(mindmap_id);
    const owner = mindmap_db.owner;

    const client = new Client({ connectionString: this.connection_string });
    await client.connect();

    try {
      const result_edit = await client.query<User>(
        'select u.id, u.name, u.email from mindmap_user as u join mindmap_rights as r on r.mindmap_user = u.id ' +
          'where r.mindmap = $1 and r.can_write = true;',
        [mindmap_id],
      );
      const result_read = await client.query<User>(
        'select u.id, u.name, u.email from mindmap_user as u join mindmap_rights as r on r.mindmap_user = u.id ' +
          'where r.mindmap = $1 and r.can_write = false and r.can_read = true;',
        [mindmap_id],
      );

      return {
        own: owner,
        edit: result_edit.rows,
        read_only: result_read.rows,
      };
    } catch (error: any) {
      console.log(error);
    } finally {
      await client.end();
    }
  }
}
