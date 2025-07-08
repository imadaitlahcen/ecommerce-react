import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = (user as any).toObject ? (user as any).toObject() : user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    await this.usersService.updateLastLogin((user as any)._id);

    const payload = { email: user.email, sub: (user as any)._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: (user as any)._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    const { password, ...result } = (user as any).toObject ? (user as any).toObject() : user;

    const payload = { email: user.email, sub: (user as any)._id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: (user as any)._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
} 