import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { User } from '../types/db_entities/user';
import { CreateUserDto } from '../types/dto/CreateUserDto';
import { UpdateUserDto } from '../types/dto/UpdateUserDto';

@Injectable()
export class DatabaseService {
  connection_string: string = 'postgres://root:secret@localhost:5555/postgres';

  constructor() {}

  // USER
  async create_user(user: CreateUserDto): Promise<User> {
    const client = new Client({ connectionString: this.connection_string });
    await client.connect();
    const query_text = `insert into mindmap_user(name, email, password, isadmin) values ($1, $2, $3, $4) returning *;`;
    const query_values: (string | boolean)[] = [
      user.name,
      user.email,
      user.password,
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

  async get_user_by_id(user_id: number): Promise<User> {
    const client = new Client({ connectionString: this.connection_string });
    await client.connect();
    const query_text = `select id, name, email, password, isAdmin from mindmap_user where user_id = $1;`;
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
    const query_values: (number | string)[] = [
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
}
