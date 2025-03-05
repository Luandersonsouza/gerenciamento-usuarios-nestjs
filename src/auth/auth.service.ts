import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from './schemas/user.schema';
import { SignUpDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private userRepository: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  // Registro de usuário
  async signUp(signupData: SignUpDto): Promise<{ access_token: string }> {
    const existingUser = await this.userRepository.findOne({ 
      where: { email: signupData.email } 
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    const hashedPassword = await bcrypt.hash(signupData.password, 10);
    
    const user = this.userRepository.create({
      ...signupData,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Login de usuário
  async validateUser(email: string, password: string): Promise<Usuario> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return user;
  }

  async login(user: Usuario): Promise<{ access_token: string }> {
    const payload = { 
      email: user.email,
      sub: user.id,
      role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}