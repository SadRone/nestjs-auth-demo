import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    // registers the User repository provider
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    // makes UsersService available in this module
    UsersService,
  ],
  exports: [
    // allows other modules (AuthModule) to inject UsersService
    UsersService,
  ],
})
export class UsersModule {}
