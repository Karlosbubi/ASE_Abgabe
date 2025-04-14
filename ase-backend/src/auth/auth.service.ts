import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '../db/database.service';
import { User } from '../types/db_entities/user';

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user: User = await this.db.get_user_by_email(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (password !== user.password) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    return {
      JWT: await this.jwtService.signAsync(payload),
    };
  }
}
