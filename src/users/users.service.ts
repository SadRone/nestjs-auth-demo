// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

interface CreateUserDto {
  email: string;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  /**
   * Find a user by their email address.
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  /**
   * Create a new user record.
   */
  async create(data: CreateUserDto): Promise<User> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }
}
