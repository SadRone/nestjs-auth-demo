// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersModule }  from './users/users.module';
import { AuthModule }   from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject:  [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type:        'postgres',
        host:        cfg.get('DB_HOST'),
        port:        parseInt(cfg.get('DB_PORT')  ?? '5432', 10),
        username:    cfg.get('DB_USERNAME'),
        password:    cfg.get('DB_PASSWORD'),
        database:    cfg.get('DB_DATABASE'),
        entities:    [__dirname + '/**/*.entity.{ts,js}'],
        synchronize: true,
        // DROP & RE-CREATE all tables on every test-run
        dropSchema: process.env.NODE_ENV === 'test',
      }),
    }),
    UsersModule,
    AuthModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
