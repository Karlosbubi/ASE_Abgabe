import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '@/db/database.module';
import { AuthModule } from '@/auth/auth.module';
import { AdminController } from '@/user/admin.controller';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UserController, AdminController],
  providers: [UserService],
})
export class UserModule {}
