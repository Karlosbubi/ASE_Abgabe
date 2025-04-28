import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '@/app.module';

describe('User Lifecycle (e2e)', () => {
  let app: INestApplication;
  let jwt: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create User', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({
        name: 'e2e_test_user',
        email: 'e2e@test.com',
        password: 'e2e',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: 'e2e_test_user',
            email: 'e2e@test.com',
            password: '*****',
            isadmin: false,
            issuspended: false,
          }),
        );
      });
  });

  it('Login', () => {
    return request(app.getHttpServer())
      .post('/auth')
      .send({
        email: 'e2e@test.com',
        password: 'e2e',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            JWT: expect.any(String),
          }),
        );
        jwt = res.body.JWT;
      });
  });

  //Tests with the User here

  it('Delete User', () => {
    return request(app.getHttpServer())
      .delete('/user')
      .set('Authorization', `Bearer ${jwt}`)
      .expect(200);
  });
});
