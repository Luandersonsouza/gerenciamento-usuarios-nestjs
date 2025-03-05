import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { Request } from 'express';
import { Usuario } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signupData: SignUpDto) {
    return this.authService.signUp(signupData);
  }

  @UseGuards(AuthGuard('local')) 
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as Usuario); 
  }
}