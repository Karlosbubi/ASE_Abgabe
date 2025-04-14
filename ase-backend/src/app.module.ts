import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './db/database.module';

@Module({
  imports: [UserModule, DatabaseModule, AuthModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
