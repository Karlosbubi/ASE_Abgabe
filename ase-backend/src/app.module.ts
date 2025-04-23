import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './db/database.module';
import { MindmapController } from './mindmap/mindmap.controller';
import { MindmapModule } from './mindmap/mindmap.module';
import { MindmapService } from './mindmap/mindmap.service';
import { ValidationPipe } from '@nestjs/common';

@Module({
  imports: [UserModule, MindmapModule, DatabaseModule, AuthModule],
  controllers: [AppController, UserController, MindmapController],
  providers: [AppService, UserService, MindmapService, ValidationPipe],
})
export class AppModule {}
