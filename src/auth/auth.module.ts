import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule }      from '@nestjs/jwt';

import { AuthService }    from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy }    from './jwt.strategy';

import { UsersModule }    from '../users/users.module';

@Module({
  imports: [
    // ← brings in UsersService (and its UserRepository)
    UsersModule,

    // Passport for @UseGuards(AuthGuard('jwt'))
    PassportModule.register({ defaultStrategy: 'jwt' }),

    // JwtModule to provide JwtService
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') || '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,  // now Nest can inject UsersService & JwtService here
    JwtStrategy,  // your Passport JWT strategy
  ],
  exports: [AuthService],
})
export class AuthModule {}
