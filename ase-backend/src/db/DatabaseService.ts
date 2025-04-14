import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { User } from '../types/db_entities/user';
import { CreateUserDto } from '../types/dto/CreateUserDto';
import { UpdateUserDto } from '../types/dto/UpdateUserDto';

@Injectable()
export class DatabaseService {
  client: Client;
  connection_string: string = 'postgres://root:secret@localhost:5555';

  constructor() {
    this.client = new Client({ connectionString: this.connection_string });
  }

  // USER
  async create_user(user: CreateUserDto): Promise<User> {
    await this.client.connect();
    const query_text = `insert into "user" (name, email, password, isAdmin), values ($1, $2, $3, $4) returning *;`;
    const query_values: (string | boolean)[] = [
      user.name,
      user.email,
      user.password,
      false,
    ];
    try {
      const res = await this.client.query<User>(query_text, query_values);
      return res.rows[0];
    } finally {
      await this.client.end();
    }
  }

  async get_user_by_id(user_id: number): Promise<User> {
    await this.client.connect();
    const query_text = `select id, name, email, password, isAdmin from "user" where user_id = $1;`;
    try {
      const res = await this.client.query<User>(query_text, [user_id]);
      return res.rows[0];
    } finally {
      await this.client.end();
    }
  }

  async update_user_by_id(
    user_id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    await this.client.connect();

    const query_text =
      'update "user" set name = $2, email = $3, password = $4 where id = $1 returning *;';
    const query_values: (number | string)[] = [
      user_id,
      updateUserDto.name,
      updateUserDto.email,
      updateUserDto.password,
    ];

    try {
      const result = await this.client.query<User>(query_text, query_values);
      return result.rows[0];
    } finally {
      await this.client.end();
    }
  }

  async delete_user_by_id(user_id: number): Promise<void> {
    await this.client.connect();
    try {
      await this.client.query(`delete from "user" where id = $1`, [user_id]);
    } finally {
      await this.client.end();
    }
  }
}
