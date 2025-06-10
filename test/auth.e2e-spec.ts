// test/auth.e2e-spec.ts
import { INestApplication } from '@nestjs/common';
import { Test }            from '@nestjs/testing';
import * as request        from 'supertest';
import { AppModule }       from '../src/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';             // ensure dropSchema kicks in
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/auth/register (POST) returns a token', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        // use unique values so you never hit “duplicate key” in the same test run
        email:           `e2e+${Date.now()}@test.com`,
        username:        `user${Date.now()}`,
        password:        'secret123',
        confirmPassword: 'secret123',
      })
      .expect(201)
      .expect(res => {
        expect(res.body).toHaveProperty('access_token');
      });
  });

  it('/auth/login (POST) returns a token', async () => {
    // first register a fresh user
    const uniq = Date.now();
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email:           `e2e+${uniq}@test.com`,
        username:        `user${uniq}`,
        password:        'secret123',
        confirmPassword: 'secret123',
      })
      .expect(201);

    // then login
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: `e2e+${uniq}@test.com`, password: 'secret123' })
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveProperty('access_token');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
