// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { Public }       from './public.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService }  from './auth.service';
import { RegisterDto }  from './dto/register.dto';
import { LoginDto }     from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const { email, username, password } = dto;
    return this.authService.register(email, username, password);
  }

  @Public()
  @HttpCode(200)               // ← ensures login returns 200, not 201
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const { email, password } = dto;
    return this.authService.login(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
