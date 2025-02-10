import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { PrismaService } from './prisma/prisma.service';
import { MindmapNodeController } from './mindmap-node/mindmap-node.controller';
import { MindmapNodeService } from './mindmap-node/mindmap-node.service';

@Module({
  imports: [UserModule],
  controllers: [AppController, UserController, MindmapNodeController],
  providers: [AppService, UserService, PrismaService, MindmapNodeService],
})
export class AppModule {}
