import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/db/database.module';
import { AuthModule } from '@/auth/auth.module';
import { MindmapService } from './mindmap.service';
import { MindmapController } from './mindmap.controller';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [MindmapController],
  providers: [MindmapService],
})
export class MindmapModule {}
