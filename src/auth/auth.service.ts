// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService }                       from '@nestjs/jwt';
import * as bcrypt                          from 'bcrypt';
import { UsersService }                     from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Register a new user:
   * 1) hash the password
   * 2) save the user
   * 3) issue a JWT
   */
  async register(
    email: string,
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      email,
      username,
      password: hash,
    });

    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  /**
   * Log in an existing user:
   * 1) look them up by email
   * 2) compare the password
   * 3) issue a JWT
   */
  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
