import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '@/db/database.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@/auth/auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [DatabaseModule, JwtModule],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
