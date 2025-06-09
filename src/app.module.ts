// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 1) .env 파일을 읽어서 전역 ConfigService를 등록
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2) TypeORM을 비동기 설정으로 등록 (ConfigService 주입)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') ?? '5432', 10),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // 개발 환경에서만 사용하세요
      }),
      inject: [ConfigService],
    }),

    // 3) 기능별 모듈 불러오기
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
