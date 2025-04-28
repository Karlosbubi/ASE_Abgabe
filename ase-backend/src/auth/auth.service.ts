import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from '@/db/database.service';
import { User } from '@/types/db_entities/user';
import * as bcrypt from 'bcrypt';

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

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedException();
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isadmin,
    };

    return {
      JWT: await this.jwtService.signAsync(payload),
    };
  }
}
