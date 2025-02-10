import { Test, TestingModule } from '@nestjs/testing';
import { MindmapNodeController } from './mindmap-node.controller';

describe('MindmapNodeController', () => {
  let controller: MindmapNodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MindmapNodeController],
    }).compile();

    controller = module.get<MindmapNodeController>(MindmapNodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
