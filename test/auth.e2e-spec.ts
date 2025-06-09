import { INestApplication } from '@nestjs/common';
import { Test }            from '@nestjs/testing';
import * as request        from 'supertest';
import { AppModule }       from '../src/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/auth/register (POST) 성공', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'e2e@user.com',
        username: 'e2eTester',
        password: 'secret123',
        confirmPassword: 'secret123',
      })
      .expect(201)
      .expect(res => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.email).toBe('e2e@user.com');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
